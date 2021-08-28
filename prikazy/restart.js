const config = require("../config/config.json");

module.exports.run = async (client,message) => {

    if (message.author.id !== "409731934030135306") return message.channel.send({
      content: "**Restart**: You can't restart the bot."
    });

    message.channel.send({
      content: '**Pinkamena.Bot** -> Restarting...'
    }).then(m => {
        client.destroy()
        client.login(config.token);
    });
};

module.exports.help = {

  name: 'restart',
  description: 'Bot restart',
  usage: '=restart'

};