const config = require("../config/config.json");
module.exports.easteregg_send_msg = async(message, arg) => {
    let selected_index = config.easteregg_words.indexOf(arg)
    message.client.channels.cache.get("741711007465865339").send("<@409731934030135306>\n**"+message.author.username+"**\nSuccessfully found easter egg #"+(selected_index+1));
    message.react(String(config.easteregg_reactions[selected_index]));
    return message.channel.send("Bing Bong! #"+(selected_index+1));
}