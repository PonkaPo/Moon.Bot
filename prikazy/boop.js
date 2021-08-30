module.exports.run = async (client,message,args) => {

  if (!message.mentions.members.first()) return message.channel.send({
    content: "**Boop**: You didn't wrote which member you want to boop."
  });

  args.shift();

  let mentioned = message.mentions.members.first();

  if (mentioned.id == message.client.user.id) return message.channel.send({
    content:"**Boop**: You can't boop me."
  });
  
  if (mentioned.roles.highest.position > message.member.roles.highest.position) return message.channel.send({
    content: "**Boop**: You can't boop "+mentioned.username+". You leave the user the **ghostping**."
  });
  
  if (mentioned.id == message.author.id) return message.channel.send({
    content: "**Boop**: You can't attack on yourself."
  });

  if (mentioned.bot == true) {

    SendBoop = "<:BoopSomeone:833733370420265021> | **"+message.author.username+"** booped bot **"+mentioned.user.username+"**" ;

  } else {

    SendBoop = "<:BoopSomeone:833733370420265021> | **"+message.author.username+"** booped **"+mentioned.user.username+"**";

  }
  
  if (!args.length) {

    message.channel.send({
      content: SendBoop
    });

  } else {

    message.channel.send({
      content: SendBoop+", "+args.slice().join(' ')
    });

  }
}
module.exports.help = {
  name: 'boop',
  aliases: ['att'],
  description: 'Zaútočí na teba moja ruka.',
  usage: '=utok <mention> (dôvod)',
};