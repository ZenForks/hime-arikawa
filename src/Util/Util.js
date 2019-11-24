const { post } = require('node-superfetch');

class Util {
    constructor(Discord, client) {
        this.update = {
            presence: (log) => {
                const { presence } = client.config;
                const getRandom = (array) => Math.floor(Math.random() * array.length);
                const status = ["dnd", "idle", "online"];
                const type = ["PLAYING", "WATCHING", "LISTENING"]
                let randPresence = getRandom(presence);
                let randStatus = getRandom(status);
                let randType = getRandom(type);
                const map = new Map();
                map.set(client.user.id, {
                    presence: randPresence,
                    status: randStatus,
                    type: randType
                });

                setInterval(() => {
                    const after = map.get(client.user.id);
                    while (after.presence === randPresence) {
                        randPresence = getRandom(presence)
                    }
    
                    while (after.status === randStatus) {
                        randStatus = getRandom(status);
                    }
    
                    while (after.type === randType) {
                        randType = getRandom(type)
                    }

                    map.set(client.user.id, {
                        presence: randPresence,
                        status: randStatus,
                        type: randType
                    });

                    log.info(`Updated presence with name ${presence[randPresence]}, ${status[randStatus]} status and ${type[randType]} type`)
                    client.user.setPresence({ activity: { name: presence[randPresence], type: type[randType] }, status: status[randStatus] });
                }, 60000)

                return;
            }
        }

        this.makeChoice = async (channel, user) => {
            channel.send("Sorry, this channel isn't a nsfw channel. Do you want to change this channel to a nsfw channel? Reply this with `yes` to do it. And `no` for exiting this menu.");
            const filter = m => ((/yes/gi).test(m.content.split(" ")[0]) || (/no/gi).test(m.content.split(" ")[0])) && m.author.id === user.id;
            const choice = await channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
            if ((/yes/gi).test(choice.first())) {
                channel.setNSFW(true, `${client.user.tag} | NSFW`);
                return channel.send(`This channel now in nsfw mode. Now you'll be able to use my nfsw commands!`);
            } else if ((/no/gi).test(choice.first())) {
                return channel.send("Okay. Exiting...");
            }
        }

        this.chunk = function chunk(array, chunkSize) {
            const temp = [];
            for (let i = 0; i < array.length; i+= chunkSize) {
              temp.push(array.slice(i, i + chunkSize));
            }
            return temp;
        }

        this.fetchMembers = function fetchMembers(members, name, userObject = false) {
            const regex = new RegExp('^(?:<@​&?)?([0-9]+)>?$');
            if (!name || name === undefined) return undefined;
            if (regex.test(name)) name = name.replace(regex, '$1');
            const member = members.filter(r => r.displayName.toLowerCase().includes(name && name.toLowerCase()));
            if (member) return userObject ? member.first() : member.first().user;
            else return undefined;
        }

        this.fetchRoles = function fetchRoles(roles, name) {
            const regex = new RegExp('^(?:<@​&?)?([0-9]+)>?$');
            if (!name || name === undefined) return undefined;
            if (regex.test(name)) name = name.replace(regex, '$1');
            const role = roles.filter(r => r.name.toLowerCase().includes(name && name.toLowerCase()));
            if (role) return role.first();
            else return undefined;
        }

        this.hastebin = async function hastebin(text) {
            const { body } = await post("https://bin.zealcord.xyz/")
              .send(text);
            return `https://bin.zealcord.xyz/${body.key}`;
        }

        this.codeblock = (string, code) => {
            return `\`\`\`${code}\n${string}\`\`\``
        }
    }
}

module.exports = Util;