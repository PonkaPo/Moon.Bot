const Discord = require("discord.js");
const sfunctions = require("../functions/server.js");
var SelectedMember, SelectedName;

module.exports.run = async (client, message, args, DBConnection) => {
    if(args.length == 0) {
        SelectedMember = message.author;
        SelectedName = message.author.username;
    } else {
        if(message.mentions.members.first()) {
            SelectedMember = message.mentions.members.first();
            SelectedName = message.mentions.members.first().user.username;
        } else {
            SelectedMember = message.author.id;
            SelectedName = message.author.username;
        }
    }
    sfunctions.check_lvl_user_stats_forP(DBConnection, message, SelectedMember).then(lvl => {
        let LVLEmbed = new Discord.MessageEmbed()
            .setTitle(SelectedName+"'s Stats")
            .setColor("#F9A3BB")
            .setDescription("Your stats for chat activity")
            .addField("Level:","**"+lvl[0]["xp_level"]+"**")
            .addField("Needed XP:","**"+(lvl[0]["xp_exp"]-lvl[0]["xp_remain"])+"**");
        message.channel.send(LVLEmbed);
    })
    .catch(error => {
        let noDataEmbed = new Discord.MessageEmbed()
            .setTitle(SelectedName+"'s Stats")
            .setColor("#F9A3BB")
            .setDescription("This person doesn't have any data.");
        message.channel.send(noDataEmbed);
    })
};

module.exports.help = {
	name: 'level',
	description: 'Shows level activity in the guild.',
	usage: '=level (mention)'
};