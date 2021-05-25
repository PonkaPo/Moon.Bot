const Discord = require("discord.js");
const fs = require('fs');
var Links = ['http://mc.fifqo.sk:8088/alanwalker.html', 'https://discordgift.site/ZKgJ62aAj5Sx5GyM'];
var rrArray, RandomDecide, rrSelectFromArray;
var LinkCheck = 1;

module.exports = {
	name: 'rr',
	description: 'Rick Roll',
	usage: '=rr',
  async execute(message, args) {
	RandomDecide = between(1, 100);
	if (rrIsEven(RandomDecide)) {
		rrArray = fs.readdirSync('./rr/');
		rrSelectFromArray = rrArray[Math.floor(Math.random()*rrArray.length)];
		LinkCheck = 2;
	} else {
		rrSelectFromArray = Links[Math.floor(Math.random()*Links.length)];
		LinkCheck = 1;
	}
	if (message.mentions.users.first()) {
		if (message.mentions.users.first().bot) return message.channel.send(message.author.username+' ty debil, nemôžeš poslať rick roll nejakému botovi :D')
		if (LinkCheck !== 1) {
			try {
				message.client.users.cache.get(message.mentions.users.first().id).send(rrSelectFromArray+' (**'+message.author.username+'**)', {
					files: [
						"./rr/" + rrSelectFromArray
					]
				});
			  } catch(err) {
				console.log(err);
				message.channel.send('Hej <@'+message.mentions.users.first().id+'>, '+message.author.username+' poslal tebe túto vec: '+rrSelectFromArray, {
					files: [
						"./rr/" + rrSelectFromArray
					]
				});
			  }
		} else {
			try {
            	message.client.users.cache.get(message.mentions.users.first().id).send(rrSelectFromArray+' From (**'+message.author.username+'**)');
          	} catch(err) {
			  	console.log(err);
            	message.channel.send('Hej <@'+message.mentions.users.first().id+'>, '+message.author.username+' poslal tebe túto vec: '+rrSelectFromArray);
          	}
		}
	} else {
		if (LinkCheck == 1) {
			message.channel.send(rrSelectFromArray+' For '+message.author.username);
		} else {
			message.channel.send(rrSelectFromArray+' For '+message.author.username, {
				files: [
					"./rr/" + rrSelectFromArray
				]
			});
		}
	}
	},

}

function between(min, max) {  
	return Math.floor(
	  Math.random() * (max - min + 1) + min
	)
}

function rrIsEven(value) {
	return (value%2 == 0);
}