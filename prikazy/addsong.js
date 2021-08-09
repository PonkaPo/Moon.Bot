const Discord = require("discord.js");
const AllowedIds = ["409731934030135306"];
const sfunctions = require("../functions/server.js");

module.exports.run = async (client, message, args, DBConnection) => {
	if(!AllowedIds.includes(message.author.id)) return message.channel.send("**AddSong**: You can't use this command.");
	if(args.length !== 0) {
		var ArtistShortName1 = args[0]
		if(ArtistShortName1.indexOf(" ") !== 0) return message.channel.send("**AddSong** Artist cannot contain `spaces`.");
		var artistResult = await sfunctions.check_if_artist_exists(DBConnection, message, ArtistShortName1);
		if(artistResult == 0) {
			message.channel.send("**Musiclink**: Provided artist isn't exists in the database. (Type `yes` if you want to create artist in database with name: "+ArtistShortName1+")");
			var CheckForYes = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
			var CheckForYes1 = await CheckForYes.first();
			if((CheckForYes1.content.indexOf("yes") && CheckForYes1.content.indexOf(" ")) !== 0) {
				CheckForYes1.react("<:pinkie_no:852973704556183552>");
			} else {
				CheckForYes1.react("<:pinkie_yes:852973753465831474>");
				await sfunctions.create_music_table(DBConnection, message, ArtistShortName1);
				return message.channel.send("**AddSong**: Creating Artist table for: "+ArtistShortName1+" was successfull.");
			}
		
		}
	} else {
		message.channel.send("**AddSong** Short Artist Name:");
		var ShortArtistName = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
		var ShortArtistName1 = await ShortArtistName.first();
		console.log(ShortArtistName1.content.indexOf(" "));
		if(ShortArtistName1.content.indexOf(" ") !== -1) return message.channel.send("**AddSong** Short Artist Name cannot contain `space`.");
		ShortArtistName1.react("<:pinkie_yes:852973753465831474>");
		message.channel.send("**AddSong** Short Song Name:");
		var ShortSongName = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
		var ShortSongName1 = await ShortSongName.first();
		if(ShortArtistName1.content.indexOf(" ") !== -1) return message.channel.send("**AddSong** Short Song Name cannot contain `space`.");
		ShortSongName1.react("<:pinkie_yes:852973753465831474>");
		message.channel.send("**AddSong** Full Song Name:");
		var SongName = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
		var SongName1 = await SongName.first();
		SongName1.react("<:pinkie_yes:852973753465831474>");
		message.channel.send("**AddSong** Artist name:");
		var ArtistName = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
		var ArtistName1 = await ArtistName.first();
		ArtistName1.react("<:pinkie_yes:852973753465831474>");
		message.channel.send("**AddSong** Release date:");
		var ReleasedDate = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
		var ReleasedDate1 = await ReleasedDate.first();
		ReleasedDate1.react("<:pinkie_yes:852973753465831474>");
		message.channel.send("**AddSong** Link:");
		var SongLink = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
		var SongLink1 = await SongLink.first();
		SongLink1.react("<:pinkie_yes:852973753465831474>");
		const AddSongEmbed = new Discord.MessageEmbed()
			.setTitle("AddSong")
			.setDescription("Short Artist Name: `"+ShortArtistName1.content+"`\nShort Name: `"+ShortSongName1.content+"`\nFull Song Name: `"+SongName1.content+"`\nArtist: `"+ArtistName1.content+"`\nReleased Date: `"+ReleasedDate1.content+"`\nLink: `"+SongLink1.content+"`");
		message.channel.send(AddSongEmbed);
		await sfunctions.write_song_data(DBConnection, message, args, ShortArtistName1, ShortSongName1, SongName1, ArtistName1, ReleasedDate1, SongLink1);
	}
}

module.exports.help = {
	name: 'addsong',
	aliases: ['as'],
	description: 'Add song to the Music Library.',
	usage: '=addsong',
};