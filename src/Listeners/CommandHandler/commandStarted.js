const { Listener } = require('discord-akairo');
const LoggerFactory = require('../../Handler/SLF4j');
const Logger = new LoggerFactory("CommandStartedListener")

class CommandStartedListener extends Listener {
	constructor() {
		super('commandStarted', {
			event: 'commandStarted',
			emitter: 'commandHandler',
			category: 'commandHandler'
		});
	}

	exec(message, command) {
		Logger.info(`${message.author.tag} using ${command.id} command in ${message.guild.name}`);
	}
}

module.exports = CommandStartedListener;