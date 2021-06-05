const Discord = require("discord.js");
let NumberCheck;
var NumberCheckIn = ['16', '32', '64', '128', '256', '512', '1024', '2048', '4096'];
let avatarSelect;
module.exports = {
  name: 'avatar',
  description: 'Pošle tvoj avatar v Embede.',
  usage: '=avatar (mention) (size)',
  async execute(message, args) {
	if (args[0] == "-g") {
		const GuildAvatarEmbed = new Discord.MessageEmbed()
			.setColor('#F9A3BB')
			.setTitle(`Guild icon of ${message.guild.name}:`)
			.setImage(message.guild.iconURL({ dynamic: true}));
		message.channel.send(GuildAvatarEmbed);
		return;
	}
	if (message.mentions.users.first()) {
		avatarSelect = message.mentions.users.first();
		args.shift();
	} else {
		avatarSelect = message.author;
	}
	if (args.length) {
		if (NumberCheckIn.includes(args[0])) {
			NumberCheck = parseInt(args[0]);
		} else {
			NumberCheck = 512;
		}
	} else {
		NumberCheck = 512;
	}
	const avatarembed = new Discord.MessageEmbed()
			.setColor('#F9A3BB')
			.setTitle(`${avatarSelect.username}'s avatar:`)
			.setImage(avatarSelect.displayAvatarURL({ dynamic: true, size: NumberCheck}));
	message.channel.send(avatarembed);
	},
}