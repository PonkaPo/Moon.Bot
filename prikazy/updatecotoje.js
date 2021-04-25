const Discord = require("discord.js");
var fs = require("fs");
let AllowedIds = ['422882850166276096', '409731934030135306', '478258433611661322', '699214855823163433', '532512473492750356', '532512473492750356', '523920961666547733'];

module.exports = {
  name: 'updatecotoje',
  description: 'Updatuje informácie pre hru Čo to je.',
  usage: '=updatecotoje <odpoveď> <nápoveda>',
  async execute(message, args) {
    if(AllowedIds.includes(message.author.id)) {
      if (!args[0]) {
        message.delete();
        const radnoarg1 = new Discord.MessageEmbed()
          .setColor('#7162ba')
          .setTitle('Update: Čo to je')
          .setDescription('<@' + message.author.id + '>, Nenapísal si žiadnu odpoveď.')
        message.channel.send(radnoarg1)
      } else {
        if (!args[1]) {
          const radnoarg2 = new Discord.MessageEmbed()
            .setColor('#7162ba')
            .setTitle('Update: Čo to je')
            .setDescription('<@' + message.author.id + '>, Nenapísal si počet písmen.')
          message.channel.send(radnoarg2);
        } else {
          fs.readFile('rad.json', 'utf8', function readFileCallback(err, data){
          if (err){
            console.log(err);
          } else {
            radobj = JSON.parse(data);
            radobj.rad[0]["radkluc"] = args[0];
            radobj.rad[0]["radCislo"] = args[0].length;
            let RadKlucEmbed = args[0];
            let RadCisloEmbed = args[0].length;
            args.shift();
            let napovedaRAD = args.slice().join(' ');
            radobj.rad[0]["radNapoveda"] = napovedaRAD;
            fs.writeFile('rad.json', JSON.stringify(radobj), 'utf8', function (err, data) {
              if(err) console.log('error', err);
            });
            const radsuccesschange = new Discord.MessageEmbed()
              .setColor('#7162ba')
              .setTitle('Update: Čo to je')
              .setDescription('Tak <@' + message.author.id + '>, tu sú tvoje zmeny:\nNápoveda: ' + napovedaRAD + '\nOdpoveď: ' + RadKlucEmbed + '\nAká dlhá je odpoveď: ' + RadCisloEmbed);
            message.react("\👍");
            message.channel.send(radsuccesschange).then(msg => {
              msg.delete({ timeout: 1000 })
            });
          }});
        }
      }
    } else {
      message.reply("Nemáš ale právo na tento príkaz ty kok debylní!!!!!")
    }
	},

}