const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const levels = require("../functions/levels.js");
let SelectedMember;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("level")
        .setDescription("Get chat level for selected member (or yourself)")
        .addUserOption(option => option.setName("target").setDescription("Select target to get their chat level")),
    async execute(interaction, DB) {
        if(!interaction.options.getUser("target")) {
            SelectedMember = interaction.user;
        } else {
            SelectedMember = interaction.options.getUser("target");
        }
        let LVLEmbed = new MessageEmbed().setTitle(SelectedMember.username+"'s Stats").setColor("#F9A3BB")
        levels.check_lvl_user_stats_forP(DB, interaction, SelectedMember).then(lvl => {
            
            LVLEmbed.setDescription("Your stats for chat activity").addField("Level:","**"+lvl[0]["xp_level"]+"**").addField("XP:","**"+lvl[0]["xp_remain"]+"**/**"+(lvl[0]["xp_exp"])+"**");
            
            return interaction.reply({
                embeds: [LVLEmbed]
            });
        })
        .catch(error => {
            LVLEmbed.setDescription("This person doesn't have any level data.");
            return interaction.reply({
                embeds: [LVLEmbed]
            });
        });

    }
}