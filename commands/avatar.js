const { SlashCommandBuilder } = require('@discordjs/builders');
let avatarSelect;
module.exports = {
	data: new SlashCommandBuilder()
		.setName("avatar")
		.setDescription("Sends your avatar in embed")
		.addUserOption(option => option.setName("target").setDescription("Get avatar of target")),
	async execute(interaction) {
		if (interaction.options.getUser("target") == null) {
			avatarSelect = interaction.user;
		} else avatarSelect = interaction.options.getUser("target");
		return interaction.reply({
			embeds: [{
				color: '#F9A3BB',
				title: avatarSelect.username+"'s avatar",
				image: {
					url: avatarSelect.displayAvatarURL({ dynamic: true })
				}
		}]});

	}
};