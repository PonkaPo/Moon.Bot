const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const music = require("../functions/music.js");
let long_artist_string = "";
let i;
let j = 1;
const MLEmbed = new MessageEmbed()

module.exports = {
    name: "library",
    data: new SlashCommandBuilder()
        .setName("library")
        .setDescription("Get music from embedded library")
        .addSubcommand(subcommand => subcommand.setName("music").setDescription("Get music from embedded library").addStringOption(option => option.setName("artist").setDescription("Artist name to get from library").setRequired(true)).addStringOption(option => option.setName("song").setDescription("Song name to get from library").setRequired(true)))
        .addSubcommand(subcommand => subcommand.setName("list").setDescription("List songs from Artist from Library").addStringOption(option => option.setName("artist").setDescription("Artist name to get from library").setRequired(false))),
    async execute(interaction, DB) {
        if(interaction.options.getSubcommand("music") == "music") {
            let artistResult = await music.check_if_artist_exists(DB, interaction);
            if(artistResult[0]["COUNT(*)"] == 0) return interaction.reply("**Music** Provided Artist is not available in the library.");
    
            let musicResult = await music.check_if_song_exists(DB, interaction);
            if(musicResult[0]["COUNT(*)"] == 0) return interaction.reply("**Music**: Provided song name isn't exists in the database.");
    
            return interaction.reply({
                content: "Artist: "+musicResult[0]["artist"]+"\nSong: "+musicResult[0]["song"]+"\nReleased: "+musicResult[0]["released"]+"\nLink: "+musicResult[0]["link"]
            });
        }
        if(interaction.options.getSubcommand("list") !== null) {
            if(interaction.options.getString("artist") == null) {
                let artists_list = await music.artists_from_db(DB);
                MLEmbed.setColor('#F9A3BB')
                    .setTitle("Artists:")
                    .setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
                    .setThumbnail(interaction.client.user.avatarURL())
                    .setTimestamp()
                    .setFooter("Pinkamena.Bot | Music", interaction.client.user.avatarURL({ dynamic: true }));
            
                for(i = 0; i < artists_list.length; i++) {
                    long_artist_string = long_artist_string+"**"+j+"**. "+artists_list[i]["Tables_in_music"]+"\n"
                    j++;
                }
                MLEmbed.setDescription(long_artist_string);
            } else {
                let check_for_artist = await music.check_if_artist_exists(DB, interaction);
                if(check_for_artist[0]["COUNT(*)"] == null) {
                    MLEmbed.setTitle("Songs:");
                    MLEmbed.setDescription("This artist isn't exists.");
                } else {
                    let get_music_result = await music.get_music(DB, interaction.options.getString("artist"));
                    MLEmbed.setTitle(interaction.options.getString("artist")+"'s songs:");
                    if(get_music_result == 0) {
                        MLEmbed.setDescription("This Artist doesn't have any songs.");
                        return interaction.reply({
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
            j = 1;
            long_artist_string = "";
            return interaction.reply({
                embeds: [MLEmbed]
            });
        }
    }
}