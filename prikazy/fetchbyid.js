const Discord = require("discord.js");
const fs = require('fs');
const AllowedId = '409731934030135306';

module.exports = {
  name: 'fetchbyid',
  description: 'Fetchne počet správ z kanálu.',
  usage: '=fetchbyid <#ID>',
  async execute(message, args) {
    if (message.channel.type == "dm") return message.channel.send("Tento príkaz nefunguje v Priamej Správe");
    if (message.author.id !== AllowedId) return;
    if (args.length) {
      message.client.channels.resolve(args[0]).messages.fetch({ limit: 2 }).then(messages => {
        let lastMessage = messages.first();
        message.channel.send(lastMessage.guild.name+'\n'+lastMessage.channel.name+'\n'+lastMessage.author.username+': '+lastMessage.content);
      })
    }
	},
}