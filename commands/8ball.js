const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const odpovede = ["Jae (Yes)", "Nae (No)", "Nae vieg (No way)", "I'southe (Indeed)", "Mag (Might)", "Min (least)", "Wal (Probably)", "Wal nae (Probably not)"];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("Answers your question")
        .addStringOption(option => 
            option.setName("question")
                .setDescription("Question to ask")
                .setRequired(true)),
    async execute(interaction) {

        selectrandomanswer = odpovede[Math.floor(Math.random()*odpovede.length)];

	    let ballembed = new MessageEmbed()
            .setColor("#F9A3BB")
            .setAuthor("🎱 8-ball")
            .setDescription('**Your question ❓**\n'+interaction.options.getString("question"))
            .addField('**8-ball answers 🔮**', selectrandomanswer)
            .setFooter(interaction.user.username);
        
        return interaction.reply({embeds: [ballembed]});

    }
};