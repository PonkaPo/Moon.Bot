const { MessageEmbed } = require("discord.js");
const sfunctions = require("../functions/server.js");
let long_artist_string = "";
let i;
let j = 1;
module.exports.run = async (client,message, args, DBConnection) => {

    const MLEmbed = new MessageEmbed()
        .setColor('#F9A3BB')
        .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
        .setThumbnail(message.client.user.avatarURL())
        .setTimestamp()
        .setFooter("Pinkamena.Bot | Music", message.client.user.avatarURL({ dynamic: true }));  
  
  if(args.length == 0) {

    let artists_list = await sfunctions.artists_from_db(DBConnection);

    MLEmbed.setTitle("Artists:");

    for(i = 0; i < artists_list.length; i++) {

      long_artist_string = long_artist_string+"**"+j+"**. "+artists_list[i]["Tables_in_music"]+"\n"
      j++;

    }

    MLEmbed.setDescription(long_artist_string);

  } else {

    if(args.length > 1) return message.channel.send({
      content: "**MusicList**: Artist can't contain spaces."
    });

    let check_for_artist = sfunctions.check_if_artist_exists(DBConnection, message, args);

    if(check_for_artist == 0) {

      MLEmbed.setTitle("Songs:");
      MLEmbed.setDescription("This artist isn't exists.");

    } else {

      let get_music_result = await sfunctions.get_music(DBConnection, args);

      MLEmbed.setTitle(args[0]+"'s songs:");
      console.log(get_music_result);
      if(get_music_result == 0) {
        MLEmbed.setDescription("This Artist doesn't have any songs.");
        return message.channel.send({
          embeds: [MLEmbed]
        });
      }

      for(i = 0; i < get_music_result.length; i++) {

        long_artist_string = long_artist_string+"**"+j+"**. `"+get_music_result[i]['name']+"` - "+get_music_result[i]["song"]+"\n"
        j++;

      }

      MLEmbed.setDescription(long_artist_string);

    }

  }
    message.channel.send({
      embeds: [MLEmbed]
    });  
    j = 1;
    long_artist_string = "";

}
module.exports.help = {
  name: 'musiclist',
  description: 'Music list',
  usage: '=musiclist (Artist)'
};