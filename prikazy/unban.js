const Discord = require("discord.js");
let SuccUnBan;
module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("**UNBAN**: You don't have `BAN_MEMBERS` permission");
  if (!args[0]) return message.channel.send("**UNBAN**: You didn't provide ID of the banned user.");
  if (args[0] == message.author.id) return message.channel.send("**UNBAN**: You can't unban yourself ...");
  message.guild.members.unban(args[0])
  SuccUnBan = new Discord.MessageEmbed()
    .setColor("#F9A3BB")
    .setTitle('UNBAN')
    .setDescription('User <@'+args[0]+"> was unbanned from this server by "+message.author.username);
  message.channel.send(SuccUnBan);
};
module.exports.help = {
  name: 'unban',
  aliases: ['unb', 'ub'],
  description: 'Zabanuje člena zo servera.',
  usage: '=unban <mention> (dôvod)'
};