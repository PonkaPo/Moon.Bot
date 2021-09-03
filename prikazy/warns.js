const { MessageEmbed } = require("discord.js");
const sfunctions = require("../functions/server.js");
let mentioned;
let all_warns = "";
let WarnsEmbed = new MessageEmbed().setColor("#F9A3BB");

module.exports.run = async (client, message, args, DBConnection) => {
    if(!message.mentions.members.first()) {
        WarnsEmbed.setTitle("No Mention").setDescription("You didn't mention any member to show warns.\nUse: `warns <mention>`");
        return message.channel.send({
            embeds: [WarnsEmbed]
        });
    } else {
        mentioned = message.mentions.members.first();
    }
    if(message.author.bot) return;
    await sfunctions.check_if_user_exists_in_db(DBConnection, mentioned.user.id, message.guild.id);
    let warns_list = await sfunctions.fetch_warns(DBConnection, mentioned.user.id, message.guild.id);
    if(warns_list == 0) {
        all_warns = "This user doesn't have stored any warns";
        WarnsEmbed.setTitle(mentioned.user.username+"'s Warns:").setDescription(all_warns);
    } else {
        for(let i = 0; i < warns_list.length; i++) {
            all_warns = all_warns+"`"+warns_list[i]["reason"]+"`"+" | by: <@"+warns_list[i]["By"]+"> | uID: **"+warns_list[i]["uID"]+"** \n"
        }
        WarnsEmbed.setTitle(mentioned.user.username+"'s Warns:").setDescription(all_warns);
    }
    all_warns = "";
    return message.channel.send({
        embeds: [WarnsEmbed]
    });
};

module.exports.help = {
    name: 'warns',
    description: 'Warns list of member.',
    usage: 'warns <mention>',
};