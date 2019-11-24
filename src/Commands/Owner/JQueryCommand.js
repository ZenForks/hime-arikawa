const { Command } = require('discord-akairo');
const { get } = require("node-superfetch");
const { load } = require("cheerio");
const { MessageEmbed } = require('discord.js');
const link = {};

class JQueryCommand extends Command {
	constructor() {
		super('jquery', {
			aliases: ['jquery', 'cheer', 'scrap', 'jq'],
            category: 'owner',
            ownerOnly: true,
            args: [{
                id: 'content',
                type: 'text'
            }]
		});
	}

	async exec(message, args) {
        args.content = args.content.split(" ");
        if (args.content.length < 1) return message.channel.send("No link provided!")
        try {
            const html = await this.getHtml(args.content[0]);
            const $ = load(html, { xmlMode: !!args.content[2] });
            if (!args.content[1]) args.content[1] = "$"; // eslint-disable-line
            let evaled = eval(args.content[1]);
            evaled = require('util').inspect(evaled);
            if (evaled.length > 1024) evaled = await this.client.utils.hastebin(evaled);
            else evaled = this.client.utils.codeblock(evaled, "xl");
            const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("🔍 jQuery Selector Loader")
            .setDescription(evaled);
            return message.channel.send(embed);
        } catch(e) {
            const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("🚫 An Ewwo Occuwed >w<")
            .setDescription(this.client.utils.codeblock(e.stack, "ini"));
            return message.channel.send(embed);
        }
    }
    
    async getHtml(url) {
        try {
          if (link[url]) return link[url];
          const { text } = await get(url);
          link[url] = text; // eslint-disable-line
          return text;
        } catch (e) {
          throw e.stack;
        }
      }
}

module.exports = JQueryCommand;