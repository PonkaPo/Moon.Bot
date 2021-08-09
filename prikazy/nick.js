const Discord = require("discord.js");
let NickChange, mentioneduser;
module.exports.run = async (client,message,args) => {
  if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send("**NICK**: I missing `MANAGE_NICKNAMES`permission.");
  if (message.mentions.members.first()) {
    mentioneduser = message.mentions.members.first();
    args.shift();
    if (args.length === 0) {
      if ((mentioneduser.roles.highest.position > message.guild.members.resolve(message.client.user).roles.highest.position) && (mentioneduser.user.id == message.guild.ownerID)) return message.channel.send('**NICK**: Mentioned member '+mentioneduser.user.username+' has higher role than me.');
      message.channel.send("**NICK**: "+mentioneduser.username+' has removed nick');
      return message.guild.members.cache.get(mentioneduser.id).setNickname("");
    }
  } else {
    if (args.length === 0) {
      if (message.member.roles.highest.position > message.guild.members.resolve(message.client.user).roles.highest.position) return message.channel.send('**NICK**: You has higher role than me.');
      message.channel.send("**NICK**: "+mentioneduser.username+' has removed nick');
      return message.guild.members.cache.get(mentioneduser.id).setNickname("");
    }
    mentioneduser = message.author;
  }
  if (!message.member.hasPermission('CHANGE_NICKNAME')) return message.channel.send("**NICK**: You missing `CHANGE_NICKNAME` permission.");
  let nickReason = args.join(" ");
  let nickchecksum = args.slice().join('');
  if (nickchecksum.length > 32) return message.channel.send("**NICK**: Nick can't be longer than 32 characters.");
  if (mentioneduser.id !== message.author.id) {
    if (!message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send("**NICK**: You missing `MANAGE_NICKNAMES` permission.");
    NickChange = '-> '+nickReason+'\nChanged by: '+message.author.username;
  } else {
    NickChange = '-> '+nickReason;
  }
  try {
    message.guild.members.cache.get(mentioneduser.id).setNickname(nickReason);
    message.channel.send("**NICK**: New nick for "+mentioneduser.username+NickChange);
    return;
  } catch(err) {
    return message.channel.send('**NICK** - Error occured:\n' + err); }
}
module.exports.help = {
  name: 'nick',
  description: 'Dám mu nick, aký len bude chcieť mu dať.',
  usage: '=nick <nick> (dôvod)'
};