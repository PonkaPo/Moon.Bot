const { MessageEmbed } = require("discord.js");
const sfunctions = require("../functions/server.js");
const msgfilter = m => m.author.id === message.author.id && m.author.bot !== true;

module.exports.run = async (client, message, args, DBConnection, prefix_check) => {
  message.delete();
  const whatisit_data = await sfunctions.check_game_data_wii(DBConnection, message);
  if(whatisit_data == 0) return message.channel.send("**WhatItIs**: Nobody wrote `key` what to guess.");
  var cotoje = new MessageEmbed()
    .setColor('#F9A3BB')
    .setTitle('What is it, '+message.author.username+'?')
    .setDescription('Hint: **'+whatisit_data[0]["hint"]+'**\nNumber of letters: **'+whatisit_data[0]["pass"].length+'**\nFirst Guess: '+whatisit_data[0]["first_guess"]+'\nwrote: <@'+whatisit_data[0]["wrote"]+">");
  var message_for_edit = await message.channel.send({
    embeds: [cotoje]
  });
  let msg_to_check = await sfunctions.collect_message(message, msgfilter);
  if(msg_to_check.content !== whatisit_data[0]["pass"]) {
      return msg_to_check.react("<:pinkie_no:852973704556183552>");
  } else {
    msg_to_check.delete();
    message_for_edit.edit({
      content: "Yay, you guessed it correctly, <@" + message.author.id + ">",
      embeds: []
    });
    if(whatisit_data[0]["first_guess"] == "-") {
      DBConnection.query("UPDATE `discord`.`whatisit` SET `first_guess` = '"+msg_to_check.author.username+"'");
    }
  }
}
module.exports.help = {
  name: 'whatisit',
  aliases: ['wii'],
  description: 'Hádacia hra Čo to je.',
  usage: '=whatisit',
};