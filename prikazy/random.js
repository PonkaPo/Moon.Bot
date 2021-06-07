const Discord = require("discord.js");

module.exports = {
	name: 'random',
	description: 'Vygeneruje náhodné číslo v tvojom určenom rozsahu.',
	usage: '=random <menšie číslo> <väčšie číslo>',
  	async execute(message, args) {
		message.delete();
		if (!args[0] && !args[1]) return message.channel.send("**RANDOM**: "+message.author.username+" -> musíš zadať dve čísla.");
		let firstArgNum = parseInt(args[0], 10);
		let secondArgNum = parseInt(args[1], 10);
		if (firstArgNum > secondArgNum) return message.channel.send("**RANDOM**: "+message.author.username+" -> Prvé číslo musí byť menšie ako druhé.");
		if (firstArgNum == secondArgNum) return message.channel.send("**RANDOM**: "+message.author.username+" -> Nemôžeš zadať dve rovnaké čísla.\n");
		const RandomEmbed = new Discord.MessageEmbed()
			.setColor('#F9A3BB')
			.setTitle('Náhodné číslo ('+firstArgNum+', '+secondArgNum+')')
			.setDescription('Vygenerované číslo: **'+between(firstArgNum, secondArgNum)+'**')
			.setTimestamp()
			.setFooter('Range: '+firstArgNum+' a '+secondArgNum);
		message.channel.send(RandomEmbed);
	},
}

function between(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}