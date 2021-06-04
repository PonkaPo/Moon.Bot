const AllowedIdsSave = ['422882850166276096', '409731934030135306', '478258433611661322', '699214855823163433', '532512473492750356', '723265524213088412'];
let CheckForNumbers

module.exports = {
  name: 'pin',
  description: 'Pinne poslednú správu.',
  usage: '=pin',
  async execute(message, args) {
    if (message.channel.type == "dm") return message.channel.send("Tento príkaz nefunguje v Priamej Správe");
    if (!message.member.hasPermission('MANAGE_MESSAGES') || !AllowedIdsSave.includes(message.member.id)) return message.channel.send("**PIN**: Nemáš povolenie na tento príkaz");
    if (!args.length) {
      message.client.channels.resolve(message.channel.id).messages.fetch({ limit: 2 }).then(messages => {
        message.delete();
        let lastMessage = messages.last();
        if (!lastMessage.content.length && !lastMessage.attachments.size > 0) return message.channel.send("Prázdna správa");
        lastMessage.pin();
      })
    } else {
      CheckForNumbers = args[0]
      if (hasNumber(CheckForNumbers)) {
        message.channel.messages.fetch(args[0]).then(msg => {
          msg.pin();
        })
      } else {
        message.channel.send("Neplatné ID")
      }
    }
	},
}

function hasNumber(CheckForNumbers) {
  return /\d/.test(CheckForNumbers);
}