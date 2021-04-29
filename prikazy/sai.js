const Discord = require("discord.js");
let AllowedIds = ['422882850166276096', '409731934030135306', '478258433611661322', '699214855823163433', '532512473492750356'];

module.exports = {
  name: 'sai',
  description: 'Poviem čo len budeš chcieť - Limit na len niektorých používateľov.',
  usage: '=sai <správa>',
  async execute(message, args) {
    if(AllowedIds.includes(message.author.id)) {
      if (!args.length) {
        message.delete()
        const sainoarg = new Discord.MessageEmbed()
          .setColor('#7162ba')
          .setTitle('Sai')
          .setDescription('<@' + message.author.id + '>, Nenapísal si žiadnu správu.')
        message.channel.send(sainoarg).then(msg => {
          msg.delete({ timeout: 5000 })
          })
      } else {
        message.delete()
        const saiMessage = args.join(" ");
        console.log(args);
        console.log(saiMessage);
        message.channel.send(saiMessage);
      }
    } else {
      message.channel.send("Nemáš povolenie na tento príkaz, <@" + message.author.id + ">");
    }
	},

}