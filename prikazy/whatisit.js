const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config/config.json");
let radNap, radCis, radUha, radZad, Odpoved, checkcontent, radjson;

module.exports.run = async (client, message,args) => {
  radjson = JSON.parse(fs.readFileSync('./config/rad.json', 'utf8'));
  radNap = radjson.rad[0]["radNapoveda"];
  radCis = radjson.rad[0]["radCislo"];
  radUha = radjson.rad[0]["uhadol"];
  radZad = radjson.rad[0]["ZadalTo"];
  Odpoved = radjson.rad[0]["radkluc"].toLowerCase();
  const cotoje = new Discord.MessageEmbed()
    .setColor('#F9A3BB')
    .setTitle('What is it, '+message.author.username+'?')
    .setDescription('Hint: **'+radNap+'**\nNumber of letters: **'+radCis+'**\nFirst Guess: '+radUha+'\nZadal to: '+radZad);
  message.channel.send(cotoje);
  const msgcheck = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
  const checkmsg = await msgcheck.first();
  checkcontent = checkmsg.content.toLowerCase();
  if (checkcontent.includes(config.prefix)) return;
  if (!checkcontent.includes(Odpoved)) return checkmsg.react("<:pinkie_no:852973704556183552>");
  await message.channel.send("Yay, you guessed it correctly, <@" + message.author.id + ">");
  if (radUha == checkmsg.author.username) return;
  if (radUha == "-") {
    radjson.rad[0]["uhadol"] = checkmsg.author.username;
    fs.writeFile('./config/rad.json', JSON.stringify(radjson), 'utf8', function (err, data) {
      if(err) message.channel.send('error: '+err);
    });
  }
}
module.exports.help = {
  name: 'whatisit',
  aliases: ['wii'],
  description: 'Hádacia hra Čo to je.',
  usage: '=whatisit',
};