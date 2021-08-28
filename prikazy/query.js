const { MessageEmbed } = require("discord.js");
const sfunctions = require("../functions/server.js");
var get_result_var, answer;

module.exports.run = async (client, message, args, DBConnection) => {

    if(message.author.id !== "409731934030135306") return message.channel.send({
        content: "**Query**: You can't access the query command."
    });
    if(args.length == 0) return message.channel.send({
        content: "**Query**: You didn't provide any syntax query to check."
    });

    if(args[0] == "SELECT") {
        get_result_var = args[1];
    }

    let query = args.join(" ");
    const getting_query = await sfunctions.get_query(DBConnection, message, query);

    if(args[0] == "SELECT") {
        answer = getting_query[0][get_result_var]
    }

    if(getting_query.length === 0) {

        message.channel.send({
            content: "**Query**: Result was empty but completed successfully."
        });

    } else {
        
        let QueryEmbedSucc = new MessageEmbed()
            .setTitle("Query")
            .setColor("#F9A3BB")
            .setDescription(answer);

        message.channel.send({
            embeds: [QueryEmbedSucc]
        });
    }
};

module.exports.help = {
	name: 'query',
	description: 'Database Query based on syntax',
	usage: '=query <SQL Syntax>'
};