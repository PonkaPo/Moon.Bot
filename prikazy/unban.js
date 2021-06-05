const Discord = require("discord.js");

module.exports = {
  name: 'ban',
  description: 'Zabanuje člena zo servera.',
  usage: '=ban <mention> (dôvod)',
  async execute(message, args) {
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      message.channel.send('**UNBAN**: <@'+message.author.id+'> -> Nemáš permissiu `BAN_MEMBERS`');
      return;
    }
    if (message.mentions.users.first()) {
      if (message.mentions.users.first().id == message.author.id) return message.channel.send(message.author.username+", nemôžeš sebe dať unban ...");
      if (message.mentions.members.first().roles.highest.position > message.member.roles.highest.position) {
        message.channel.send('**UNBAN**: <@'+message.author.id+'> -> Tento týpek má vyššiu rolu než ty.');
        return;
      }
        args.shift();
        let dovodna = args.slice().join(" ");
        message.guild.member(message.mentions.users.first()).unban();
        let SuccBan = new Discord.MessageEmbed()
          .setColor("#F9A3BB")
          .setTitle('UNBAN')
          .setDescription('Týpek ' + message.guild.member(message.mentions.users.first()).user.username + " bol zabanovaný zo servera: " + dovodna);
        try {
          message.client.users.cache.get(message.mentions.users.first().id).send(message.guild.name+' **BAN** -> _'+dovodna+'_');
          message.channel.send(SuccBan);
        } catch(err) {
          console.log(err);
          message.channel.send(SuccBan);
        }
      return;
    } else {
      message.channel.send('**BAN**: <@'+message.author.id+'> -> Neoznačil si more človeka, ktorého chceš zabanovať.');
    }
	},

}