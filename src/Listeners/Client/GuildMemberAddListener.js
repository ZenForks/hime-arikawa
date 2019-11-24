const { Listener } = require('discord-akairo');
const LoggerFactory = require('../../Handler/SLF4j')
const Logger = new LoggerFactory("GuildMemberAddListener");

class GuildMemberAddListener extends Listener {
	constructor() {
		super('guildMemberAdd', {
			event: 'guildMemberAdd',
			emitter: 'client',
			category: 'client'
		});
	}

	exec(member) {
       /*

        Logger.info("This event is emitted")
        member.guild.fetchInvites().then(guildInvites => {
            console.log(guildInvites)
            Logger.info("Fetching invites...")
            const invitedData = this.client.db.got(member.user.id)
            const ei = this.client.invites.get(member.guild.id);
            this.client.invites.set(member.guild.id, guildInvites);
            const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
            const inviter = this.client.users.get(invite.inviter.id);
            const inviterData = this.client.db.got(invite.inviter.id);
            const newCount = Object.values(inviterData.invite).find(element => element["guildId"] === member.guild.id) || JSON.parse({"guildId": member.guild.id, "count": 0 }, 0, 2); // eslint-disable-line
            const newInvited = Object.values(invitedData.guild).find(element => element["guildId"] === member.guild.id) || JSON.parse({"guildId": member.guild.id, "invitedBy": 0 }, 0, 2); // eslint-disable-line
            newCount.count += 1;
            newInvited.invitedBy += invite.inviter.id;
            inviterData.invite.push(newCount);
            invitedData.guild.push(newInvited);
            Logger.info(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`)
        }).catch(console.error);*/
	}
}

module.exports = GuildMemberAddListener;