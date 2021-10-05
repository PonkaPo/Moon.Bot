//functions for managing roles

module.exports.create_role_rewards = (DB, guild) => {
    
    DB.query("UPDATE `discord`.`servers` SET `roles_reward_check` = 'yes' WHERE `server_id` = '"+guild.id+"'");
    DB.query("CREATE TABLE `discord_role_rewards`.`"+guild.id+"` (level INT(10) PRIMARY KEY, role CHAR(50) NOT NULL)");
    DB.query("CREATE TABLE `discord_rr_users`.`"+guild.id+"` (user_id CHAR(50) PRIMARY KEY, role CHAR(50) NOT NULL, last_role CHAR(50) NOT NULL)");

};

module.exports.delete_role_rewards = (DB, guild) => {

    DB.query("DELETE FROM `discord_role_rewards`.`"+guild.id+"`");
    DB.query("DELETE FROM `discord_rr_users`.`"+guild.id+"`");

};

module.exports.delete_role_reward = (DB, guild, level) => {

    DB.query("DELETE FROM `discord_role_rewards`.`"+guild.id+"` WHERE `level` = '"+level+"'");

};

module.exports.insert_or_update_level_role = (DB, guild, level, mention) => {

    DB.query("INSERT INTO `discord_role_rewards`.`"+guild.id+"` (`level`, `role`) VALUES('"+level+"', '"+mention+"') ON DUPLICATE KEY UPDATE `level` = '"+level+"', `role` = '"+mention+"'");

};

module.exports.disable_role_rewards = (DB, guild) => {

    DB.query("UPDATE `discord`.`servers` SET `roles_reward_check` = 'no' WHERE `server_id` = '"+guild.id+"'");

};

module.exports.check_if_level_reward_exists = (DB, new_level, interaction) => {

    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM `discord_role_rewards`.`"+interaction.guild.id+"` WHERE `level` = '"+new_level+"'", function (error, rr_exists_check) {
        if(error) reject(error);
        if(rr_exists_check == null) {
            console.log("asd");
            let update_user = update_user_roles_in_db(DB, rr_exists_check, interaction);
            interaction.guild.roles.cache.find(r => r.id === rr_exists_check[0]["role"]).then(role => {
                interaction.member.roles.add(role);
            });
            interaction.guild.roles.cache.find(r => r.id === update_user).then(role => {
                interaction.member.roles.remove(role);
            });
        } else resolve(rr_exists_check);
    });
    });
};

module.exports.check_if_role_rewards_exists = (DB, guild) => {

    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM `discord_role_rewards`.`"+guild.id+"` WHERE `server_id` = '"+guild.id+"'", function (error, rr_exists_check) {
        if(error) reject(error);
        resolve(rr_exists_check);
    });
    });
};

module.exports.list_or_assigned_roles = async(DB, guild) => {
    return new Promise((resolve, reject) => {

        DB.query("SELECT `level`, `role` FROM `discord_role_rewards`.`"+guild.id+"` ORDER BY `level` ASC", function (error, list_of_roles) {
            if(error) reject(error);
            resolve(list_of_roles);

        });
    });
};

module.exports.check_if_settings_table_exists = async(DB,guild) => {
    return new Promise((resolve,reject) => {
        DB.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'discord_settings_allowed_roles' AND  TABLE_NAME = '"+guild+"'",function (error, if_exists) {
            if(error) reject(error);
            if(if_exists == 0) {
                create_table_for_settings_role(DB,guild);
                resolve(if_exists);
            } else {
                check_for_settings_roles(DB,guild).then(roles_list => {
                    resolve(roles_list);
                });
            }            
        });
    });
}

async function check_for_settings_roles(DB,guild) {
    return new Promise((resolve, reject) => {
        DB.query("SELECT * FROM `discord_settings_allowed_roles`.`"+guild+"`", function (error, list_of_settings_roles) {
            if(error) reject(error);
            resolve(list_of_settings_roles);
        });
    });
};

async function create_table_for_settings_role(DB,guild) {
    DB.query("CREATE TABLE `discord_settings_allowed_roles`.`"+guild+"` (role_id CHAR(50) PRIMARY KEY)");
};

module.exports.write_settings_role_into_table = async(DB,guild,mention) => {
    return new Promise((resolve,reject) => {
        DB.query("INSERT INTO `discord_settings_allowed_roles`.`"+guild.id+"` (`role_id`) VALUES('"+mention+"') ON DUPLICATE KEY UPDATE `role_id` = '"+mention+"'",function (error, full_list) {
        });
    });
};

module.exports.delete_settings_role_from_table = async(DB,guild,mention) => {
    DB.query("DELETE FROM `discord_settings_allowed_roles`.`"+guild.id+"` WHERE `role_id` = '"+mention+"'");
};

module.exports.list_settings_roles = async(DB,guild) => {
    let list_of_roles_from_db = check_for_settings_roles(DB,guild);
    console.log(list_of_roles_from_db);
}

async function update_user_roles_in_db(DB, rr_exists_check, interaction) {
    DB.query("SELECT * FROM `discord_rr_users`.`"+interaction.guild.id+"` WHERE `user_id` = '"+interaction.author.id+"'", function (error, results) {
        if(error) return error;
        if(results == 0) {
            DB.query("INSERT INTO `discord_rr_users`.`"+interaction.guild.id+"` (user_id, role) VALUES ('"+interaction.author.id+"', '"+rr_exists_check[0]["role"]+"'");
        } else {
            DB.query("INSERT INTO `discord_rr_users`.`"+interaction.guild.id+"` (user_id, role, last_role) VALUES ('"+interaction.author.id+"', '"+rr_exists_check[0]["role"]+"', '"+results[0]["role"]);
        }
        return results[0]["last_role"];
    });
}