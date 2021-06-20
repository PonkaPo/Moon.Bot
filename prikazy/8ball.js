const Discord = require("discord.js");
const odpovede = ["Jae (Áno)", "Nae (Nie)", "Nae vieg (V žiadnom prípade)", "I'southe (Určite)", "Mag (Možno)", "Min (Trošku)", "Wal (Pravdepodobne)", "Wal nae (Pravdepodobne nie)"];

module.exports.run = async (client, message, args) => {
	if (!args.length || !" ") return message.channel.send("Nezadal si žiadnu otázku, "+message.author.username);
	selectrandomanswer = odpovede[between(1, odpovede.length)];
	let questionvar = args.slice().join(' ');
	let ballembed = new Discord.MessageEmbed()
    	.setColor("#F9A3BB")
    	.setAuthor("🎱 8-ball")
		.addFields(
			{ name: '**Tvoja otázka ❓**', value: questionvar},
			{ name: '**8-ball hovorí 🔮**', value: selectrandomanswer}
		)
		.setFooter(message.author.username);
    await message.channel.send(ballembed);
	
}

module.exports.help = {
	name: '8ball',
	aliases: ['8b'],
	description: 'Odpovie na tvoju otázku v inom jazyku :srandyzabavy:',
	usage: '=8ball <otázka>',
};

function between(min, max) {  
	return Math.floor(Math.random() * (max - min + 1) + min)
}