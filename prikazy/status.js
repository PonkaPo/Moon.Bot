const Discord = require("discord.js");
let OwnerID = "409731934030135306";
let ActivitySet, StatusSet;
let StatusArray = ["idle", "online", "dnd", "invisible"];
let ActivitiesArray = ["PLAYING", "STREAMING", "LISTENING", "WATCHING", "CUSTOM_STATUS", "COMPETING"];

module.exports.run = async (client,message, args) => {
    message.delete();
    if (message.author.id != OwnerID) return message.channel.send("Sorko, "+message.author.username+" ale nemôžeš šahať na ten command <:Redheart:846414934644228127>");
    if (!args.length) return message.channel.send("Ale však si nič nezadal čo by si dal do statusu").then(msg => { msg.delete({ timeout: 7000 }) });
    if (StatusArray.includes(args[0])) {
      StatusSet = args[0];
      args.shift();
    } else {
      StatusSet = "online";
    }
    if (ActivitiesArray.includes(args[0])) {
      ActivitySet = args[0];
      args.shift();
    } else {
      ActivitySet = "PLAYING";
    }
    statusargs = args.join(" ");
    message.client.user.setPresence({
      activity:{
        name: statusargs
      }, 
      type:{
        name: ActivitySet
      }, 
        status: StatusSet 
    })
      .then(console.log)
      .catch(console.error);
    let statusembedset = new Discord.MessageEmbed()
      .setColor('#F9A3BB')
      .setTitle('Zmena Statusu')
      .setDescription("Mám teraz po novom tento neskutočne super status:\n" + statusargs)
    message.channel.send(statusembedset).then(msg => { msg.delete({ timeout: 7000 }) });
};
module.exports.help = {
  name: 'status',
  description: 'Zmení status bota.',
  usage: '=status <správa>'
};