const Discord = require("discord.js");
var fs = require("fs");
let AllowedIds = ['422882850166276096', '409731934030135306', '478258433611661322', '699214855823163433', '532512473492750356', '532512473492750356', '523920961666547733'];
let RadKluc, RadCislo, napovedaRAD;
module.exports.run = async (client,message,args) => {
  if(!AllowedIds.includes(message.author.id)) return message.reply("sorko ale nemáš na to právo to meniť <:Redheart:846414934644228127>");
  message.delete();
  if (!args[0]) return message.channel.send('**UPDATECOTOJE**: <@' + message.author.id + '>, Nenapísal si žiadnu odpoveď.');
  if (!args[1]) return message.channel.send('**UPDATECOTOJE**: <@' + message.author.id + '>, Nenapísal nápovedu.');
  fs.readFile('./config/rad.json', 'utf8', function readFileCallback(err, data){
    if (err) return console.log(err);
    radobj = JSON.parse(data);
    radobj.rad[0]["radkluc"] = args[0];
    radobj.rad[0]["radCislo"] = args[0].length;
    radobj.rad[0]["uhadol"] = "-";
    radobj.rad[0]["ZadalTo"] = message.author.username;
    RadKluc = args[0];
    RadCislo = args[0].length;
    args.shift();
    napovedaRAD = args.slice().join(' ');
    radobj.rad[0]["radNapoveda"] = napovedaRAD;
    fs.writeFile('./config/rad.json', JSON.stringify(radobj), 'utf8', function (err, data) { if(err) message.channel.send('error: '+err); });
    message.channel.send("**UPDATECOTOJE**:\nNápoveda: "+napovedaRAD+"\nOdpoveď: "+RadKluc+"\nDĺžka odpovede: "+RadCislo).then(msg => { msg.delete({ timeout: 3000 }) });
  });
}
module.exports.help = {
  name: 'updatecotoje',
  description: 'Updatuje informácie pre hru Čo to je.',
  usage: '=updatecotoje <odpoveď> <nápoveda>',
};