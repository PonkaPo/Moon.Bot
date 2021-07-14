let AllowedIds = ['422882850166276096', '409731934030135306', '478258433611661322', '699214855823163433', '532512473492750356'];
let SpravaArgs;
module.exports.run = async (client,message, args) => {
    if (!args.length || (args[0] == "-i" && args.length == 1)) return message.channel.send("**Say**: You didn't write any message");
    if (args[0] == "-i") {
      if(!message.member.hasPermission('MANAGE_MESSAGES') || !AllowedIds.includes(message.author.id)) return message.channel.send("**Say**: You don't have permission `MANAGE_MESSAGES` to use this command with `-i` argument.");
      args.shift();
      SpravaArgs = args.slice().join(' ');
    } else {
      SpravaArgs = '**'+message.author.username+'**: '+args.slice().join(' ');
    }
    message.delete({ timeout: 0 });
    message.channel.send(SpravaArgs);
};
module.exports.help = {
  name: 'say',
  aliases: ['s', 'sai'],
  description: 'Poviem čo len budeš chcieť.',
  usage: '=say <správa>'
};