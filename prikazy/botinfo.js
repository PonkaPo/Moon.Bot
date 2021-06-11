const Discord = require("discord.js");
module.exports = {
  name: 'botinfo',
  description: 'Pošle o tebe údaje v Embede.',
  usage: '=botinfo',
  async execute(message, args) {
	let botinfo = new Discord.MessageEmbed()
		.setAuthor(`${message.client.user.username} Info`, message.member.user.displayAvatarURL())
		.setDescription("Základné informácie:\nVytorený uživateľom: **Pinkamena Diane Song**.\nBot už aktuálne ma viacero funkcií plno funkčných príkazov.\nBot Server: https://discord.gg/jHbZ7fa2vq\n\nTesteri:\n```\nFildoff\nMkingSK\nTomSK1\nGuiHuiZui\nRopko ¯\\_(ツ)_/¯```")
		.setColor('#F9A3BB')
		.setFooter(`${message.member.user.tag}`)
        .setThumbnail(message.client.user.avatarURL())
		.setTimestamp();
	message.channel.send(botinfo);
	},

}