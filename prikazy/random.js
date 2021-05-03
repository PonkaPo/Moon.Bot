const Discord = require("discord.js");

module.exports = {
	name: 'random',
	description: 'Vygeneruje náhodné číslo v tvojom určenom rozsahu.',
	usage: '=random <menšie číslo> <väčšie číslo>',
  	async execute(message, args) {
		message.delete();
		if (!args[0] && !args[1]) return message.channel.send("Musíš zadať dve čísla.");
		let firstArgNum = parseInt(args.shift());
		let secondArgNum = parseInt(args.shift());
		if (firstArgNum > secondArgNum) return message.channel.send("CHYBA: Prvé číslo musí byť menšie ako druhé.");
		const RandomEmbed = new Discord.MessageEmbed()
			.setColor('#7162ba')
			.setTitle('Náhodné číslo ')
			.setDescription('Vygenerované číslo: **'+between(firstArgNum, secondArgNum)+'**')
			.setFooter('Range: '+firstArgNum+' a '+secondArgNum);
		message.channel.send(RandomEmbed);
	},
}

function between(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}