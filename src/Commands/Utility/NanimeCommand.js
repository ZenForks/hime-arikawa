const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { get } = require('node-superfetch');
const cheerio = require('cheerio');
const BASE_URL = "https://nanime.tv/";

class NanimeCommand extends Command {
	constructor() {
		super('nanime', {
			aliases: ['nanime'],
            category: 'utility'
		});
	}

	async exec(message) {
    try {
        const msg = await message.channel.send("Fetching anime...")
        const { body } = await get(BASE_URL);
        const $ = await cheerio.load(body);
        const titles = [];
        const status = [];
        const episodes = [];
        const images = [];
        const urls = [];
        const urlAnimeElement = $(".content-item a");
        const statusElement = $(".status");
        const episodeElement = $(".episode");
        const titleElement = $(".post-title");
        const imageElement = $(".poster .img-responsive.shadow");
        const result = [];
        const embedDesc = [];
        let index = 0;

        urlAnimeElement.each((i, element) => {
            if (i > 11) return;
            const urlText = $(element).attr("href");
            urls.push(`https://nanime.tv${urlText}`);
        });

        titleElement.each((i, element) => {
            const titleText = $(element).text().trim();
            titles.push(titleText);
        });

        statusElement.each((i, element) => {
            const statusText = $(element).text().trim();
            status.push(statusText);
        });

        episodeElement.each((i, element) => {
            const episodeText = $(element).text().trim();
            episodes.push(episodeText);
        });

        imageElement.each((i, element) => {
            const imageText = $(element).attr('src');
            images.push(imageText);
        });
        
        titles.forEach((_title, i) => {
            const struct = {
                title: _title,
                status: status[i],
                episode: episodes[i],
                imageUrl: images[i],
                animeUrl: urls[i]
            };

            embedDesc.push(`\`\`\`asciidoc
Episodes    :: ${struct.episode}
Status      :: ${struct.status}
\`\`\`
            `)
            return result.push(struct);
        });

        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(result[0].title)
        .setURL(urls[0])
        .setDescription(embedDesc[0])
        .setThumbnail(result[0].imageUrl)
        .setFooter(`Page ${index+1} of ${result.length}`);
        
        const m = await msg.edit("", { embed: embed });
        await m.react('⬅'); // eslint-disable-line
        await m.react('🔴');
        await m.react('➡'); // eslint-disable-line
        async function awaitReaction() { // eslint-disable-line
            const filter = (rect, usr) => ['⬅', '🔴','➡' ].includes(rect.emoji.name) && usr.id === message.author.id
            const response = await m.awaitReactions(filter, {
                max: 1,
                time: 30000
            });
            
            if (!response.size) return undefined;
            const emoji = response.first().emoji.name;
            if (emoji === '⬅') index--; // eslint-disable-line
            if (emoji === '🔴') return m.delete();
            if (emoji === '➡') index++; // eslint-disable-line

            index = ((index % result.length) + result.length) % result.length; // eslint-disable-line
            embed.setDescription(embedDesc[index]); // eslint-disable-line
            embed.setThumbnail(result[index].imageUrl)
            embed.setTitle(result[index].title)
            embed.setURL(result[index].animeUrl)
            embed.setFooter(`Page ${index+1} of ${result.length}`); 
            await m.edit(embed); // eslint-disable-line
            return awaitReaction();
        }
        
        return awaitReaction();
    } catch(e) {
    return message.channel.send(`Oh, an error occured, please try again later :(\nERROR STACK :\n\`\`\`ini\n${e.stack}\`\`\``)
  }
  }
}

module.exports = NanimeCommand;