const Discord = require("discord.js");
let AllowedIds = ['422882850166276096', '409731934030135306', '478258433611661322', '699214855823163433', '532512473492750356'];

module.exports = {
  name: 'sendmsg',
  description: 'Napíšem správu tam kde budeš chcieť.',
  usage: '=sendmsg <ID kanálu> <správa>',
  async execute(message, args) {
    if(AllowedIds.includes(message.author.id)) {
      if (!args[0]) {
        const sendmsgno0 = new Discord.MessageEmbed()
            .setColor('#7162ba')
            .setTitle('Send Message')
            .setDescription('<@' + message.author.id + '>, Nenapísal si kanál, kam chceš správu napísať.')
          message.channel.send(sainoarg).then(msg => {
            msg.delete({ timeout: 5000 })
            })
        } else {
        firstargument = args[0];
        args.shift();
        const sendmsgarguments = args.join(" ");
        message.delete()
        message.client.channels.cache.get(firstargument).send(sendmsgarguments);
        }
    } else {
      message.channel.send("Nemáš povolenie na tento príkaz, <@" + message.author.id + ">");
    }
	},

}