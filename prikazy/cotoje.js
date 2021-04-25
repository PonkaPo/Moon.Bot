const Discord = require("discord.js");
var fs = require("fs");
var config = require("../config.json");

module.exports = {
  name: 'cotoje',
  description: 'Hádanie hry Čo to je.',
  usage: '=cotoje',
  async execute(message, args) {
    var radjson = JSON.parse(fs.readFileSync('./rad.json', 'utf8'));
    const cotoje = new Discord.MessageEmbed()
      .setColor('#7162ba')
      .setTitle('Čo to je?')
      .setDescription('Tak čo to je, ' + message.author.username + '?\nNápoveda: **' + radjson["rad"][0]["radNapoveda"] + '**\nPočet písmen: **' + radjson.rad[0]["radCislo"] + '**');
    message.channel.send(cotoje);
    const msgcheck = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
    const checkmsg = await msgcheck.first();
    if (checkmsg.content.includes(config.prefix)) return;
    let checkcontent = checkmsg.content.toLowerCase();
    let Odpoved = radjson["rad"][0]["radkluc"].toLowerCase();
    if (checkcontent.includes(Odpoved)) {
      await message.channel.send("Uhádol si, <@" + message.author.id + ">");
    } else {
      checkmsg.react("\🇿");
      checkmsg.react("\🇱");
      checkmsg.react("\🇪");
    }
	},
}