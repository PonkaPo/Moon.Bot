let oznacenytypek, RandomSelect;
module.exports.run = async (client, message, args) => {
  if (!message.mentions.users.first()) return message.channel.send("**BOOP**: Nenapísal si na koho chceš zaútočiť.");
  oznacenytypek = message.mentions.users.first();
  if (oznacenytypek.id == mesage.client.user.id) return message.channel.send("**BOOP**: Nemôžeš zaútočiť na mňa ne?");
  if (oznacenytypek.bot) return message.channel.send("**BOOP**: Nemôžem zaútočiť na bota, to kde žijeme");
  if (oznacenytypek.roles.highest.position > message.member.roles.highest.position) return message.channel.send("**BOOP**: Nemôžeš zaútočiť na: " + oznacenytypek.username + ". Zanechal si mu akurát tak **ping**.");
  if (oznacenytypek.id == message.author.id) return message.reply("Nemôžeš na seba zaútočiť.");
  RandomSelect =  ["<:BoopSomeone:833733370420265021> | Člen **" + oznacenytypek.username + "** bol položený na zem členom **" + message.author.username + "**", "<:BoopSomeone:833733370420265021> | Člen **" + oznacenytypek.username + "** dostal K.O. členom **" + message.author.username + "**"];
  if (!args.length) return message.channel.send(RandomSelect[Math.floor(Math.random()*RandomSelect.length)]);
  message.channel.send(RandomSelect[Math.floor(Math.random()*RandomSelect.length)]+", "+args.slice().join(' '));
}
module.exports.help = {
  name: 'boop',
  aliases: ['bp'],
  description: 'Zaútočí na teba moja ruka.',
  usage: '=boop <mention> (dôvod)',
};