const Discord = require("discord.js");

module.exports = {
  name: 'boop',
  description: 'Zaútočí na teba moja ruka.',
  usage: '=boop <mention>',
  async execute(message, args) {
    message.delete();
    if (!message.mentions.users.first()) {
        message.channel.send("Nenapísal si na koho chceš zaútočiť.");
    } else {
      if (message.mentions.users.first().bot) return message.channel.send("Nemôžem zaútočiť na bota, to kde žijeme");
      if (message.guild.id == "739030506175201280" && (message.mentions.members.first().roles.highest.position > message.member.roles.highest.position)) {
        message.delete();
        message.channel.send("No super, čo chceš zase robiť, ty " + message.author.username + "! Akurát si zanechal **Ghostping** tomúto týpkovi: " + message.mentions.users.first().username);
        return;
      }
      if (message.mentions.users.first().id == message.author.id) return message.channel.send("Nemôžeš na seba zaútočiť, debyl.");
      if (message.mentions.users.first().id == message.client.user.id) return message.channel.send("Nemôžeš zaútočiť na legendu :D");
      args.shift();
      if (!args.length) {
        let RandomNoArg = 
        ["<:BoopSomeone:833733370420265021> | Člen **" + message.mentions.users.first().username + "** bol položený na zem členom **" + message.author.username + "**", 
        "<:BoopSomeone:833733370420265021> | Člen **" + message.mentions.users.first().username + "** dostal K.O. členom **" + message.author.username + "**"];
        var RandomNoArgSelect = RandomNoArg[Math.floor(Math.random()*RandomNoArg.length)];
        message.channel.send(RandomNoArgSelect);
      } else {
        let BoopSay = args.slice().join(' ');
        let RandomArg = 
        ["<:BoopSomeone:833733370420265021> | Člen **" + message.mentions.users.first().username + "** bol položený na zem členom **" + message.author.username + "**, lebo " + BoopSay + " <:eyes_tempest:836156906208493598>", 
        "<:BoopSomeone:833733370420265021> | Člen **" + message.mentions.users.first().username + "** dostal K.O. členom **" + message.author.username + "**, pretože " + BoopSay + " <:eyes_tempest:836156906208493598>"];
        var RandomArgSelect = RandomArg[Math.floor(Math.random()*RandomArg.length)];
        message.channel.send(RandomArgSelect);
      }
    }
	},

}