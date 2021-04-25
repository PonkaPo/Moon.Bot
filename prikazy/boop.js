const Discord = require("discord.js");

module.exports = {
  name: 'boop',
  description: 'Zaútočí na teba moja ruka.',
  usage: '=boop <mention>',
  async execute(message, args) {
    message.delete();
    if (!message.mentions.users.first()) {
      /*if (args.length !== 0) {
        const userId = message.guild.members.cache.find(m => m.nickname === args);
        console.log(args + "\n" + userId);
        message.channel.send("<:BoopSomeone:833733370420265021> | <@" + message.author.id + "> zaútočil na <@" + userId + ">");
      } else {*/
        message.channel.send("Nenapísal si na koho chceš zaútočiť.");
      //}
    } else {
    if (message.mentions.users.first().id == message.author.id) return message.channel.send("Nemôžeš na seba zaútočiť, debyl.");
    if (message.mentions.users.first().id == message.client.user.id) return message.channel.send("Nemôžeš zaútočiť na legendu :D");
    if (message.mentions.users.first().bot) return message.channel.send("Nemôžem zaútočiť na bota, to kde žijeme");
    args.shift();
    if (!args.length) {
      message.channel.send("<:BoopSomeone:833733370420265021> | Člen <@" + message.mentions.users.first().id + "> bol položený na zem členom <@" + message.author.id + ">");
    } else {
    let BoopSay = args.slice().join(' ');
    message.channel.send("<:BoopSomeone:833733370420265021> | Člen <@" + message.mentions.users.first().id + "> bol položený na zem členom <@" + message.author.id + ">, lebo " + BoopSay);
    }
    }
	},

}