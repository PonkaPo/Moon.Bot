const { Permissions } = require("discord.js");
let reason;
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("kick an user")
        .addUserOption(option => 
            option.setName("target")
                .setDescription("Select user to kick")
                .setRequired(true))
        .addStringOption(option => 
            option.setName("reason")
                .setDescription("Reason for ban")                
                .setRequired(false)),
    async execute(interaction) {
        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({
            content: '**Kick**: I do not have a `KICK_MEMBERS` permission to ban someone.'
        });
        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({
            content: '**Kick**: You do not have a permission `KICK_MEMBERS` to ban someone'
        });

        let user = interaction.options.getUser('target');
        if (!user) return interaction.reply({
            content: '**Kick**: You did not mentioned anybody to kick'
        });
        if (user.id == interaction.user.id) return message.channel.send({
            content: "**Kick**: Why you would like to kick yourself?"
        });
        if (interaction.guild.members.resolve(user).roles.highest.position > interaction.member.roles.highest.position) return message.channel.send({
            content: '**Kick**: Mentioned member has higher role than you'
        });
        if (!interaction.guild.members.resolve(user).bannable) return message.channel.send({
            content: '**Kick**: Mentioned member ('+user.username+') cannot be banned.'
        });
        
        if(interaction.options.getString("reason")) {
            reason = interaction.options.getString("reason");
        } else reason = "Reason wasn't been provided.";

        try {
            interaction.guild.members.kick(user, {reason: reason});
            return interaction.reply({
                embeds: [{
                    title: "Kick",
                    color: "#F9A3BB",
                    description: "Member "+user.username+" has been kicked:\n"+reason,
                }]
            });
        } catch {
            return interaction.reply({
                content: "**Kick** Member "+user.username+" couldn't been kicked."
            });
        };
    }
};