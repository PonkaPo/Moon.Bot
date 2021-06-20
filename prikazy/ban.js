const Discord = require("discord.js");
let dovod, SuccBan, oznacenytypek;

module.exports.run = async (client, message, args) => {
  if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('**BAN**: Nemám permissiu `BAN_MEMBERS`');
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('**BAN**: <@'+message.author.id+'> -> Nemáš permissiu `BAN_MEMBERS`');
  if (!message.mentions.users.first()) return message.channel.send('**BAN**: <@'+message.author.id+'> -> Neoznačil si človeka, ktorého chceš zabanovať.');
  oznacenytypek = message.mentions.users.first();
  if (oznacenytypek.id == message.author.id) return message.channel.send("TO prečo by si sebe dával ban, "+message.author.username+"? To kde sme ...");
  if (oznacenytypek.roles.highest.position > message.member.roles.highest.position) return message.channel.send('**BAN**: <@'+message.author.id+'> -> Tento týpek má vyššiu rolu než ty.');  
  if (!message.guild.member(oznacenytypek).bannable) return message.channel.send('**BAN**: <@'+message.author.id+'> -> Toho týpka nemôže zabanovať.');
  args.shift();
  dovod = ":\n"+args.slice().join(" ");
  message.guild.member(oznacenytypek).ban();
  SuccBan = new Discord.MessageEmbed()
    .setColor("#F9A3BB")
    .setTitle('BAN')
    .setDescription('Týpek ' + message.guild.member(user).user.username + " bol zabanovaný zo servera"+dovod);
  message.channel.send(SuccBan);
}
module.exports.help = {
  name: 'ban',
  aliases: ['b'],
  description: 'Zabanuje člena zo servera.',
  usage: '=ban <mention> (dôvod)',
};

function hasNumber(CheckForNumbers) {
  return /\d/.test(CheckForNumbers);
}