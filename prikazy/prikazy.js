const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    const helpembed = new Discord.MessageEmbed()
      .setColor('#F9A3BB')
      .setTitle('Dostupné príkazy')
      .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
      .setDescription('```8ball\nanketa\navatar\nban\nboop\ncotoje\ndelete\nhug\ninfo\nmeme\nmusiclink\nmusiclist\nnick\npin\nquote\nrandom\nrr\nsay\nserverinfo```')
      .setThumbnail(message.client.user.avatarURL())
      .setTimestamp()
      .setFooter("Pinkamena.Bot", Discord.ClientUser.displayAvatarURL);
    message.channel.send(helpembed);
};
module.exports.help = {
  name: 'prikazy',
  description: 'Ukáže zoznam príkazov.',
  usage: '=prikazy'
};