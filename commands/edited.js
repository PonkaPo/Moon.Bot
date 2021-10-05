const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName("edited").setDescription("See latest saved edited message from this channel"),
    async execute(interaction, DB, msg_edits_array) {
        if(!msg_edits_array[interaction.guildId]) msg_edits_array[interaction.guildId] = {}; //Initialize Guild in the array to store    
        console.log(msg_edits_array[interaction.guildId]);
        if(!msg_edits_array[interaction.guildId] && !msg_edits_array[interaction.guildId][interaction.channelId] && !msg_edits_array[interaction.guildId][interaction.channelId]["new"] && !msg_edits_array[interaction.guildId][interaction.channelId]["old"]){
            
            if(!msg_edits_array[interaction.guildId][interaction.channelId]) msg_edits_array[interaction.guildId][interaction.channelId] = {}; //Initialize Channel from Guild in the array to store
            return interaction.reply({
                content: "**Edited** There are no stored edited messages for this Guild"
            });
        }
        console.log(msg_edits_array[interaction.guildId][interaction.channelId].length);
        if(!msg_edits_array[interaction.guildId][interaction.channelId].length) {
            return interaction.reply({
                content: "**Edited** There are no stored edited messages for this Channel"
            });
        } else {
            return interaction.reply({
                embeds: [{
                    author: {
                        name: msg_edits_array[interaction.guildId][interaction.channelId]["name"],
                        icon_url: msg_edits_array[interaction.guildId][interaction.channelId]["name-pfp"],
                    },
                    title: "New:",
                    description: msg_edits_array[interaction.guildId][interaction.channelId]["new"],
                    fields: [
                        {
                            name: 'Old:',
                            value: msg_edits_array[interaction.guildId][interaction.channelId]["old"],
                        }
                    ]
                }]
            });
        }
        
    }
}