let AllowedIds = ['422882850166276096', '409731934030135306', '478258433611661322', '699214855823163433', '532512473492750356', '759689278572724225', '723265524213088412'];
let C_Emoji, EmojiResult, Allowed;
let C_Sprava = [];
let EditedArgs = [];
module.exports.run = async (client,message, args) => {
    if (!args.length || (args[0] == "-i" && args.length == 1)) return message.channel.send("**Say**: You didn't write any message");
    EditedArgs = args;
    if (args[0] == "-i") {
      if (message.member.hasPermission('MANAGE_MESSAGES') || AllowedIds.includes(message.author.id)) {
        EditedArgs.shift();
        Allowed = '';
      } else {
        return message.channel.send("**Say**: You don't have permission `MANAGE_MESSAGES` or permission to use `-i` argument.");
      }
    } else {
      Allowed = '**'+message.author.username+'**:';
    }
    for (let i = 0; i < EditedArgs.length; i++) {
      if ((String(args[i]).charAt(0) && args[i].slice(args[i].length-1) == ':')) {
        EmojiResult = EditedArgs[i].substring(1, EditedArgs[i].length-1);
        EmojiResult = client.emojis.cache.find(emoji => emoji.name === EmojiResult);
        C_Emoji = "<:" +EmojiResult.name+":"+EmojiResult.id+">";
        EditedArgs[i] = C_Emoji;
        C_Sprava[i] = EditedArgs[i];
      } else {
        C_Sprava[i] = EditedArgs[i];
      }
    }
    C_Sprava.unshift(Allowed);
    let C_Sprava_Full = C_Sprava.slice().join(" ");
    message.delete({ timeout: 0 });
    message.channel.send(C_Sprava_Full);
    C_Sprava = [];
};
module.exports.help = {
  name: 'say',
  aliases: ['s', 'sai'],
  description: 'Poviem čo len budeš chcieť.',
  usage: '=say <správa>'
};