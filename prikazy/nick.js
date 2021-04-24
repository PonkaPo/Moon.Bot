const Discord = require("discord.js");

module.exports = {
  name: 'nick',
  description: 'Dám mu nick, aký len bude chcieť mu dať.',
  usage: '=nick <nick> (dôvod)',
  async execute(message, args) {
      message.delete();
      if (message.member.hasPermission('MANAGE_NICKNAMES')) {
        if (message.mentions.users.first()) {
        let mentioneduserid = message.mentions.users.first().id;
        let mentionedusername = message.mentions.users.first().username;
        if (message.mentions.members.first().roles.highest.position > message.guild.members.resolve(message.client.user).roles.highest.position) {
          const cannotduetopermissions = new Discord.MessageEmbed()
            .setColor('#7162ba')
            .setTitle('Nick')
            .setDescription('Označený uživateľ (' + mentionedusername + ') má vyššiu rolu ako ja, takže nemôžem mu zmeniť nick')
          message.channel.send(cannotduetopermissions);
          return;
        }
        if (!args[1]) {
            const resetembednick = new Discord.MessageEmbed()
              .setColor('#7162ba')
              .setTitle('Nick')
              .setDescription(mentionedusername + ' má odstránený nick')
            message.channel.send(resetembednick);
            message.guild.members.cache.get(mentioneduserid).setNickname("");
            return;
        }
          args.shift();
          let nickReasonmanage = args.join(" ");
          if (mentioneduserid == "746409149507567632" && message.author.id == "409731934030135306") {
            const nickembedself = new Discord.MessageEmbed()
              .setColor('#7162ba')
              .setTitle('Nový nick pre mňa')
              .setDescription('Dostal som tento cool nick: ' + nickReasonmanage)
            message.channel.send(nickembedself);
            message.guild.members.cache.get(mentioneduser).setNickname(nickReasonmanage);
            return;
          }
          try {
            message.guild.members.cache.get(mentioneduserid).setNickname(nickReasonmanage);
            const nickembed = new Discord.MessageEmbed()
              .setColor('#7162ba')
              .setTitle('Nový nick pre ' + mentionedusername)
              .setDescription('Nový nick: ' + nickReasonmanage + '\nZadrel mu ho: ' + message.author.username)
            message.channel.send(nickembed);
          } catch(err) {
            const errnickembed = new Discord.MessageEmbed()
              .setColor('#7162ba')
              .setTitle('Nick')
              .setDescription('Tu máš ten zasratí error: ' + err)
            message.channel.send(errnickembed);
          }
          return;
        } else {
          if (message.member.roles.highest.position > message.guild.members.resolve(message.client.user).roles.highest.position) {
            const cannotduetopermissionsself = new Discord.MessageEmbed()
              .setColor('#7162ba')
              .setTitle('Nick')
              .setDescription('Máš vyššiu rolu ako ja, takže nemôžem tebe zmeniť nick')
            message.channel.send(cannotduetopermissionsself);
            return;
          }
          console.log("1-3");
          if (!args[0]) {
            console.log("1-4");
              const resetembednickself = new Discord.MessageEmbed()
                .setColor('#7162ba')
                .setTitle('Nick')
                .setDescription(message.author.username + ' má odstránený nick')
              message.channel.send(resetembednickself);
              message.guild.members.cache.get(message.member.id).setNickname("");
              return;
          }
          console.log("1-5");
          let nickReasonmanageself = args.join(" ");
          try {
            message.guild.members.cache.get(message.author.id).setNickname(nickReasonmanageself);
            const nickembedselfmanage = new Discord.MessageEmbed()
              .setColor('#7162ba')
              .setTitle('Nový nick pre ' + message.author.username)
              .setDescription('Nový nick: ' + nickReasonmanageself)
            message.channel.send(nickembedselfmanage);
          } catch(err) {
            const errnickembed = new Discord.MessageEmbed()
              .setColor('#7162ba')
              .setTitle('Nick')
              .setDescription('Tu máš ten zasratí error: ' + err)
            message.channel.send(errnickembed);
          }
          return;
        }
      } else {
        if (message.member.hasPermission('CHANGE_NICKNAME')) {
          if (message.mentions.users.first()) {
            let mentioneduseridself = message.mentions.users.first().id;
            if (mentioneduseridself != message.author.id) {
              const notsameidnick = new Discord.MessageEmbed()
                .setColor('#7162ba')
                .setTitle('Nick')
                .setDescription('Nemôžeš meniť inému nick.')
              message.channel.send(notsameidnick);
              return;
            } else {
              if (message.member.id = message.author.ownerID) return message.channel.send("Nemôžem meniť nick vlastníkovi servera.");
              args.shift();
              let nickmyself = args.join(" ");
              message.member.setNickname(nickmyself);
              const myselfermnickembed = new Discord.MessageEmbed()
                .setColor('#7162ba')
                .setTitle('Nick')
                .setDescription('Zadrel som tebe tento nový nick: ' + nickmyself)
              message.channel.send(myselfermnickembed);
            }
          } else {
            if (!args[0]) {
                const resetembednick = new Discord.MessageEmbed()
                  .setColor('#7162ba')
                  .setTitle('Nick')
                  .setDescription(message.author.username + ' má odstránený nick')
                message.channel.send(resetembednick);
                message.guild.members.cache.get(message.member.id).setNickname("");
                return;
            }
            let nickmyselfnotag = args.join(" ");
            message.member.setNickname(nickmyselfnotag);
            const myselfermnickembednotag = new Discord.MessageEmbed()
              .setColor('#7162ba')
              .setTitle('Nick')
              .setDescription('Zadrel som tebe tento nový nick: ' + nickmyselfnotag)
            message.channel.send(myselfermnickembednotag);
          }
        } else {
          const nopermnickembed = new Discord.MessageEmbed()
          .setColor('#7162ba')
          .setTitle('Nick')
          .setDescription('Nemáš permissiu `CHANGE_NICKNAME` aby si mohol meniť nick.')
        message.channel.send(nopermnickembed);
        return;
        }
      }
	},
}