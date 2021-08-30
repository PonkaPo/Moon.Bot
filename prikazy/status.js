const { MessageEmbed } = require("discord.js");
let OwnerID = "409731934030135306";
let ActivitySet, StatusSet;
let StatusArray = ["idle", "online", "dnd", "invisible"];
let ActivitiesArray = ["PLAYING", "STREAMING", "LISTENING", "WATCHING", "COMPETING"];

module.exports.run = async (client,message, args) => {
    message.delete();
    if (message.author.id != OwnerID) return message.channel.send({
      content: "**Status**: You can't use this command <:Redheart:846414934644228127>"
    });
    if (!args.length) return message.channel.send({
      content: "**Status**: You didn't write any text to put in status."
    }).setTimeout(() => message.delete(), 5000);
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
      .catch(console.error);
    let statusembedset = new MessageEmbed()
      .setColor('#F9A3BB')
      .setTitle('Status')
      .setDescription("Status: "+StatusSet+"\nType: "+ActivitySet+"\nActivity: "+statusargs)
    message.channel.send({
      embeds: [statusembedset]
    }).setTimeout(() => message.delete(), 7000);
};
module.exports.help = {
  name: 'status',
  description: 'Zmení status bota.',
  usage: '=status (status) (Aktivita) <správa>'
};