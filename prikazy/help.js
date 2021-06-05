const Discord = require("discord.js");
const config = require("../config.json");
var fs = require("fs");

module.exports = {
  name: 'help',
  description: 'Zobrazí embed s pomocou.',
  usage: '=help',
  async execute(message, args) {
    var commandsinfo = JSON.parse(fs.readFileSync('./commands-info.json', 'utf8'));
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
	},
}