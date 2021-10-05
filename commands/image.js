const { SlashCommandBuilder } = require('@discordjs/builders');

const e621 = require("../functions/image/e621.js");
const derpi = require("../functions/image/derpi.js");
const gelbooru = require("../functions/image/gelbooru.js");
const send_image = require("../functions/image/send_image.js");

let image_array_to_embed = []; //[0] == Yes/no - if there is result or not | [1] = ID of image | [2] = ID with Link | [3] = file url of image
let site,rating,tags,nsfw;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("image")
        .setDescription("Search for images in e621 imageboard")
        .addSubcommand(subcommand => subcommand.setName("e621").setDescription("Search images from e621.net")
            .addStringOption(option => option.setName("rating").setDescription("Choose rating to search").setRequired(true).addChoices([["Safe", "s"],["Questionable (NSFW)", "q"], ["Explicit (NSFW)", "e"]]))
            .addStringOption(option => option.setName("tags").setDescription("tags to search for images (example").setRequired(true)))

        .addSubcommand(subcommand => subcommand.setName("derpi").setDescription("Search images from derpibooru.org")
            .addStringOption(option => option.setName("rating").setDescription("Choose rating to search").setRequired(true).addChoices([["Safe", "sa"],["Suggestive (NSFW)","su"],["Questionable (NSFW)", "q"],["Explicit (NSFW)", "e"]]))
            .addStringOption(option => option.setName("tags").setDescription("tags").setRequired(true)))

        .addSubcommand(subcommand => subcommand.setName("gelbooru").setDescription("Search images from gelbooru.com")
            .addStringOption(option => option.setName("rating").setDescription("Choose rating to search").setRequired(true).addChoices([["Safe", "safe"],["Questionable", "questionable"],["Explicit", "explicit"]]))
            .addStringOption(option => option.setName("tags").setDescription("tags").setRequired(true)))
        .addSubcommand(subcommand => subcommand.setName("help").setDescription("Help guide for image commands.").addStringOption(option => option.setName("site").setDescription("Site to get information about").setRequired(true).addChoices([["e621", "e"], ["derpi", "d"], ["gelbooru", "g"]]))),
    async execute(interaction, DB, store_image_tags_sites, store_images_for_button) {
        store_images_for_button[interaction.channelId] = {};
        nsfw = interaction.channel.nsfw;
        switch(interaction.options.getSubcommand()) {
            case 'help':
                switch(interaction.options.getString("site")){
                    case 'e':
                        return interaction.reply({
                            embeds: [{
                                title: "e621 Help Menu",
                                description: "This is fully working command for searching images on site gelbooru.\nMost of images are NSFW, so it cannot be bypasses in non-nsfw channel and cannot be override by `-q` (questionable) or `-e` (explicit).\nThese rating tags are overriden by safe rating when the command is ran in non-nsfw channel.\n\nTo search for images, use tags in this style:\n`gloves boots solo` (So use space to **separate** tags)"
                            }]
                        });
                    case 'g':
                        return interaction.reply({
                            embeds: [{
                                title: "e621 Help Menu",
                                description: "This is fully working command for searching images on site e621.\nMost of images are NSFW, so it cannot be bypasses in non-nsfw channel and cannot be override by `-q` (questionable) or `-e` (explicit).\nThese rating tags are overriden by safe rating when the command is ran in non-nsfw channel.\n\nTo search for images, use tags in this style:\n`solo anthro hair` (So use space to **separate** tags)"
                            }]
                        });
                    case 'd':
                        return interaction.reply({
                            embeds: [{
                                title: "derpibooru Help Menu",
                                description: "This is fully working command for searching images on site derpibooru.\nMost of images are NSFW, so it cannot be bypasses in non-nsfw channel and cannot be override by manually setting filter to `suggestive`, `questionable` or `explicit`.\nThese rating tags are overriden by safe rating when the command is ran in non-nsfw channel.\n\nTo search, split tags using comma `,` so use tags like: `twilight sparkle, solo, anthro`"
                            }]
                        });
                }
                return;
            case 'gelbooru':
                store_images_for_button[interaction.channelId][0] = "gelbooru";
                site = "Gelbooru";
                rating = interaction.options.getString("rating");
                tags = interaction.options.getString("tags");
                await gelbooru.gelbooru(rating, tags, image_array_to_embed, nsfw);
                break;
            case 'derpi':
                store_images_for_button[interaction.channelId][0] = "derpi";
                site = "Derpibooru";
                rating = interaction.options.getString("rating");
                tags = interaction.options.getString("tags");
                await derpi.derpibooru(rating, tags, image_array_to_embed, nsfw);
                break;
            case 'e621':
                store_images_for_button[interaction.channelId][0] = "e621";
                site = "e621";
                rating = interaction.options.getString("rating");
                tags = interaction.options.getString("tags");
                await e621.e621(rating, tags, image_array_to_embed, nsfw);
                break;
        }
        store_images_for_button[interaction.channelId][1] = tags;
        store_images_for_button[interaction.channelId][2] = rating;
        store_images_for_button[interaction.channelId][3] = image_array_to_embed[4];
        await send_image.send(interaction, image_array_to_embed, site);
    }
};

module.exports.send_as_button = async(interaction, store_images_for_button) => {
    if(!store_images_for_button[interaction.channelId]) {
        return interaction.channel.send({
            content: "No saved image properties to send."
        })
    }
    switch(store_images_for_button[interaction.channelId][0]) {
        case 'e621':
            image_array_to_embed[4] = "e621";
            await e621.e621(store_images_for_button[interaction.channelId][2], store_images_for_button[interaction.channelId][1], image_array_to_embed);
            break;
        case 'gelbooru':
            image_array_to_embed[4] = "Gelbooru";
            await gelbooru.gelbooru(store_images_for_button[interaction.channelId][2], store_images_for_button[interaction.channelId][1], image_array_to_embed, image_array_to_embed[5]);
            break;
        case 'derpi':
            image_array_to_embed[4] = "Derpibooru";
            await derpi.derpibooru(store_images_for_button[interaction.channelId][2], store_images_for_button[interaction.channelId][1], image_array_to_embed);
            break;
    }
    await send_image.send_from_button(interaction, image_array_to_embed, store_images_for_button);
}