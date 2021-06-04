const Discord = require("discord.js");
let medzera = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";

module.exports = {
  name: 'prikazy',
  description: 'Ukáže zoznam príkazov.',
  usage: '=prikazy',
  async execute(message, args) {
    if (typeof args[0] !== 'undefined' && args[0] == "music") {
      const helpembedmusic = new Discord.MessageEmbed()
        .setColor('#7162ba')
        .setTitle('Music')
        .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
        .setDescription('Dostupné príkazy pre hudbu\n`Knižnica ďakuje aj iným členom: Fildoff, GuiHuiZui, TomSK1`')
        .setThumbnail(message.client.user.avatarURL())
        .addFields(
          { name: '`musiclink`', value: 'Pošle priamy link na video s hudbou s lokálnej databázy', inline: true },
          { name: '`musiclist`', value: 'Zoznam Artistov', inline: true }
        )
        .setTimestamp()
        .setFooter("Pinkamena.Bot | Music", message.client.user.avatarURL({ dynamic: true }));
      message.channel.send(helpembedmusic);
    } else {
    const helpembed = new Discord.MessageEmbed()
      .setColor('#7162ba')
      .setTitle('Príkazy')
      .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
      .setDescription('Dostupné príkazy:\ndelete'+medzera+'nick\navatar'+medzera+'say\nboop'+medzera+'hug\nrr'+medzera+'cotoje')
      .setThumbnail(message.client.user.avatarURL())
      .setTimestamp()
      .setFooter("Pinkamena.Bot", Discord.ClientUser.displayAvatarURL);
    message.channel.send(helpembed);
    }
	},

}