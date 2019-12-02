const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { get } = require('node-superfetch');
const cheerio = require('cheerio');
const BASE_URL = "https://nekopoi.care/";

class NekopoiCommand extends Command {
	constructor() {
		super('nekopoi', {
			aliases: ['nekopoi', 'kucingpoi'],
            category: 'utility',
            args: [{
                id: "content",
                match: "phrase",
                type: Argument.validate(["ongoing"]),
                prompt: {
                    retries: 3,
                    time: 100000,
                    start: message => `Please choose a option : \`ongoing or <soon>\``,
                    retry: message => `That's not a valid option.`,
                }
            }]
		});
	}

	async exec(message, { content }) {
		if (!message.channel.nsfw && message.member.permissions.has("MANAGE_CHANNELS") && message.guild.me.permissions.has("MANAGE_CHANNELS")) return this.client.utils.makeChoice(message.channel, message.author);
        content = content.split(" ");
	}
}

module.exports = NekopoiCommand;