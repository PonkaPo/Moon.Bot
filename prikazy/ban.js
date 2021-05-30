const Discord = require("discord.js");

module.exports = {
  name: 'ban',
  description: 'Zabanuje člena zo servera.',
  usage: '=ban <mention> (dôvod)',
  async execute(message, args) {
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      message.channel.send('**BAN**: <@'+message.author.id+'> -> Nemáš permissiu `BAN_MEMBERS`');
      return;
    }
    if (message.mentions.users.first()) {
      if (message.mentions.users.first().id == message.author.id) return message.channel.send("TO prečo by si sebe dával ban, "+message.author.username+"? To kde sme ...");
      if (message.mentions.members.first().roles.highest.position > message.member.roles.highest.position) {
        message.channel.send('**BAN**: <@'+message.author.id+'> -> Tento týpek má vyššiu rolu než ty.');
        return;
      }
      if (!message.guild.member(message.mentions.users.first()).bannable) {
        message.channel.send('**BAN**: <@'+message.author.id+'> -> Toho týpka nemôže vykopnúť.');
      } else {
        args.shift();
        let dovodna = args.slice().join(" ");
        message.guild.member(message.mentions.users.first()).ban();
        let SuccBan = new Discord.MessageEmbed()
          .setColor("#7162ba")
          .setTitle('BAN')
          .setDescription('Týpek ' + message.guild.member(message.mentions.users.first()).user.username + " bol zabanovaný zo servera: " + dovodna);
        try {
          message.client.users.cache.get(message.mentions.users.first().id).send(message.guild.name+' **BAN** -> _'+dovodna+'_');
          message.channel.send(SuccBan);
        } catch(err) {
          console.log(err);
          message.channel.send(SuccBan);
        }
      }
      return;
    } else {
      message.channel.send('**BAN**: <@'+message.author.id+'> -> Neoznačil si ale človeka, ktorého chceš zabanovať.');
    }
	},

}