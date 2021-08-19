const Discord = require("discord.js");
let MusicListArtist, MusicListSongs;
module.exports.run = async (client,message, args) => {
  switch (args[0]) {
    case 'sia':
      MusicListArtist = "Sia";
      MusicListSongs = "1. `rainbow` - Rainbow\n2. `dtd` - Dusk Till Down (Solo)\n3. `the_greatest` - The Greatest (Sad Version)\n4. `elastic_heart` - Elastic Heart\n5. `original` - Original"
      break;
    case 'porter':
      MusicListArtist = "Porter Robinson";
      MusicListSongs = "1. `shelter_ab` - Shelter (Applebloom Cover)\n2. `shelter_pmv` - Shelter (PMV)\n3. `shelter_demo` Shelter - A-1 Demo)\n4. `shelter` - Shelter\n5. `shelter_film` - Shelter (Short Film)\n6. `musician` - Musician"
      break;
    case 'uncategorized':
      MusicListArtist = "Uncategorized";
      MusicListSongs = "1. `remembrance` - Remember Me\n2. `wwu_remix` - Winter Wrap Up (Remix)\n3. `toal_lyrical` - Take Off and Land (Lyrical)\n4. `ready_to_die_pp` - Ready to Die (Pinkie Pie Edition)\n5. `anthropology` - Anthropology\n6. `demons_pmw` - Demons (PMV)\n7. `with_you_friends` - With You, Friends"
      break;
    case 'aw':
      MusicListArtist = "Alan Walker";
      MusicListSongs = "1. `tired` - Tired\n2. `diamond_heart` - Diamond Heart\n3. `force` - Force\n4. `spectre` - Spectre\n5. `faded` - Faded\n6. `heading_home_demo` - Heading Home Demo 2016\n7. `stranger_things_remix` - Stranger Things (Remix)\n8. `hope_emmy` - Hope (feat. Emmy)\n9. `fake_a_smile` - Fame a Smile"
      break;
    case 'tlt':
      MusicListArtist = "The Living Tombstone";
      MusicListSongs = "1. `smile_remix` - Smile (Remix)\n2. `gypsy_bard_remix` - The Gypsy Bard (Remix)\n3. `gypsy_bard_remix_nightcore` - The Gypsy Bard (Remix - Nightcore)"
      break;
    case 'tridashie':
      MusicListArtist = "Tridashie";
      MusicListSongs = "1. `ready_to_smile` - Ready to Smile\n2. `nightmare_virus` - Nightmare Virus\n3. `barbie_twilight` - Barbie Twilight\n4. `pony_girl` - Pony Girl\n5. `the_pony_hamsterdance` - The Pony Hamsterdance\n6. `pinkie_dansen` - Pinkie Dansen\n7. `wavin_pony` - Wavin' Pony\n8. `twilightless` - Twilightless"
      break;
    case 'rabiesbun':
      MusicListArtist = "Rabies Bun";
      MusicListSongs = "1. `mtc` - MTC\n2. `caramelldansen` - Caramelldansen\n3. `with_you_friends_remix` - With You, Friends (Remix)\n4. `take_off_and_gala` - Take Off and Gala\n5. `everyday` - Everyday Im Shufflin (Rainbow Dash Shorts)\n6. `nyancat` - Nyan cat (Twilight Sparkle Edition)\n7. `mario` - Overworld Theme (Pinkie Pie Edition)\n8. `flutterwonder` - Flutterwonder'\n9. `axel_f` - Axel F (Remix)\n10. `nrg` - NRG (Remix)"
      break;
      case 'daks':
        MusicListArtist = "daks";
        MusicListSongs = "1. `mtc` - MTC\n2. `caramelldansen` - Caramelldansen\n3. `with_you_friends_remix` - With You, Friends (Remix)\n4. `take_off_and_gala` - Take Off and Gala\n5. `everyday` - Everyday Im Shufflin (Rainbow Dash Shorts)\n6. `nyancat` - Nyan cat (Twilight Sparkle Edition)\n7. `mario` - Overworld Theme (Pinkie Pie Edition)\n8. `flutterwonder` - Flutterwonder'\n9. `axel_f` - Axel F (Remix)\n10. `nrg` - NRG (Remix)"
        break;
    default:
      MusicListArtist = "Artists in the list:";
      MusicListSongs = "`daks` - daks\n`rabiesbun` - Rabies Bun\n`tridashie` - Tridashie\n`tlt` - The Living Tombstone\n`aw` - Alan Walker\n`sia` - Sia\n`porter` - Porter Robinson\n`boltz_quick` - Boltz Quick\n`uncategorized` - Uncategorized"
      break;
    }  
    const MLembed = new Discord.MessageEmbed()
      .setColor('#F9A3BB')
      .setTitle('Music List | '+MusicListArtist)
      .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
      .setDescription('List of songs: ')
      .setThumbnail(message.client.user.avatarURL())
      .addFields( { name: 'Music List:', value: MusicListSongs, inline: false } )
      .setTimestamp()
      .setFooter("Pinkamena.Bot | Music", message.client.user.avatarURL({ dynamic: true }));
    message.channel.send(MLembed);
}
module.exports.help = {
  name: 'musiclist',
  description: 'Ukáže zoznam hudobnej databázy.',
  usage: '=musiclist (Umelec)',
};