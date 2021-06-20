const Discord = require("discord.js");
const fs = require('fs');
var path = require('path');
const VideoFormats = ['.mp4', '.webm', '.mov'];
module.exports.run = async (client, message, args) => {
	var MLPfilesArray = fs.readdirSync('./MLP/');
	var MLPRandomMeme = MLPfilesArray[between(1, MLPfilesArray.length)];
	var extMLP = path.extname('./MLP/' + MLPRandomMeme);
	if (VideoFormats.includes(extMLP)) {
		message.channel.send('MLP Meme for ' + message.author.username, {
			files: [
			  "./MLP/" + MLPRandomMeme
			]
		  });
	} else {
		const MLPMemeAttachment = new Discord.MessageAttachment('./MLP/' + MLPRandomMeme);
		const MLPMemeEmbed = new Discord.MessageEmbed()
			.setTitle('Meme for ' + message.author.username)
			.setImage('attachment://' + MLPRandomMeme);
		message.channel.send({ files: [MLPMemeAttachment], embed: MLPMemeEmbed});
	}
}
module.exports.help = {
	name: 'mlp',
	description: 'Pošle náhodný MLP meme.',
	usage: '=mlp',
};
function between(min, max) {  
	return Math.floor(
	  Math.random() * (max - min + 1) + min
	)
}