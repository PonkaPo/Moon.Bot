const Discord = require("discord.js");
const fs = require('fs');
const AllowedIdsSave = ['422882850166276096', '409731934030135306', '478258433611661322', '699214855823163433', '532512473492750356', '723265524213088412'];

module.exports = {
  name: 'save',
  description: 'Uložiť poslednú správu.',
  usage: '=save',
  async execute(message, args) {
    if (message.channel.type == "dm") return message.channel.send("Tento príkaz nefunguje v Priamej Správe");
    if (!AllowedIdsSave.includes(message.member.id)) return message.channel.send(message.author.username + " - Nemáš oprávnenie toto použiť").then(msg => {
      msg.delete({ timeout: 3000 })
    });
    let channel = message.channel.id;
    message.client.channels.resolve(message.channel.id).messages.fetch({ limit: 2 }).then(messages => {
      let lastMessage = messages.last()
      lastMessage.pin();
      if (!lastMessage.content.length) return message.channel.send("Prázdna správa");
      //if (!args.length) {
        let saveembedsuccess = new Discord.MessageEmbed()
        .setColor('#7162ba')
        .setTitle('Save')
        .addField('**Autor** ', lastMessage.author.username, true)
        .addField('**Obsah** ', lastMessage.content, true)
        .addField('**Link** ', lastMessage.url, true)
        message.delete()
        message.channel.send(saveembedsuccess).then(msg => {
          msg.delete({ timeout: 10000 })
        });
        fs.appendFile('./messages.txt', "\n= = = = = = = = = =\nAuthor: " + lastMessage.author.username + "\nObsah Správy: " + lastMessage.content + "\nLink: " + lastMessage.url + "\nUložil: " + message.author.username + "\n= = = = = = = = = =\n-----", function (err) {
          if (err) throw err;
        });
      /*} else {
        const channel = message.guild.channels.cache.get(message.channel.id)
        try { 
          const SaveMessage = channel.messages.fetch(args[0])
          message.channel.send(SaveMessage.content);
        } catch {
          return message.channel.send("Táto správa v tomto kanáli neexistue");
        }
      }*/
    })
	},
}