const { Listener } = require('discord-akairo');

class MessageListener extends Listener {
	constructor() {
		super('message', {
			event: 'message',
			emitter: 'client',
			category: 'client'
		});
	}

	async exec(message) { // eslint-disable-line
	}
}

module.exports = MessageListener;