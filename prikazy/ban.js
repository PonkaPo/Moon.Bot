const Discord = require("discord.js");
let dovodna, SuccBan;

module.exports = {
  name: 'ban',
  description: 'Zabanuje člena zo servera.',
  usage: '=ban <mention> (dôvod)',
  async execute(message, args) {
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('**BAN**: <@'+message.author.id+'> -> Nemáš permissiu `BAN_MEMBERS`');
    if (hasNumber(args[0])) {
    let { user } = message.guild.members.cache.get(args[0]) || message.guild.member(message.mentions.users.first())
      console.log(message.guild.member(message.mentions.users.first()));
    } else {
      if (!message.mentions.users.first()) return message.channel.send('**BAN**: <@'+message.author.id+'> -> Neoznačil si človeka, ktorého chceš zabanovať.');
      if (user) return message.channel.send("TO prečo by si sebe dával ban, "+message.author.username+"? To kde sme ...");
      if (user.roles.highest.position > message.member.roles.highest.position) return message.channel.send('**BAN**: <@'+message.author.id+'> -> Tento týpek má vyššiu rolu než ty.');  
      if (!message.guild.member(user).bannable) return message.channel.send('**BAN**: <@'+message.author.id+'> -> Toho týpka nemôže vykopnúť.');
    }
    args.shift();
    dovodna = ":\n"+args.slice().join(" ");
    message.guild.member(user).ban();
    SuccBan = new Discord.MessageEmbed()
      .setColor("#F9A3BB")
      .setTitle('BAN')
      .setDescription('Týpek ' + message.guild.member(user).user.username + " bol zabanovaný zo servera"+dovodna);
    message.channel.send(SuccBan);
	},
}

function hasNumber(CheckForNumbers) {
  return /\d/.test(CheckForNumbers);
}