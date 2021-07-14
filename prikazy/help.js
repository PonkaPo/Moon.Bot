const Discord = require("discord.js");
const config = require("../config/config.json");
var fs = require("fs");
module.exports.run = async (client,message,args) => {
  if (!args.length) {
    let helpembed = new Discord.MessageEmbed()
      .setColor('#F9A3BB')
      .setTitle('Supported Commands')
      .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
      .setDescription('```8ball\navatar\nban\nboop\ndelete\nhelp\nhug\ninfo\nkick\nmeme\nmusiclink\nmusiclist\nnick\npin\npoll\nquote\nrandom\nrr\nsay\nserverinfo\nunban\nwhatisit```')
      .setThumbnail(message.client.user.avatarURL())
      .setTimestamp()
      .setFooter("Pinkamena.Bot", Discord.ClientUser.displayAvatarURL);
    return message.channel.send(helpembed);
  }
  var commandsinfo = JSON.parse(fs.readFileSync('./config/commands-info.json', 'utf8'));
  console.log(commandsinfo[args[0]][0]["alias"]);
  if (Array.isArray(commandsinfo[args[0]][0]["alias"])) {
    let Aliasy = commandsinfo[args[0]][0]["alias"].slice().join(', ');
    const CommandsInfoArray = new Discord.MessageEmbed()
      .setColor('#F9A3BB')
      .setTitle(commandsinfo[args[0]][0]["name"])
      .setDescription('Description: **'+commandsinfo[args[0]][0]["popis"]+"**\nSyntax: `"+config.prefix+commandsinfo[args[0]][0]["syntax"]+'`\nAlias: '+Aliasy)
    message.channel.send(CommandsInfoArray);
  } else {
    const CommandsInfoNonArray = new Discord.MessageEmbed()
		 .setColor('#F9A3BB')
		 .setTitle(commandsinfo[args[0]][0]["name"])
		 .setDescription('Description: **'+commandsinfo[args[0]][0]["popis"]+"**\nSyntax: `"+config.prefix+commandsinfo[args[0]][0]["syntax"]+"`")
		message.channel.send(CommandsInfoNonArray);
  }
};
module.exports.help = {
  name: 'help',
  description: 'Zobrazí embed s pomocou.',
  usage: '=help (command)',
};