const { Client, Intents, Collection } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const mysql = require('mysql');
const fs = require("fs");

const config = require("./config/config.json");
const levels = require("./functions/levels.js");
const experience = require("./functions/experience.js");
const edited = require("./functions/edited.js");
const image = require("./commands/image.js");

const say = require("./msg_cmds/say.js");
const easteregg = require("./msg_cmds/easteregg.js");

let args = []; //Array to store arguments from messageCreate
let msg_edits_array = {}; //Array to store edit messages
let store_image_tags_sites = []; //Array to store things for images
let store_images_for_button = {}; //Array to save images properties to work button correctly

client.commands = new Collection();
const slashcommands = fs.readdirSync("./commands").filter(f => f.endsWith('.js'));

for (const file of slashcommands) {
    let prikaz = require(`./commands/${file}`);
    console.log(`Slash Command: ${file} Loaded!`);
    client.commands.set(prikaz.data.name, prikaz);
}

const DB = mysql.createPool(config.mysql, {multipleStatements: true});

client.once("ready", () => {
    client.user.setPresence({
        activities: [{
            name: "with everypony!", 
            type: "PLAYING"
        }]
    });
    client.user.setStatus("idle");
    client.channels.cache.get("741711007465865339").send("**"+client.user.username+"** --> Online & Up\n**MySQL**: Connected");
    console.log("Moon.Bot is online!");
});

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand() && !interaction.isButton()) return;
    if(interaction.isButton()) {
        if(interaction.customId == "again") {
            return image.send_as_button(interaction, store_images_for_button, store_image_tags_sites);
        }
    }

    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
		await command.execute(interaction, DB, store_image_tags_sites, store_images_for_button, msg_edits_array);
	} catch (error) {
		console.error(error);
		return interaction.reply({ 
            content: interaction.commandName+' > Error has occurred: '+error.message, ephemeral: true 
        });
	}
});

client.on('messageCreate', async message => {
	if (message.author.bot) return;
    const check_if_levels_are_enabled = await levels.check_if_levels_are_enabled(DB, message.guild.id);
    if(check_if_levels_are_enabled[0]["enabled_levels"] == "yes") {
        
        experience.gen_exp(DB, message);
    }
    args = message.content.trim().split(" ");
    if(!message.content.startsWith("=") && !config.easteregg_words.includes(args[0])) return;
    if(config.easteregg_words.includes(args[0])) {
        await easteregg.easteregg_send_msg(message, args[0]);
    }
    
    if(args[0] == "=say") say.say(message, args);
    return;    
});

client.login(config.client.token);

client.on("guildCreate", (guild) => {
    DB.query("CREATE TABLE `discord_levels`.`"+guild.id+"` (user_id CHAR(50) PRIMARY KEY, xp_level INT(10) NOT NULL, xp_remain INT(10) NOT NULL, xp_exp INT(30) NOT NULL, last_xp BIGINT(20) NOT NULL)");
    DB.query("UPDATE `discord_levels`.`"+guild.id+"` SET `xp_exp` = '100', `last_xp` = `"+Date.now()+"` WHERE `user_id` = '"+guild.id+"'");
    DB.query("INSERT INTO `discord`.`servers` (server_id, mute_roleid, levels_channel, enabled_levels, poll_channel, poll_mention, roles_reward_check, enabled_warns) VALUES('"+guild.id+"', '-', 'same', 'yes', 'same', '-', 'no', 'no')");
    DB.query("CREATE DATABASE `discord_warns_"+guild.id+"`");
    client.channels.cache.get("741711007465865339").send("Added Guild with ID: "+guild.id+" to Database.");
});

client.on("guildDelete", (guild) => {
    DB.query("DROP TABLE `discord_levels`.`"+guild.id+"`");
    DB.query("DROP * FROM `discord`.`servers` WHERE `server_id` = "+guild.id)
    client.channels.cache.get("741711007465865339").send("Removed Guild with ID: "+guild.id+" from Database.");
});

client.on('messageUpdate', async(oldMessage, newMessage) => {
    await edited.save_edited(oldMessage, newMessage, msg_edits_array);
});