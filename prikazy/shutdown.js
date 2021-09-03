module.exports.run = async (client,message, args, DBConnection) => {
    if (message.author.id !== "409731934030135306") return message.channel.send({
      content: "**Shutdown**: You can't shut down the bot."
    });

    message.channel.send({
      content: '**Pinkamena.Bot** -> Shutting Down...'
    }).then(m => {
      DBConnection.end();
      console.log("MYSQL -> Disconnected!");
      client.destroy();
      process.exit(0);
    });
};

module.exports.help = {

  name: 'shutdown',
  aliases: ['shut'],
  description: 'Bot will shutdown',
  usage: '=shutdown'

};