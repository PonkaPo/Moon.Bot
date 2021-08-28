const { MessageEmbed } = require("discord.js");
const sfunctions = require("../functions/server.js");

module.exports.run = async (client, message, args, DBConnection, prefix_check) => {
  message.delete();
  const whatisit_data = await sfunctions.check_game_data_wii(DBConnection, message);
  if(whatisit_data == 0) return message.channel.send("**WhatItIs**: Nobody wrote `key` what to guess.");
  var cotoje = new MessageEmbed()
    .setColor('#F9A3BB')
    .setTitle('What is it, '+message.author.username+'?')
    .setDescription('Hint: **'+whatisit_data[0]["hint"]+'**\nNumber of letters: **'+whatisit_data[0]["pass"].length+'**\nFirst Guess: '+whatisit_data[0]["first_guess"]+'\nwrote: <@'+whatisit_data[0]["wrote"]+">");
  var message_for_edit = await message.channel.send({embeds: [cotoje]});
  await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 }).then(msg => { 
    checkmsg = msg.first();
    console.log(msgcheck);
    if(checkmsg.content !== whatisit_data[0]["pass"]) {
      return checkmsg.react("<:pinkie_no:852973704556183552>");
    } else {
      checkmsg.delete();
      message_for_edit.edit("Yay, you guessed it correctly, <@" + message.author.id + ">");
      if(whatisit_data[0]["first_guess"] == "-") {
        DBConnection.query("UPDATE `discord`.`whatisit` SET `first_guess` = '"+checkmsg.author.username+"'");
      }
    }
  })
}
module.exports.help = {
  name: 'whatisit',
  aliases: ['wii'],
  description: 'Hádacia hra Čo to je.',
  usage: '=whatisit',
};