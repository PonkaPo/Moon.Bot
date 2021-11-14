const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require("discord.js");
const fs = require('fs');
const SiPath = "./citaty/Single_Quotes-Quoterific/";
const ScPath = "./citaty/Scene_Cut_Quotes-Quoterific/";
let SelectedPath, QuoteArray;

module.exports = {
    name: "quote",
    data: new SlashCommandBuilder()
        .setName("quote")
        .setDescription("Inspirational quote from MLP")
        .addStringOption(option => option.setName("type").setDescription("Type of quote").addChoice("Single", "single").addChoice("Scene Cut", "scene_cut")),
    async execute(interaction) {
        if(!interaction.options.getString("type")) {
            selectrandom = Math.floor(Math.random() * (100 - 1 + 1) + 1);
            if (selectrandom%2 == 0) {
                SelectedPath = SiPath;
            } else SelectedPath = ScPath;
        } else {
            if(interaction.options.getString("type") == "single") SelectedPath = SiPath;
            if(interaction.options.getString("type") == "scene_cut") SelectedPath = ScPath;
        }
        QuoteArray = fs.readdirSync(SelectedPath);
        SelectFromArray = QuoteArray[Math.floor(Math.random()*QuoteArray.length)];
        let QuoteAttach = new MessageAttachment(SelectedPath+SelectFromArray);
        let QuoteEmbed = new MessageEmbed()
            .setTitle("There's your inspiration quote... :heart:")
            .setImage('attachment://'+SelectFromArray);
        return interaction.reply({
            embeds: [QuoteEmbed],
            files: [QuoteAttach]
        });
    }
}