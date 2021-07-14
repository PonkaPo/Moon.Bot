const Discord = require("discord.js");
let userInfo;
let botinfodesc = "Vytorený uživateľom: **Pinkamena Diane Song**.\nBot už aktuálne ma viacero funkcií plno funkčných príkazov.\nBot Server: https://discord.gg/jHbZ7fa2vq\n\nTesteri:\n```\nFildoff\nMkingSK\nTomSK1\nGuiHuiZui\nRopko ¯\\_(ツ)_/¯```";
module.exports.run = async (client,message,args) => {
	if (!message.mentions.members.first()) {
		userInfo = message.member;
	} else {
		userInfo = message.mentions.members.first();
	}
	if (userInfo == "746409149507567632") {
		let botinfo = new Discord.MessageEmbed()
			.setAuthor(`${message.client.user.username} Info`, message.member.user.displayAvatarURL())
			.setDescription(`<@${userInfo.id}>`)
			.setColor('#F9A3BB')
			.setFooter(`${message.member.user.tag}`)
			.setThumbnail(message.client.user.avatarURL())
			.setTimestamp()
			.addField('**Pripojil sa** ', userInfo.joinedAt.toLocaleString())
			.addField('**Vytvorený**', userInfo.user.createdAt.toLocaleString())
			.addField(`\n**Role [${userInfo.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]**`,`${userInfo.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`)
			.addField("Základné informácie: ",botinfodesc, false);
		return message.channel.send(botinfo);
	}
	const userinfoembed = new Discord.MessageEmbed()
		.setDescription(`<@${userInfo.id}>`)
		.setAuthor(`${userInfo.user.tag}`, userInfo.user.displayAvatarURL())
		.setColor('#F9A3BB')
		.setFooter(`ID: ${userInfo.id}`)
		.setThumbnail(userInfo.user.displayAvatarURL())
		.setTimestamp()
		.addField('**Pripojil sa** ', userInfo.joinedAt.toLocaleString())
		.addField('**Vytvorený**', userInfo.user.createdAt.toLocaleString())
		.addField(`\n**Role [${userInfo.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]**`,`${userInfo.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`)
	message.channel.send(userinfoembed);
}
module.exports.help = {
	name: 'info',
	aliases: ['i', 'userinfo', 'u'],
	description: 'Pošle o tebe údaje v Embede.',
	usage: '=info (mention)',
};