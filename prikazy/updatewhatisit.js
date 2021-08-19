const Discord = require("discord.js");
const sfunctions = require("../functions/server.js");
module.exports.run = async (client,message,args,DBConnection) => {
  console.log(!message.member.hasPermission("MANAGE_GUILD") || !message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR"));
  if(!message.member.hasPermission("MANAGE_GUILD") || !message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**UpdateWhatIsIt**: Sorry, but you can't change this in this Guild <:Redheart:846414934644228127>");
  message.delete();
  msg = await message.channel.send("**UpdateWhatIsIt**: Write `Key` what they want to guess: (1 word, max 50 characters long)");
  var key_msg = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
  var key_msg1 = await key_msg.first();
  key_msg1.delete();
  if(key_msg1.content.indexOf(" ") !== -1) return message.channel.send("**UpdateWhatIsIt**: Key cannot contain `space`.");
  if(key_msg1.content.length > 50) return message.channel.send("**UpdateWhatIsIt**: Key cannot be longer than 50 characters long.");
  msg.edit("**UpdateWhatIsIt**: Write `Hint` which will help others to guess the key: (max 1000 characters long)");
  var hint_msg = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
  var hint_msg1 = await hint_msg.first();
  hint_msg1.delete();
  if(hint_msg1.content.length > 1000) return message.channel.send("**UpdateWhatIsIt**: Hint cannot be longer than 1000 characters long.");
  sfunctions.send_wii_data(DBConnection,message,key_msg1,hint_msg1).then(send_data => {
    const whatisit_update = new Discord.MessageEmbed()
      .setColor('#F9A3BB')
      .setTitle('Update: What is it')
      .setDescription("Key: **"+key_msg1.content+"**\nHint: **"+hint_msg1.content+'**\nNumber of letters: **'+key_msg1.content.length+"**\nWrote: <@"+message.author.id+">");
    msg.edit("Recapitulation:", {embed: whatisit_update}).then(msg => {
      setTimeout(() => msg.delete(), 5000);
    });
    return;
  });
}
module.exports.help = {
  name: 'updatewhatisit',
  aliases: ["updatewii", "uwii"],
  description: 'Updatuje informácie pre hru Čo to je.',
  usage: '=updatewhatisit <answer> <hint>',
};