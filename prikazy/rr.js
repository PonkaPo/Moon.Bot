const Links = ['http://mc.fifqo.sk/alanwalker.html', 'https://discordgift.site/ZKgJ62aAj5Sx5GyM', 'http://mc.fifqo.sk/nitro/nitro.html', "https://cdn.discordapp.com/attachments/865163822650490890/865163841112768522/5060.mp4", "https://cdn.discordapp.com/attachments/865163822650490890/865163848332083210/DdzBx6BEu4ePg19b.mp4", "https://cdn.discordapp.com/attachments/865163822650490890/865163854841118740/EEEEEEEE.mp4", "https://cdn.discordapp.com/attachments/865163822650490890/865163861698936832/exhaust.mp4", "https://cdn.discordapp.com/attachments/865163822650490890/865163872385105940/Game_Cube.mp4", "https://cdn.discordapp.com/attachments/865163822650490890/865163892589068308/WiiTheme.mp4", "https://cdn.discordapp.com/attachments/865163822650490890/865164106126589962/not-rickroll.mp4"];
var rrSelectFromArray, channel;
module.exports.run = async (client,message,args) => {
	channel = client.channels.cache.get("865163822650490890");
	//let randomRR = await channel.messages.fetch({limit: 100});
	rrSelectFromArray = Links[Math.floor(Math.random()*Links.length)];
	if (message.mentions.users.first()) {
		if (message.mentions.users.first().bot) return message.channel.send({
			content: "**RR**: You can't send rick roll to a bot."
		})
        	message.client.users.cache.get(message.mentions.users.first().id).send({
				content: rrSelectFromArray+" From (**"+message.author.username+"**)"
			}).catch(err => {if (err.code == '50007') return message.channel.send({
				content: "Hey <@"+message.mentions.users.first().id+">, "+message.author.username+" sent you this: "+rrSelectFromArray
			})});
	} else {
		message.reply(rrSelectFromArray);
	}

};
module.exports.help = {
	name: 'rr',
    aliases: ['rickroll'],
	description: 'Rick Roll',
	usage: '=rr'
};