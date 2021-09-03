const { MessageEmbed, Permissions } = require("discord.js");
const sfunctions = require("../functions/server.js");
const roles_functions = require("../functions/roles.js");

let if_rr_table_exists, warns_string;
let SettingsInfo = new MessageEmbed().setColor("#F9A3BB").setFooter("More settings will be available in future.");

module.exports.run = async (client, message, args, DBConnection) => {

    if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && !message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.channel.send({
        content: "**SETTINGS**: You don't have a permission to change Bot settings (You missing `MANAGE_MESSAGES` or `MANAGE_ROLES` permission)."
    });

    if(args.length === 0) {

        SettingsInfo.setTitle("Bot Settings").setDescription("`warns` - Set up warns your way.\n`prefix` - Add another custom prefix for your guild (max 2 characters).\n`mute_role` - change which role to use to mute. (WIP)\n`levels` - change settings levels for chat activity.\n`poll` - change settings for polls.");
        return message.channel.send({
            embeds: [SettingsInfo]
        });

    }

    switch (args[0]) {

        case 'prefix':
            return sfunctions.change_prefix_after_check(DBConnection, message, args);
            
        case 'mute_role':
            if(message.author.id !== "409731934030135306") return message.channel.send({
                content: "**Settings => Mute Role** This command is WIP."
            });

            if(!args[1]) {

                const check_if_exists_mute_role = await sfunctions.check_if_mute_role_exists(DBConnection, message);

                if(!check_if_exists_mute_role) {

                    SettingsInfo.setTitle("Settings => Mute Role").setDescription("No role has been selected to mute members.");
                    return message.channel.send({
                        embeds: [SettingsInfo]
                    });
                    
                } else {

                    SettingsInfo.setTitle("Settings => Mute Role").setDescription("Selected Role: <@&"+check_if_exists_mute_role+">");
                    return message.channel.send({
                        embeds: [SettingsInfo]
                    });
                    
                }
            } else {

                if(!message.mentions.roles.first()) return;
                let RoleID = message.mentions.roles.first().id;

                if(message.mentions.roles.first().rawPosition > message.guild.members.resolve(client.user).roles.highest.rawPosition) {

                    SettingsInfo.setTitle("Settings => Mute Role").setDescription("Mentioned role <@&"+RoleID+"> is higher than my highest role.");
                    return message.channel.send({
                        embeds: [SettingsInfo]
                    });
                }

                sfunctions.change_mute_role_db(DBConnection, message, RoleID);

                SettingsInfo.setTitle("Settings => Mute Role").setDescription("Changed Mute Role to: <@&"+RoleID+">");
                return message.channel.send({
                    embeds: [SettingsInfo]
                });
            }

        case 'poll':
            if(args.length < 2) {

                SettingsInfo.setTitle("Bot Settings => Poll").setDescription("`channel` - Set up channel for polls.\n`mention` - what role will be used for mentioning when new poll is asked.");
                return message.channel.send({
                    embeds: [SettingsInfo]
                });
            }

            switch (args[1]) {
                case 'mention':
                    if(args.length < 3) {

                        SettingsInfo.setTitle("Settings => Poll => Channel").setDescription("You can choose from 2 settings (and check if the bot have permission to mention roles, here or everyone):\n1. Everyone (use: `settings poll mention everyone`)\n2. Here (use: `settings poll mention here`)\n3. Role mention (use: `settings poll mention <role>`)");
                        return message.channel.send({
                            embeds: [SettingsInfo]
                        });
                    } else {
                        switch (args[2]) {
                            case 'everyone':
                                DBConnection.query("UPDATE `discord`.`servers` SET `poll_mention` = '-' WHERE `server_id` = '"+message.guild.id+"'");

                                SettingsInfo.setTitle("Settings => Poll Channel").setDescription("Bot will automatically use `everyone` mention to every new asked poll.");
                                return message.channel.send({
                                    embeds: [SettingsInfo]
                                });
                            case 'here':
                                DBConnection.query("UPDATE `discord`.`servers` SET `poll_mention` = 'here' WHERE `server_id` = '"+message.guild.id+"'");

                                SettingsInfo.setTitle("Settings => Poll Channel").setDescription("Bot will automatically use `here` mention to every new asked poll.");
                                return message.channel.send({
                                    embeds: [SettingsInfo]
                                });
                            default:
                                if(!message.mentions.roles.first()) {
                                    SettingsInfo.setTitle("Settings => Poll Mention").setDescription("You didn't mentioned role.");
                                    return message.channel.send({
                                        embeds: [SettingsInfo]
                                    });

                                } else {
                                    DBConnection.query("UPDATE `discord`.`servers` SET `poll_mention` = '"+message.mentions.roles.first().id+"' WHERE `server_id` = '"+message.guild.id+"'");
                                    
                                    SettingsInfo .setTitle("Settings => Poll Mention").setDescription("Bot will automatically use <@&"+message.mentions.roles.first().id+"> role to every new asked poll.");
                                    return message.channel.send({
                                        embeds: [SettingsInfo]
                                    });
                                }
                        }
                    }
                case 'channel':
                    SettingsInfo.setTitle("Settings => Poll => Channel");
                    if(args.length < 3) {
                        SettingsInfo.setDescription("You can choose from 2 settings:\n1. Channel for polls (use: `settings poll channel <channel>`)\n2. Same channel as message (use: `settings poll channel same`)");
                        return message.channel.send({
                            embeds: [SettingsInfo]
                        });
                    } else {
                        switch (args[2]) {
                            case 'same':
                                DBConnection.query("UPDATE `discord`.`servers` SET `poll_channel` = 'same' WHERE `server_id` = '"+message.guild.id+"'");
                                SettingsInfo.setDescription("New poll message will be send to actual channel (Where the command is used).");
                                return message.channel.send(PollsSameEmbed);
                            default:
                                if(!message.mentions.channels.first()) {
                                    SettingsInfo.setDescription("You didn't mentioned channel.");
                                    return message.channel.send({
                                        embeds: [SettingsInfo]
                                    });
                                } else {
                                    DBConnection.query("UPDATE `discord`.`servers` SET `poll_channel` = '"+message.mentions.channels.first().id+"' WHERE `server_id` = '"+message.guild.id+"'");
                                    SettingsInfo.setDescription("New selected channel for polls: <#"+message.mentions.channels.first().id+">");
                                    return message.channel.send({
                                        embeds: [SettingsInfo]
                                    });
                                }
                        }
                    }
                default:
                    break;
            }
            break;

        case 'warns':
            if(args.length < 2) {

                SettingsInfo.setTitle("Bot Settings => Warns").setDescription("`on` - Enable warns for this Guild.\n`off` - Disable warns for this Guild.\n`reset` - Reset settings for warns for this Guild.");
                return message.channel.send({
                    embeds: [SettingsInfo]
                });
            }
            switch(args[1]) {
                case 'on':
                    warns_string = "yes"
                    await sfunctions.check_for_warns_db(DBConnection, message.guild, warns_string);
                    SettingsInfo.setTitle("Bot Settings => Warns").setDescription("Successfully enabled `Warns` for this Guild.");
                    return message.channel.send({
                        embeds: [SettingsInfo]
                    });
                case 'off':
                    warns_string = "no"
                    await sfunctions.check_for_warns_db(DBConnection, message.guild, warns_string);
                    SettingsInfo.setTitle("Bot Settings => Warns").setDescription("Successfully disabled `Warns` for this Guild.");
                    return message.channel.send({
                        embeds: [SettingsInfo]
                    });
                case 'reset':
                    if(args.length < 3) {

                        SettingsInfo.setTitle("Bot Settings => Warns => Reset").setDescription("`all` - **Warning** => This option will remove all stored warns for all users.\n`member` - Removes all members warns.");
                        return message.channel.send({
                            embeds: [SettingsInfo]
                        });
                    }
                    switch(args[2]) {
                        case 'all':

                        default:
                            return;
                    }

                default:
                    return;
            }
            

        case 'levels':
            if(args.length < 2) {

                SettingsInfo.setTitle("Bot Settings => Levels").setDescription("`channel` - Set up channel for new levels for chat activity.\n`reset` - Will reset the levels stats for all members in the Guild.\n`off` - This will permanently turn off levels for this Guild.\n`on` - Enable levels for this Guild.\n`rewards` - Role rewards for levels.")
                return message.channel.send({
                    embeds: [SettingsInfo]
                });
            }
            switch (args[1]) {
                case 'reset':
                    if(message.author.id !== message.guild.ownerID) return message.channel.send({
                        content: "**Level => Reset**: You can't reset levels for this Guild (only Owner can)."
                    });
                    
                    await sfunctions.delete_levels_table(message.guild, DBConnection);
                    await sfunctions.create_levels_table(message.guild, DBConnection, message);
                    
                    return message.channel.send({
                        content: "**Level Reset** completed successfully."
                    });

                case 'off':
                    DBConnection.query("UPDATE `discord`.`servers` SET `enabled_levels` = 'no' WHERE `server_id` = '"+message.guild.id+"'");

                    return message.channel.send({
                        content: "**Levels** are completely turned off for this Guild."
                    });
                case 'on':
                    DBConnection.query("UPDATE `discord`.`servers` SET `enabled_levels` = 'yes' WHERE `server_id` = '"+message.guild.id+"'");

                    return message.channel.send({
                        content: "**Levels** are turned on for this Guild."
                    });
                case 'rewards':
                    SettingsInfo.setTitle("Settings => Levels => Rewards");
                    let check_role_mng = await sfunctions.check_for_role_mng_perm(message);
                    if(check_role_mng == false) {
                        SettingsInfo.setDescription("**Warning**: I missing `MANAGE_ROLES`, so I cannot continue.");
                        return message.channel.send({
                            embeds: [SettingsInfo]
                        });
                    }
                    if(message.author.id !== "409731934030135306") return message.channel.send({
                        content: "**Levels Role Rewards** are WIP."
                    });
                    if(args.length < 3) {
                        SettingsInfo.setDescription("`add` - Add a new role reward when getting specific level.\n`list` - show all saved roles for this guild.\n`remove` - Remove specific role reward.\n`on` - Enable Role Rewards (This is important to get this feature working properly).\n`off` Turn off Role Rewards (will not remove saved roles).\n`reset` - Remove all roles which are set up.");
                        return message.channel.send({
                            embeds: [SettingsInfo]
                        });
                    };
                    switch(args[2]) {
                        case 'list':
                            let list_of_assign_roles_in_db = await roles_functions.list_or_assigned_roles(DBConnection, message.guild);
                            if(list_of_assign_roles_in_db == 0) {
                                SettingsInfo.setDescription("This guild doesn't have any assigned levels to roles.");
                                return message.channel.send({
                                    embeds: [SettingsInfo]
                                });
                            } else {
                                SettingsInfo.setDescription("List of assigned levels to roles:");
                            }
                            for(let i = 0; i < list_of_assign_roles_in_db.length; i++) {
                                SettingsInfo.addField("**"+list_of_assign_roles_in_db[i]["level"]+"**. level", "<@&"+list_of_assign_roles_in_db[i]["role"]+">");
                            }
                            return message.channel.send({
                                embeds: [SettingsInfo]
                            });
                        case 'remove':
                            if(args.length < 4){
                                SettingsInfo.setDescription("You can remove role reward by using:\n`settings levels rewards remove <level_number>");
                                return message.channel.send({
                                    embeds: [SettingsInfo]
                                });
                            };

                            if(!/^[0-9]+$/.test(args[3])) {
                                SettingsInfo.setDescription("`level` can contain only numbers.\nRemove it using command: `settings levels rewards remove <level_number>`");
                                return message.channel.send({
                                    embeds: [SettingsInfo]
                                });
                            };
                            await roles_functions.delete_role_reward(DBConnection, message.guild, args[3]);
                            SettingsInfo.setDescription("Successfully removed Role Reward with level **"+args[3]+"**");
                            return message.channel.send({
                                embeds: [SettingsInfo]
                            });
                        case 'add':
                            if(args.length < 4){
                                SettingsInfo.setDescription("You can add role reward by using:\n`settings levels rewards add <level_number> <role mention>");
                                return message.channel.send({
                                    embeds: [SettingsInfo]
                                });
                            };

                            if(!/^[0-9]+$/.test(args[3])) {
                                SettingsInfo.setDescription("`level` can contain only numbers.\nAdd it using command: `settings levels rewards add <level_number> <role mention>`");
                                return message.channel.send({
                                    embeds: [SettingsInfo]
                                });
                            };
                            if(!message.mentions.roles.first()){
                                SettingsInfo.setDescription("Missing `Role_mention` to continue.\nAdd it using command: `settings levels rewards add <level_number> <role mention>`")
                                return message.channel.send({
                                    embeds: [SettingsInfo]
                                });
                            };
                            await roles_functions.insert_or_update_level_role(DBConnection, message.guild, args[3], message.mentions.roles.first().id);
                            SettingsInfo.setDescription("Successfully saved Role Reward to <@&"+message.mentions.roles.first().id+"> with level **"+args[3]+"**");
                            return message.channel.send({
                                embeds: [SettingsInfo]
                            });
                        case 'on':
                            if_rr_table_exists = await roles_functions.check_if_role_rewards_exists(DBConnection, message.guild);
                            
                            if(if_rr_table_exists[0]["roles_reward_check"] == "no") {
                                await roles_functions.create_role_rewards(DBConnection, message.guild);
                                SettingsInfo.setDescription("Enabled Roles Rewards for guild `"+message.guild.name+"` completed sucessfully.");
                                return message.channel.send({
                                    embeds: [SettingsInfo]
                                });
                            } else {
                                SettingsInfo.setDescription("Roles Rewards are already enabled for guild `"+message.guild.name+"`.");
                                return message.channel.send({
                                    embeds: [SettingsInfo]
                                });
                            }
                        case 'off':
                            if_rr_table_exists = await roles_functions.check_if_role_rewards_exists(DBConnection, message.guild);
                            if(if_rr_table_exists[0]["roles_reward_check"] == "yes") {
                                await roles_functions.disable_role_rewards(DBConnection, message.guild);
                                SettingsInfo.setDescription("Disabled Roles Rewards for guild `"+message.guild.name+"` completed sucessfully.");
                                return message.channel.send({
                                    embeds: [SettingsInfo]
                                });
                                } else {
                                    SettingsInfo.setDescription("Roles Rewards are not enabled for guild `"+message.guild.name+"`.");
                                    return message.channel.send({
                                        embeds: [SettingsInfo]
                                    });
                                }
                                case 'reset':
                                    if_rr_table_exists = await roles_functions.check_if_role_rewards_exists(DBConnection, message.guild);
                                    if(if_rr_table_exists[0]["roles_reward_check"] == "yes") {
                                        await roles_functions.delete_role_rewards(DBConnection, message.guild);
                                        SettingsInfo.setDescription("Deleted Roles Rewards for guild `"+message.guild.name+"` completed sucessfully.");
                                        return message.channel.send({
                                            embeds: [SettingsInfo]
                                        });
                                    } else {
                                        SettingsInfo.setDescription("Roles Rewards are not enabled for guild `"+message.guild.name+"`.");
                                        return message.channel.send({
                                            embeds: [SettingsInfo]
                                        });
                                    };
                            default:
                                return;
                        }
                case 'channel':
                    SettingsInfo.setTitle("Settings => Levels => Channel");
                    if(args.length < 3) {

                        SettingsInfo.setDescription("You can choose from 3 settings:\n1. Channel for new levels (use: `settings levels channel <channel>`)\n2. Same channel as message (use: `settings levels channel same`)\n3. Turn off new levels messages permanently (will not stop using Level Chat system => use: `settings levels channel off`)");
                        return message.channel.send({
                            embeds: [SettingsInfo]
                        });

                    } else {
                        switch (args[2]) {
                        case 'off':
                            DBConnection.query("UPDATE `discord`.`servers` SET `levels_channel` = 'off' WHERE `server_id` = '"+message.guild.id+"'");
                            SettingsInfo.setDescription("Level Channel is turned off.");
                            return message.channel.send({
                                embeds: [SettingsInfo]
                            });

                        case 'same':
                            DBConnection.query("UPDATE `discord`.`servers` SET `levels_channel` = 'same' WHERE `server_id` = '"+message.guild.id+"'");

                            SettingsInfo.setDescription("New level message will be send to actual channel.");

                            return message.channel.send({
                                embeds: [SettingsInfo]
                            });

                        default:
                            if(!message.mentions.channels.first()) {

                                SettingsInfo.setDescription("You didn't mentioned channel.");
                                return message.channel.send({
                                    embeds: [SettingsInfo]
                                });
                            }

                            DBConnection.query("UPDATE `discord`.`servers` SET `levels_channel` = '"+message.mentions.channels.first().id+"' WHERE `server_id` = '"+message.guild.id+"'");
                            
                            SettingsInfo.setDescription("New selected channel for levels: <#"+message.mentions.channels.first().id+">");
                                
                            return message.channel.send({
                                embeds: [SettingsInfo]
                            });
                        }
                    }
                    default:
                        return;
                }
        default:
            return;
    }
};

module.exports.help = {

	name: 'settings',
	description: 'Bot Settings for Guild',
	usage: '=settings (setting)'

};