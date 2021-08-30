const { MessageEmbed } = require("discord.js");
const sfunctions = require("../functions/server.js");
let RequestSong = new MessageEmbed().setTitle("Request Song").setColor('#F9A3BB').setFooter("Use `cancel` to exit.");

module.exports.run = async (client, message) => {

	const msgfilter = m => m.author.id === message.author.id && m.author.bot !== true;

	RequestSong.setDescription("=> Artist Name: -\nFull Song Name: -\nReleased Date: -\nLink: -");
	rs_msg = await message.channel.send({
		embeds: [RequestSong]
	});

	var ArtistName = await sfunctions.collect_message(message, msgfilter);
	ArtistName.delete();
	if(ArtistName.content == "cancel") return rs_msg.edit({
		content: "**RequestSong** Canceled!",
		embeds: []
	});

	RequestSong.setDescription("Artist Name: `"+ArtistName.content+"`\n=> Full Song Name: -\nReleased Date: -\nLink: -");
	rs_msg.edit({
		embeds: [RequestSong]
	});
	var SName = await sfunctions.collect_message(message, msgfilter);
	SName.delete();
	if(SName.content == "cancel") return rs_msg.edit({
		content: "**RequestSong** Canceled!",
		embeds: []
	});

	RequestSong.setDescription("Artist Name: `"+ArtistName.content+"`\nFull Song Name: `"+SName.content+"`\n=> Released Date: -\nLink: -");
	rs_msg.edit({
		embeds: [RequestSong]
	});
	var ReleaseDate = await sfunctions.collect_message(message, msgfilter);
	ReleaseDate.delete();
	if(ReleaseDate.content == "cancel") return rs_msg.edit({
		content: "**RequestSong** Canceled!",
		embeds: []
	});

	RequestSong.setDescription("Artist Name: `"+ArtistName.content+"`\nFull Song Name: `"+SName.content+"`\nReleased Date: `"+ReleaseDate.content+"`\n=> Link: - (Like YouTube, SoundCloud, Spotify, etc.)");
	rs_msg.edit({
		embeds: [RequestSong]
	});
	var SLink = await message.sfunctions.collect_message(message, msgfilter);
	var SLink = await SLink.first();
	SLink.delete();
	if(SLink.content == "cancel") return rs_msg.edit("**RequestSong** Canceled!");

	RequestSong.setDescription("Artist Name: `"+ArtistName.content+"`\nFull Song Name: `"+SName.content+"`\nReleased Date: `"+ReleaseDate.content+"`\nLink: `"+SLink.content+"`");
	client.channels.cache.get("879981137051668560").send({
		content: "Request Song - <@"+message.author.id+">",
		embeds: [RequestSong]
	});

	rs_msg.edit({
		embeds: [RequestSong]
	});
};

module.exports.help = {
	
	name: 'requestsong',
	aliases: ['rs','request'],
	description: 'Request song to be added the Music Library.',
	usage: 'requestsong'

};
