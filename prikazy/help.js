const Discord = require("discord.js");
const config = require("../config/config.json");
var fs = require("fs");
module.exports.run = async (client,message,args) => {
  if (!args.length) return message.channel.send('Tento príkaz bot neobsahuje, pre zoznam príkazov napíš `'+config.prefix+'prikazy`.');
  var commandsinfo = JSON.parse(fs.readFileSync('./config/commands-info.json', 'utf8'));
  console.log(commandsinfo[args[0]][0]["alias"]);
  if (Array.isArray(commandsinfo[args[0]][0]["alias"])) {
    let Aliasy = commandsinfo[args[0]][0]["alias"].slice().join(', ');
    const CommandsInfoArray = new Discord.MessageEmbed()
      .setColor('#F9A3BB')
      .setTitle(commandsinfo[args[0]][0]["name"])
      .setDescription('Popis: **'+commandsinfo[args[0]][0]["popis"]+"**\nSyntax: `"+config.prefix+commandsinfo[args[0]][0]["syntax"]+'`\nAlias: '+Aliasy)
    message.channel.send(CommandsInfoArray);
  } else {
    const CommandsInfoNonArray = new Discord.MessageEmbed()
		 .setColor('#F9A3BB')
		 .setTitle(commandsinfo[args[0]][0]["name"])
		 .setDescription('Popis: **'+commandsinfo[args[0]][0]["popis"]+"**\nSyntax: `"+config.prefix+commandsinfo[args[0]][0]["syntax"]+"`")
		message.channel.send(CommandsInfoNonArray);
  }
};
module.exports.help = {
  name: 'help',
  description: 'Zobrazí embed s pomocou.',
  usage: '=help (command)',
};