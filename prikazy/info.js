const Discord = require("discord.js");

module.exports = {
  name: 'info',
  description: 'Pošle o tebe údaje v Embede.',
  usage: '=info (mention)',
  async execute(message, args) {
	if (!message.mentions.members.first()) {
		const userinfoembedself = new Discord.MessageEmbed()
		.setDescription(`<@` + message.author.id + `> Info`)
		.setAuthor(`${message.member.user.tag}`, message.member.user.displayAvatarURL())
		.setColor('#F9A3BB')
		.setFooter(`ID: ${message.author.id}`)
		.setThumbnail(message.member.user.displayAvatarURL())
		.setTimestamp()
		.addField('**Pripojil sa** ', message.member.joinedAt.toLocaleString(), true)
		.addField('**Vytvorený**', message.member.user.createdAt.toLocaleString(), true)
		.addField(`\n**Role [${message.member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]**`,`${message.member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "Žiadne role"}`, true)
		message.channel.send(userinfoembedself);
	} else {
		let userInfo = message.mentions.members.first();
		const userinfoembed = new Discord.MessageEmbed()
		.setDescription(`<@${userInfo.id}>`)
		.setAuthor(`${userInfo.user.tag}`, userInfo.user.displayAvatarURL())
		.setColor('#F9A3BB')
		.setFooter(`ID: ${userInfo.id}`)
		.setThumbnail(userInfo.user.displayAvatarURL())
		.setTimestamp()
		.addField('**Pripojil sa** ', userInfo.joinedAt.toLocaleString(), true)
		.addField('**Vytvorený**', userInfo.user.createdAt.toLocaleString(), true)
		.addField(`\n**Role [${userInfo.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]**`,`${userInfo.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`, true)
		message.channel.send(userinfoembed);
	}
	},

}