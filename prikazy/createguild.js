const Discord = require("discord.js");
let AllowedId = '409731934030135306';

module.exports = {
  name: 'createguild',
  description: 'Vytvorím testovaciu Guildu.',
  usage: '=createguild',
  async execute(message, args) {
    if(AllowedId.includes(message.author.id)) {
      const GuildCreate = await message.client.guilds.create("Sweetie Test Guild", {
        channels: [
            {"name": "invite-channel"},
        ]
    });
    console.log(GuildCreate);
    const GuildChannel = message.client.channels.cache.find(channel => channel.name == "invite-channel");
    console.log(GuildChannel);
    const Invite = await GuildChannel.createInvite({maxAge: 0, unique: true, reason: "Testing."});
    message.channel.send(`Created guild. Here's the invite code: ${Invite.url}`);
    } else {
      message.channel.send("Nemáš povolenie na tento príkaz, <@" + message.author.id + ">");
    }
	},

}