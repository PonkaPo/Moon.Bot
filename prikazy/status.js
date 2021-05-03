const Discord = require("discord.js");
let OwnerID = "409731934030135306";

module.exports = {
  name: 'status',
  description: 'Zmení status bota.',
  usage: '=status <správa>',
  async execute(message, args) {
    message.delete();
    if (message.author.id != OwnerID) {
      message.channel.send("Kam si sa to dostal! ČO TU MORE ROBÍŠ, ty kok " + message.author.username + " nešahaj na tento príkaz!");
    } else {
      if (args.length !== 0) {
        statusargs = args.join(" ");
        message.client.user.setActivity(statusargs);
        const statusembedset = new Discord.MessageEmbed()
          .setColor('#7162ba')
          .setTitle('Zmena Statusu')
          .setDescription("Mám teraz po novom tento neskutočne super status:\n" + statusargs)
        message.channel.send(statusembedset).then(msg => {
          msg.delete({ timeout: 7000 })
        })
      } else {
        const statusembednoarg = new Discord.MessageEmbed()
          .setColor('#7162ba')
          .setTitle('Zmena Statusu')
          .setDescription("Ale však si tu nič nedal more.")
        message.channel.send(statusembednoarg).then(msg => {
          msg.delete({ timeout: 7000 })
        })
      }
  }
},
}