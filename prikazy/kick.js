const Discord = require("discord.js");

module.exports = {
  name: 'kick',
  description: 'Kickne člena zo servera.',
  usage: '=kick <mention> (dôvod)',
  async execute(message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      let NoPermToKick = new Discord.MessageEmbed()
      .setColor("#7162ba")
      .setTitle('Kick')
      .setDescription('Nemáš právo tam proste dávať len tak kopance, debyl');
    message.channel.send(NoPermToKick);
    return;
    }
    if (message.mentions.users.first()) {
      if (message.mentions.users.first().id == message.author.id) return message.channel.send("TO sa chceš more sám vykopnúť? To kde sme ...");
      if (message.mentions.members.first().roles.highest.position > message.member.roles.highest.position) {
        let HigherRoleKick = new Discord.MessageEmbed()
        .setColor("#7162ba")
        .setTitle('Kick')
        .setDescription('Tento týpek má vyššiu rolu než ty, nemotorný...');
        message.channel.send(HigherRoleKick);
        return;
      }
      if (!message.guild.member(message.mentions.users.first()).kickable) {
        let CannotKick = new Discord.MessageEmbed()
          .setColor("#7162ba")
          .setTitle('Kick')
          .setDescription('Toho týpka nemôže vykopnúť.')
        message.channel.send(CannotKick);
      } else {
        args.shift();
        args.slice().join(" ");
        message.guild.member(message.mentions.users.first()).kick();
        let KickedSucc = new Discord.MessageEmbed()
          .setColor("#7162ba")
          .setTitle('Kick')
          .setDescription('Týpek ' + message.guild.member(message.mentions.users.first()).user.username + " bol vykopnutý zo servera: " + args.slice().join(" "));
        message.channel.send(KickedSucc);
      }
      return;
    } else {
      let NoMentionKick = new Discord.MessageEmbed()
      .setColor("#7162ba")
      .setTitle('Kick')
      .setDescription('Neoznačil si more človeka, ktorého chceš dať do preč.')
    message.channel.send(NoMentionKick);
    }
	},

}