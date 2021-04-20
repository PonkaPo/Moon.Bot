const Discord = require("discord.js");

module.exports = {
  name: 'avatar',
  description: 'Pošle tvoj avatar v Embede.',
  usage: '=avatar (mention)',
  async execute(message, args) {
    const avatarfirstuser = message.mentions.users.first() || message.author;
		const avatarembed = new Discord.MessageEmbed()
			.setColor('#7162ba')
			.setTitle(`${avatarfirstuser.username}'s avatar:`)
			.setImage(avatarfirstuser.avatarURL({ dynamic: true }))
		message.channel.send(avatarembed)
	},

}