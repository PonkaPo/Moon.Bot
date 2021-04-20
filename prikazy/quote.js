const Discord = require("discord.js");

module.exports = {
  name: 'quote',
  description: 'Ukáže krásny a úplne náhodný citát z MLP :O.',
  usage: '=quote (single/scene)',
  async execute(message, args) {
    switch (args[0]) {
      case 'single':
        singlerandomelse = between(1, 519)
        const citatoddattachmentelse = new Discord.MessageAttachment('./citaty/Single_Quotes-Quoterific/' + singlerandomelse + '.jpg');
        const singlequoteembedelse = new Discord.MessageEmbed()
          .setTitle('Hope, you are now better person. :heart:')
          .setImage('attachment://' + singlerandomelse + '.jpg');
        message.channel.send({ files: [citatoddattachmentelse], embed: singlequoteembedelse});
        break;
      case 'scene':
          scenerandomelse = between(1, 278)
          const QESattachment = new Discord.MessageAttachment('./citaty/Scene_Cut_Quotes-Quoterific/' + scenerandomelse + '.jpg');
          const evenquoteembedelse = new Discord.MessageEmbed()
            .setTitle('Hope, you are now better person. :heart:')
            .setImage('attachment://' + scenerandomelse + '.jpg');
          message.channel.send({ files: [QESattachment], embed: evenquoteembedelse});
          break;
      default:
        if (!args[0]) {
          selectrandom = between(1, 100)
          if (isEven(selectrandom)) {
            singlerandom = between(1, 519)
            const citatoddattachment = new Discord.MessageAttachment('./citaty/Single_Quotes-Quoterific/' + singlerandom + '.jpg');
            const singlequoteembed = new Discord.MessageEmbed()
              .setTitle('Hope, you are now better person. :heart:')
              .setImage('attachment://' + singlerandom + '.jpg');
            message.channel.send({ files: [citatoddattachment], embed: singlequoteembed });
            break;
          } else {
            scenerandom = between(1, 278)
            const citateventachment = new Discord.MessageAttachment('./citaty/Scene_Cut_Quotes-Quoterific/' + scenerandom + '.jpg');
            const evenquoteembed = new Discord.MessageEmbed()
              .setTitle('Hope, you are now better person. :heart:')
              .setImage('attachment://' + scenerandom + '.jpg');
            message.channel.send({ files: [citateventachment], embed: evenquoteembed});
            break;
          }
        } else {
          message.reply("Neplatný argument!\nSú dostupné len tieto možnosti:\n1. Bez Argumentu,\n2. `single` alebo\n3. `scene`");
          break;
        }
      }
	},

}

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

function isEven(value) {
return (value%2 == 0);
}