const Discord = require("discord.js");
const fs = require('fs');
var path = require('path');
const VideoFormats = ['.mp4', '.webm', '.mov'];
const request = require(`request`);
let filename;
module.exports.run = async (client,message,args) => {
	if (args[0] == "-s") {
		if(message.attachments.first()){
		filename = message.attachments.first().name;
		download(message.attachments.first().url);
		message.channel.send("**Meme Save**: Filename exists, new name: "+filename);
		return message.react("<:pinkie_yes:852973753465831474>");
		} else {
			return;
		}
	}
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
function download(url){
    let FileCheck = fs.existsSync('./memes/' + filename);
    if (FileCheck) {
        while (FileCheck == true) {
            let randomNumber = Math.floor(Math.random() * (999999 - 1 + 1) + 1);
            filenameext = path.parse(filename).ext;
            filename = 'downloaded_meme_' + randomNumber + filenameext;
            if (!fs.existsSync('./memes/' + filename)) {
                break;
            }
        }
        request.get(url)
            .on('error', console.error)
            .pipe(fs.createWriteStream('./memes/' + filename));
    } else {
        request.get(url)
            .on('error', console.error)
            .pipe(fs.createWriteStream('./memes/' + filename));
    }
}