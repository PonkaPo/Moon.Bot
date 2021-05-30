const Discord = require("discord.js");
let sprava;

module.exports = {
  name: 'anketa',
  description: 'Anketa',
  usage: '=anketa <otázka> -everybody',
  async execute(message, args) {
    if (!args.length) return message.channel.send("<@"+message.author.id+">, Nezadal si žiadnu otázku");
    let TestArg = args[0];
    if (TestArg=="-E" || TestArg=="-H") {
      if (!message.member.hasPermission('MENTION_EVERYONE')) return message.channel.send("<@"+message.author.id+">, ale nemáš právo použiť everyone/here pre Anketu.");
      args.shift();
      sprava = args.slice().join(' ');
      let AnketaEmbedEveryone = new Discord.MessageEmbed()
        .setColor('#7162ba')
        .setTitle('Anketa')
        .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
        .setThumbnail("https://media.discordapp.net/attachments/741613882002505752/846793744207708170/7443_Fall_question_mark.png")
        .setDescription(sprava)
        .setTimestamp()
        .setFooter("Sweetie.Bot");
      switch(TestArg) {
        case '-E':
          message.delete();
          message.channel.send("@everyone ", {
            embed: AnketaEmbedEveryone,
           }).then(sentEmoji => {
            sentEmoji.react("\⬆")
            sentEmoji.react("\⬇")
          });
          break;
        case '-H':
          message.delete();
          message.channel.send("@here ", {
            embed: AnketaEmbedEveryone,
          }).then(sentEmoji => {
            sentEmoji.react("\⬆")
            sentEmoji.react("\⬇")
          });
          break;
      }
    } else {
      sprava = args.slice().join(' ');
      message.delete();
      let AnketaEmbed = new Discord.MessageEmbed()
        .setColor('#7162ba')
        .setTitle('Anketa')
        .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
        .setThumbnail("https://media.discordapp.net/attachments/741613882002505752/846793744207708170/7443_Fall_question_mark.png")
        .setDescription(sprava)
        .setTimestamp()
        .setFooter("Sweetie.Bot");
      message.channel.send(AnketaEmbed).then(sentEmoji => {
        sentEmoji.react("\⬆")
        sentEmoji.react("\⬇")
      });
    }

	},

}