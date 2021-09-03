const { MessageEmbed } = require("discord.js");
const sfunctions = require("../functions/server.js");
let mentioned;
let WarnEmbed = new MessageEmbed().setTitle("Warn").setColor("#F9A3BB").setTimestamp();

module.exports.run = async (client, message, args, DBConnection) => {
  let check_no = 1;
  let check_for_warn = await sfunctions.check_for_warns_db(DBConnection, guild, string, check_no);
  if(check_for_warn[0]["enabled_warns"] == "no") {
    WarnEmbed.setDescription("Warns are disabled for this Guild.");
    return message.channel.send({
      embeds: [WarnEmbed]
    });
  }
  if(!message.mentions.members.first()) {
    WarnEmbed.setDescription("You didn't mention any member to warn.\nUse: `warn <mention> <reason>`")
    return message.channel.send({
      embeds: [WarnEmbed]
    });
  } else {
    mentioned = message.mentions.members.first();
    args.shift();
  }
  if(message.author.bot) return;
  if(args.length == 0) {
    WarnEmbed.setDescription("You need to provide reason, it's mandatory.");
    return message.channel.send({
      embeds: [WarnEmbed]
    });
  }
  if(args[0] == "remove") {
    if(!args[1]) {
      WarnEmbed.setDescription("You need to provide `uID` to remove warn.");
      return message.channel.send({
        embeds: [WarnEmbed]
      });
    }
    await sfunctions.delete_warn_data(DBConnection, mentioned, message.guild.id, args[1]);
    WarnEmbed.setDescription("Successfully removed warn with uID: "+args[1]);
    return message.channel.send({
      embeds: [WarnEmbed]
    });
  } else {
    await sfunctions.check_if_user_exists_in_db(DBConnection, mentioned.user.id, message.guild.id);
    reason = args.join(" ");
    let uID_result = await create_uniqueID();
    await sfunctions.write_warn_data(DBConnection, message.author.id, uID_result, reason, mentioned.user.id, message.guild.id);
    WarnEmbed.setDescription("**Warned member:**\n<@"+mentioned.user.id+">").addField("Warned by:", "<@"+message.author.id+">").addField("Reason:", reason).setFooter("uID: "+uID_result);
    return message.channel.send({
      embeds: [WarnEmbed]
    }).then(WarnEmbed = new MessageEmbed().setTitle("Warn").setColor("#F9A3BB").setTimestamp());
  }
}

module.exports.help = {
    name: 'warn',
    description: 'Warns a member.',
    usage: 'warn <mention> <reason>',
};

function create_uniqueID() {
    var create_result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
      create_result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return create_result;
}