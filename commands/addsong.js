const { MessageEmbed } = require("discord.js");
const AllowedIds = ["409731934030135306"];
const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require("../functions/music.js");
const basic = require("../functions/basic.js");
let ADDSong = new MessageEmbed().setTitle("Add Song").setColor('#F9A3BB').setFooter("Use `cancel` to exit.");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("addsong")
		.setDescription("Add song to the Bot library")
        .addStringOption(option => 
            option.setName("artist")
                .setDescription("Short artist name")),
	async execute(interaction, DB) {
        if(!AllowedIds.includes(interaction.user.id)) return interaction.reply({
            content: "**AddSong**: You can't use this command."
        });

        const msgfilter = m => m.user.id === interaction.user.id && interaction.user.bot !== true;
        if(interaction.options.getString("artist")) {
            let artistResult = await music.check_if_artist_exists(DB, interaction.options.getString("artist"));

            if(artistResult[0]["COUNT(*)"] == 0) {
                let is_not_exists = await interaction.reply({
                    content: "**Musiclink**: `"+interaction.options.getString("artist")+"` isn't exists in the database. (Type `yes` to create artist in database)"
                });

                let collect_msg = await basic.collect_message(interaction, msgfilter);
                if((collect_msg.content.indexOf("yes") && collect_msg.content.indexOf(" ")) !== 0) {
                    collect_msg.react("<:pinkie_no:852973704556183552>");
                } else {
                    music.create_music_table(DB, interaction.options.getString("artist"));
                    return is_not_exists.edit({
                        content: "**AddSong**: Creating Artist table for: `"+interaction.options.getString("artist")+"` was successfull."
                    });
                }
            } else {
                interaction.channel.send({
                    content: "**Musiclink** artist with name: `"+interaction.options.getString("artist")+"` exists in the database."
                })
            }
        } else {
            ADDSong.setDescription("=> Short Artist Name:-\nShort Song Name: -\nFull Song Name: -\nArtist name: -\nReleased Date: -\nLink: -");
		    let addsong_msg = await interaction.channel.send({
			    embeds: [ADDSong]
		    });
		    let ShortArtistName = await basic.collect_message(interaction, msgfilter);
		    ShortArtistName.delete();
		    if(ShortArtistName.content == "cancel") return addsong_msg.edit({
                content: "**AddSong** Canceled!",
                embeds: []
            });
		    if(ShortArtistName.content.indexOf(" ") !== -1) return addsong_msg.channel.send({
			    content: "**AddSong** Short Artist Name cannot contain `space`."
		    });

		    ADDSong.setDescription("Short Artist Name: `"+ShortArtistName.content+"`\n=> Short Song Name: -\nFull Song Name: -\nArtist name: -\nReleased Date: -\nLink: -");
		    addsong_msg.edit({
			    embeds: [ADDSong]
		    });
		    let ShortSongName = await basic.collect_message(interaction, msgfilter);
		    ShortSongName.delete();
		    if(ShortSongName.content == "cancel") return addsong_msg.edit({
                content: "**AddSong** Canceled!",
                embeds: []
            });
		    if(ShortSongName.content.indexOf(" ") !== -1) return addsong_msg.edit({
			    content: "**AddSong** Short Song Name cannot contain `space`.",
                embeds: []
		    });

		    ADDSong.setDescription("Short Artist Name: `"+ShortArtistName.content+"`\nShort Song Name: `"+ShortSongName.content+"`\n=> Full Song Name: -\nArtist name: -\nReleased Date: -\nLink: -");
		    addsong_msg.edit({
			    embeds: [ADDSong]
		    });
		    let SongName = await basic.collect_message(interaction, msgfilter);
		    SongName.delete();
		    if(SongName.content == "cancel") return addsong_msg.edit({
                content: "**AddSong** Canceled!",
                embeds: []
            });

		    ADDSong.setDescription("Short Artist Name: `"+ShortArtistName.content+"`\nShort Song Name: `"+ShortSongName.content+"`\nFull Song Name: `"+SongName.content+"`\n=> Artist name: -\nReleased Date: -\nLink: -");
		    addsong_msg.edit({
			    embeds: [ADDSong]
		    });
		    let ArtistName = await basic.collect_message(interaction, msgfilter);
		    ArtistName.delete();
		    if(ArtistName.content == "cancel") return addsong_msg.edit({
                content: "**AddSong** Canceled!",
                embeds: []
            });

		    ADDSong.setDescription("Short Artist Name: `"+ShortArtistName.content+"`\nShort Song Name: `"+ShortSongName.content+"`\nFull Song Name: `"+SongName.content+"`\nArtist name: `"+ArtistName.content+"`\n=> Released Date: -\nLink: -");
		    addsong_msg.edit({
			    embeds: [ADDSong]
		    });
		    let ReleasedDate = await basic.collect_message(interaction, msgfilter);
		    ReleasedDate.delete();
		    if(ReleasedDate.content == "cancel") return addsong_msg.edit({
                content: "**AddSong** Canceled!",
                embeds: []
            });

		    ADDSong.setDescription("Short Artist Name: `"+ShortArtistName.content+"`\nShort Song Name: `"+ShortSongName.content+"`\nFull Song Name: `"+SongName.content+"`\nArtist name: `"+ArtistName.content+"`\nReleased Date: `"+ReleasedDate.content+"`\n=> Link: -");
		    addsong_msg.edit({
			    embeds: [ADDSong]
		    });
		    let SongLink = await basic.collect_message(interaction, msgfilter);
		    SongLink.delete();
		    if(SongLink.content == "cancel") return addsong_msg.edit({
                content: "**AddSong** Canceled!",
                embeds: []
            });

		    ADDSong.setDescription("Short Artist Name: `"+ShortArtistName.content+"`\nShort Name: `"+ShortSongName.content+"`\nFull Song Name: `"+SongName.content+"`\nArtist: `"+ArtistName.content+"`\nReleased Date: `"+ReleasedDate.content+"`\nLink: `"+SongLink.content+"`");
		
		    await music.write_song_data(DB, ShortArtistName, ShortSongName, SongName, ArtistName, ReleasedDate, SongLink);
		    addsong_msg.edit({
                content: "**AddSong** Successfully added song to a database.",
			    embeds: []
		    });
        }
	}
};