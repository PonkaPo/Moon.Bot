const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const warns = require('../functions/warns.js');
let mentioned, warn_option;
let all_warns = "";
let WarnEmbed = new MessageEmbed().setColor("#F9A3BB");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("warns").setDescription("All warn commands")
        .addSubcommand(subcommand => subcommand.setName("warn").setDescription("warns a member")
            .addUserOption(member => member.setName("target").setDescription("Member to warn").setRequired(true))
            .addStringOption(option => option.setName("option").setDescription("add/remove").addChoices([
                ["Add a warn", "add"],
                ["Remove a warn", "remove"]
            ]).setRequired(true))
            .addStringOption(option => option.setName("reason").setDescription("Add reason to warn (IT'S MANDATORY, not optional, when adding warn to a user)"))
            .addStringOption(option => option.setName("uid").setDescription("uID of warn to remove (IT'S MANDATORY, not optional, when removing warn to a user)")))
        .addSubcommand(subcommand => subcommand.setName("list").setDescription("List warns of a member")
            .addUserOption(member => member.setName("target").setDescription("list warns of target").setRequired(true))),
    async execute(interaction, DB) {
        let check_if_warns_are_enabled = await warns.check_for_warns_db(DB, interaction.guild);
        if(check_if_warns_are_enabled[0]["enabled_warns"] == "no") {
            WarnEmbed.setDescription("Warns are disabled for this Guild.");
            return interaction.reply({
                embeds: [WarnEmbed]
            });
        }
        
        if(interaction.options.getSubcommand("warn") !== 0) {
            mentioned = interaction.options.getUser("target");
            warn_option = interaction.options.getString("option");
            switch(warn_option) {
                case 'add':
                    if(interaction.options.getString("reason") = 0) {
                        WarnEmbed.setDescription("**Add Warn** You need to provide reason, it's mandatory.");
                        return interaction.reply({
                            embeds: [WarnEmbed]
                        });
                    } else {
                        await warns.check_if_user_exists_in_db(DB, mentioned.user.id, interaction.guild.id);
                        let uID_result = await create_uniqueID();
                        await warns.write_warn_data(DB, interaction.user.id, uID_result, interaction.options.getString("reason"), mentioned.user.id, interaction.guild.id);
                        WarnEmbed.setDescription("**Warned member:**\n<@"+mentioned.user.id+">").addField("Warned by:", "<@"+interaction.author.id+">").addField("Reason:", interaction.options.getString("reason")).setFooter("uID: "+uID_result);
                        return interaction.reply({
                            embeds: [WarnEmbed]
                        }).then(WarnEmbed = new MessageEmbed().setTitle("Warn").setColor("#F9A3BB").setTimestamp());
                    }
                case 'remove':
                    if(interaction.options.getString("uID") == 0) {
                        WarnEmbed.setDescription("**Remove Warn** You need to provide `uID` to remove warn.");
                        return interaction.reply({
                            embeds: [WarnEmbed]
                        });
                    } else {
                        await warns.delete_warn_data(DB, mentioned, interaction.guild.id, interaction.options.getString("uid"));
                        WarnEmbed.setDescription("Successfully removed warn with uID: "+interaction.options.getString("uid"));
                        return interaction.reply({
                            embeds: [WarnEmbed]
                        });
                    }
            }
            
        }

        if(interaction.options.getSubcommand("list") != 0) {
            mentioned = interaction.options.getUser("target");
            await warns.check_if_user_exists_in_db(DB, mentioned.user.id, interaction.guild.id);
            let warns_list = await warns.fetch_warns(DB, mentioned.user.id, interaction.guild.id);
            if(warns_list == 0) {
                all_warns = "This user doesn't have stored any warns";
                WarnEmbed.setTitle(mentioned.user.username+"'s Warns:").setDescription(all_warns);
            } else {
                for(let i = 0; i < warns_list.length; i++) {
                    all_warns = all_warns+"`"+warns_list[i]["reason"]+"`"+" | by: <@"+warns_list[i]["By"]+"> | uID: **"+warns_list[i]["uID"]+"** \n"
                }
                WarnEmbed.setTitle(mentioned.user.username+"'s Warns:").setDescription(all_warns);
            }
            all_warns = "";
        return interaction.reply({
            embeds: [WarnEmbed]
        });
        }
    }
}

function create_uniqueID() {
    var create_result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    for ( var i = 0; i < 8; i++ ) {
      create_result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return create_result;
}