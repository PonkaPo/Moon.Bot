const AllowedIdsSave = ['422882850166276096', '409731934030135306', '478258433611661322', '699214855823163433', '532512473492750356', '723265524213088412'];
let CheckForNumbers, SendString;

module.exports = {
  name: 'save',
  description: 'Uložiť správu.',
  usage: '=save',
  async execute(message, args) {
    if (message.channel.type == "dm") return message.channel.send("Tento príkaz nefunguje v Priamej Správe");
    if (!AllowedIdsSave.includes(message.member.id)) return message.channel.send("**SAVE**: Nemáš povolenie na tento príkaz");
    console.log(args);
    if (!args.length) {
      message.client.channels.resolve(message.channel.id).messages.fetch({ limit: 2 }).then(messages => {
        let lM = messages.last();
        if (!lM.content.length) return message.channel.send("Prázdna správa");
          SendString = "\n= = = = = = = = = =\nAuthor: **"+lM.author.username+"**\n\nObsah Správy:\n"+lM.content+"\n\nLink: "+lM.url+"\n\nUložil: *"+message.author.username+"*\n= = = = = = = = = ="
        });
    } else {
      CheckForNumbers = args[0]
      if (!hasNumber(CheckForNumbers)) return message.channel.send("Neplatné ID");
      message.channel.messages.fetch(args[0]).then(msg => {
        if (!msg.content.length) return message.channel.send("Prázdna správa");
        SendString = "\n= = = = = = = = = =\nAuthor: **"+msg.author.username+"**\n\nObsah Správy:\n"+msg.content+"\n\nLink: "+msg.url+"\nUložil: *"+message.author.username+"*\n= = = = = = = = = ="
      })
    }
    message.client.channels.cache.get("850652761405653002").send(SendString);
    message.react('<:pinkie_check:850700632473075712>');
	},
}

function hasNumber(CheckForNumbers) {
  return /\d/.test(CheckForNumbers);
}