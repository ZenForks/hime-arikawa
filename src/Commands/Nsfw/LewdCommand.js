const { Command } = require('discord-akairo');

class LewdCommand extends Command {
	constructor() {
		super('lewd', {
			aliases: ['lewd'],
            category: 'nsfw'
		});
	}

	async exec(message) {
		if (!message.channel.nsfw && message.member.permissions.has("MANAGE_CHANNELS") && message.guild.me.permissions.has("MANAGE_CHANNELS")) return this.client.utils.makeChoice(message.channel, message.author);
		
	}
}

module.exports = LewdCommand;