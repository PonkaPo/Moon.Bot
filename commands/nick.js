const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require("discord.js");
let user;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nick")
        .setDescription("Change yours or somebody else's nickname")
        .addStringOption(option => option.setName("nick").setDescription("New nick (use 'none' to remove nick)").setRequired(true))
        .addUserOption(option => option.setName("target").setDescription("Change nickname of target")),
    async execute(interaction) {
        if(!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) return interaction.reply({
            content: "**Nick** I missing `MANAGE_NICKNAMES` permission."
        });
        
        if(!interaction.options.getUser("target")) {
            if (!interaction.member.permissions.has(Permissions.FLAGS.CHANGE_NICKNAME)) return interaction.reply({
                content: "**Nick** You missing `CHANGE_NICKNAME` permission."
            });
            user = interaction.user;
        } else {
            if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) return interaction.reply({
                content: "**Nick** You missing `MANAGE_NICKNAMES` permission."
            });
            user = interaction.options.getUser("target");
        }
        
        if (interaction.guild.members.resolve(user).roles.highest.position > interaction.member.roles.highest.position) return interaction.reply({
            content: '**Nick** Target member has higher role than you'
        });

        if(interaction.options.getString("nick") == "none") {
            interaction.guild.members.cache.get(user.id).setNickname("");
            return interaction.reply({
                content: "**Nick** "+user.username+" has removed nick now"
            });
        } else {
            if(interaction.options.getString("nick").length > 32) return interaction.reply({
                content: "**Nick** can't be longer than 32 characters."
            });
            try {
                interaction.guild.members.cache.get(user.id).setNickname(interaction.options.getString("nick"));
                return interaction.reply({
                    embeds: [{
                        title: "Nick",
                        description: "New => "+interaction.options.getString("nick"),
                        footer: {
                            text: "For "+user.username
                        }

                    }]
                });
            } catch(err) {
                return interaction.reply({
                    content: '**NICK** - Error occured:\n' + err
                });
            }
        }

    }
}