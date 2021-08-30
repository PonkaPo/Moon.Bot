module.exports.run = async (client,message,args) => {

  if (!message.mentions.members.first()) return message.channel.send({
    content: "*Hug**: You didn't wrote who you want to hug."
  });

  let mentioned_user = message.mentions.members.first();
  
  if (mentioned_user.id == message.author.id) return message.channel.send({
    content: "**Hug**: You can't hug yourself 🙁."
  });
  if (mentioned_user.bot == true) {
    SendThis = "<:lyra_bonbon_hug:842048414871060530> | **"+message.author.username+"** hugged bot **"+ mentioned_user.username+"**";
  } else {
    SendThis = "<:lyra_bonbon_hug:842048414871060530> | **"+message.author.username+"** hugged **"+ mentioned_user.username+"**";
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