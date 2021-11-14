/**
 * @param {Interaction} interaction
 * @param {filter} filter
 * @returns {JSON}
 */
async function collect_message(interaction, filter){
    return new Promise((resolve, reject) => {
        interaction.channel.awaitMessages({
            filter,
            max: 1
        }).then(collected => {
            resolve(collected.first());
        })
        .catch(err => {
            reject(err);
        });
    });
};
/**
 * @param {DB} database
 * @param {guild} guild_id
 * @returns {JSON}
 */
async function check_for_access(DB, guild_id) {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM `discord_settings_allowed_roles`.`"+guild_id+"`",function (error, result) {
            if(error) reject(error);
            resolve(result);
        });
    })
}

/**
 * @param {DB} database
 * @param {Interaction} interaction
 * @returns {JSON}
 */
async function check_for_poll_in_db(DB, interaction){
    return new Promise((resolve, reject) => {
        DB.query("SELECT poll_channel, poll_mention FROM `discord`.`servers` WHERE `server_id` = '"+interaction.guildId+"'", function (error, poll_result) {
            if(error) reject(error);
            resolve(poll_result);
        });
    });
};

/**
 * @param {string} string
 * @returns {string}
 */
async function number_check(CheckForOnlyNumbers) {
    return /^[0-9]+$/.test(CheckForOnlyNumbers);
}

/**
 * @param {Interaction} interaction
 * @param {Permissions} permissions
 * @returns {boolean}
 */
async function check_for_role_mng_perm(interaction, Permissions) {
    if(!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
        return false;
    } else {
        return true;
    }
}

//What is it - Game

/**
* @param {DB} database
* @param {Interaction} interaction
* @returns {JSON}
*/
async function check_game_data_wii(DB, interaction) {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM `discord`.`whatisit` WHERE `guild_id` = '"+interaction.guild.id+"'", function (error, wii_stats) {
            resolve(wii_stats);
        });
    });
};

/**
* @param {DB} database
* @param {Interaction} interaction
* @param {key} key
* @param {hint} hint
*/
async function send_wii_data(DB, interaction, key_msg1, hint_msg1){
    DB.query("INSERT INTO `discord`.`whatisit` (guild_id, pass, hint, first_guess, wrote) VALUES('"+interaction.guild.id+"', '"+key_msg1+"', '"+hint_msg1+"', '-', '"+interaction.user.id+"') ON DUPLICATE KEY UPDATE `pass` = '"+key_msg1+"', `hint` = '"+hint_msg1+"', `first_guess` = '-', `wrote` = '"+interaction.user.id+"'");
};

module.exports = {
    collect_message,
    check_for_access,
    check_for_poll_in_db,
    number_check,
    check_for_role_mng_perm,
    check_game_data_wii,
    send_wii_data
}