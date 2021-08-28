const Discord = require("discord.js");
const sfunctions = require("../functions/server.js");
let sprava, Mention;
module.exports.run = async (client, message, args, DBConnection) => {
  console.log(message.member.permissions.toArray());
  if (!args.length) return message.channel.send("**Poll**: You didn't write any question.");
  var check_for_poll_details = await sfunctions.check_for_poll_in_db(DBConnection, message);
  if (check_for_poll_details[0]["poll_mention"] == "-" || check_for_poll_details[0]["poll_mention"] == "here") {
    if (!message.member.hasPermission('MENTION_EVERYONE')) return message.channel.send("**Poll**: You don't have permission to mention everyone or here.");
    if (check_for_poll_details[0]["poll_mention"] == "-") Mention = "@everyone";
    if (check_for_poll_details[0]["poll_mention"] == "here") Mention = "@here";
  } else {
    Mention = "<@&"+check_for_poll_details[0]["poll_mention"]+">";
  }
  sprava = args.slice().join(' ');
  let AnketaEmbed = new Discord.MessageEmbed()
    .setColor('#F9A3BB')
    .setTitle('Poll')
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    .setThumbnail("https://media.discordapp.net/attachments/741613882002505752/846793744207708170/7443_Fall_question_mark.png")
    .setDescription(sprava)
    .setTimestamp()
    .setFooter("Pinkamena.Bot");
  if(check_for_poll_details[0]["poll_channel"] == "same") {
    message.delete();
    message.channel.send(Mention, {embed: AnketaEmbed, }).then(sentEmoji => {
      sentEmoji.react("<:pinkie_yes:852973753465831474>")
      sentEmoji.react("<:pinkie_no:852973704556183552>")
    });
  } else {
    client.channels.cache.get(check_for_poll_details[0]["poll_channel"]).send(Mention, {embed: AnketaEmbed, }).then(sentEmoji => {
      sentEmoji.react("<:pinkie_yes:852973753465831474>");
      sentEmoji.react("<:pinkie_no:852973704556183552>");
      message.react("<:pinkie_yes:852973753465831474>");
    });
  }
};
module.exports.help = {
  name: 'poll',
  aliases: ['po','anketa'],
  description: 'Poll',
  usage: 'poll <otázka>',
};