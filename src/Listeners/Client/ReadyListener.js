const { Listener } = require('discord-akairo');
const LoggerFactory = require('../../Handler/SLF4j');
const Logger = new LoggerFactory("ReadyListener");

class ReadyListener extends Listener {
	constructor() {
		super('ready', {
			event: 'ready',
			emitter: 'client',
			category: 'client'
		});
	}

	exec() {
        const getRandom = (array) => Math.floor(Math.random() * array.length);
        const { presence } = this.client.config;
        const status = ["dnd", "idle", "online"];
        const type = ["PLAYING", "WATCHING", "LISTENING"]
        const randPresence = getRandom(presence);
        const randStatus = getRandom(status);
        const randType = getRandom(type);
        this.client.user.setPresence({ activity: { name: presence[randPresence], type: type[randType] }, status: status[randStatus] });
        Logger.info(`${this.client.user.tag} is ready!`);
        this.client.utils.update.presence(Logger);
	}
}

module.exports = ReadyListener;