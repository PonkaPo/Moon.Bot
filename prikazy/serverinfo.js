const Discord = require("discord.js");
module.exports.run = async (client,message, args) => {
	let guildicon = message.guild.iconURL({ format: 'png'});
	let verifikacia = message.guild.verificationLevel;
    if(verifikacia === "LOW") verifikacie = "Low";
    if(verifikacia === "MEDIUM") verifikacie = "Medium";
    if(verifikacia === "HIGH") verifikacie = "High";
    if(verifikacia === "VERY_HIGH") verifikacie = "Very High";
    let notifikacie = message.guild.defaultMessageNotifications;
    if(notifikacie === "MENTIONS") notifikacie = "Only mentions";
    if(notifikacie === "ALL") notifikacie = "All messages";
    let serverembed = new Discord.MessageEmbed()
        .setTitle(`Informácie o serveri ${message.guild.name}`)
        .setColor(`#F9A3BB`)
        .setThumbnail(guildicon)
		.addField('**Server Owner** ', "<@"+message.guild.ownerID+">", true)
		.addField('**Server Owner ID** ', message.guild.ownerID, true)
		.addField('**Server Name** ', message.guild.name, true)
		.addField('**Server ID** ', message.guild.id, true)
		.addField('**Server created at** ', message.guild.createdAt.toLocaleDateString(), true)
		.addField('**Members** ', message.guild.memberCount, true)
		.addField('**Roles** ', message.guild.roles.cache.size, true)
		.addField('**Channels** ', message.guild.channels.cache.size, true)
		.addField('**Notifications** ', notifikacie, true)
        .addField('**Verification** ', verifikacia, true)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL());
    return message.channel.send(serverembed);
};
module.exports.help = {
    name: 'serverinfo',
    description: 'Pošle údaje o serveri v Embede.',
    usage: '=serverinfo'
};