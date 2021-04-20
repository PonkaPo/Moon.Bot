const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.description = new Discord.Collection();
client.usage = new Discord.Collection();
let OwnerID = "409731934030135306";
let GuildID = "741613882002505749";

fs.readdir("./prikazy/", (err, files) =>{
    if(err) console.log(err);
    let jsfile = files.filter(f => f.endsWith('.js'))
    if(jsfile.length <= 0){ 
      console.log("Nenašol som žiaden príkazy.");
      return;
    }
    jsfile.forEach((f) =>{
      let prikaz = require(`./prikazy/${f}`);
      console.log(`Príkaz ${f} sa načítal!`);
      client.commands.set(prikaz.name, prikaz);
    });
});

client.on("ready", () => {
    client.user.setActivity(`Proste top bot, ja viem! | ` + config.prefix + `cmds`);
    client.channels.cache.get("833625728310444042").send("= = = \nBot je Online!\nÚčet: " + client.user.tag + "\n= = =");
    console.log("A až teraz som sa donačítal, ty kok.");
});

client.on("messageReactionAdd", async(reaction, user) => {
    if (reaction.message.guild.id == "739030506271932474") {
		if (reaction.message.id != "800101464550408272") return;

   		if (reaction.partial) {
      	  try {
            const ftverify = await channel.messages.fetch("800101464550408272");
       		} catch (error) {
            console.log("Something went wrong when fetching the reaction: ", error);
            return;
        	}
   		}
    	await reaction.message.guild.member.cache.get(user.id).roles.remove("739030506175201282");
        await client.channels.cache.get("739030507488280603").send("Týpek <@" + user.id + "> sa rozhodol pripojiť k nám  :wave: Poďme ho privítať! Poprípade si vezmi role z <#810971044923310141> a <@664824592371679232>, nezabudni ho privítať :wink:");
    
	}
});

client.on("message", async message => {
	if (message.author.bot) return;
    if (message.content.startsWith(config.prefix)) {
		const args = message.content.slice(config.prefix.length).trim().split(" ");
		const command = args.shift().toLowerCase();
        if (command != "updaterad") {
            client.channels.cache.get("833625728310444042").send(message.author.username + "\nSpráva: \n```" + message.content + "```");
        }
        switch(command) {
            case 'p':
            case 'pin':
            case 's':
			case 'save':
                client.commands.get('save').execute(message, args);
                break;
			case 'serverinfo':
                client.commands.get('serverinfo').execute(message, args);
                break;
			case 'info':
                client.commands.get('info').execute(message, args);
                break;
			case 'musiclist':
                client.commands.get('musiclist').execute(message, args);
                break;
			case 'updaterad':
                client.commands.get('updaterad').execute(message, args);
                break;
			case 'kazdyrad':
                client.commands.get('kazdyrad').execute(message, args);
                break;
			case 'boop':
                client.commands.get('boop').execute(message, args);
                break;
			case 'boop':
                client.commands.get('boop').execute(message, args);
                break;
			case 'shitpost':
                client.commands.get('shitpost').execute(message, args);
                break;
			case 'sendmsg':
                client.commands.get('sendmsg').execute(message, args);
                break;
			case 'nick':
                client.commands.get('nick').execute(message, args);
                break;
			case 'musiclink':
                client.commands.get('musiclink').execute(message, args);
                break;
			case 'avatar':
                client.commands.get('avatar').execute(message, args);
                break;
			case 'zivotnarada':
			case 'quote':
			case 'citat':
                client.commands.get('quote').execute(message, args);
                break;
			case 'del':
            case 'vym':
            case 'zmazat':
            case 'delete':
                client.commands.get('delete').execute(message, args);
                break;
            case 'status':
                client.commands.get('status').execute(message, args);
                break;
            case 'sai':
                client.commands.get('sai').execute(message, args);
                break;
            case 'say':
                client.commands.get('say').execute(message, args);
                break;
            case 'help':
                client.commands.get('help').execute(message, args);
                break;
			case 'cmd':
            case 'cmds':
            case 'commands':
            case 'prikazy':
                client.commands.get('prikazy').execute(message, args);
                break;
            default:
                const nocommandembed = new Discord.MessageEmbed()
					.setColor('#7162ba')
					.setTitle('Neexistujúci príkaz')
					.setDescription('Príkaz, ktorý si napísal neexistuje :(\nPokiaľ by si chcel vedieť zoznam príkazov, tak daj `' + config.prefix + 'cmds`.')
				message.reply(nocommandembed);
                break;
        }
    }
});

client.login(config.token);