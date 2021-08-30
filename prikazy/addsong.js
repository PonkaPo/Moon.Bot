const { MessageEmbed } = require("discord.js");
const AllowedIds = ["409731934030135306"];
const sfunctions = require("../functions/server.js");
let ADDSong = new MessageEmbed().setTitle("Add Song").setColor('#F9A3BB').setFooter("Use `cancel` to exit.");

module.exports.run = async (client, message, args, DBConnection) => {

	if(!AllowedIds.includes(message.author.id)) return message.channel.send({
		content: "**AddSong**: You can't use this command."
	});

	const msgfilter = m => m.author.id === message.author.id && m.author.bot !== true;

	if(args.length !== 0) {
		var ArtistShortName1 = args[0];
		if(ArtistShortName1.indexOf(" ") !== -1) return message.channel.send({
			content: "**AddSong** Artist cannot contain `spaces`."
		});

		var artistResult = await sfunctions.check_if_artist_exists(DBConnection, message, ArtistShortName1);
		if(artistResult == 0 || artistResult[0]["COUNT(*)"] == 0) {

			let no_arg_msg = await message.channel.send({
				content: "**Musiclink**: Provided artist isn't exists in the database. (Type `yes` if you want to create artist in database with name: "+ArtistShortName1+")"
			});

			
			let collect_msg = await sfunctions.collect_message(message, msgfilter);

			if((collect_msg.content.indexOf("yes") && collect_msg.content.indexOf(" ")) !== 0) {
				collect_msg.react("<:pinkie_no:852973704556183552>");
			} else {
				sfunctions.create_music_table(DBConnection, message, ArtistShortName1);
				return no_arg_msg.edit({
					content: "**AddSong**: Creating Artist table for: "+ArtistShortName1+" was successfull."
				});
			}		
		}
	} else {

		ADDSong.setDescription("=> Short Artist Name:-\nShort Song Name: -\nFull Song Name: -\nArtist name: -\nReleased Date: -\nLink: -");
		let addsong_msg = await message.channel.send({
			embeds: [ADDSong]
		});
		let ShortArtistName = await sfunctions.collect_message(message, msgfilter);
		ShortArtistName.delete();
		if(ShortArtistName.content == "cancel") return addsong_msg.edit("**RequestSong** Canceled!");
		if(ShortArtistName.content.indexOf(" ") !== -1) return message.channel.send({
			content: "**AddSong** Short Artist Name cannot contain `space`."
		});

		ADDSong.setDescription("Short Artist Name: `"+ShortArtistName.content+"`\n=> Short Song Name: -\nFull Song Name: -\nArtist name: -\nReleased Date: -\nLink: -");
		addsong_msg.edit({
			embeds: [ADDSong]
		});
		var ShortSongName = await sfunctions.collect_message(message, msgfilter);
		ShortSongName.delete();
		if(ShortSongName.content == "cancel") return addsong_msg.edit("**RequestSong** Canceled!");
		if(ShortSongName.content.indexOf(" ") !== -1) return message.channel.send({
			content: "**AddSong** Short Song Name cannot contain `space`."
		});

		ADDSong.setDescription("Short Artist Name: `"+ShortArtistName.content+"`\nShort Song Name: `"+ShortSongName.content+"`\n=> Full Song Name: -\nArtist name: -\nReleased Date: -\nLink: -");
		addsong_msg.edit({
			embeds: [ADDSong]
		});
		var SongName = await await sfunctions.collect_message(message, msgfilter);
		SongName.delete();
		if(SongName.content == "cancel") return addsong_msg.edit("**RequestSong** Canceled!");

		ADDSong.setDescription("Short Artist Name: `"+ShortArtistName.content+"`\nShort Song Name: `"+ShortSongName.content+"`\nFull Song Name: `"+SongName.content+"`\n=> Artist name: -\nReleased Date: -\nLink: -");
		addsong_msg.edit({
			embeds: [ADDSong]
		});
		var ArtistName = await await sfunctions.collect_message(message, msgfilter);
		ArtistName.delete();
		if(ArtistName.content == "cancel") return addsong_msg.edit("**RequestSong** Canceled!");

		ADDSong.setDescription("Short Artist Name: `"+ShortArtistName.content+"`\nShort Song Name: `"+ShortSongName.content+"`\nFull Song Name: `"+SongName.content+"`\nArtist name: `"+ArtistName.content+"`\n=> Released Date: -\nLink: -");
		addsong_msg.edit({
			embeds: [ADDSong]
		});
		var ReleasedDate = await await sfunctions.collect_message(message, msgfilter);
		ReleasedDate.delete();
		if(ReleasedDate.content == "cancel") return addsong_msg.edit("**RequestSong** Canceled!");

		ADDSong.setDescription("Short Artist Name: `"+ShortArtistName.content+"`\nShort Song Name: `"+ShortSongName.content+"`\nFull Song Name: `"+SongName.content+"`\nArtist name: `"+ArtistName.content+"`\nReleased Date: `"+ReleasedDate.content+"`\n=> Link: -");
		addsong_msg.edit({
			embeds: [ADDSong]
		});
		var SongLink = await await sfunctions.collect_message(message, msgfilter);
		SongLink.delete();
		if(SongLink.content == "cancel") return addsong_msg.edit("**RequestSong** Canceled!");

		ADDSong.setDescription("Short Artist Name: `"+ShortArtistName.content+"`\nShort Name: `"+ShortSongName.content+"`\nFull Song Name: `"+SongName.content+"`\nArtist: `"+ArtistName.content+"`\nReleased Date: `"+ReleasedDate.content+"`\nLink: `"+SongLink.content+"`");
		
		await sfunctions.write_song_data(DBConnection, ShortArtistName, ShortSongName, SongName, ArtistName, ReleasedDate, SongLink);
		addsong_msg.edit({
			embeds: [ADDSong]
		});
	}
}

module.exports.help = {
	name: 'addsong',
	aliases: ['as'],
	description: 'Add song to the Music Library.',
	usage: 'addsong',
};