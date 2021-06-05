const Discord = require("discord.js");

module.exports = {
  name: 'delete',
  description: 'Vymažeš určitý počet správ.',
  usage: '=delete <číslo>',
  async execute(message, args) {
	if (message.member.hasPermission('MANAGE_MESSAGES')) {
	const delembedmsg = new Discord.MessageEmbed()
		.setColor('#F9A3BB')
		.setTitle('Delete')
		.setDescription('Koľko správ chceš vymazať? Maximálne 100 správ.')
	if (!args.length) {
		message.channel.send(delembedmsg).then(msg => {
			msg.delete({ timeout: 10000 })
		  })
		return;
	}
	deleteCount = parseInt(args[0], 10);
	const delmsgconfirm = new Discord.MessageEmbed()
		.setColor('#F9A3BB')
		.setTitle('Delete')
		.setDescription('Odstránil som toľkoto správ: ' + deleteCount)
	if(!deleteCount || deleteCount < 1 || deleteCount > 100)
	return message.channel.send(delembedmsg);
	deleteCount++;
	const fetched = await message.channel.messages.fetch({limit: deleteCount});
	message.channel.bulkDelete(fetched).catch(error => message.channel.send(`Nastala chyba ty kok, práve tu: ${error}`));
	message.channel.send(delmsgconfirm).then(msg => {
		msg.delete({ timeout: 5000 })
	  })
	} else {
		message.delete();
		const delembedmsgnoperm = new Discord.MessageEmbed()
			.setColor('#F9A3BB')
			.setTitle('Delete')
			.setDescription('Nemáš more právo mazať správy.')
		message.channel.send(delembedmsgnoperm);
	}
	},

}