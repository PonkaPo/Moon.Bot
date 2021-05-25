const Discord = require("discord.js");
const fs = require('fs');
const AllowedIdsSave = ['422882850166276096', '409731934030135306', '478258433611661322', '699214855823163433', '532512473492750356', '723265524213088412'];

module.exports = {
  name: 'pin',
  description: 'Pinne poslednú správu.',
  usage: '=pin',
  async execute(message, args) {
    if (message.channel.type == "dm") return message.channel.send("Tento príkaz nefunguje v Priamej Správe");
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      if (!AllowedIdsSave.includes(message.member.id)) return message.channel.send(message.author.username + " - Nemáš oprávnenie toto použiť").then(msg => {
        msg.delete({ timeout: 3000 })
      });
      return message.channel.send("Nemáš povolenie na tento príkaz, " + message.author.username);
    } else {
    if (!args.length) {
      message.client.channels.resolve(message.channel.id).messages.fetch({ limit: 2 }).then(messages => {
        message.delete();
        let lastMessage = messages.last();
        if (!lastMessage.content.length && !lastMessage.attachments.size > 0) return message.channel.send("Prázdna správa");
        lastMessage.pin().then(msg => {
          msg.delete();
        });
      })
    } else {
      let PinArgument = args.join(" ");
      message.client.channels.resolve(message.channel.id).messages.fetch({ limit: 1 }).then(messages => {
        let lastMessageElse = messages.first();
        lastMessageElse.delete();
        message.channel.send("**" + message.author.username + "**: " + PinArgument).then(msg => {
          msg.pin().then(msg => {
            msg.delete();
          });
        })
      })
    }
  }
	},
}