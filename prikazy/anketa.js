const Discord = require("discord.js");
let sprava, EHMention, TestArg;

module.exports.run = async (client, message, args) => {
  if (!args.length) return message.channel.send("<@"+message.author.id+">, Nezadal si žiadnu otázku");
  TestArg = args[0];
  if (TestArg=="-E" || TestArg=="-H") {
    if (!message.member.hasPermission('MENTION_EVERYONE')) return message.channel.send("<@"+message.author.id+">, ale nemáš právo použiť everyone/here pre Anketu.");
    args.shift();
    if (TestArg == "-E") EHMention = "@everyone";
    if (TestArg == "-H") EHMention = "@here";
  }
  sprava = args.slice().join(' ');
  let AnketaEmbed = new Discord.MessageEmbed()
    .setColor('#F9A3BB')
    .setTitle('Anketa')
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    .setThumbnail("https://media.discordapp.net/attachments/741613882002505752/846793744207708170/7443_Fall_question_mark.png")
    .setDescription(sprava)
    .setTimestamp()
    .setFooter("Pinkamena.Bot");
  message.delete();
  message.channel.send(EHMention, {embed: AnketaEmbed, }).then(sentEmoji => {
    sentEmoji.react("<:pinkie_yes:852973753465831474>")
    sentEmoji.react("<:pinkie_no:852973704556183552>")
  });
};

module.exports.help = {
  name: 'anketa',
  aliases: ['ank', 'a'],
  description: 'Anketa',
  usage: '=anketa (-E/-H) <otázka>',
};