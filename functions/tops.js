module.exports.check_table = async(DB, guild, table_schema) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '"+table_schema+"' AND table_name = '"+guild+"'", function(error, result) {
            if(error) reject(error);
            resolve(result);
        });
    });

}

module.exports.create_table = async(DB, guild) => {
    DB.query("CREATE TABLE `discord_chat_memes`.`"+guild+"` (link text(200))");
    return;
}

module.exports.select_for_view = async(DB, guild) => {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM `discord_chat_memes`.`"+guild+"` ORDER BY RAND() LIMIT 1", function(error, result) {
            if(error) reject(error);
            resolve(result);
        });
    });
}

module.exports.delete = async(DB, guild, link) => {
    DB.query("DELETE FROM `discord_chat_memes`.`"+guild+"` WHERE link = '"+link+"'");
}