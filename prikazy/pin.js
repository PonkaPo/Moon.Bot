let CheckForNumbers;
module.exports.run = async (client,message, args) => {

  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send({
    content: "**PIN**: You don't have access to this command."
  });

  if (!args.length) {

    message.delete();
    client.channels.resolve(message.channel.id).messages.fetch({ limit: 2 }).then(messages => {

      let lastMessage = messages.last();
      if (!lastMessage.content.length && !lastMessage.attachments.size > 0) return message.channel.send({
        content: "**PIN**: Last message was empty."
      });
      lastMessage.pin();

    });

  } else {

    CheckForNumbers = args[0];
    if (!hasNumber(CheckForNumbers)) return message.channel.send({
      content: "**PIN**: ID can contains only numbers."
    });
    message.channel.messages.fetch(args[0])

      .then(msg => {
        msg.pin()
      })

      .catch(error => {
        if (error.code == '10008') return message.channel.send({
          content: "**PIN**: This message is not located in this channel."
        });
      });

  }

};

module.exports.help = {
  name: 'pin',
  aliases: ['p'],
  description: 'Pinne poslednú/podľa ID správu.',
  usage: '=pin'
};

function hasNumber(CheckForNumbers) {
  return /^[0-9]+$/.test(CheckForNumbers);
};