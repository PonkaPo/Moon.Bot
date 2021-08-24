const Discord = require("discord.js");
const sfunctions = require("../functions/server.js");
let i;
let j = 1;
module.exports.run = async (client, message, args, DBConnection) => {
    const leaderboard_stats = await sfunctions.check_stats_for_lb(DBConnection, message);
    const LBEmbed = new Discord.MessageEmbed().setTitle("Leaderboard").setColor("#F9A3BB").setDescription("Top "+leaderboard_stats.length+" most active members in chat:");
    for(i = 0; i < leaderboard_stats.length; i++) {
        LBEmbed.addField("**"+j+"**.", "<@"+leaderboard_stats[i]["user_id"]+"> => "+leaderboard_stats[i]["xp_level"]);
        j++;
    }
    i = 0;
    j = 1;
    message.channel.send(LBEmbed);
};
module.exports.help = {
    name: 'leaderboard',
    aliases: ['lb'],
    description: 'Shows Leaderboard for chat activity.',
    usage: 'leaderboard',
  };