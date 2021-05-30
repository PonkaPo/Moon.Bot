const Discord = require("discord.js");

module.exports = {
  name: 'boop',
  description: 'Zaútočí na teba moja ruka.',
  usage: '=boop <mention>',
  async execute(message, args) {
    if (!message.mentions.users.first()) return message.channel.send("Nenapísal si na koho chceš zaútočiť.");
    if (message.mentions.users.first().id == message.client.user.id) return message.channel.send("Nemôžeš zaútočiť na legendu :D");
    if (message.mentions.users.first().bot) return message.channel.send("Nemôžem zaútočiť na bota, to kde žijeme");
    if (message.mentions.members.first().roles.highest.position > message.member.roles.highest.position) return message.channel.send("No super, čo chceš zase robiť, ty " + message.author.username + "! Akurát si zanechal **ping** tomúto týpkovi: " + message.mentions.users.first().username);
    if (message.mentions.users.first().id == message.author.id) return message.channel.send("Nemôžeš na seba zaútočiť, debyl.");
      let RandomSelect =  ["<:BoopSomeone:833733370420265021> | Člen **" + message.mentions.users.first().username + "** bol položený na zem členom **" + message.author.username + "**", 
      "<:BoopSomeone:833733370420265021> | Člen **" + message.mentions.users.first().username + "** dostal K.O. členom **" + message.author.username + "**"];
      var RandomSelect2 = RandomSelect[Math.floor(Math.random()*RandomSelect.length)];
      args.shift();
      if (!args.length) {
        message.channel.send(RandomSelect2);
      } else {
        let BoopSay = args.slice().join(' ');
        message.channel.send(RandomSelect2+", "+BoopSay);
      }
	},

}