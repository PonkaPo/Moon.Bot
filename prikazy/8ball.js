const Discord = require("discord.js");
const odpovede = ["Jae (Yes)", "Nae (No)", "Nae vieg (No way)", "I'southe (Určite)", "Mag (Definitely)", "Min (Trošku)", "Wal (Probably)", "Wal nae (Probably not)"];

module.exports.run = async (client, message, args) => {
	if (!args.length || !" ") return message.channel.send("**8-Ball**: You didn't wrote any question, "+message.author.username);
	selectrandomanswer = odpovede[between(1, odpovede.length)];
	let questionvar = args.slice().join(' ');
	let ballembed = new Discord.MessageEmbed()
    	.setColor("#F9A3BB")
    	.setAuthor("🎱 8-ball")
		.addFields(
			{ name: '**Your question ❓**', value: questionvar},
			{ name: '**8-ball answers 🔮**', value: selectrandomanswer}
		)
		.setFooter(message.author.username);
    await message.channel.send(ballembed);
	
}

module.exports.help = {
	name: '8ball',
	aliases: ['8b', '8'],
	description: 'Odpovie na tvoju otázku v inom jazyku :srandyzabavy:',
	usage: '=8ball <otázka>',
};

function between(min, max) {  
	return Math.floor(Math.random() * (max - min + 1) + min)
}