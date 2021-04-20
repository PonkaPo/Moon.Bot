const Discord = require("discord.js");

module.exports = {
  name: 'say',
  description: 'Poviem čo len budeš chcieť.',
  usage: '=say <správa>',
  async execute(message, args) {
    message.delete({ timeout: 0 });

    let sprava = args.slice().join(' ');
    if(!sprava){
      let notomute = new Discord.MessageEmbed()
        .setColor("#7162ba")
        .setAuthor('Say')
        .setDescription('`=say <správa>`')
      return message.channel.send(notomute);
    }
  
    let SayEmbed = new Discord.MessageEmbed()
    .setColor("#7162ba")
    .setAuthor(message.author.username)
    .setDescription(sprava)
    await message.channel.send(SayEmbed);
	},

}