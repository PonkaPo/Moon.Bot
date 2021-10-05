//warns
module.exports.check_for_warns_db = async(DB, guild) => {
    return new Promise((resolve,reject) => {
        DB.query("SELECT `enabled_warns` FROM `discord`.`servers` WHERE `server_id` = '"+guild.id+"'", function (error, result) {
            if(error) reject(error);
            resolve(result);
        });
    });
}

async function change_warns_in_db(guild, string, DB) {
    DB.query("UPDATE `discord`.`servers` SET `enabled_warns` = '"+string+"' WHERE `server_id` = '"+guild.id+"'");
};

async function create_guild_db_for_warns(DB,guild) {
    DB.query("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'discord_warns_"+guild.id+"'", function (error, create_result) {
        if (error) return console.log(error);
        if(create_result[0]["COUNT(*)"] == 0) {
            DB.query("CREATE DATABASE `discord_warns_"+guild.id+"`");
        } else return;
    });
};

module.exports.check_if_user_exists_in_db = async(DB, mention, guild) => {

    DB.query("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'discord_warns_"+guild+"' AND table_name = '"+mention+"'", function (error, mention_result) {
        if(error) console.log(error);
        if(mention_result[0]["COUNT(*)"] == 0) {
            create_member_table_in_db(DB, mention, guild);
        } else return;
    });

};

async function create_member_table_in_db(DB,mention,guild) {
    DB.query("CREATE TABLE `discord_warns_"+guild+"`.`"+mention+"`(`uID` CHAR(8) PRIMARY KEY, `By` CHAR(50) NOT NULL, `reason` VARCHAR(200) NOT NULL)");
};

module.exports.write_warn_data = async(DB, authorID, uID, reason, mentioned, guildID) => {
    DB.query("INSERT INTO `discord_warns_"+guildID+"`.`"+mentioned+"`(`uID`, `By`, `reason`) VALUES ('"+uID+"', '"+authorID+"', '"+reason+"')");
};

module.exports.fetch_warns = async(DB, mentioned, guild) => {
    return new Promise((resolve,reject) => {
        DB.query("SELECT * FROM `discord_warns_"+guild+"`.`"+mentioned+"` LIMIT 10", function (error, fetch_result) {
            if(error) console.log(error);
            resolve(fetch_result);
        });
    });
};

module.exports.check_for_uID = async(DB, mention, guild) => {

    DB.query("SELECT * FROM `discord_warns_"+guild+"`.`"+mention+"` WHERE ˛`uID` = '"+uID+"'", function (error, result_search) {
        if(error) console.log(error);
        resolve(result_search);
    });

};

module.exports.delete_warn_data = async(DB, mention, guild, uID) => {
    DB.query("DELETE FROM `discord_warns_"+guild+"`.`"+mention+"` WHERE `uID` = '"+uID+"'");
}