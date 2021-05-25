const Discord = require("discord.js");

module.exports = {
  name: 'kick',
  description: 'Kickne člena zo servera.',
  usage: '=kick <mention> (dôvod)',
  async execute(message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
    message.channel.send('**KICK**: <@'+message.author.id+'> -> Nemáš právo proste len tak kickovať niekoho');
    return;
    }
    if (message.mentions.users.first()) {
      if (message.mentions.users.first().id == message.author.id) return message.channel.send("TO sa chceš more sám vykopnúť? To kde sme ...");
      if (message.mentions.members.first().roles.highest.position > message.member.roles.highest.position) {
        message.channel.send('**KICK**: <@'+message.author.id+'> -> Tento týpek má vyššiu rolu než ty.');
        return;
      }
      if (!message.guild.member(message.mentions.users.first()).kickable) {
        message.channel.send('**KICK**: <@'+message.author.id+'> -> Toho týpka nemôže vykopnúť.');
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
      message.channel.send('**KICK**: <@'+message.author.id+'> -> Neoznačil si more človeka, ktorého chceš dať do preč.');
    }
	},

}