const Discord = require("discord.js");
let firstArgNum, secondArgNum;
module.exports.run = async (client, message, args) => {
	message.delete();
	if (!args[0] && !args[1]) return message.channel.send("**RANDOM**: "+message.author.username+" -> musíš zadať dve čísla.");
	firstArgNum = parseInt(args[0], 10);
	secondArgNum = parseInt(args[1], 10);
	if (firstArgNum > secondArgNum) return message.channel.send("**RANDOM**: "+message.author.username+" -> Prvé číslo musí byť menšie ako druhé.");
	if (firstArgNum == secondArgNum) return message.channel.send("**RANDOM**: "+message.author.username+" -> Nemôžeš zadať dve rovnaké čísla.\n");
	const RandomEmbed = new Discord.MessageEmbed()
		.setColor('#F9A3BB')
		.setTitle('Náhodné číslo ('+firstArgNum+', '+secondArgNum+')')
		.setDescription('Vygenerované číslo: **'+(Math.floor(Math.random()*(secondArgNum-firstArgNum)+firstArgNum))+'**')
		.setTimestamp()
		.setFooter('Range: '+firstArgNum+' a '+secondArgNum);
	message.channel.send(RandomEmbed);
};
module.exports.help = {
	name: 'random',
	description: 'Vygeneruje náhodné číslo v tvojom určenom rozsahu.',
	usage: '=random <menšie číslo> <väčšie číslo>'
};