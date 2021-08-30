const { MessageEmbed } = require("discord.js");
const odpovede = ["Jae (Yes)", "Nae (No)", "Nae vieg (No way)", "I'southe (Určite)", "Mag (Definitely)", "Min (Trošku)", "Wal (Probably)", "Wal nae (Probably not)"];

module.exports.run = async (client, message, args) => {

	if (!args.length || !" ") return message.channel.send({
		content: "**8-Ball**: You didn't wrote any question, "+message.author.username
	});

	selectrandomanswer = odpovede[Math.floor(Math.random()*odpovede.length)];

	let questionvar = args.slice().join(' ');

	let ballembed = new MessageEmbed()
    	.setColor("#F9A3BB")
    	.setAuthor("🎱 8-ball")
		.setDescription('**Your question ❓**\n'+questionvar)
		.addField('**8-ball answers 🔮**', selectrandomanswer)
		.setFooter(message.author.username);

    message.channel.send({
		embeds: [ballembed] 
	});
	
}

module.exports.help = {
	name: '8ball',
	aliases: ['8b', '8'],
	description: 'Odpovie na tvoju otázku v inom jazyku :srandyzabavy:',
	usage: '=8ball <otázka>',
};