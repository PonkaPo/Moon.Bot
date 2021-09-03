const { MessageEmbed } = require("discord.js");
const sfunctions = require("../functions/server.js");
const role_functions = require("./roles.js");
var Difference_between_Generated_and_actual_exp, NewXP_LVL, Generated_XP_with_remain;
module.exports.gen_exp = (DBConnection, message) => {

    sfunctions.check_lvl_user_stats(DBConnection, message).then(lvl => {

        if((Date.now()-lvl[0]["last_xp"]) < 20000) return;

        DBConnection.query("UPDATE `discord_levels`.`"+message.guild.id+"` SET `last_xp` = '"+Date.now()+"' WHERE `user_id` = '"+message.author.id+"'");    

        Generated_XP_with_remain = lvl[0]["xp_remain"]+RandomXP();
        Difference_between_Generated_and_actual_exp = lvl[0]["xp_exp"]-Generated_XP_with_remain;

        if(Difference_between_Generated_and_actual_exp < 0) {

            NewXP_LVL = lvl[0]["xp_level"] + 1;
            let AfterXPNewLVL = 100+(parseInt(NewXP_LVL)*25);

            //role_functions.check_if_level_reward_exists(DBConnection, NewXP_LVL, message).then(results_from_q => {
                //console.log(results_from_q);
                
                //if(level == 0) return;
                //if(NewXP_LVL == level[0]["level"]) {

                //}
            //});

            DBConnection.query("UPDATE `discord_levels`.`"+message.guild.id+"` SET `xp_level` = '"+NewXP_LVL+"', `xp_remain` = '"+Math.abs(parseInt(Difference_between_Generated_and_actual_exp))+"', `xp_exp` = '"+AfterXPNewLVL+"' WHERE `user_id` = '"+message.author.id+"'");
            
            sfunctions.check_level_channel(DBConnection, message).then(channel => {

                let NewLevelEmbed = new MessageEmbed()
                    .setTitle("**Congratulations** "+message.author.username)
                    .setColor("#F9A3BB")
                    .setDescription("🎉 You got a new level **"+NewXP_LVL+"**");

                switch (channel[0]["levels_channel"]) {
                    case 'off':
                        return;

                    case 'same':
                        message.channel.send({
                            content: "<@"+message.author.id+">", 
                            embeds: [NewLevelEmbed]
                        });
                        return;

                    default:
                        message.client.channels.cache.get(channel[0]["levels_channel"]).send({
                            content: "<@"+message.author.id+">", 
                            embeds: [NewLevelEmbed]
                        });
                        return;
                }
            });

        } else {

            DBConnection.query("UPDATE `discord_levels`.`"+message.guild.id+"` SET `xp_remain` = '"+Generated_XP_with_remain+"' WHERE `user_id` = '"+message.author.id+"'");
        
        }
    })

    .catch(error => {
        DBConnection.query("INSERT INTO `discord_levels`.`"+message.guild.id+"` (user_id, xp_level, xp_remain, xp_exp, last_xp) VALUES ('"+message.author.id+"', '0', '0', '100', '0')");
    })
}

function RandomXP() {

    return Math.floor(Math.random()*(20-15+1))+5;
    
}