module.exports.save_edited = async(oldmsg, newmsg, msg_edits_array) => {
    if(!msg_edits_array[oldmsg.guildId]) msg_edits_array[oldmsg.guildId] = {}; //Initialize Guild in the array to store    
    if(!msg_edits_array[oldmsg.guildId][oldmsg.channelId]) msg_edits_array[oldmsg.guildId][oldmsg.channelId] = {}; //Initialize Channel from Guild in the array to store
    msg_edits_array[oldmsg.guildId][oldmsg.channelId]["name"] = oldmsg.author.username+"#"+oldmsg.author.discriminator; //Save name+disc inside the array
    msg_edits_array[oldmsg.guildId][oldmsg.channelId]["name-pfp"] = oldmsg.author.displayAvatarURL(); //Save name+disc inside the array
    msg_edits_array[oldmsg.guildId][oldmsg.channelId]["old"] = oldmsg.content; //Save oldmsg content inside the array
    msg_edits_array[oldmsg.guildId][oldmsg.channelId]["new"] = newmsg.content; //Save newmsg content inside the array
}