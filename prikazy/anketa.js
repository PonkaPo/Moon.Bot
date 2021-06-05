const Discord = require("discord.js");
let sprava, EHMention;

module.exports = {
  name: 'anketa',
  description: 'Anketa',
  usage: '=anketa <otázka> -everybody',
  async execute(message, args) {
    if (!args.length) return message.channel.send("<@"+message.author.id+">, Nezadal si žiadnu otázku");
    message.delete();
    let TestArg = args[0];
    args.shift();
    sprava = args.slice().join(' ');
    if (TestArg=="-E" || TestArg=="-H") {
      if (!message.member.hasPermission('MENTION_EVERYONE')) return message.channel.send("<@"+message.author.id+">, ale nemáš právo použiť everyone/here pre Anketu.");
      if (TestArg == "-E") EHMention = "@everyone";
      if (TestArg == "-H") EHMention = "@here";
    }
    let AnketaEmbed = new Discord.MessageEmbed()
      .setColor('#F9A3BB')
      .setTitle('Anketa')
      .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
      .setThumbnail("https://media.discordapp.net/attachments/741613882002505752/846793744207708170/7443_Fall_question_mark.png")
      .setDescription(sprava)
      .setTimestamp()
      .setFooter("Pinkamena.Bot");
    message.channel.send(EHMention, {embed: AnketaEmbed, }).then(sentEmoji => {
      sentEmoji.react("\⬆")
      sentEmoji.react("\⬇")
    });

	},

}