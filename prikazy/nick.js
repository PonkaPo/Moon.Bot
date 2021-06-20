const Discord = require("discord.js");
let NickChange, mentioneduser;
module.exports.run = async (client,message,args) => {
  if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('**NICK**: Nemám permissiu `MANAGE_NICKNAMES`');
  if (message.mentions.users.first()) {
    mentioneduser = message.mentions.users.first();
    if (!message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('**NICK**: Nemáš permissiu `MANAGE_NICKNAMES`');
    if ((mentioneduser.roles.highest.position || message.member.roles.highest.position) > message.guild.members.resolve(message.client.user).roles.highest.position) return message.channel.send('**NICK**: '+mentionedusername+' -> má vyššiu rolu ako ja, takže nemôžem mu zmeniť nick.');
    args.shift();
  } else {
    mentioneduser = message.author;
    if (!message.member.hasPermission('CHANGE_NICKNAME')) return message.channel.send('**NICK**: Nemáš permissiu `CHANGE_NICKNAME` aby si mohol meniť nick.');
  }
  if (!args[0]) {
    const resetembednick = new Discord.MessageEmbed()
      .setColor('#F9A3BB')
      .setTitle('Nick')
      .setDescription(mentioneduser.username + ' má odstránený nick')
    message.channel.send(resetembednick);
    message.guild.members.cache.get(mentioneduser.id).setNickname("");
    return;
  }
  let nickReason = args.join(" ");
  let nickchecksum = args.slice().join('');
  if (nickchecksum.length > 32) return message.channel.send("**NICK**: Nick nesmie byť dlhší ako 32 znakov.");
  if (mentioneduser.id !== message.author.id) {
    NickChange = '-> '+nickReason+'\nZadrel mu ho: '+message.author.username;
  } else {
    NickChange = '-> '+nickReason;
  }
  try {
    message.guild.members.cache.get(mentioneduser.id).setNickname(nickReason);
    const nickembed = new Discord.MessageEmbed()
      .setColor('#F9A3BB')
      .setTitle('Nový nick pre ' + mentioneduser.username)
      .setDescription(NickChange)
    message.channel.send(nickembed);
    return;
  } catch(err) { return message.channel.send('**NICK** - Tu máš ten zasratí error:\n' + err); }
}
module.exports.help = {
  name: 'nick',
  description: 'Dám mu nick, aký len bude chcieť mu dať.',
  usage: '=nick <nick> (dôvod)'
};