const { Permissions } = require("discord.js");
let deleteCount;
module.exports.run = async (client, message, args) => {

	if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send({
		content: '**DELETE**: I do not have `MANAGE_MESSAGES` permission to perform this action.'
	});

	if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send({
		content: '**DELETE**: You do not have `MANAGE_MESSAGES` permission to perform this action, '+message.author.username
	});
	if (!args) return message.channel.send({
		content: "**DELETE**: You did not write number of messages you want to remove. (Maximum 100 messages)"
	});
	
	deleteCount = parseInt(args[0], 10);
	if((!deleteCount || deleteCount < 1 || deleteCount >= 100)) return;
	deleteCount++;

	const fetched = await message.channel.messages.fetch({
		limit: deleteCount
	});
	message.channel.bulkDelete(fetched).catch(error => message.channel.send({
		content: `There was error performing delete operating: ${error}`
	}));

	message.channel.send({
		content: "**DELETE**: Successfully deleted "+deleteCount+" messeges."
	}).setTimeout(() => message.delete(), 5000);
}
module.exports.help = {
	name: 'delete',
	aliases: ['del', 'clear'],
	description: 'Vymažeš určitý počet správ.',
	usage: '=delete <číslo>',
};