const chalk = require("chalk");
let ActivityName = "with everypony!";
let ActivityType = "PLAYING";
let Status = "idle";
module.exports = (client) => {
    client.user.setPresence({
        activities: [{
            name: ActivityName,
            type: ActivityType
        }]
    });
    client.user.setStatus(Status);

    let allMembers = 0;
    client.guilds.cache.forEach((guild) => {
      allMembers = allMembers+parseInt(guild.memberCount);
    });
  
    let allChannels = new Set();
    client.guilds.cache.forEach((guild) => {
      guild.channels.cache.forEach((channel) => {
        allChannels.add(channel.id);
      });
    });
  
    console.log(
      chalk.bgMagentaBright.black(` ${client.guilds.cache.size} servers `),
      chalk.bgMagentaBright.black(` ${client.channels.cache.size} channels `),
      chalk.bgMagentaBright.black(` ${allMembers} members `)
    );
    console.log(chalk.bgGray.white(" Status: "+Status+" "),chalk.bgGray.white(" Acitivity: "+ActivityType + " "+ActivityName+" "));
    console.log(chalk.bgBlueBright.black(" > Moon.Bot is now online! < "));
}