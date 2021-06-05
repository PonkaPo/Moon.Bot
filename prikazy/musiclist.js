const Discord = require("discord.js");

module.exports = {
  name: 'musiclist',
  description: 'Ukáže zoznam hudobnej databázy.',
  usage: '=musiclist (Umelec)',
  async execute(message, args) {
    switch (args[0]) {
      case 'sia':
        const siaembed = new Discord.MessageEmbed()
          .setColor('#F9A3BB')
          .setTitle('Music List | Sia')
          .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
          .setDescription('Zoznam Skladieb: ')
          .setThumbnail(message.client.user.avatarURL())
          .addFields(
            { name: '`rainbow`', value: 'Rainbow', inline: true },
            { name: '`dtd`', value: 'Dusk Till Down (Solo)', inline: true },
            { name: '`the_greatest`', value: 'The Greatest (Sad Version)', inline: true },
            { name: '`elastic_heart`', value: 'Elastic Heart', inline: true },
            { name: '`original`', value: 'Original', inline: true }
          )
          .setTimestamp()
          .setFooter("Pinkamena.Bot | Music", message.client.user.avatarURL({ dynamic: true }));
        message.channel.send(siaembed);
        break;
      case 'porter':
        const porterembed = new Discord.MessageEmbed()
          .setColor('#F9A3BB')
          .setTitle('Music List | Porter Robinson')
          .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
          .setDescription('Zoznam Skladieb: ')
          .setThumbnail(message.client.user.avatarURL())
          .addFields(
            { name: '`shelter_ab`', value: 'Shelter (Applebloom Cover)', inline: true },
            { name: '`shelter_pmv`', value: 'Shelter (PMV)', inline: true },
            { name: '`shelter_demo`', value: 'Shelter (A-1 Demo)', inline: true },
            { name: '`shelter`', value: 'Shelter', inline: true },
            { name: '`shelter_film`', value: 'Shelter (Short Film)', inline: true },
            { name: '`musician`', value: 'Musician', inline: true }
          )
          .setTimestamp()
          .setFooter("Sweetie.Bot | Music", message.client.user.avatarURL({ dynamic: true }));
        message.channel.send(porterembed);
        break;
      case 'uncategorized':
        const uncategorizedembed = new Discord.MessageEmbed()
          .setColor('#F9A3BB')
          .setTitle('Music List | Uncategorized')
          .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
          .setDescription('Zoznam Skladieb: ')
          .setThumbnail(message.client.user.avatarURL())
          .addFields(
            { name: '`remembrance`', value: 'Remember Me', inline: true },
            { name: '`wwu_remix`', value: 'Winter Wrap Up (Remix)', inline: true },
            { name: '`toal_lyrical`', value: 'Take Off and Land (Lyrical)', inline: true },
            { name: '`ready_to_die_pp`', value: 'Ready to Die (Pinkie Pie Edition)', inline: true },
            { name: '`anthropology`', value: 'Anthropology', inline: true },
            { name: 'demons_pmw`', value: 'Demons (PMV)', inline: true },
            { name: 'with_you_friends`', value: 'With You, Friends', inline: true }
          )
          .setTimestamp()
          .setFooter("Pinkamena.Bot | Music", message.client.user.avatarURL({ dynamic: true }));
        message.channel.send(uncategorizedembed);
        break;
      case 'alanwalker':
        const alanwalkerembed = new Discord.MessageEmbed()
          .setColor('#F9A3BB')
          .setTitle('Music List | Alan Walker')
          .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
          .setDescription('Zoznam Skladieb: ')
          .setThumbnail(message.client.user.avatarURL())
          .addFields(
            { name: '`tired`', value: 'Tired', inline: true },
            { name: '`diamond_heart`', value: 'Diamond Heart', inline: true },
            { name: '`force`', value: 'Force', inline: true },
            { name: '`spectre`', value: 'Spectre', inline: true },
            { name: '`faded`', value: 'Faded', inline: true },
            { name: '`heading_home_demo`', value: 'Heading Home Demo 2016', inline: true },
            { name: '`stranger_things_remix`', value: 'Stranger Things (Remix)', inline: true },
            { name: '`hope_emmy`', value: 'Hope (feat. Emmy)', inline: true },
            { name: '`fake_a_smile`', value: 'Fame a Smile', inline: true }
          )
          .setTimestamp()
          .setFooter("Pinkamena.Bot | Music", message.client.user.avatarURL({ dynamic: true }));
        message.channel.send(alanwalkerembed);
        break;
      case 'thelivingtombstone':
        const tltembed = new Discord.MessageEmbed()
          .setColor('#F9A3BB')
          .setTitle('Music List | The Living Tombstone')
          .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
          .setDescription('Zoznam Skladieb: ')
          .setThumbnail(message.client.user.avatarURL())
          .addFields(
            { name: '`smile_remix`', value: 'Smile (Remix)', inline: true },
            { name: '`gypsy_bard_remix`', value: 'The Gypsy Bard (Remix)', inline: true },
            { name: '`gypsy_bard_remix_nightcore`', value: 'The Gypsy Bard (Remix - Nightcore)', inline: true }
          )
          .setTimestamp()
          .setFooter("Pinkamena.Bot | Music", message.client.user.avatarURL({ dynamic: true }));
        message.channel.send(tltembed);
        break;
      case 'tridashie':
        const tridashieembed = new Discord.MessageEmbed()
          .setColor('#F9A3BB')
          .setTitle('Music List | Tridashie')
          .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
          .setDescription('Zoznam Skladieb: ')
          .setThumbnail(message.client.user.avatarURL())
          .addFields(
            { name: '`ready_to_smile`', value: 'Ready to Smile', inline: true },
            { name: '`nightmare_virus`', value: 'Nightmare Virus', inline: true },
            { name: '`barbie_twilight`', value: 'Barbie Twilight', inline: true },
            { name: '`pony_girl`', value: 'Pony Girl', inline: true },
            { name: '`the_pony_hamsterdance`', value: 'The Pony Hamsterdance', inline: true },
            { name: '`pinkie_dansen`', value: 'Pinkie Dansen', inline: true },
            { name: '`wavin_pony`', value: 'Wavin Pony', inline: true },
            { name: '`twilightless`', value: 'Twilightless', inline: true }
          )
          .setTimestamp()
          .setFooter("Pinkamena.Bot | Music", message.client.user.avatarURL({ dynamic: true }));
        message.channel.send(tridashieembed);
        break;
      case 'rabiesbun':
        const rabiesbunembed = new Discord.MessageEmbed()
          .setColor('#F9A3BB')
          .setTitle('Music List | Rabies Bun')
          .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
          .setDescription('Zoznam skladieb: ')
          .setThumbnail(message.client.user.avatarURL())
          .addFields(
            { name: '`mtc`', value: 'MTC', inline: true },
            { name: '`caramelldansen`', value: 'Caramelldansen', inline: true },
            { name: '`with_you_friends_remix`', value: 'With You, Friends (Remix)', inline: true },
            { name: '`take_off_and_gala`', value: 'Take Off and Gala', inline: true },
            { name: '`everyday`', value: 'Everyday Im Shufflin (Rainbow Dash Shorts)', inline: true },
            { name: '`nyancat`', value: 'Nyan cat (Twilight Sparkle Edition)', inline: true },
            { name: '`mario`', value: 'Overworld Theme (Pinkie Pie Edition)', inline: true },
            { name: '`flutterwonder`', value: 'Flutterwonder', inline: true },
            { name: '`axel_f`', value: 'Axel F (Remix)', inline: true },
            { name: '`nrg`', value: 'NRG (Remix)', inline: true }
          )
          .setTimestamp()
          .setFooter("Pinkamena.Bot | Music", message.client.user.avatarURL({ dynamic: true }));
        message.channel.send(rabiesbunembed);
        break;
      default:
      const musiclistembed = new Discord.MessageEmbed()
        .setColor('#F9A3BB')
        .setTitle('Music List')
        .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
        .setDescription('Dostupný Umelci: ')
        .setThumbnail(message.client.user.avatarURL())
        .addFields(
          { name: '`rabiesbun`', value: 'Rabies Bun', inline: true },
          { name: '`tridashie`', value: 'Tridashie', inline: true },
          { name: '`thelivingtombstone`', value: 'The Living Tombstone', inline: true },
          { name: '`alanwalker`', value: 'Alan Walker', inline: true },
          { name: '`sia`', value: 'Sia', inline: true },
          { name: '`porter`', value: 'Porter Robinson', inline: true },
          { name: '`uncategorized`', value: 'Uncategorized Music', inline: true }
        )
        .setTimestamp()
        .setFooter("Pinkamena.Bot | Music", message.client.user.avatarURL({ dynamic: true }));
      message.channel.send(musiclistembed);
      break;
    }
	},

}