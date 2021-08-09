const Discord = require("discord.js");
let firstArgNum, secondArgNum, changeArgNum, CheckForOnlyNumbers;
module.exports.run = async (client, message, args) => {
	if (!args[0] && !args[1]) return message.channel.send("**RANDOM**: You must provide 2 different numbers.");
	firstArgNum = parseInt(args[0], 10);
	secondArgNum = parseInt(args[1], 10);
	for (let i=0;i<2;i++) {
		CheckForOnlyNumbers = args[i]
		if (!hasNumber(CheckForOnlyNumbers)) return ("**RANDOM**: You can only use numbers.");
	}
	if (firstArgNum == secondArgNum) return message.channel.send("**RANDOM**: The numbers cannot be the same.");
	if (firstArgNum > secondArgNum) {
		changeArgNum = firstArgNum;
		firstArgNum = secondArgNum;
		secondArgNum = changeArgNum;
	}
	message.delete();
	const RandomEmbed = new Discord.MessageEmbed()
		.setColor('#F9A3BB')
		.setTitle('Random Number')
		.setDescription('Generated number: **'+(Math.floor(Math.random()*(secondArgNum-firstArgNum)+firstArgNum))+'**')
		.setTimestamp()
		.setFooter('Range: '+firstArgNum+' a '+secondArgNum);
	message.channel.send(RandomEmbed);
};
module.exports.help = {
	name: 'random',
	aliases: ['rng'],
	description: 'Vygeneruje náhodné číslo v tvojom určenom rozsahu.',
	usage: '=random <menšie číslo> <väčšie číslo>'
};
function hasNumber(CheckForOnlyNumbers) {
  return /^[0-9]+$/.test(CheckForOnlyNumbers);
}