const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "serverinfo",
    data: new SlashCommandBuilder()
        .setName("serverinfo").setDescription("Show server information"),
    async execute(interaction) {

        let guildicon = interaction.guild.iconURL({ format: 'png'});
        let serverembed = new MessageEmbed()
            .setTitle(interaction.guild.name+"'s Informations")
            .setColor(`#F9A3BB`)
            .setThumbnail(guildicon)
		    .addField('**Owner** | **Owner ID** ', "<@"+interaction.guild.ownerId+"> | "+interaction.guild.ownerId, false)
		    .addField('**Server Name** | **Date of creation**', interaction.guild.name+" | "+interaction.guild.createdAt.toLocaleDateString(), false)
		    .addField('**Members** | **Roles** | **Channels**', interaction.guild.memberCount.toString()+" | "+interaction.guild.roles.cache.size.toString()+" | "+interaction.guild.channels.cache.size.toString(), false)
		    .addField('**Notifications** | **Verification**', interaction.guild.defaultMessageNotifications+" | "+interaction.guild.verificationLevel, false)
            .setFooter("Server ID: "+interaction.guildId);

        return interaction.reply({
            embeds: [serverembed]
        });
    }
}