const Discord = require("discord.js");
var fs = require("fs");
var isnumber = require("is-number");
let AllowedIds = ['422882850166276096', '409731934030135306', '478258433611661322', '699214855823163433', '532512473492750356', '532512473492750356', '523920961666547733'];

module.exports = {
  name: 'updaterad',
  description: 'Updatujem informácie pre hru Každy rád.',
  usage: '=updaterad <odpoveď> <číslo aká dlhá je odpoveď> <nápoveda>',
  async execute(message, args) {
    if(AllowedIds.includes(message.author.id)) {
      if (!args[0]) {
        message.delete();
        const radnoarg1 = new Discord.MessageEmbed()
          .setColor('#7162ba')
          .setTitle('Update: Každý rád')
          .setDescription('<@' + message.author.id + '>, Nenapísal si žiadnu odpoveď.')
        message.channel.send(radnoarg1)
      } else {
        if (!args[1]) {
          const radnoarg2 = new Discord.MessageEmbed()
            .setColor('#7162ba')
            .setTitle('Update: Každý rád')
            .setDescription('<@' + message.author.id + '>, Nenapísal si počet písmen.')
          message.channel.send(radnoarg2);
        } else {
          console.log(args + "\n" + args[1] + "\n" + isnumber(args[1]));
          if (!isnumber(args[1])) return message.channel.send("Nezadal si ako dlhá odpoveď je.");
          fs.readFile('rad.json', 'utf8', function readFileCallback(err, data){
          if (err){
            console.log(err);
          } else {
            radobj = JSON.parse(data);
            radobj.rad[0]["radkluc"] = args[0];
            radobj.rad[0]["radCislo"] = args[1];
            args.shift();
            args.shift();
            args.slice().join(' ');
            console.log(args);
            radobj.rad[0]["radNapoveda"] = args;
            fs.writeFile('rad.json', JSON.stringify(radobj), 'utf8', function (err, data) {
              if(err) console.log('error', err);
            });
            const radsuccesschange = new Discord.MessageEmbed()
              .setColor('#7162ba')
              .setTitle('Update: Každý rád')
              .setDescription('<@' + message.author.id + '>, Pog, zmenil si to.')
            message.channel.send(radsuccesschange)
          }});
        }
      }
    } else {
      message.reply("Nemáš ale právo na tento príkaz ty kok debylní!!!!!")
    }
	},

}