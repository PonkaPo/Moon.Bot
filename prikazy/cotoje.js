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
      .setTitle('Čo to je, '+message.author.username+'?')
      .setDescription('Nápoveda: **'+radjson["rad"][0]["radNapoveda"]+'**\nPočet písmen: **'+radjson.rad[0]["radCislo"]+'**\nPrvý Uhádol: '+radjson.rad[0]["uhadol"]+'\nZadal to: '+radjson.rad[0]["ZadalTo"]);
    message.channel.send(cotoje);
    const msgcheck = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
    const checkmsg = await msgcheck.first();
    if (checkmsg.content.includes(config.prefix)) return;
    let checkcontent = checkmsg.content.toLowerCase();
    let Odpoved = radjson["rad"][0]["radkluc"].toLowerCase();
    if (checkcontent.includes(Odpoved)) {
      await message.channel.send("Uhádol si, <@" + message.author.id + ">");
      fs.readFile('rad.json', 'utf8', function readFileCallback(err, data){
        if (err){
          console.log(err);
        } else {
          radobj = JSON.parse(data);
          let uhadolto = radobj.rad[0]["uhadol"];
          if (uhadolto != "-") return;
          if (uhadolto !== checkmsg.author.username) {
            radobj.rad[0]["uhadol"] = checkmsg.author.username;
            fs.writeFile('rad.json', JSON.stringify(radobj), 'utf8', function (err, data) {
              if(err) message.channel.send('error: '+err);
            });
          }
        }});
    } else {
      checkmsg.react("\🇿");
      checkmsg.react("\🇱");
      checkmsg.react("\🇪");
    }
	},
}