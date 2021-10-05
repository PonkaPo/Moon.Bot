const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require("discord.js");
let CheckForNumbers;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pin")
        .setDescription("Pin last sent message in the channel")
        .addIntegerOption(option => option.setName("id").setDescription("Pin message by ID").setRequired(false)),
    async execute(interaction) {
        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({
            content: '**Pin** I do not have a `MANAGE_MESSAGES` permission to ban someone.'
        });
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({
            content: "**Pin** You can't pin messages in this channel."
        });
        if(!interaction.options.getInteger("id")){
            interaction.client.channels.resolve(interaction.channelId).messages.fetch({ limit: 1 }).then(messages => {
                let lastMessage = messages.last();
                if(!lastMessage.content.length && !lastMessage.attachments.size > 0) return interaction.reply({
                    content: "**Pin** Last message is empty"
                });
                lastMessage.pin();
                return interaction.reply({
                    content: "Pinned!"
                });
            });
        } else {
            CheckForNumbers = interaction.options.getInteger("id");
            if (!hasNumber(CheckForNumbers)) return interaction.reply({
                content: "**Pin**: ID can contains only numbers."
            });
            interacion.channel.messages.fetch(CheckForNumbers).then(msg => {
                msg.pin();
                return interaction.reply({
                    content: "Pinned!"
                });
            }).catch(error => {
                if(error.code == "10008") return interaction.reply({
                    content: "**Pin** This message is not located in this channel."
                });
            });
        }
    }
}

function hasNumber(CheckForNumbers) {
    return /^[0-9]+$/.test(CheckForNumbers);
};