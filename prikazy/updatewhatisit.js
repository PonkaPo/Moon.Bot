const { MessageEmbed } = require("discord.js");
const sfunctions = require("../functions/server.js");
let UpdateWII = new MessageEmbed().setTitle("Update => What Is It").setColor('#F9A3BB').setFooter("Use `cancel` to exit.");

module.exports.run = async (client,message,args,DBConnection) => {
  
  if(!message.member.hasPermission("MANAGE_GUILD") || !message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) {
    UpdateWII.setDescription("Sorry, but you can't change this in this Guild <:Redheart:846414934644228127>");
    return message.channel.send({
      embeds: [UpdateWII]
    });
  }

  const msgfilter = m => m.author.id === message.author.id && m.author.bot !== true;

  UpdateWII.setDescription("Key: - (thing that others will need to guess - (1 word, max 50 characters long)\nHint: -");
  let wii_msg = await message.channel.send({
    embeds: [UpdateWII]
  });
  var key_msg = await sfunctions.collect_message(message, msgfilter);
  key_msg.delete();
  if(key_msg.content.indexOf(" ") !== -1) {
    UpdateWII.setDescription("Key cannot contain `space`.");
    return wii_msg.edit({
      embeds: [UpdateWII]
    });
  }
  if(key_msg.content.length > 50) {
    UpdateWII.setDescription("Key cannot be longer than `50 characters`.");
    return message.channel.send({      
      embeds: [UpdateWII]
    });
  }
  UpdateWII.setDescription("Key: `"+key_msg.content+"`\nHint: - (Hint is required to help others to guess what the correct answer is - max `1000` characters)");
  wii_msg.edit({
    embeds: [UpdateWII]
  });
  var hint_msg = await sfunctions.collect_message(message, msgfilter);
  if(hint_msg.content.length > 1000) {
    UpdateWII.setDescription("Hint cannot be longer than `1000 characters`.");
    return message.channel.send({
      embeds: [UpdateWII]
    });
  }

  sfunctions.send_wii_data(DBConnection,message,key_msg1,hint_msg1);

  UpdateWII.setDescription("Key: `"+key_msg.content+"`\nHint: `"+hint_msg.content+"`");  
  return wii_msg.edit({
    embeds: [UpdateWII]
  }).setTimeout(() => message.delete(), 5000);
};

module.exports.help = {

  name: 'updatewhatisit',
  aliases: ["updatewii", "uwii"],
  description: 'Updatuje informácie pre hru Čo to je.',
  usage: '=updatewhatisit <answer> <hint>'

};