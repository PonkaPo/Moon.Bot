const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "edited",
    data: new SlashCommandBuilder().setName("edited").setDescription("See latest saved edited message from this channel"),
    async execute(interaction, DB, store_images, store_2, msg_edits_array) {
        if(!msg_edits_array[interaction.guildId]) msg_edits_array[interaction.guildId] = {}; //Initialize Guild in the array to store
        if(!msg_edits_array[interaction.guildId][interaction.channelId]){
            if(!msg_edits_array[interaction.guildId][interaction.channelId]) msg_edits_array[interaction.guildId][interaction.channelId] = {}; //Initialize Channel from Guild in the array to store
            return interaction.reply({
                content: "**Edited** There are no stored edited messages for this Guild"
            });
        } else {
            return interaction.reply({
                embeds: [{
                    author: {
                        name: msg_edits_array[interaction.guildId][interaction.channelId]["name"],
                        icon_url: msg_edits_array[interaction.guildId][interaction.channelId]["name-pfp"],
                    },
                    description: "**New:** "+msg_edits_array[interaction.guildId][interaction.channelId]["new"]+"\n**Old:** "+msg_edits_array[interaction.guildId][interaction.channelId]["old"]
                }]
            });
        }
        
    }
}