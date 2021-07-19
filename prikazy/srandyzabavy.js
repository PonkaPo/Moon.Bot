const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
	if (message.guild.id !== "827965464202051605") return message.channel.send("**SrandyZabavy**: This command is not allowed on this server.");
	let channel = client.channels.cache.get("866023143813808129");
	let randomMessage = await channel.messages.fetch({limit: 100});
	let arr = randomMessage.array();
    let random = Math.floor(Math.random()*randomMessage.size);
	SZEmbed = new Discord.MessageEmbed()
    	.setColor("#F9A3BB")
    	.setAuthor("Srandy Zabavy")
		.setImage(arr[random].attachments.first().url)
		.setFooter(message.author.username);
    message.channel.send(SZEmbed);
}
module.exports.help = {
	name: 'srandyzabavy',
	aliases: ['srandy', 'zabavy', 'sz'],
	description: 'Pošle random screenshot z festivalu.',
	usage: '=srandyzabavy',
};