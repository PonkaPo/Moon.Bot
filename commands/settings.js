const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const roles = require("../functions/roles.js");
const warn_f = require("../functions/warns.js");
const basic = require("../functions/basic.js");
let warns_string, j, check_difference;
let DB_Access_Array = [];
let Member_Roles_Array = [];
let SettingsInfo = new MessageEmbed().setColor("#F9A3BB").setFooter("More settings will be available in future.");

module.exports = {
    name: "settings",
    data: new SlashCommandBuilder().setName("settings").setDescription("Bot settings for actual Guild")
        .addSubcommandGroup(
            (group) => group.setName("poll").setDescription("Change poll settings for this guild")
        
            .addSubcommand((subcommand) => 
                subcommand.setName("channel").setDescription("Channel for polls")
                    .addStringOption(option => option.setName("option").setDescription("Options for Channel settings").addChoices([
                        ["Edit (Channel option is required here)", "edit"],
                        ["View", "view"]
                    ]).setRequired(true))
                    .addChannelOption(option => option.setName("channel").setDescription("Set channel for polls"))
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
        .addSubcommandGroup(
            (group) => group.setName("warns").setDescription("Change Warns settings for this guild")
            .addSubcommand(
                (subcommand) => subcommand.setName("on").setDescription("Turn on Warns.")
            )
            .addSubcommand(
                (subcommand) => subcommand.setName("off").setDescription("Turn Off Warns.")
            )
            .addSubcommand(
                (subcommand) => subcommand.setName("reset").setDescription("Turn Off Warns.")
                .addStringOption(
                    option => option.setName("option").setDescription("Options for reset").addChoices([
                        ["Reset Target warns", "reset_target"],
                        ["Reset warns for All", "reset_all"]
                    ]).setRequired(true)
                )
                .addUserOption(option => option.setName("target").setDescription("Target user (use only for reset)"))
            )
        )

        .addSubcommandGroup(
            (group) => group.setName("access").setDescription("Set up roles to access bot settings")

            .addSubcommand(option => option.setName("add").setDescription("Add role to access bot settings")
                .addRoleOption(option => option.setName("role").setDescription("Target role").setRequired(true))
            )

            .addSubcommand(option => option.setName("remove").setDescription("Remove role from access bot settings")
                .addRoleOption(option => option.setName("role").setDescription("Target role").setRequired(true))
            )

            .addSubcommand(option => option.setName("list").setDescription("List of roles with access to bot settings"))
        ),
    async execute(interaction, DB) {
        if((interaction.user.id !== interaction.guild.ownerId) && (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))) {
            let check_for_access = await basic.check_for_access(DB, interaction.guild.id);
            if((check_for_access.length == 0) && (interaction.user.id !== interaction.guild.ownerId)) {
                SettingsInfo.setTitle("Settings").setDescription("You don't have access to the bot settings.\n**Warning** - There are currently no roles set up which can access Bot settings.\n(Owner & Administator will bypass any roles check & they can edit access settings through /settings access command)");
                return interaction.reply({
                    embeds: [SettingsInfo]
                });
            } else {
                for(let i = 0; i<check_for_access.length; i++) {
                    DB_Access_Array[i] = check_for_access[i]["role_id"];
                }
            }
            interaction.member.roles.cache.map(role => Member_Roles_Array.push(role.id));
            check_difference = DB_Access_Array.filter(element => Member_Roles_Array.includes(element));
            if(check_difference.length == 0) {
                SettingsInfo.setTitle("Settings").setDescription("You don't have access to the bot settings.");
                return interaction.reply({
                    embeds: [SettingsInfo]
                });
            }
        }
        switch(interaction.options.getSubcommandGroup()) {
            case 'poll':
                switch(interaction.options.getSubcommand()) {
                    case 'channel':
                        switch(interaction.options.getString("option")) {
                            case 'edit':
                                if(interaction.options.getChannel("channel") == null) {
                                    SettingsInfo.setTitle("Settings => Poll => Channel").setDescription("You didn't selected which channel should be used for polls.");
                                    return interaction.reply({
                                        embeds: [SettingsInfo]
                                    });
                                }
                                let poll_channel = interaction.options.getChannel("channel");
                                DB.query("UPDATE `discord`.`servers` SET `poll_channel` = '"+poll_channel.id+"' WHERE `server_id` = '"+interaction.guild.id+"'");
                                SettingsInfo.setDescription("Selected channel: \n<#"+poll_channel+">");
                                return interaction.reply({
                                    embeds: [SettingsInfo]
                                });
                            case 'view':
                                DB.query("SELECT `poll_channel` FROM `discord`.`servers`WHERE `server_id` = '"+interaction.guild.id+"'", function (error, result) {
                                    if(error) console.log(error);
                                    SettingsInfo.setTitle("Settings => Poll => Channel").setDescription("Actual channel for polls:\n<#"+result[0]["poll_channel"]+">");                            
                                    return interaction.reply({
                                        embeds: [SettingsInfo]
                                    });
                                });
                                break;
                        }
                        break;
                    case 'role':
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
                }
                break;
            case 'warns':
                switch(interaction.options.getSubcommand()) {
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
                        return interaction.reply({
                            embeds: [SettingsInfo]
                        });
                    case 'reset':
                        switch(interaction.options.getString("option")) {
                            case 'reset_target':
                                if(interaction.options.getUser("target") == null) {
                                    SettingsInfo.setTitle("Bot Settings => Warns => Reset").setDescription("You didn't provide target to remove warns from.");
                                    return interaction.reply({
                                        embeds: [SettingsInfo]
                                    });
                                } else {
                                    let target_for_warn = interaction.options.getUser("target");
                                    DB.query("DELETE FROM `discord_warns_"+interaction.guild.id+"`.`"+target_for_warn.id+"`");
                                    SettingsInfo.setTitle("Bot Settings => Warns => Reset").setDescription("Successfully deleted all warns for <@"+target_for_warn+">");
                                    return interaction.reply({
                                        embeds: [SettingsInfo]
                                    });
                                }
                            case 'reset_all':
                                if(interaction.user.id !== interaction.guild.ownerId) {
                                SettingsInfo.setTitle("Bot Settings => Warns => Reset").setDescription("Only Owner of this Guild can reset all stored warns for all members.");
                                return interaction.reply({
                                    embeds: [SettingsInfo]
                                });
                            } else {
                                DB.query("DELETE FROM `discord_warns_"+interaction.guild.id+"`");
                                SettingsInfo.setTitle("Bot Settings => Warns => Reset").setDescription("**ALL** Warns has been removed.");
                                return interaction.reply({
                                    embeds: [SettingsInfo]
                                });
                            }
                        }
                }
                break;
            case 'access':
                switch(interaction.options.getSubcommand()) {
                    case 'add':
                        await roles.enable_access(DB, interaction.guild.id, interaction.options.getRole("role").id);
                        SettingsInfo.setTitle("Bot Settings => Access => Add Role").setDescription("Added access for role <@&"+interaction.options.getRole("role").id+"> to access Bot settings.");
                        return interaction.reply({
                            embeds: [SettingsInfo]
                        });
                    case 'remove':
                        await roles.delete_access(DB, interaction.guild.id, interaction.options.getRole("role").id);
                        SettingsInfo.setTitle("Bot Settings => Access => Remove Role").setDescription("Remove access for role <@&"+interaction.options.getRole("role").id+"> to access Bot settings.");
                        return interaction.reply({
                            embeds: [SettingsInfo]
                        });
                    case 'list':
                        let list_of_roles = await roles.check_if_settings_table_exists(DB,interaction.guild.id);
                        if(list_of_roles == 0) {
                            SettingsInfo.setTitle("Bot Settings => Access => List of Roles").setDescription("There are no access roles set up.");
                        } else {
                            SettingsInfo.setTitle("Bot Settings => Access => List of Roles");
                            for(let i = 0; i < list_of_roles.length; i++) {
                                j = i+1;
                                SettingsInfo.addField("**"+j+"**.", "<@&"+list_of_roles[i]["role_id"]+">");
                            }
                        }
                        interaction.reply({
                            embeds: [SettingsInfo]
                        });
                        j = 1;
                        return SettingsInfo = new MessageEmbed().setColor("#F9A3BB").setFooter("More settings will be available in future.");
                    default:
                        SettingsInfo.setTitle("Bot Settings => Access").setDescription("`add` - Add role to access bot settings.\n`remove` - Delete role, which already has access to bot settings.\n`list` - Shows all roles, that have access to the bot settings.");
                        return interaction.reply({
                        embeds: [SettingsInfo]
                        });
                }
        }
    }
};