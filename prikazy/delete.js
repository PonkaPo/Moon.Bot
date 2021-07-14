let deleteCount;
module.exports.run = async (client, message, args) => {
	if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('**DELETE**: I do not have `MANAGE_MESSAGES` permission to perform this action.');
	if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('**DELETE**: You do not have `MANAGE_MESSAGES` permission to perform this action, '+message.author.username);
	if (!args) return message.channel.send("**DELETE**: You did not write number of messages you want to remove. (Maximum 100 messages)").then(msg => { msg.delete({ timeout: 10000 }) });
	deleteCount = parseInt(args[0], 10);
	if(!(!deleteCount || deleteCount < 1 || deleteCount >= 100)) return;
	deleteCount++;
	const fetched = await message.channel.messages.fetch({limit: deleteCount});
	message.channel.bulkDelete(fetched).catch(error => message.channel.send(`There was error performing delete operating: ${error}`));
	message.channel.send("**DELETE**: Successfully deleted "+fetched+" messeges.").then(msg => { msg.delete({ timeout: 5000 }) });
}
module.exports.help = {
	name: 'delete',
  aliases: ['ctj'],
  description: 'Vymažeš určitý počet správ.',
  usage: '=delete <číslo>',
};