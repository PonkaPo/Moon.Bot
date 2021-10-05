const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const roles = require("../functions/roles.js");
const levels = require("../functions/levels.js");
const basic = require("../functions/basic.js");
const warn_f = require("../functions/warns.js");
let if_rr_table_exists, warns_string, lvl_number, role, list_of_assigned_rr, actual_channel;
let SettingsInfo = new MessageEmbed().setColor("#F9A3BB").setFooter("More settings will be available in future.");

module.exports = {
    data: new SlashCommandBuilder().setName("settings").setDescription("Bot settings for actual Guild")
        .addSubcommandGroup(
            (group) => group.setName("poll").setDescription("Change poll settings for this guild")
        
            .addSubcommand((subcommand) => 
                subcommand.setName("channel").setDescription("Channel for polls")
                    .addChannelOption(option => option.setName("channel").setDescription("Set channel for polls"))
                    .addStringOption(option => option.setName("same").setDescription("Will be used same as actual channel").addChoice("Same", "same"))
                    .addStringOption(option => option.setName("view").setDescription("Show actual channel for polls").addChoice("get", "get"))
            )
            
            .addSubcommand((subcommand) =>
                subcommand.setName("role").setDescription("Role to mention")
                    .addRoleOption(option => option.setName("role").setDescription("Mention target role"))
                    .addStringOption(option => option.setName("non-role").setDescription("Set non role mention").addChoices([
                        ["Here (mention only online members)", "here"], 
                        ["Everyone (mention all members", "everyone"]
                    ]))
            )
        )
        
        .addSubcommand((subcommand) => 
            subcommand.setName("warns").setDescription("Related settings for warns")
            .addStringOption(option => option.setName("option").setDescription("Options for warns settings").addChoices([
                ["On", "on"], 
                ["Off", "off"], 
                ["Reset (WARNING - this is removing all stored warns, when there's no user provided, be CAREFUL!)", "reset"]
            ]).setRequired(true))
            .addUserOption(option => option.setName("target").setDescription("Target user (use only for reset)"))
        )

        .addSubcommandGroup((group) => group.setName("access").setDescription("Set up roles to access bot settings")

            .addSubcommand(option => option.setName("add").setDescription("Add role to access bot settings")
                .addRoleOption(option => option.setName("role").setDescription("Target role"))
            )

            .addSubcommand(option => option.setName("remove").setDescription("Remove role from access bot settings")
                .addRoleOption(option => option.setName("role").setDescription("Target role"))
            )

            .addSubcommand(option => option.setName("list").setDescription("List of roles with access to bot settings"))
        ),
    async execute(interaction, DB) {
        if(interaction.options.getSubcommandGroup("access")) {
            if((interaction.options.getSubcommand("add") && interaction.options.getSubcommand("remove") && interaction.options.getSubcommand("list")) == null) {
                SettingsInfo.setTitle("Bot Settings => Access").setDescription("`add` - Add role to access bot settings.\n`remove` - Delete role, which already has access to bot settings.\n`list` - Shows all roles, that have access to the bot settings.");
                return interaction.reply({
                    embeds: [SettingsInfo]
                });
            }

            if(interaction.options.getSubcommand("add") == "add") {
                if(!interaction.options.getRole("role")) {
                    SettingsInfo.setTitle("Bot Settings => Access => Add Role").setDescription("You didn't mention role to add access.");
                        return interaction.reply({
                            embeds: [SettingsInfo]
                        });
                } else {
                    await roles.write_settings_role_into_table(DB, interaction.guild.id, interaction.options.getRole("role").id);
                    SettingsInfo.setTitle("Bot Settings => Access => Add Role").setDescription("Added role <@&"+interaction.options.getRole("role").id+"> to access Bot settings.");
                    return interaction.reply({
                        embeds: [SettingsInfo]
                    });
                }
            }

            if(interaction.options.getSubcommand("remove") == "remove") {
                if(!interaction.options.getRole("role")) {
                    SettingsInfo.setTitle("Bot Settings => Access => Remove Role").setDescription("You didn't mention role to remove access.");
                        return interaction.reply({
                            embeds: [SettingsInfo]
                        });
                } else {
                    await roles.delete_settings_role_from_table(DB, interaction.guild.id, interaction.options.getRole("role").id);
                    SettingsInfo.setTitle("Bot Settings => Access => Add Role").setDescription("Added role <@&"+interaction.options.getRole("role").id+"> to access Bot settings.");
                    return interaction.reply({
                        embeds: [SettingsInfo]
                    });
                }
            }

            if(interaction.options.getSubcommand("list") == "list") {
                let list_of_roles = await roles.check_if_settings_table_exists(DB,interaction.guild.id);
                if(list_of_roles == 0) {
                    SettingsInfo.setTitle("Bot Settings => Access => List of Roles").setDescription("There are no access roles set up.");
                } else {
                    for(let i = 0; i < list_of_roles.length; i++) {
                        SettingsInfo.addField("**"+i+"**.", "<@&"+list_of_roles[i]["role_id"]+">");
                    }
                }
                return interaction.reply({
                    embeds: [SettingsInfo]
                });
            }
        }

        if(interaction.options.getSubcommandGroup("poll")) {
            if(interaction.options.getSubcommand("channel") !== null) {
                if((interaction.options.getString("same") && interaction.options.getString("view")) == null) {
                    let poll_channel = interaction.options.getChannel("channel");
                    DB.query("UPDATE `discord`.`servers` SET `poll_channel` = '"+poll_channel.id+"' WHERE `server_id` = '"+interaction.guild.id+"'");
                    SettingsInfo.setDescription("Selected channel: "+poll_channel);
                    return interaction.reply({
                        embeds: [SettingsInfo]
                    });
                } else {
                    if(interaction.options.getString("same") !== null) {
                        DB.query("UPDATE `discord`.`servers` SET `poll_channel` = 'same' WHERE `server_id` = '"+interaction.guild.id+"'");
                        SettingsInfo.setDescription("Selected channel: "+interaction.options.getString("same"));
                        return interaction.reply({
                            embeds: [SettingsInfo]
                        });
                    }
                    DB.query("SELECT `poll_channel` FROM `discord`.`servers`WHERE `server_id` = '"+interaction.guild.id+"'", function (error, result) {
                        if(error) console.log(error);
                        if(result[0]["poll_channel"] == "same") {
                            actual_channel = "<#"+result[0]["poll_channel"]+">"
                        } else actual_channel = "same";
                        SettingsInfo.setDescription("Actual channel: "+actual_channel);
                        return interaction.reply({
                            embeds: [SettingsInfo]
                        });
                    });                    

                }
                
            }
            
            if(interaction.options.getRole("role") !== null) {
                if(interaction.options.getString("non-role") !== null) {
                    if(interaction.options.getString("non-role") == "here") {
                        DB.query("UPDATE `discord`.`servers` SET `poll_mention` = 'here' WHERE `server_id` = '"+interaction.guild.id+"'");

                        SettingsInfo.setTitle("Settings => Poll => Role").setDescription("Bot will  use `here` to mention on every new asked poll.");
                        return interaction.reply({
                            embeds: [SettingsInfo]
                        });
                    }

                    if(interaction.options.getString("non-role") == "everyone") {
                        DB.query("UPDATE `discord`.`servers` SET `poll_mention` = '-' WHERE `server_id` = '"+interaction.guild.id+"'");

                        SettingsInfo.setTitle("Settings => Poll => Role").setDescription("Bot will  use `everyone` to mention on every new asked poll.");
                        return interaction.reply({
                            embeds: [SettingsInfo]
                        });
                    }
                } else {
                    DB.query("UPDATE `discord`.`servers` SET `poll_mention` = '"+interaction.options.getRole("role").id+"' WHERE `server_id` = '"+interaction.guild.id+"'");
                    
                    SettingsInfo .setTitle("Settings => Poll => Role").setDescription("Bot will automatically use <@&"+interaction.options.getRole("role").id+"> role to every new asked poll.");
                    return interaction.reply({
                        embeds: [SettingsInfo]
                    });
                }
            }

            SettingsInfo.setTitle("Settings => Poll").setDescription("You can choose from 2 settings (and check if the bot have permission to mention roles, here or everyone):\n1. Everyone (use: `settings poll role everyone`)\n2. Here (use: `settings poll role here`)\n3. Role mention (use: `settings poll role <role>`)");
            return interaction.reply({
                embeds: [SettingsInfo]
            });
        }

        if(interaction.options.getSubcommand("warns") == "warns") {
            console.log("1")
            let warns = interaction.options.getString("option");
            switch(warns) {
                case 'on':
                    warns_string = "yes"
                    await warn_f.check_for_warns_db(DB, interaction.guild, warns_string);
                    SettingsInfo.setTitle("Bot Settings => Warns").setDescription("Successfully enabled `Warns` for this Guild.");
                    return interaction.reply({
                        embeds: [SettingsInfo]
                    });
                case 'off':
                    warns_string = "no"
                    await warn_f.check_for_warns_db(DB, interaction.guild, warns_string);
                    SettingsInfo.setTitle("Bot Settings => Warns").setDescription("Successfully disabled `Warns` for this Guild.");
                    return message.channel.send({
                        embeds: [SettingsInfo]
                    });
                case 'reset':
                    if(interaction.options.getUser("target") !== null) {
                        let target_for_warn = interaction.options.getUser("target");
                        DB.query("DELETE FROM `discord_warns_"+interaction.guild.id+"`.`"+target_for_warn.id+"`");
                        SettingsInfo.setTitle("Bot Settings => Warns => Reset").setDescription("Successfully deleted all warns from "+target_for_warn);
                        return interaction.reply({
                            embeds: [SettingsInfo]
                        })
                        
                    } else {
                        DB.query("DROP TABLE `discord_warns_"+interaction.guild.id+"`");
                        DB.query("CREATE TABLE `discord_warns_"+interaction.guild.id+"`");

                        SettingsInfo.setTitle("Bot Settings => Warns => Reset").setDescription("**ALL** Warns has been removed.");
                        return interaction.reply({
                            embeds: [SettingsInfo]
                        });
                    }
                default:
                    SettingsInfo.setTitle("Bot Settings => Warns => Reset").setDescription("`all` - **Warning** => This option will remove all stored warns for all users.\n`member` - Removes all members warns.");
                    return interaction.reply({
                        embeds: [SettingsInfo]
                    });
            }
            
        }
    }
}       