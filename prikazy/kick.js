const Discord = require("discord.js");
let oznacenytypek;
module.exports.run = async (client, message, args) => {
  if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('**KICK**: Nemám permissiu `KICK_MEMBERS`');
  if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('**KICK**: <@'+message.author.id+'> -> Nemáš permissiu `KICK_MEMBERS`');
  if (!message.mentions.users.first()) return message.channel.send('**KICK**: <@'+message.author.id+'> -> Neoznačil si človeka, ktorého chceš dať do preč.');
  oznacenytypek = message.mentions.users.first();
  if (oznacenytypek.id == message.author.id) return message.reply("nie nemôžeš sebe dať kick...");
  if (oznacenytypek.roles.highest.position > message.member.roles.highest.position) return message.channel.send('**KICK**: <@'+message.author.id+'> -> Tento týpek má vyššiu rolu než ty.');
  if (!message.guild.member(oznacenytypek).kickable) return message.channel.send('**KICK**: <@'+message.author.id+'> -> Toho týpka nemôže vykopnúť.');
  args.shift();
  message.guild.member(oznacenytypek).kick();
  let KickedSucc = new Discord.MessageEmbed()
    .setColor("#F9A3BB")
    .setTitle('Kick')
    .setDescription('Týpek ' + message.guild.member(oznacenytypek).user.username + " bol vykopnutý zo servera: " + args.slice().join(" "));
  message.channel.send(KickedSucc);
}
module.exports.help = {
  name: 'kick',
  aliases: ['k'],
  description: 'Kickne člena zo servera.',
  usage: '=kick <mention> (dôvod)',
};