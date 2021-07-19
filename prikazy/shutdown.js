const mysql = require('mysql');
module.exports.run = async (client,message, args, DBConnection) => {
    if (message.author.id !== "409731934030135306") return message.channel.send("**Shutdown**: You can't shut down the bot.");
    message.channel.send('**Pinkamena.Bot** -> Shutting Down...').then(m => {
      DBConnection.end(function(err) {});
      console.log("MYSQL -> Disconnected!");
      message.channel.send("**MySQL** -> Disconnected!");
      client.destroy();
      process.exit(0);
    });
};
module.exports.help = {
  name: 'shutdown',
  aliases: ['shut', 'down'],
  description: 'Bot will shutdown',
  usage: '=shutdown'
};