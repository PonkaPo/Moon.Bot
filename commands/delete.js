const { Permissions } = require("discord.js");
let deleteCount;
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("delete")
        .setDescription("Delete messages from actual channel")
        .addIntegerOption(option => option.setName("amount").setDescription("Amount of messages to delete (max 100)").setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({
            content: '**Delete**: You do not have `MANAGE_MESSAGES` permission to perform this action'
        });
        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({
            content: '**Delete**: I do not have `MANAGE_MESSAGES` permission to perform this action.'
        });
        if(!interaction.options.getInteger("amount")) return interaction.reply({
            content: "**Delete** Please write amount how much messages you want to delete (max 100)"
        });

        deleteCount = interaction.options.getInteger("amount");
        if((!deleteCount || deleteCount < 1 || deleteCount >= 100)) return;

        const fetched = await interaction.channel.messages.fetch({
            limit: deleteCount
        });

        interaction.channel.bulkDelete(fetched).catch(error => interaction.channel.send({
            content: `There was error performing delete operating: ${error}`
        }));

        return interaction.reply({
            content: "**Delete**: Successfully deleted "+deleteCount+" messeges."
        });
    }
}