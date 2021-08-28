module.exports.run = async (client,message,args) => {

  if (!message.mentions.members.first()) return message.channel.send({
    content: "*Hug**: You didn't wrote who you want to hug."
  });

  if (message.mentions.members.first().id == message.author.id) return message.channel.send({
    content: "**Hug**: You can't hug yourself 🙁."
  });
  if (message.mentions.members.first().bot == true) {
    SendThis = "<:lyra_bonbon_hug:842048414871060530> | **"+message.author.username+"** hugged bot **"+ message.mentions.users.first().username+"**";
  } else {
    SendThis = "<:lyra_bonbon_hug:842048414871060530> | **"+message.author.username+"** hugged user **"+ message.mentions.users.first().username+"**";
  }
  
  message.delete();
  args.shift();

  if (!args.length) {

    message.channel.send({
      content: SendThis
    });

  } else {

    let HugArgs = args.slice().join(' ');
    message.channel.send({
      content: SendThis+", because "+HugArgs
    });

  }

}
module.exports.help = {
  name: 'hug',
  description: 'Budeš sa z objať z označenou osobou.',
  usage: '=hug <mention>'
};