const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const roles = require("../functions/roles.js");
const levels = require("../functions/levels.js");
const basic = require("../functions/basic.js");
let LevelsInfo = new MessageEmbed().setColor("#F9A3BB").setFooter("More settings will be available in future.");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("levels").setDescription("Levels commands")
        .addSubcommand((subcommand) => 
            subcommand.setName("channel").setDescription("Related settings for levels => channel")
                .addChannelOption(option => 
                    option.setName("channel").setDescription("Set channel for levels"))
                .addStringOption(option => 
                    option.setName("non-channel").setDescription("This option is to set same - where is this command send/off - to turn sending new levels off").addChoices([
                        ["Same", "same"], 
                        ["Off", "off"]
                    ])
                )
        )
        .addSubcommand((subcommand) => 
            subcommand.setName("reset").setDescription("Reset user level OR all levels for chat activity in this guild")
                .addUserOption(user => user.setName("target").setDescription("Reset level for target"))
                .addStringOption(option => option.setName("all").setDescription("Reset all levels for chat activity in this guild").addChoice("All", "all"))
        )

        .addSubcommand((subcommand) => 
            subcommand.setName("on").setDescription("Enable levels for chat activity in this guild")
        )

        .addSubcommand((subcommand) => 
            subcommand.setName("off").setDescription("Disable levels for chat activity in this guild")
        )

        .addSubcommand((subcommand) => 
            subcommand.setName("rewards").setDescription("Rewards for gaining specific level in chat activity in this guild")
            .addStringOption(option => option.setName("setting").setDescription("Settings for Level Rewards").addChoices([
                ["Add", "add"], 
                ["List", "list"], 
                ["Remove", "remove"], 
                ["On", "on"], 
                ["Off", "off"], 
                ["Reset", "reset"]
            ]).setRequired(true))
            .addRoleOption(option => option.setName("role").setDescription("Target role to change settings for"))
            .addIntegerOption(integer => integer.setName("level").setDescription("Level number to choose for adding a role"))
        ),
    async execute(interaction, DB) {
        switch(interaction.options.getSubcommand()) {
            case 'channel':
                LevelsInfo.setTitle("Levels => Channel");
                if(interaction.options.getChannel("channel") == null) {
                    let s_o_channel = interaction.options.getString("non-channel");
                    DB.query("UPDATE `discord`.`servers` SET `levels_channel` = '"+s_o_channel+"' WHERE `server_id` = '"+interaction.guild.id+"'");
                    LevelsInfo.setDescription("Selected channel: "+s_o_channel);
                    return interaction.reply({
                        embeds: [LevelsInfo]
                    });
                } else {
                    if(interaction.options.getChannel("channel") !== null) {
                        DB.query("UPDATE `discord`.`servers` SET `levels_channel` = '"+interaction.options.getChannel("channel").id+"' WHERE `server_id` = '"+interaction.guild.id+"'");
                        LevelsInfo.setDescription("Selected channel: <#"+interaction.options.getChannel("channel")+">");
                        return interaction.reply({
                            embeds: [LevelsInfo]
                        });
                    } else {
                        LevelsInfo.setDescription("You didn't choose any channel.");
                        return interaction.reply({
                            embeds: [LevelsInfo]
                        });
                    }
                }
            case 'reset':
                if(interaction.options.getUser("target") !== null){
                    let user = interaction.options.getUser("target");
                    DB.query("DELETE * FROM `discord`.`"+interaction.guild.id+"` WHERE `user_id` = '"+user.id+"'");
                    LevelsInfo.setTitle("**Levels => Reset => User**").setDescription("You successfully reset <@"+user.id+">'s Level.");
                        return interaction.reply({
                            embeds: [LevelsInfo]
                        });
                } else {
                    if(interaction.user.id !== interaction.guild.ownerId) {
                        LevelsInfo.setTitle("**Levels => Reset**").setDescription("Only Owner ( <@"+interaction.guild.ownerId+"> ) can reset levels in this Guild.");
                        return interaction.reply({
                            embeds: [LevelsInfo]
                        });
                    }
                    await levels.delete_levels_from_table(DB, interaction.guild);
                    LevelsInfo.setTitle("**Levels => Reset**").setDescription("Reset completed successfully.");
                    return interaction.reply({
                        embeds: [LevelsInfo]
                    });
                }
            case 'on':
                if(interaction.user.id !== interaction.guild.ownerId) return interaction.reply({
                    content: "**Levels => Turn On**: You can't turn levels on for this Guild (only Owner can)."
                });
    
                DB.query("UPDATE `discord`.`servers` SET `enabled_levels` = 'yes' WHERE `server_id` = '"+interaction.guild.id+"'");
    
                return interaction.reply({
                    content: "**Levels** are turned on successfully."
                });
            case 'off':
                if(interaction.user.id !== interaction.guild.ownerId) return interaction.reply({
                    content: "**Levels => Turn Off**: You can't turn levels off for this Guild (only Owner can)."
                });
    
                DB.query("UPDATE `discord`.`servers` SET `enabled_levels` = 'no' WHERE `server_id` = '"+interaction.guild.id+"'");
    
                return interaction.reply({
                    content: "**Levels** are turned off successfully."
                });
            case 'rewards':
                let check_perm = await basic.check_for_role_mng_perm(interaction, Permissions);
                if (check_perm == false) {
                    LevelsInfo.setDescription("**Warning**: I missing `MANAGE_ROLES`, so I cannot continue.");
                    return interaction.reply({
                        embeds: [LevelsInfo]
                    });
                };
                let rewards_option = interaction.options.get("setting");
                LevelsInfo.setTitle("Settings => Levels => Rewards");
                switch(rewards_option.value) {
                    case 'add':                        
                    case 'remove':
                        if(!interaction.options.getInteger("level")) {
                            LevelsInfo.setDescription("**Warning**: You didn't provide level number.");
                            return interaction.reply({
                                embeds: [LevelsInfo]
                            });
                        } else lvl_number = interaction.options.getInteger("level");
                        if(!/^[0-9]+$/.test(lvl_number)) {
                            LevelsInfo.setDescription("`level` can contain only numbers.\nRemove it using command: `settings levels rewards remove <level_number>`");
                            return interaction.reply({
                                embeds: [LevelsInfo]
                            });
                        };
                        switch(rewards_option.value){
                            case 'remove':
                                await roles.delete_role_reward(DB, interaction.guild, lvl_number);
                                LevelsInfo.setDescription("Successfully removed Role Reward with level **"+lvl_number+"**");
                                return interaction.reply({
                                    embeds: [LevelsInfo]
                                });
                            case 'add':
                                if(rewards_option.value == "add") {
                                    if(!interaction.options.getRole("role")) {
                                        LevelsInfo.setDescription("**Warning**: You didn't provide Role.");
                                        return interaction.reply({
                                            embeds: [LevelsInfo]
                                        });
                                    } else role = interaction.options.getRole("role");
                                    await roles.insert_or_update_level_role(DB, interaction.guild, lvl_number, role);
                                    LevelsInfo.setDescription("Successfully saved Role Reward to <@&"+role.id+"> with level **"+lvl_number+"**");
                                    return interaction.reply({
                                        embeds: [LevelsInfo]
                                    });
                                }
                        }
                    return;
                case 'list':
                    let assigned_roles = await roles.list_or_assigned_roles(DB, interaction.guild);
                    if(assigned_roles == 0) {
                        LevelsInfo.setDescription("This guild doesn't have any assigned levels to roles.");
                        return interaction.reply({
                            embeds: [LevelsInfo]
                        });
                    } else {
                        LevelsInfo.setDescription("List of assigned levels to roles:");
                    }
                    for(let i = 0; i < assigned_roles.length; i++) {
                        LevelsInfo.addField("**"+assigned_roles[i]["level"]+"**. level", "<@&"+assigned_roles[i]["role"]+">");
                    }
                    interaction.reply({
                        embeds: [LevelsInfo]
                    });
                    LevelsInfo = new MessageEmbed().setColor("#F9A3BB").setFooter("More settings will be available in future.");
                    return;
                case 'off':
                    await roles.disable_role_rewards(DB, interaction.guild);
                    LevelsInfo.setDescription("Disabled Roles Rewards for guild `"+interaction.guild.name+"` completed sucessfully.");
                    return interaction.reply({
                        embeds: [LevelsInfo]
                    });
                case 'on':
                    await roles.create_role_rewards(DB, interaction.guild);
                    LevelsInfo.setDescription("Enabled Roles Rewards for guild `"+interaction.guild.name+"` completed sucessfully.");
                    return interaction.reply({
                        embeds: [LevelsInfo]
                    });
                case 'reset':
                    list_of_assigned_rr = await roles.check_if_role_rewards_exists(DB, interaction.guild);
                    if(list_of_assigned_rr == 0) {
                        LevelsInfo.setDescription("No role rewards has been found for Guild `"+interaction.guild.name+"`");
                        return interaction.reply({
                            embeds: [LevelsInfo]
                        });
                    } else {
                        await roles.delete_role_rewards(DB, interaction)
                        LevelsInfo.setDescription("All roles rewards has been deleted for guild `"+interaction.guild.name+"`");
                        return interaction.reply({
                            embeds: [LevelsInfo]
                        });
                    };
                default:
                    LevelsInfo.setTitle("Settings => Levels => Rewards").setDescription("`add` - Add a new role reward when getting specific level.\n`list` - show all saved roles for this guild.\n`remove` - Remove specific role reward.\n`on` - Enable Role Rewards (This is important to get this feature working properly).\n`off` Turn off Role Rewards (will not remove saved roles).\n`reset` - Remove all roles which are set up.");
                    return interaction.reply({
                        embeds: [LevelsInfo]
                    }); 
            }
        }
    }
}