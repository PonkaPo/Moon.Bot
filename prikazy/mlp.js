const { MessageEmbed, MessageAttachment } = require("discord.js");
const fs = require('fs');
var path = require('path');
const VideoFormats = ['.mp4', '.webm', '.mov'];

module.exports.run = async (client, message, args) => {

	var MLPfilesArray = fs.readdirSync('./MLP/');
	var MLPRandomMeme = MLPfilesArray[Math.floor(Math.random()*MLPfilesArray.length)];
	var extMLP = path.extname('./MLP/' + MLPRandomMeme);
	if (VideoFormats.includes(extMLP)) {

		message.channel.send({
			content: 'MLP Meme for ' + message.author.username,
			files: [
				"./MLP/" + MLPRandomMeme
			]
		});

	} else {

		const MLPMemeAttachment = new MessageAttachment('./MLP/' + MLPRandomMeme);
		const MLPMemeEmbed = new MessageEmbed()
			.setTitle('Meme for ' + message.author.username)
			.setImage('attachment://' + MLPRandomMeme);

		message.channel.send({ files: [MLPMemeAttachment], embeds: [MLPMemeEmbed]});
	}
}

module.exports.help = {

	name: 'mlp',
	description: 'Pošle náhodný MLP meme.',
	usage: '=mlp'

};