const Discord = require("discord.js");

module.exports = {
  name: 'serverinfo',
  description: 'Pošle údaje o serveri v Embede.',
  usage: '=serverinfo',
  async execute(message, args) {
	let guildicon = message.guild.iconURL({ format: 'png'});

	let verifikacia = message.guild.verificationLevel;
    if(verifikacia === "LOW") verifikacie = "Slabé";
    if(verifikacia === "MEDIUM") verifikacie = "Stredné";
    if(verifikacia === "HIGH") verifikacie = "Silné";
    if(verifikacia === "VERY_HIGH") verifikacie = "Veľmi silné";

    let notifikacie = message.guild.defaultMessageNotifications;
    if(notifikacie === "MENTIONS") notifikacie = "Iba pingy";
    if(notifikacie === "ALL") notifikacie = "Všetky správy";
	
    let serverembed = new Discord.MessageEmbed()
        .setTitle(`Informácie o serveri ${message.guild.name}`)
        .setColor(`#7162ba`)
        .setThumbnail(guildicon)
		.addField('**Vlastník Servera** ', message.guild.owner, true)
		.addField('**ID Vlastníka** ', message.guild.ownerID, true)
		.addField('**Meno Servera** ', message.guild.name, true)
		.addField('**ID Servera** ', message.guild.id, true)
		.addField('**Server vytvorený** ', message.guild.createdAt.toLocaleDateString(), true)
		.addField('**Celkovo Členov** ', message.guild.memberCount, true)
		.addField('**Celkový počet rolí** ', message.guild.roles.cache.size, true)
		.addField('**Počet kanálov** ', message.guild.channels.cache.size, true)
		.addField('**Režim upozornenia** ', notifikacie, true)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
    return message.channel.send(serverembed);
	},

}