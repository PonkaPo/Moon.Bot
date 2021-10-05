const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("random")
        .setDescription("Random Number Generator")
        .addIntegerOption(option => option.setName("min").setDescription("Minimum number").setRequired(true))
        .addIntegerOption(option => option.setName("max").setDescription("Maximum number").setRequired(true)),
    async execute(interaction) {
        if(interaction.options.getInteger("min") == interaction.options.getInteger("max")) return interaction.reply({
            content: "**Random** You must provide 2 different numbers."
        });
        if(interaction.options.getInteger("min") > interaction.options.getInteger("max")) return interaction.reply({
            content: "**Random** Minimal number must be less than the maximum number."
        });

	    return interaction.reply({
		    embeds: [{
                color: '#F9A3BB',
                title: "Random number",
                description: 'Generated number: **'+(Math.floor(Math.random()*(interaction.options.getInteger("max")-interaction.options.getInteger("min"))+interaction.options.getInteger("min")))+"**",
                timestamp: new Date(),
                footer: {
                    text: 'Range: '+interaction.options.getInteger("min")+' and '+interaction.options.getInteger("max")
                }
            }]
	    });
    }
};