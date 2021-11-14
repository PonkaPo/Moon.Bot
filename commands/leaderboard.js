const { MessageEmbed } = require("discord.js");
const levels = require("../functions/levels.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
let i;
let j = 1;

module.exports = {
    name: "leaderboard",
    data: new SlashCommandBuilder()
    .setName("leaderboard").setDescription("Leaderboard for chat activity"),
    async execute(interaction, DB) {
        const leaderboard_stats = await levels.check_stats_for_lb(DB, interaction);
        let  LBEmbed = new MessageEmbed()
            .setTitle("Leaderboard")
            .setColor("#F9A3BB")
		    .setThumbnail(interaction.client.user.displayAvatarURL())
            .setDescription("Top "+leaderboard_stats.length+" most active members in chat:")
		    .setFooter(`Requested by `+interaction.user.username);

        for(i = 0; i < leaderboard_stats.length; i++) {
            LBEmbed.addField("**"+j+"**.", "<@"+leaderboard_stats[i]["user_id"]+"> => "+leaderboard_stats[i]["xp_level"]+" (XP: "+leaderboard_stats[i]["xp_remain"]+"/"+leaderboard_stats[i]["xp_exp"]+")");
            j++;
        }
        j = 1;

        return interaction.reply({
            embeds: [LBEmbed]
        });
    }   
}