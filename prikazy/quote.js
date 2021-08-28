const { MessageEmbed, MessageAttachment } = require("discord.js");
const fs = require('fs');
const SiPath = "./citaty/Single_Quotes-Quoterific/";
const ScPath = "./citaty/Scene_Cut_Quotes-Quoterific/";
var SelectedPath;
let AcceptedArgs = ["single", "scene"];

module.exports.run = async (client,message, args) => {

  if (!args.length) {

    selectrandom = Math.floor(Math.random() * (100 - 1 + 1) + 1);

    if (selectrandom%2 == 0) {

      QuoteArray = fs.readdirSync(SiPath);
      SelectedPath = SiPath;

    } else {

      QuoteArray = fs.readdirSync(ScPath);
      SelectedPath = ScPath;

    }

  } else {
    if (AcceptedArgs.includes(args[0])) {
      if (args[0] == "single") {

        QuoteArray = fs.readdirSync(SiPath)
        SelectedPath = SiPath;

      }

      if (args[0] == "scene") {

        QuoteArray = fs.readdirSync(ScPath);
        SelectedPath = ScPath;

      }
      
    } else {

      return message.channel.send("**Quote**: Supported Arguments: 1. Without, 2. `single`, 3. `scene`");

    }
  }

  SelectFromArray = QuoteArray[Math.floor(Math.random()*QuoteArray.length)];

  const QuoteAttach = new MessageAttachment(SelectedPath+SelectFromArray);
  const QuoteEmbed = new MessageEmbed()
    .setTitle('Hope, you are now better person. :heart:')
    .setImage('attachment://'+SelectFromArray);

  message.channel.send({ 
    files: [QuoteAttach], 
    embeds: [QuoteEmbed]
  });

};

module.exports.help = {
  name: 'quote',
  description: 'Ukáže krásny a úplne náhodný citát z MLP :O.',
  usage: '=quote (single/scene)'
};