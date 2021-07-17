let RandomSelect;
module.exports.run = async (client,message,args) => {
  if (!message.mentions.members.first()) return message.channel.send("**Boop**: You didn't wrote which member you want to boop.");
  args.shift();
  if (message.mentions.members.first().id == message.client.user.id) return message.channel.send("**Boop**: You can't attack me.");
  if (message.mentions.members.first().roles.highest.position > message.member.roles.highest.position) return message.channel.send("**Boop**: You can't boop "+message.mentions.members.first().username+". You leave the user the **ghostping**.");
  if (message.mentions.members.first().id == message.author.id) return message.reply("**Boop**: You can't attack on yourself.");
  if (message.mentions.members.first().bot == true) {SendBoop = "<:BoopSomeone:833733370420265021> | **"+message.author.username+"** booped bot **"+message.mentions.members.first().user.username+"**" ;} else {SendBoop = "<:BoopSomeone:833733370420265021> | **"+message.author.username+"** booped **"+message.mentions.members.first().user.username+"**";}
  if (!args.length) {
    message.channel.send(SendBoop);
  } else {
    message.channel.send(SendBoop+", "+args.slice().join(' '));
  }
}
module.exports.help = {
  name: 'boop',
  aliases: ['att'],
  description: 'Zaútočí na teba moja ruka.',
  usage: '=utok <mention> (dôvod)',
};