const config = require("../config/config.json");
module.exports.run = async (client,message,args) => {
    if (message.author.id !== "409731934030135306") return message.channel.send("**Restart**: You can't restart the bot.");
    message.channel.send('**Pinkamena.Bot** -> Restarting...').then(m => {
        client.destroy()
        client.login(config.token);
    });
};
module.exports.help = {
  name: 'restart',
  aliases: ['r', 'res'],
  description: 'Bot will restart',
  usage: '=restart'
};