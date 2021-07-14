const Discord = require("discord.js");
const fs = require('fs');
var path = require('path');
const VideoFormats = ['.mp4', '.webm', '.mov'];
module.exports.run = async (client,message,args) => {
	var filesArray = fs.readdirSync('./memes/');
	var randomMeme = filesArray[Math.floor(Math.random() * (filesArray.length - 1 + 1) + 1)];
	var ext = path.extname('./memes/' + randomMeme);
	if (VideoFormats.includes(ext)) {
		message.channel.send('Meme for ' + message.author.username, {
			files: [
			  "./memes/" + randomMeme
			]
		  });
	} else {
		const MemeAttachment = new Discord.MessageAttachment('./memes/' + randomMeme);
		const MemeEmbed = new Discord.MessageEmbed()
			.setTitle('Meme for ' + message.author.username)
			.setImage('attachment://' + randomMeme);
		message.channel.send({ files: [MemeAttachment], embed: MemeEmbed});
	}
}
module.exports.help = {
	name: 'meme',
	description: 'Pošle náhodný meme.',
	usage: '=meme',
};