const Discord = require("discord.js");
const fs = require('fs');
var path = require('path');
const VideoFormats = ['.mp4', '.webm', '.mov'];

module.exports = {
	name: 'meme',
	description: 'Pošle náhodný meme.',
	usage: '=meme',
  async execute(message, args) {
	var filesArray = fs.readdirSync('./memes-command/');
	var randomMeme = filesArray[between(1, filesArray.length)];
	var ext = path.extname('./memes-command/' + randomMeme);
	if (VideoFormats.includes(ext)) {
		message.channel.send('Meme for ' + message.author.username, {
			files: [
			  "./memes-command/" + randomMeme
			]
		  });
	} else {
		const MemeAttachment = new Discord.MessageAttachment('./memes-command/' + randomMeme);
		const MemeEmbed = new Discord.MessageEmbed()
			.setTitle('Meme for ' + message.author.username)
			.setImage('attachment://' + randomMeme);
		message.channel.send({ files: [MemeAttachment], embed: MemeEmbed});
	}
	},

}

function between(min, max) {  
	return Math.floor(
	  Math.random() * (max - min + 1) + min
	)
}