//functions for managing roles

module.exports.create_role_rewards = (DBConnection, guild) => {
    
    DBConnection.query("UPDATE `discord`.`servers` SET `roles_reward_check` = 'yes' WHERE `server_id` = '"+guild.id+"'");
    DBConnection.query("CREATE TABLE `discord_role_rewards`.`"+guild.id+"` (level INT(10) PRIMARY KEY, role CHAR(50) NOT NULL)");
    DBConnection.query("CREATE TABLE `discord_rr_users`.`"+guild.id+"` (user_id CHAR(50) PRIMARY KEY, role CHAR(50) NOT NULL, role CHAR(50) NOT NULL)");

};

module.exports.delete_role_rewards = (DBConnection, guild) => {

    DBConnection.query("DROP TABLE `discord_role_rewards`.`"+guild.id+"`");
    DBConnection.query("DROP TABLE `discord_rr_users`.`"+guild.id+"`");
    DBConnection.query("UPDATE `discord`.`servers` SET `roles_reward_check` = 'no' WHERE `server_id` = '"+guild.id+"'");

};

module.exports.delete_role_reward = (DBConnection, guild, level) => {

    DBConnection.query("DELETE FROM `discord_role_rewards`.`"+guild.id+"` WHERE `level` = '"+level+"'");

};

module.exports.insert_or_update_level_role = (DBConnection, guild, level, mention) => {

    DBConnection.query("INSERT INTO `discord_role_rewards`.`"+guild.id+"` (`level`, `role`) VALUES('"+level+"', '"+mention+"') ON DUPLICATE KEY UPDATE `level` = '"+level+"', `role` = '"+mention+"'");

};

module.exports.disable_role_rewards = (DBConnection, guild) => {

    DBConnection.query("UPDATE `discord`.`servers` SET `roles_reward_check` = 'no' WHERE `server_id` = '"+guild.id+"'");

};

module.exports.check_if_level_reward_exists = (DBConnection, new_level, message) => {

    return new Promise((resolve, reject) => {
        DBConnection.query("SELECT * FROM `discord_role_rewards`.`"+message.guild.id+"` WHERE `level` = '"+new_level+"'; SELECT * FROM `discord_rr_users`.`"+message.guild.id+"` WHERE `user_id` = '"+message.author.id+"';", function (error, rr_exists_check) {
        if(error) reject(error);

        resolve(rr_exists_check);
    });
    });
};

module.exports.check_if_role_rewards_exists = (DBConnection, guild) => {

    return new Promise((resolve, reject) => {
        DBConnection.query("SELECT `roles_reward_check` FROM `discord`.`servers` WHERE `server_id` = '"+guild.id+"'", function (error, rr_exists_check) {
        if(error) reject(error);

        resolve(rr_exists_check);
    });
    });
};

module.exports.list_or_assigned_roles = async(DBConnection, guild) => {
    return new Promise((resolve, reject) => {

        DBConnection.query("SELECT `level`, `role` FROM `discord_role_rewards`.`"+guild.id+"` ORDER BY `level` ASC", function (error, list_of_roles) {
            if(error) reject(error);
            resolve(list_of_roles);

        });
    });
};