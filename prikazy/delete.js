let deleteCount;
module.exports.run = async (client, message, args) => {
	if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('**DELETE**: Nemám permissiu `MANAGE_MESSAGES`');
	if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('**DELETE**: <@'+message.author.id+'> -> Nemáš permissiu `MANAGE_MESSAGES`');
	if (!args.length) return message.channel.send("**DELETE**: Nenapísal si, koľko správ by si chcel odstrániť. (Maximálne 100 správ)").then(msg => { msg.delete({ timeout: 10000 }) });
	deleteCount = parseInt(args[0], 10);
	if(!(!deleteCount || deleteCount < 1 || deleteCount > 100)) return;
	deleteCount++;
	const fetched = await message.channel.messages.fetch({limit: deleteCount});
	message.channel.bulkDelete(fetched).catch(error => message.channel.send(`Nastala chyba ty kok, práve tu: ${error}`));
	message.channel.send("**DELETE**: Úspešne som odstránil "+fetched+" správ.").then(msg => { msg.delete({ timeout: 5000 }) });
}
module.exports.help = {
	name: 'delete',
  aliases: ['ctj'],
  description: 'Vymažeš určitý počet správ.',
  usage: '=delete <číslo>',
};