const Discord = require("discord.js");

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
        .setDescription('Dostupné príkazy pre hudbu: ')
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
      .setDescription('Dostupné príkazy: ')
      .setThumbnail(message.client.user.avatarURL())
      .addFields(
        { name: '`cotoje`', value: 'Hádanie hry Čo to je', inline: true},
        { name: '`delete`', value: 'Vymaže určitý počet správ'},
        { name: '`nick`', value: 'Môžeš si zmeniť nick, pokiaľ máš právo'},
        { name: '`avatar`', value: 'Pošle v Embede tvoj avatar'},
        { name: '`rr`', value: 'Prekvapenie', inline: true},
        { name: '`say`', value: 'Bot povie, čo chceš', inline: true},
        { name: '`sai`', value: 'Bot povie, čo chceš (Len niektorým uživateľom)', inline: true},
        { name: '`boop`', value: 'Zaútočiš na niekoho'},
        { name: '`hug`', value: 'Obíjmeš člena servera '},
        { name: '`pin`', value: 'Pinne poslednú správu, ktorú niekto poslal', inline: true},
        { name: '`save`', value: 'Uloží obsah a link správy do súboru bota', inline: true}
      )
      .setTimestamp()
      .setFooter("Pinkamena.Bot", Discord.ClientUser.displayAvatarURL);
    message.channel.send(helpembed);
    }
	},

}