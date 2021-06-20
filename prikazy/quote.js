const Discord = require("discord.js");
const fs = require('fs');
const SiPath = "./citaty/Single_Quotes-Quoterific/";
const ScPath = "./citaty/Scene_Cut_Quotes-Quoterific/";
var SelectedPath;

module.exports.run = async (client,message, args) => {
    switch (args[0]) {
      case 'single':
        SingleArray = fs.readdirSync(SiPath);
        SelectFromArray = SingleArray[Math.floor(Math.random()*SingleArray.length)];
        SelectedPath = SiPath;
        break;
      case 'scene':
        SceneArray = fs.readdirSync(ScPath);
        SelectFromArray = SceneArray[Math.floor(Math.random()*SceneArray.length)];
        SelectedPath = ScPath;
        break;
      default:
        if (!args[0]) {
          selectrandom = between(1, 100)
          if (isEven(selectrandom)) {
            SingleArray = fs.readdirSync(SiPath);
            SelectFromArray = SingleArray[Math.floor(Math.random()*SingleArray.length)];
            SelectedPath = SiPath;
            break;
          } else {
            SceneArray = fs.readdirSync(ScPath);
            SelectFromArray = SceneArray[Math.floor(Math.random()*SceneArray.length)];
            SelectedPath = ScPath;
            break;
          }
        } else {
          message.reply("Neplatný argument!\nSú dostupné len tieto možnosti:\n1. Bez Argumentu,\n2. `single` alebo\n3. `scene`");
          break;
        }
      }
      const QuoteAttach = new Discord.MessageAttachment(SelectedPath+SelectFromArray);
      const QuoteEmbed = new Discord.MessageEmbed()
        .setTitle('Hope, you are now better person. :heart:')
        .setImage('attachment://'+SelectFromArray);
      message.channel.send({ files: [QuoteAttach], embed: QuoteEmbed});
	};
module.exports.help = {
  name: 'quote',
  description: 'Ukáže krásny a úplne náhodný citát z MLP :O.',
  usage: '=quote (single/scene)'
};

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

function isEven(value) {
return (value%2 == 0);
}