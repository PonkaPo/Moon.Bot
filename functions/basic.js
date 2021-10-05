module.exports.collect_message = async(interaction, msg_filter) => {
    return new Promise((resolve, reject) => {

        interaction.channel.awaitMessages({
            msg_filter,
            max: 1
        }).then(collected => {
            resolve(collected.first());
        })
        .catch(err => {
            reject(err);
        });

    });
};

module.exports.check_for_poll_in_db = async(DB, interaction) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT poll_channel, poll_mention FROM `discord`.`servers` WHERE `server_id` = '"+interaction.guildId+"'", function (error, poll_result) {
            if(error) reject(error);
            resolve(poll_result);
        });
    });
};

module.exports.number_check = async(CheckForOnlyNumbers) => {
    return /^[0-9]+$/.test(CheckForOnlyNumbers);
}

module.exports.check_for_role_mng_perm = async(interaction, Permissions) => {
    if(!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
        return false;
    } else {
        return true;
    }
}

//What is it - Game
module.exports.check_game_data_wii = async(DB, interaction) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM `discord`.`whatisit` WHERE `guild_id` = '"+interaction.guild.id+"'", function (error, wii_stats) {
            resolve(wii_stats);
        });
    });
};

module.exports.send_wii_data = async(DB, interaction, key_msg1, hint_msg1) => {
    DB.query("INSERT INTO `discord`.`whatisit` (guild_id, pass, hint, first_guess, wrote) VALUES('"+interaction.guild.id+"', '"+key_msg1+"', '"+hint_msg1+"', '-', '"+interaction.user.id+"') ON DUPLICATE KEY UPDATE `pass` = '"+key_msg1+"', `hint` = '"+hint_msg1+"', `first_guess` = '-', `wrote` = '"+interaction.user.id+"'");
};