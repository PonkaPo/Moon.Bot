const { MessageEmbed } = require("discord.js");
let userInfo;
module.exports.run = async (client,message,args) => {

	if (!message.mentions.members.first()) {
		userInfo = message.member;
	} else {
		userInfo = message.mentions.members.first();
	}

	let InfoEmbed = new MessageEmbed()
		.setColor('#F9A3BB')
		.setAuthor(`${userInfo.user.tag} Info`, userInfo.user.displayAvatarURL())
		.setThumbnail(userInfo.user.displayAvatarURL())
		.setTimestamp()
		.setFooter(`ID: ${userInfo.id}`);
	
	if (args[0] == "-bot") {
		InfoEmbed.setDescription("Basic Information: ", "Bot created by **Pinkamena Diane Song**\nBot contains many commands to have fun & levels for chat activity\nFor more info, visit Bot Server now: https://discord.gg/jHbZ7fa2vq\nTesters:\n```\nFildoff\nMkingSK\nTomSK1\nGuiHuiZui\nRopko ¯\\_(ツ)_/¯```", false);
	} else {
		InfoEmbed.setDescription(`Tag: <@${userInfo.id}>`).addField('**Joined** ', userInfo.joinedAt.toLocaleString()).addField('**Created**', userInfo.user.createdAt.toLocaleString()).addField(`\n**Roles [${userInfo.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]**`,`${userInfo.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`);
	}
	return message.channel.send({
		embeds: [InfoEmbed]
	});
}
module.exports.help = {
	name: 'info',
	aliases: ['userinfo'],
	description: 'Bot will print about mentioned member',
	usage: '=info (mention)',
};