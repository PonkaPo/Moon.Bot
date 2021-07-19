const Discord = require("discord.js");
module.exports.run = async (client,message,args,DBConnection) => {
    if (message.author.id !== message.guild.ownerID) return message.channel.send("**Prefix**: You cannot change the server prefix.");
    if (!args.length) return message.channel.send("**Prefix**: You have to put character to use it as a prefix.");
    //if (args[0].toString().length !== 1) return ("**Prefix**: Prefix can be long only 1 character.");
    DBConnection.query("REPLACE INTO `servers` (server_id, server_prefix) VALUES("+message.guild.id+", '"+args[0]+"')", function (error, checkprefix) {
        let SuccEmbed = new Discord.MessageEmbed()
    	    .setColor("#F9A3BB")
    	    .setTitle('Prefix')
            .setDescription("New prefix has been applied: "+args[0]);
        message.channel.send(SuccEmbed);
    });

};
module.exports.help = {
    name: 'prefix',
    description: 'Zmení prefix len na tento server.',
    usage: '=prefix <prefix>'
};