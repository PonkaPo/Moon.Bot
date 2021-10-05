const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
let channel;
let AllowedServers = ["827965464202051605", "741613882002505749", "833417797060263977"];

module.exports = {
    data: new SlashCommandBuilder().setName("srandyzabavy").setDescription("[DEPRECATED] Slovak Jokes from multiple Discord servers (This command is limited to a single server)")
        .addStringOption(option => option.setName("channel").setDescription("Channel to take jokes from").addChoices([
            ["Safe", "safe"],
            ["Explicit", "explicit"]
        ]).setRequired(true)),
    async execute(interaction) {
        if(interaction.user.id !== "409731934030135306") return interaction.reply({content: "**SrandyZabavy**: This command is WIP."});
        if(!AllowedServers.includes(interaction.guild.id)) return interaction.reply({content: "**SrandyZabavy**: This command is not allowed on this server."});

        switch(interaction.options.getString("channel")) {
            case "safe":
                return channel = interaction.client.channels.cache.get("867467400693940294");
            case "explicit":
                return channel = interaction.client.channels.cache.get("866023143813808129");
        }

        let fetchedMessages = await channel.messages.fetch({
            limit: 100
        });
        let fetchedArray = Array.from(fetchedMessages);
        let random_msg = Math.floor(Math.random()*fetchedMessages.size);
        let msg_attach = fetchedArray[random_msg][1]["attachments"].find(attachment => attachment.url);
        SZEmbed = new MessageEmbed()
    	    .setColor("#F9A3BB")
    	    .setAuthor("Hláška pre "+interaction.user.username)
		    .setImage(msg_attach["attachment"])
		    .setFooter("Pokiaľ chceš zmazať tento obrázok, napíš sem správu cez reply, bude následne odstránená.");
        return interaction.reply({
		    embeds: [SZEmbed]
	    });

    }
}

