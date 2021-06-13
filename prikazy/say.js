const Discord = require("discord.js");
let AllowedIds = ['422882850166276096', '409731934030135306', '478258433611661322', '699214855823163433', '532512473492750356'];
let SpravaArgs;

module.exports = {
  name: 'say',
  description: 'Poviem čo len budeš chcieť.',
  usage: '=say <správa>',
  async execute(message, args) {
    if (!args.length) return message.channel.send('<@' + message.author.id + '>, Nenapísal si žiadnu správu.');
    if (args[0] == "-i") {
      if(!AllowedIds.includes(message.author.id)) return message.channel.send("Nemáš povolenie na tento príkaz, <@" + message.author.id + ">");
      args.shift();
      SpravaArgs = args.slice().join(' ');
    } else {
      SpravaArgs = '**'+message.author.username+'**: '+args.slice().join(' ');
    }
    message.delete({ timeout: 0 });
    message.channel.send(SpravaArgs);
	},

}