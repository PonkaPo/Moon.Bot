const fs = require("fs");
const sfunctions = require("../functions/server.js");

module.exports.run = async (client,message, args, DBConnection) => {
    if (!args[0]) return message.reply("**MusicLink**: You didn't write any artist.");
    if (!args[1]) return message.reply("**MusicLink**: You didn't write any song.");
    const artistResult = await sfunctions.check_if_artist_exists(DBConnection, message, args);
    if(artistResult == 0) return message.channel.send("**Musiclink**: Provided artist isn't exists in the database.");
    var musicResult = await sfunctions.check_if_song_exists(DBConnection, message, args);
    if(musicResult.length === 0) return message.channel.send("**Musiclink**: Provided song name isn't exists in the database.");
    message.channel.send("Artist: "+musicResult[0]["artist"]+"\nSong: "+musicResult[0]["song"]+"\nReleased: "+musicResult[0]["released"]+"\nLink: "+musicResult[0]["link"]);
}

module.exports.help = {
  name: 'music',
  description: 'Pošle link podľa parametrov.',
  usage: '=music <Artista> <Skladba>',
};