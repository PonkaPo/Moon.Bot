module.exports.check_if_levels_are_enabled = async(DB, guildId) => {
    return new Promise((resolve, reject) => {

        DB.query("SELECT `enabled_levels` FROM `discord`.`servers` WHERE `server_id` = '"+guildId+"'", function (error, enabled_stats) {
            if(error) reject(error);
            if(enabled_stats.length==0) {
                add_enabled_levels(DB, guildId);
                resolve("yes");
            } else {
                resolve(enabled_stats[0]["enabled_levels"]);
            }
        });
    });
};

async function add_enabled_levels(DB, guildId) {
    DB.query("UPDATE `discord`.`servers` SET `enabled_levels` = 'yes' WHERE `server_id` = '"+guildId+"'INSERT INTO `discord`.`servers` (`enabled_levels') VALUES('yes', '"+mention+"') ON DUPLICATE KEY UPDATE `level` = '"+level+"', `role` = '"+mention+"'");
    return;
}

module.exports.check_stats_for_lb = async(DB, interaction) => {
    return new Promise((resolve, reject) => {

        DB.query("SELECT user_id, xp_level, xp_remain, xp_exp FROM `discord_levels`.`"+interaction.guild.id+"` ORDER BY xp_level DESC, xp_remain DESC LIMIT 10", function (error, lb_stats) {
            if(error) reject(error);
            resolve(lb_stats);
        });
    });
};

module.exports.set_level = async(DB, guild_id, user_id, xp_lvl) => {
    DB.query("INSERT INTO `discord_levels`.`"+guild_id+"`(`user_id`, `xp_level`, `xp_remain`, `xp_exp`, `last_xp`) VALUES('"+user_id+"', '"+xp_lvl+"', '0', '"+(xp_lvl*100)+"', '"+Date.now()+"') ON DUPLICATE KEY UPDATE `user_id` = '"+user_id+"', `xp_level` = '"+xp_lvl+"', `xp_exp` = '0', `xp_remain` = '"+(xp_lvl*100)+"', `last_xp` = '"+Date.now()+"'");
}

module.exports.check_lvl_user_stats = async(DB, interaction) => {
    return new Promise((resolve, reject) => {

        DB.query("SELECT * FROM `discord_levels`.`"+interaction.guild.id+"` WHERE `user_id` = '"+interaction.author.id+"'", function (error, user_stats) {
            if(error) reject(error);
            resolve(user_stats);

        });
    });
};

module.exports.check_lvl_user_stats_forP = async(DB, interaction, SelectedMember) => {
    return new Promise((resolve, reject) => {

        DB.query("SELECT * FROM `discord_levels`.`"+interaction.guild.id+"` WHERE `user_id` = '"+SelectedMember.id+"'", function (error, user_stats) {
            if(error) reject(error);
            resolve(user_stats);

        });
    });
};

module.exports.check_level_channel = async(DB, interaction) => {
    return new Promise((resolve, reject) => {

        DB.query("SELECT `levels_channel` FROM `discord`.`servers` WHERE `server_id` = '"+interaction.guild.id+"'", function (error, level_channel) {
            if(error) reject(error);
            resolve(level_channel);

        });
    });
};

module.exports.delete_levels_from_table = (DB, guild) => {

    DB.query("DELETE FROM `discord_levels`.`"+guild.id+"`");

};

module.exports.create_levels_table = async(guild, DB, interaction) => {

    DB.query("CREATE TABLE `discord_levels`.`"+guild.id+"` (user_id CHAR(50) PRIMARY KEY, xp_level INT(10) NOT NULL, xp_remain INT(10) NOT NULL, xp_exp INT(30) NOT NULL, last_xp BIGINT(20) NOT NULL)");
    DB.query("CREATE TABLE `discord_levels_blacklist`.`"+guild.id+"` (channel CHAR(20) PRIMARY KEY)");
    DB.query("INSERT INTO `discord_levels`.`"+guild.id+"` (`user_id`, `xp_level`, `xp_remain`, `xp_exp`, `last_xp`) VALUES ('"+interaction.author.id+"', '0', '0', '100', '"+Date.now()+"')");
    DB.query("UPDATE `discord`.`servers` SET `levels_channel` = 'same', `enabled_levels` = 'yes' WHERE `server_id` = '"+guild.id+"'");

};

module.exports.check_if_table_is_in_blacklist = async(DB, guild_id, channel_id) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT EXISTS(SELECT * FROM `discord_levels_blacklist`.`"+guild_id+"` WHERE channel = '"+channel_id+"');", function(err, result) {
            if(err) reject(err);
            resolve(result[0]["EXISTS(SELECT * FROM `discord_levels_blacklist`.`"+guild_id+"` WHERE channel = '"+channel_id+"')"]);
        })
    })
};

module.exports.add_blacklist_channel = async(DB, guild_id, channel_id) => {
    DB.query("INSERT INTO `discord_levels_blacklist`.`"+guild_id+"` (channel) VALUES('"+channel_id+"') ON DUPLICATE KEY UPDATE `channel` = '"+channel_id+"'")
};