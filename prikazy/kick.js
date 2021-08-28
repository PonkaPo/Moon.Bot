const { MessageEmbed } = require("discord.js");
let oznacenytypek;

module.exports.run = async (client, message, args) => {

  if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send({
    content: "**KICK**: I don't have `KICK_MEMBERS` permission."
  });
  if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send({
    content: "**KICK**: You don't have `KICK_MEMBERS` permission."
  });
  if (!message.mentions.users.first()) return message.channel.send({
    content: "**KICK**: You didn't mention who you want to kick."
  });

  oznacenytypek = message.mentions.members.first();
  if (oznacenytypek.id == message.author.id) return message.channel.send({
    content: "**KICK**: You can't kick yourself."
  });
  if (oznacenytypek.roles.highest.position > message.member.roles.highest.position) return message.channel.send({
    content: '**KICK**: Mentioned user has higher role than you.'
  });
  if (!message.guild.member(oznacenytypek).kickable) return message.channel.send({
    content: '**KICK**: Mentioned user is not kickable.'
  });

  if (!args.length) {

    reasonKick = 'Reason was not provided.'

  } else {

    args.shift();
    reasonKick = args.slice().join(" ");

  }

  try {
    message.guild.member(oznacenytypek).kick();
    
    let KickedSucc = new MessageEmbed()
      .setColor("#F9A3BB")
      .setTitle('Kick')
      .setDescription('Member '+message.guild.member(oznacenytypek).user.username+" was kicked by "+message.author.username+" from this server:\n"+reasonKick);

    message.channel.send({
      embeds: [KickedSucc]
    });

  } catch {

    return message.channel.send({
      content: "User "+message.guild.member(oznacenytypek).user.username+" couldn't been kicked."
    });

  }
};
module.exports.help = {
  name: 'kick',
  description: 'Kickne člena zo servera.',
  usage: '=kick <mention> (dôvod)',
};
