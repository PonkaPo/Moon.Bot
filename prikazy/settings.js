const Discord = require("discord.js");
const sfunctions = require("../functions/server.js");
module.exports.run = async (client, message, args, DBConnection) => {
    if(!message.member.hasPermission("MANAGE_GUILD") && !message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("**SETTINGS**: You don't have a permission to change Bot settings.");
    if(args.length === 0) {
        let SettingsInfo = new Discord.MessageEmbed()
            .setTitle("Bot Settings")
            .setColor("#F9A3BB")
            .setDescription("`prefix` - Add another custom prefix for your guild (max 2 characters).\n`mute_role` - change which role to use to mute. (WIP)\n`levels` - change settings levels for chat activity.\n`poll` - change settings for polls.\n\nMore settings will be available later.")
        return message.channel.send(SettingsInfo);
    }
    switch (args[0]) {
        case 'prefix':
            args.shift();
            sfunctions.change_prefix_after_check(DBConnection, message, args);
            return;
        case 'mute_role':
            if(message.author.id !== "409731934030135306") return message.channel.send("This command is WIP.");
            if(!args[1]) {
                const check_if_exists_mute_role = await sfunctions.check_if_mute_role_exists(DBConnection, message);
                if(!check_if_exists_mute_role) {
                    let NoRoleInDBEmbed = new Discord.MessageEmbed()
                        .setTitle("Settings => Mute Role")
                        .setColor("#F9A3BB")
                        .setDescription("No role has been selected to mute members.");
                    message.channel.send(NoRoleInDBEmbed);
                    return;
                } else {
                    let NoRoleInDBEmbed = new Discord.MessageEmbed()
                        .setTitle("Settings => Mute Role")
                        .setColor("#F9A3BB")
                        .setDescription("Selected Role: <@&"+check_if_exists_mute_role+">");
                    message.channel.send(NoRoleInDBEmbed);
                    return;
                }
            } else {
                if(!message.mentions.roles.first()) return;
                let RoleID = message.mentions.roles.first().id;
                if(message.mentions.roles.first().rawPosition > message.guild.members.resolve(client.user).roles.highest.rawPosition) {
                    let HigherRoleEmbed = new Discord.MessageEmbed()
                        .setTitle("Settings => Mute Role")
                        .setColor("#F9A3BB")
                        .setDescription("Mentioned role <@&"+RoleID+"> is higher than my highest role.");
                    message.channel.send(HigherRoleEmbed);
                    return;
                }
                sfunctions.change_mute_role_db(DBConnection, message, RoleID);
                let NoRoleInDBEmbed = new Discord.MessageEmbed()
                    .setTitle("Settings => Mute Role")
                    .setColor("#F9A3BB")
                    .setDescription("Changed Mute Role to: <@&"+RoleID+">");
                message.channel.send(NoRoleInDBEmbed);
                return;
            }
        case 'poll':
            if(args.length < 2) {
                let PollsInfo = new Discord.MessageEmbed()
                    .setTitle("Bot Settings => Poll")
                    .setColor("#F9A3BB")
                    .setDescription("`channel` - Set up channel for polls.\n`mention` - what role will be used for mentioning when new poll is asked.\n\nMore settings will be available later.");
                return message.channel.send(PollsInfo);
            }
            switch (args[1]) {
                case 'mention':
                    if(args.length < 3) {
                    let PollMentionNoOtherArg = new Discord.MessageEmbed()
                        .setTitle("Settings => Level Channel")
                        .setColor("#F9A3BB")
                        .setDescription("You can choose from 2 settings (and check if the bot have permission to mention roles, here or everyone):\n1. Everyone (use: `settings poll mention everyone`)\n2. Here (use: `settings poll mention here`)\n3. Role mention (use: `settings poll mention <role>`)");
                    message.channel.send(PollMentionNoOtherArg);
                    } else {
                        switch (args[2]) {
                            case 'everyone':
                                DBConnection.query("UPDATE `discord`.`servers` SET `poll_mention` = '-' WHERE `server_id` = '"+message.guild.id+"'");
                                let PollEvery1Embed = new Discord.MessageEmbed()
                                    .setTitle("Settings => Poll Channel")
                                    .setColor("#F9A3BB")
                                    .setDescription("Bot will automatically use `everyone` mention to every new asked poll.");
                                message.channel.send(PollEvery1Embed);
                                break;
                            case 'here':
                                DBConnection.query("UPDATE `discord`.`servers` SET `poll_mention` = 'here' WHERE `server_id` = '"+message.guild.id+"'");
                                let PollHereEmbed = new Discord.MessageEmbed()
                                    .setTitle("Settings => Poll Channel")
                                    .setColor("#F9A3BB")
                                    .setDescription("Bot will automatically use `here` mention to every new asked poll.");
                                message.channel.send(PollHereEmbed);
                                break;
                            default:
                                if(!message.mentions.roles.first()) {
                                let NoMentioned_poll = new Discord.MessageEmbed()
                                    .setTitle("Settings => Poll Mention")
                                    .setColor("#F9A3BB")
                                    .setDescription("You didn't mentioned role.");
                                message.channel.send(NoMentioned_poll);
                                } else {
                                    DBConnection.query("UPDATE `discord`.`servers` SET `poll_mention` = '"+message.mentions.roles.first().id+"' WHERE `server_id` = '"+message.guild.id+"'");
                                    let SuccessNewPollMention = new Discord.MessageEmbed()
                                        .setTitle("Settings => Poll Mention")
                                        .setColor("#F9A3BB")
                                        .setDescription("Bot will automatically use <@&"+message.mentions.roles.first().id+"> role to every new asked poll.");
                                    message.channel.send(SuccessNewPollMention);
                                    break;
                                }
                        }
                    }
                    break;
                case 'channel':
                    if(args.length < 3) {
                    let PollChannelNoOtherArg = new Discord.MessageEmbed()
                        .setTitle("Settings => Poll Channel")
                        .setColor("#F9A3BB")
                        .setDescription("You can choose from 2 settings:\n1. Channel for polls (use: `settings poll channel <channel>`)\n2. Same channel as message (use: `settings poll channel same`)");
                    message.channel.send(PollChannelNoOtherArg);
                    } else {
                        switch (args[2]) {
                            case 'same':
                                DBConnection.query("UPDATE `discord`.`servers` SET `poll_channel` = 'same' WHERE `server_id` = '"+message.guild.id+"'");
                                let PollsSameEmbed = new Discord.MessageEmbed()
                                    .setTitle("Settings => Poll Channel")
                                    .setColor("#F9A3BB")
                                    .setDescription("New poll message will be send to actual channel (Where the command is used).");
                                message.channel.send(PollsSameEmbed);
                                break;
                            default:
                                if(!message.mentions.channels.first()) {
                                let NoMentionedChannel_poll = new Discord.MessageEmbed()
                                    .setTitle("Settings => Poll Channel")
                                    .setColor("#F9A3BB")
                                    .setDescription("You didn't mentioned channel.");
                                message.channel.send(NoMentionedChannel_poll);
                                } else {
                                    DBConnection.query("UPDATE `discord`.`servers` SET `poll_channel` = '"+message.mentions.channels.first().id+"' WHERE `server_id` = '"+message.guild.id+"'");
                                    let SuccessNewPollChannel = new Discord.MessageEmbed()
                                        .setTitle("Settings => Poll Channel")
                                        .setColor("#F9A3BB")
                                        .setDescription("New selected channel for polls: <#"+message.mentions.channels.first().id+">");
                                    message.channel.send(SuccessNewPollChannel);
                                    break;
                                }
                        }

                    }
                default:
                    break;
            }
            break;
        case 'levels':
            if(args.length < 2) {
                let LevelsInfo = new Discord.MessageEmbed()
                    .setTitle("Bot Settings => Levels")
                    .setColor("#F9A3BB")
                    .setDescription("`channel` - Set up channel for new levels for chat activity.\n`reset` - Will reset the levels stats for all members in the Guild.\n`off` - This will permanently turn off levels for this Guild.\n`on` - Enable levels for this Guild.\n\nMore settings will be available later.")
                return message.channel.send(LevelsInfo);
            }
            switch (args[1]) {
                case 'reset':
                    if(message.author.id !== message.guild.ownerID) return message.channel.send("**Level => Reset**: You can't reset levels for this Guild (only Owner can).");
                    await sfunctions.delete_levels_table(message.guild, DBConnection);
                    await sfunctions.create_levels_table(message.guild, DBConnection, message);
                    message.channel.send("**Level Reset** completed successfully.");
                    return;
                case 'off':
                    DBConnection.query("UPDATE `discord`.`servers` SET `enabled_levels` = 'no' WHERE `server_id` = '"+message.guild.id+"'");
                    message.channel.send("**Levels** are completely turned off for this Guild.");
                    return;
                case 'on':
                    DBConnection.query("UPDATE `discord`.`servers` SET `enabled_levels` = 'yes' WHERE `server_id` = '"+message.guild.id+"'");
                    message.channel.send("**Levels** are turned on for this Guild.");
                    return;
                case 'channel':
                    if(args.length < 3) {
                    let LevelsChannelNoOtherArg = new Discord.MessageEmbed()
                        .setTitle("Settings => Level Channel")
                        .setColor("#F9A3BB")
                        .setDescription("You can choose from 3 settings:\n1. Channel for new levels (use: `settings levels channel <channel>`)\n2. Same channel as message (use: `settings levels channel same`)\n3. Turn off new levels messages permanently (will not stop using Level Chat system => use: `settings levels channel off`)");
                    message.channel.send(LevelsChannelNoOtherArg);
                    } else {
                        switch (args[2]) {
                        case 'off':
                            DBConnection.query("UPDATE `discord`.`servers` SET `levels_channel` = 'off' WHERE `server_id` = '"+message.guild.id+"'");
                            let LevelsOffEmbed = new Discord.MessageEmbed()
                                .setTitle("Settings => Level Channel")
                                .setColor("#F9A3BB")
                                .setDescription("Level Channel is turned off.");
                            message.channel.send(LevelsOffEmbed);
                            return;
                        case 'same':
                            DBConnection.query("UPDATE `discord`.`servers` SET `levels_channel` = 'same' WHERE `server_id` = '"+message.guild.id+"'");
                            let LevelsSameEmbed = new Discord.MessageEmbed()
                                .setTitle("Settings => Level Channel")
                                .setColor("#F9A3BB")
                                .setDescription("New level message will be send to actual channel.");
                            message.channel.send(LevelsSameEmbed);
                            return;
                        default:
                            if(!message.mentions.channels.first()) {
                            let NoMentionedChannel = new Discord.MessageEmbed()
                                .setTitle("Settings => Level Channel")
                                .setColor("#F9A3BB")
                                .setDescription("You didn't mentioned channel.");
                            message.channel.send(NoMentionedChannel);
                            }
                            DBConnection.query("UPDATE `discord`.`servers` SET `levels_channel` = '"+message.mentions.channels.first().id+"' WHERE `server_id` = '"+message.guild.id+"'");
                            let SuccessNewLevelChannel = new Discord.MessageEmbed()
                                .setTitle("Settings => Level Channel")
                                .setColor("#F9A3BB")
                                .setDescription("New selected channel for levels: <#"+message.mentions.channels.first().id+">");
                            message.channel.send(SuccessNewLevelChannel);
                            return;
                        }
                    }
                        return;
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