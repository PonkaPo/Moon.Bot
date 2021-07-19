const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config/config.json");
const mysql = require('mysql');
const fs = require("fs");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.description = new Discord.Collection();
client.usage = new Discord.Collection();
const CannotUseInDM = ["ban", "boop", "delete", "hug", "info", "kick", "nick", "pin", "poll", "rr", "serverinfo", "unban"];
const DBConnection = mysql.createConnection(config.mysql);
let FinalPrefix;
fs.readdir("./prikazy/", (err, files) =>{
    if(err) console.log(err);
    let jsfile = files.filter(f => f.endsWith('.js'))
    if(jsfile.length <= 0){
      console.log("Nenašol som žiaden príkazy.");
      return;}
    jsfile.forEach((f) =>{
      let prikaz = require(`./prikazy/${f}`);
      console.log(`Loaded: ${f}`);
      client.commands.set(prikaz.help.name, prikaz);
      if (prikaz.help.aliases) {
        prikaz.help.aliases.forEach(alias => {
            client.aliases.set(alias, prikaz.help.name)
        });}});});
DBConnection.connect(function(err) {if (err) {return console.error('error connecting: ' + err.stack);} else {console.log("MySQL: Connected!")}});
client.on("ready", () => {
    client.user.setActivity(config.client.afterPrefix);
    client.channels.cache.get("833625728310444042").send("**"+client.user.username+"** --> Online & Up\n**MySQL**: Connected");
    console.log(client.user.username+" -> Online");});
client.on("message", async message => {
	if (message.author.bot) return;
    DBConnection.query("SELECT `server_prefix` FROM `discord`.`servers` WHERE `server_id` = '"+message.guild.id+"'", function (error, checkprefix) {
        let sqldata = JSON.parse(JSON.stringify(checkprefix));
        if (checkprefix.length == 0) {
            DBConnection.query("SELECT * FROM  `servers`  WHERE `server_id`='"+message.guild.id+"'");
            DBConnection.query("INSERT INTO `servers` VALUES ('"+message.guild.id+"', '"+config.client.prefix+"') ON DUPLICATE KEY UPDATE `server_prefix`='"+config.client.prefix+"'");
            FinalPrefix = config.client.prefix;
        } else {  
            FinalPrefix = sqldata[0]["server_prefix"];
        }
        if (/<@!746409149507567632>|<@746409149507567632>/.test(message.content)) {
            let PrefixReply = new Discord.MessageEmbed()
    	        .setColor("#F9A3BB")
    	        .setTitle('Prefix')
                .setDescription("**"+message.guild.name+"** --> `"+FinalPrefix+"`");
            return message.reply(PrefixReply);}
        if (!message.content.startsWith(FinalPrefix)) return;
        const args = message.content.slice(FinalPrefix.length).trim().split(" ");
        let commandName = args.shift().toLowerCase();
        let command = client.commands.get(commandName);
        if (!command) command = client.commands.get(client.aliases.get(commandName))
        if (!command) return;
        commandName = command.help.name;
        if (CannotUseInDM.includes(commandName) && message.channel.type == "dm") return message.channel.send("Command **"+commandName+"** cannot be used in Direct Messages");
        command.run(client, message, args, DBConnection);
    });
});
client.login(config.client.token);