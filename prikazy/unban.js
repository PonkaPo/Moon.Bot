const Discord = require("discord.js");
let SuccUnBan;
module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('**UNBAN**: <@'+message.author.id+'> -> Nemáš permissiu `BAN_MEMBERS`');
  if (!args[0]) return message.channel.send('**UNBAN**: <@'+message.author.id+'> -> Nedal si ID týpka, ktorého chceš odbanovať.');
  if (args[0] == message.author.id) return message.channel.send(message.author.username+", nemôžeš sebe dať unban ...");
  message.guild.members.unban(args[0])
  SuccUnBan = new Discord.MessageEmbed()
    .setColor("#F9A3BB")
    .setTitle('UNBAN')
    .setDescription('Týpek <@'+args[0]+"> dostal unban zo servera "+message.guild.name);
  message.channel.send(SuccUnBan);
};
module.exports.help = {
  name: 'unban',
  aliases: ['unb'],
  description: 'Zabanuje člena zo servera.',
  usage: '=unban <mention> (dôvod)'
};