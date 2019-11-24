const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const { Collection } = require('discord.js');
const path = require('path');
const Util = require('../Util/Util');
const configs = require('../config.json');
const TippyDatabase = require('./EnmapHandler');

class HimeClient extends AkairoClient {
	constructor(config) {
		super({ ownerID: config.owner }, {
			messageCacheMaxSize: 50,
			messageCacheLifetime: 300,
			messageSweepInterval: 900,
			disableEveryone: true,
			disabledEvents: ['TYPING_START'],
			partials: ['MESSAGE']
		});

		this.invites = new Collection();
		this.db = new TippyDatabase({
			name: 'database',
			persistent: true,
			path: './src/data'
		});

		this.commandHandler = new CommandHandler(this, {
			directory: path.join(__dirname, '..', 'Commands'),
			aliasReplacement: /-/g,
			prefix: configs.prefix,
			allowMention: true,
			fetchMembers: true,
			commandUtil: true,
			commandUtilLifetime: 3e5,
			commandUtilSweepInterval: 9e5,
			handleEdits: true,
			defaultCooldown: 2500,
			argumentDefaults: {
				prompt: {
					modifyStart: (msg, text) => text && `${msg.author} **::** ${text}\nType \`cancel\` to cancel this command.`,
					modifyRetry: (msg, text) => text && `${msg.author} **::** ${text}\nType \`cancel\` to cancel this command.`,
					timeout: msg => `${msg.author} **::** Time ran out, command has been cancelled.`,
					ended: msg => `${msg.author} **::** Too many retries, command has been cancelled.`,
					cancel: msg => `${msg.author} **::** Command has been cancelled.`,
					retries: 4,
					time: 30000
				}
			}
		});

		this.inhibitorHandler = new InhibitorHandler(this, { directory: path.join(__dirname, '..', 'Inhibitors') });
        this.listenerHandler = new ListenerHandler(this, { directory: path.join(__dirname, '..', 'Listeners') });
        this.utils = new Util(require('discord.js'), this);
		this.config = configs;
		this.setup();

		setInterval(() => {
			for (const guild of this.guilds.values()) {
				guild.presences.clear();
			}
		}, 900);
	}

	setup() {
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			inhibitorHandler: this.inhibitorHandler,
			listenerHandler: this.listenerHandler
		});

		this.commandHandler.loadAll();
		this.inhibitorHandler.loadAll();
		this.listenerHandler.loadAll();
	}

	async start() {
		return this.login(this.config.token);
	}
}

module.exports = HimeClient;