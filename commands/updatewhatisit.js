const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { send_wii_data } = require('../functions/basic.js');
let UpdateWII = new MessageEmbed().setTitle("Update => What Is It").setColor('#F9A3BB').setFooter("Use `cancel` to exit.");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("updatewii").setDescription("Update details for game What is it")
        .addStringOption(option => option.setName("key").setDescription("Answer key for guessing (no spaces allowed)").setRequired(true))
        .addStringOption(option => option.setName("hint").setDescription("Hint for guessing the key  (1 word, max 50 characters long)").setRequired(true)),
    async execute(interaction,DB) {
        if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) && !interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && !interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            UpdateWII.setDescription("Sorry, but you can't change this in this Guild <:Redheart:846414934644228127>");
            return interaction.reply({
              embeds: [UpdateWII]
            });
        }

        if(interaction.options.getString("key").indexOf(' ') >= 0) {
            UpdateWII.setDescription("Key cannot contain `space`.");
            return interaction.reply({
                embeds: [UpdateWII]
            });
        }

        await send_wii_data(DB, interaction, interaction.options.getString("key"), interaction.options.getString("hint"));

        UpdateWII.setDescription("Key: `"+interaction.options.getString("key")+"`\nHint: `"+interaction.options.getString("hint")+"`");  
        interaction.reply({
            embeds: [UpdateWII],
            ephemeral: true
        });
        return interaction.followUp("<:pinkie_yes:852973753465831474>");
    }   
}