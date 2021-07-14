const Discord = require("discord.js");
let NumberCheck, avatarSelect;
var NumberCheckIn = ['16', '32', '64', '128', '256', '512', '1024', '2048', '4096'];
module.exports.run = async (client, message, args) => {
	if (args[0] == "-g") {
		const GuildAvatarEmbed = new Discord.MessageEmbed()
			.setColor('#F9A3BB')
			.setTitle(`Guild icon of ${message.guild.name}:`)
			.setImage(message.guild.iconURL({ dynamic: true}));
		return message.channel.send(GuildAvatarEmbed);
	}
	if (message.mentions.users.first()) {
		avatarSelect = message.mentions.users.first();
		args.shift();
	} else {avatarSelect = message.author;}
	if (!args.length) {
		NumberCheck = 512;
		comment = ":"
	} else {
		if (NumberCheckIn.includes(parseInt(args[0]))) {
			NumberCheck = args[0];
			comment = ":"
		} else {
			NumberCheck = 512;
			comment = ":\n"+args[0]+" -> isn't available, so the Bot choose 512"
		}
	}
	const avatarembed = new Discord.MessageEmbed()
			.setColor('#F9A3BB')
			.setTitle(`${avatarSelect.username}'s avatar`+comment)
			.setImage(avatarSelect.displayAvatarURL({ dynamic: true, size: NumberCheck}));
	message.channel.send(avatarembed);
}
module.exports.help = {
	name: 'avatar',
	aliases: ['ava', 'a'],
	description: 'Pošle tvoj avatar v Embede s ľuvovoľnou veľkosťou',
	usage: '=avatar (mention) (size)',
};