const Discord = require("discord.js");
let FirstEmbed = new Discord.MessageEmbed().setTitle("Request Song");
let ArtistEmbed = new Discord.MessageEmbed().setTitle("Request Song");
let SongNameEmbed = new Discord.MessageEmbed().setTitle("Request Song");
let ReleasedEmbed = new Discord.MessageEmbed().setTitle("Request Song");
let LinkEmbed = new Discord.MessageEmbed().setTitle("Request Song");

module.exports.run = async (client, message, args, DBConnection) => {

	FirstEmbed.setDescription("=> Artist Name: -\nFull Song Name: -\nReleased Date: -\nLink: -");
	addsong_msg = await message.channel.send("**RequestSong** Artist Name", {embed: FirstEmbed});
	var ArtistName = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
	var ArtistName1 = await ArtistName.first();
	ArtistName1.delete();
	if(ArtistName1.content == "cancel") return addsong_msg.edit("**RequestSong** Canceled!");

	ArtistEmbed.setDescription("Artist Name: `"+ArtistName1.content+"`\n=> Full Song Name: -\nReleased Date: -\nLink: -");
	addsong_msg.edit("**RequestSong** Full Song Name", {embed: ArtistEmbed});
	var SName = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
	var SName1 = await SName.first();
	SName1.delete();
	if(SName1.content == "cancel") return addsong_msg.edit("**RequestSong** Canceled!");

	SongNameEmbed.setDescription("Artist Name: `"+ArtistName1.content+"`\nFull Song Name: `"+SName1.content+"`\n=> Released Date: -\nLink: -");
	addsong_msg.edit("**RequestSong** Release date", {embed: SongNameEmbed});
	var ReleaseDate = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
	var ReleaseDate1 = await ReleaseDate.first();
	ReleaseDate1.delete();
	if(ReleaseDate1.content == "cancel") return addsong_msg.edit("**RequestSong** Canceled!");

	ReleasedEmbed.setDescription("Artist Name: `"+ArtistName1.content+"`\nFull Song Name: `"+SName1.content+"`\nReleased Date: `"+ReleaseDate1.content+"`\n=> Link: -");
	addsong_msg.edit("**RequestSong** Link (Like YouTube, SoundCloud, Spotify, etc.)", {embed: ReleasedEmbed});
	var SLink = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
	var SLink1 = await SLink.first();
	SLink1.delete();
	if(SLink1.content == "cancel") return addsong_msg.edit("**RequestSong** Canceled!");
	
	LinkEmbed.setDescription("Artist Name: `"+ArtistName1.content+"`\nFull Song Name: `"+SName1.content+"`\nReleased Date: `"+ReleaseDate1.content+"`\nLink: `"+SLink1.content+"`");
	client.channels.cache.get("879981137051668560").send("Request Song - <@"+message.author.id+">", {embed: LinkEmbed});
	addsong_msg.edit("**RequestSong** Done!", {embed: LinkEmbed});
};

module.exports.help = {
	name: 'requestsong',
	aliases: ['rs','request'],
	description: 'Request song to be added the Music Library.',
	usage: 'requestsong',
};