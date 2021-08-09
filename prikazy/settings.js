const Discord = require("discord.js");
const sfunctions = require("../functions/server.js");
module.exports.run = async (client, message, args, DBConnection) => {
    if(!message.member.hasPermission("MANAGE_GUILD") && !message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("**SETTINGS**: You don't have a permission to change Bot settings.");
    if(args.length === 0) {
        let SettingsInfo = new Discord.MessageEmbed()
            .setTitle("Bot Settings")
            .setColor("#F9A3BB")
            .setDescription("`prefix` - Add another custom prefix for your guild (max 2 characters).\n`mute_role` - change which role to use to mute. (WIP)\n`levels_channel` - change channel for sending messages about new level for chat activity (WIP).\n\nMore settings will be available later.")
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
        case 'level':
            if(args.length < 2) {
                let SettingsInfo = new Discord.MessageEmbed()
                    .setTitle("Bot Settings")
                    .setColor("#F9A3BB")
                    .setDescription("`channel` - Set up channel for new levels for chat activity.\n`reset` - Will reset the levels stats for all members in the Guild.\n`off` - This will permanently turn off levels for this Guild.\n`on` - Enable levels for this Guild.\n\nMore settings will be available later.")
                return message.channel.send(SettingsInfo);
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
                case 'off':
                    DBConnection.query("UPDATE `discord`.`servers` SET `enabled_levels` = 'yes' WHERE `server_id` = '"+message.guild.id+"'");
                    message.channel.send("**Levels** are turned on for this Guild.");
                    return;
                case 'channel':
                    if(args.length < 2) {
                    let LevelsChannelNoOtherArg = new Discord.MessageEmbed()
                        .setTitle("Settings => Level Channel")
                        .setColor("#F9A3BB")
                        .setDescription("You can choose from 3 settings:\n1. Channel for new levels (use: `settings levels_channel <channel>`)\n2. Same channel as message (use: `settings levels_channel same`)\n3. Turn off new levels messages permanently (will not stop using Level Chat system => use: `settings levels_channel off`)");
                    message.channel.send(LevelsChannelNoOtherArg);
                    } else {
                        switch (args[1]) {
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