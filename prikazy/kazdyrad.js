const Discord = require("discord.js");
var fs = require("fs");
var config = require("../config.json");

module.exports = {
  name: 'kazdyrad',
  description: 'Hádanie hry Každý rád.',
  usage: '=kazdyrad',
  async execute(message, args) {
    var radjson = JSON.parse(fs.readFileSync('./rad.json', 'utf8'));
    message.reply("Čo má každý rád?\nPočet písmen: **" + radjson.rad[0]["radCislo"] + "**\nNápoveda: **" + radjson["rad"][0]["radNapoveda"] + "**");
    const msgcheck = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
    const checkmsg = await msgcheck.first();
    if (checkmsg.content.includes(config.prefix)) return;
    let checkcontent = checkmsg.content.toLowerCase();
    if (checkcontent.includes(radjson["rad"][0]["radkluc"])) {
      await message.channel.send("Máš pravdu, <@" + message.author.id + ">");
    } else {
      checkmsg.react("\🇿");
      checkmsg.react("\🇱");
      checkmsg.react("\🇪");
    }
	},
}