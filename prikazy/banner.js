const { MessageEmbed }  = require("discord.js");
const axios = require('axios');
const fetch = require("node-fetch");
let bannerSelect;

module.exports.run = async (client, message, args) => {

	if (message.mentions.users.first()) {

		bannerSelect = message.mentions.users.first();
		args.shift();

	} else {

		bannerSelect = message.author;
		
	}
    const res = await fetch(`https://cryptons.ga/api/v1/userbanner?id=${bannerSelect.id}`)
    const json = res.json();

    if(json.url === "null") return message.channel.send("User "+bannerSelect.username+" doesn't have a banner");

	axios.get(`https://cryptons.ga/api/v1/userbanner?id=${bannerSelect.id}`).then(function(response) {

        if(response.data.url === "null") return message.channel.send("User "+bannerSelect.username+" doesn't have a banner");

		console.log(response.data.url);

		var bannerembed = new MessageEmbed().setColor('#F9A3BB').setTitle(`${bannerSelect.username}'s Banner`).setImage(response.data.url);

		message.channel.send({
			embeds: [bannerembed]
		});
    });

}
module.exports.help = {

	name: 'banner',
	description: 'Pošle tvoj avatar v Embede s ľuvovoľnou veľkosťou',
	usage: '=avatar (mention)'

};