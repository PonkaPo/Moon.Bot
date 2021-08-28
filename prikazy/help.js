const { MessageEmbed } = require("discord.js");
const config = require("../config/config.json");
var fs = require("fs");

module.exports.run = async (client,message,args) => {

  //if (!args.length) {

    let helpembed = new MessageEmbed()
      .setColor('#F9A3BB')
      .setTitle('Supported Commands')
      .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
      .setDescription('```8ball\navatar\nban\nboop\ndelete\nhelp\nhug\ninfo\nkick\nmeme\nmusiclink\nmusiclist\nnick\npin\npoll\nquote\nrandom\nrr\nsay\nserverinfo\nunban\nwhatisit```')
      .setThumbnail(message.client.user.avatarURL())
      .setTimestamp()
      .setFooter("Pinkamena.Bot", client.user.displayAvatarURL);

    return message.channel.send({
      embeds: [helpembed]
    });

  /*} else {

    var commandsinfo = JSON.parse(fs.readFileSync('./config/commands-info.json', 'utf8'));
    
    if(!commandsinfo[args[0]][0]["name"]) return message.channel.send({
      content: "**Help**: Command `"+args[0]+"` doesn't have any stored information."
    });

    if (Array.isArray(commandsinfo[args[0]][0]["alias"])) {
      let Aliasy = commandsinfo[args[0]][0]["alias"].slice().join(', ');
      const CommandsInfoArray = new MessageEmbed()
        .setColor('#F9A3BB')
        .setTitle(commandsinfo[args[0]][0]["name"])
        .setDescription('Description: **'+commandsinfo[args[0]][0]["popis"]+"**\nSyntax: `"+config.client.prefix+commandsinfo[args[0]][0]["syntax"]+'`\nAlias: '+Aliasy)
      message.channel.send({embeds: [CommandsInfoArray]});
    } else {
      const CommandsInfoNonArray = new MessageEmbed()
        .setColor('#F9A3BB')
        .setTitle(commandsinfo[args[0]][0]["name"])
       .setDescription('Description: **'+commandsinfo[args[0]][0]["popis"]+"**\nSyntax: `"+config.prefix+commandsinfo[args[0]][0]["syntax"]+"`")
      message.channel.send({embeds: [CommandsInfoNonArray]});
    }
  }*/
};
module.exports.help = {
  name: 'help',
  description: 'Zobrazí embed s pomocou.',
  usage: '=help (command)',
};