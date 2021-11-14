const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { collect_message, check_game_data_wii } = require('../functions/basic.js');

module.exports = {
    name: "whatisit",
    data: new SlashCommandBuilder().setName("whatisit").setDescription("Guess the word - game"),
    async execute(interaction,DB) {
        let wii_data = await check_game_data_wii(DB, interaction);
        if(wii_data == 0) return interaction.reply({
            content: "**What Is It** Nobody wrote `key` what to guess."
        });
        let wii_embed = new MessageEmbed()
            .setColor('#F9A3BB')
            .setTitle('What is it, '+interaction.user.username+'?')
            .setDescription('Hint: **'+wii_data[0]["hint"]+'**\nNumber of letters: **'+wii_data[0]["pass"].length+'**\nFirst Guess: '+wii_data[0]["first_guess"]+'\nwrote: <@'+wii_data[0]["wrote"]+">");
        await interaction.reply({
            embeds: [wii_embed]
        });
        const msgfilter = m => m.user.id === interaction.user.id && interaction.user.bot === false;
        let collect_msg = await collect_message(interaction, msgfilter);
        if(collect_msg.content.toLowerCase() !== wii_data[0]["pass"]) {
            return collect_msg.react("<:pinkie_no:852973704556183552>");
        } else {
            collect_msg.delete();
            interaction.editReply({
                content: "<:FSyay:892065855033204756> You got it! :tada:",
                embeds: []
            });
            if(wii_data[0]["first_guess"] == "-") {
                DB.query("UPDATE `discord`.`whatisit` SET `first_guess` = '"+collect_msg.author.id+"'");
            }
        }
    }
}