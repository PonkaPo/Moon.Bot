module.exports.run = async (client,message, args) => {
    if (message.author.id !== "409731934030135306") return message.channel.send("**Shutdown**: You can't shut down the bot.");
    message.channel.send('**Pinkamena.Bot** -> Shutting Down...').then(m => {
        client.destroy();
    });
};
module.exports.help = {
  name: 'shutdown',
  aliases: ['shut', 'down'],
  description: 'Bot will shutdown',
  usage: '=shutdown'
};