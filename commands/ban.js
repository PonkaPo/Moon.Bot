const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require("discord.js");
let reason;

module.exports = {
    name: "ban",
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("ban an user")
        .addUserOption(option => option.setName("target").setDescription("Select user to ban").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("Reason for ban").setRequired(false)),
    permission: "BAN_MEMBERS",
    async execute(interaction) {
        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({
            content: '**Ban**: I do not have a `BAN_MEMBERS` permission to ban someone.'
        });
        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({
            content: '**Ban**: You do not have a permission `BAN_MEMBERS` to ban someone'
        });

        let user = interaction.options.getUser('target');
        if (!user) return interaction.reply({
            content: '**Ban**: You did not mentioned anybody to ban'
        });
        if (user.id == interaction.user.id) return interaction.reply({
            content: "**Ban**: Why you would like to ban yourself?"
        });
        if (interaction.guild.members.resolve(user).roles.highest.position > interaction.member.roles.highest.position) return interaction.reply({
            content: '**Ban**: Mentioned member has higher role than you, '+interaction.user.username
        });
        if (!interaction.guild.members.resolve(user).bannable) return interaction.reply({
            content: '**Ban**: Mentioned member ('+user.username+') cannot be banned.'
        });
        
        if(interaction.options.getString("reason")) {
            reason = interaction.options.getString("reason");
        } else reason = "Reason wasn't been provided.";

        try {
            interaction.guild.members.ban(user, {reason: reason});
            return interaction.reply({
                embeds: [{
                    title: "Ban",
                    color: "#F9A3BB",
                    description: "Member "+user.username+" has been banned:\n"+reason,
                }]
            });
        } catch {
            return interaction.reply({
                content: "**Ban** Member "+user.username+" couldn't been banned."
            });
        };
    }
};