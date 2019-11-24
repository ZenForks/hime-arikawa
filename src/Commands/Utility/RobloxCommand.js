const { Command } = require('discord-akairo');
const { get } = require('superagent');
const { MessageEmbed, Util } = require('discord.js');
const BASE_URL = "https://api.roblox.com/";

class RobloxCommand extends Command {
	constructor() {
		super('roblox', {
			aliases: ['roblox', 'rblx'],
            category: 'utility',
            args: [{ id: "type", match: "text" }]
		});
	}

	async exec(message, args) {
        args.type = args.type.split(" ");
        const user = args.type[0];
        const { body: userId } = await get(`${BASE_URL}users/get-by-username`).query({ username: user });
        if (userId.success === false) return message.channel.send(`User with name ${user} doesn't registered on roblox.`);
        const { body: friendList } = await get(`${BASE_URL}users/${userId.Id}/friends`).query({ userId: userId.Id });
        const friends = friendList.length === 0 ? [] : this.client.utils.chunk(friendList, 5)[0];
        let friend;
        if (friends.Username !== null) friend = friends.map(f => f.Username).join("\n");
        else friend = ["This user doesn't have friend."].map(f => f).join("");
        const embed = new MessageEmbed()
            .setAuthor(`${user} Roblox Information`, userId.AvatarUri === null ? "https://cdn.discordapp.com/attachments/589456366046019590/647741196525109261/roblox_icon.png" : userId.AvatarUri)
            .setColor("RANDOM")
            .addField("General Information", `
\`\`\`asciidoc
User ID      :: ${userId.Id}
Is Online    :: ${userId.IsOnline === true ? "Online" : "Offline"}
Friend Count :: ${friendList.length} Friend(s)
\`\`\`
            `)
            .addField("Friend(s) List", `
\`\`\`asciidoc
${friend}
${friendList.length > 5 ? `...and ${friendList.length - 5} more...` : ``}
\`\`\`
            `)
            
        message.channel.send(embed)
	}
}

module.exports = RobloxCommand;