const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const tops = require("../functions/tops.js");
let get_table_output;
let tops_embed = new MessageEmbed().setColor("#F9A3BB").setFooter("If you need to remove the image from Database, ask staff member to request to remove the image.");

module.exports = {
    data: new SlashCommandBuilder().setName("tops").setDescription("Saved top messages from this guild")
        .addStringOption(option => option.setName("option").setDescription("Add a funny message to the database").addChoices([
            ["Add", "add"],
            ["View", "view"],
            ["Remove", "remove"]
        ]).setRequired(true))
        .addStringOption(option => option.setName("link").setDescription("Link - Only available when adding or removing (in view option it's useless)")),
    async execute(interaction, DB) {
        get_table_output = await call_check_for_table(DB, interaction.guild.id, "discord_chat_memes");
        if(get_table_output == false) {
            tops.create_table(DB, interaction.guild.id);
            return interaction.reply({
                content: "**Tops** Please rerun the the same command"
            });
        }
        switch(interaction.options.getString("option")) {
            case 'add':
                await check_everything(interaction, interaction.options.getString("link"));
                DB.query("INSERT INTO `discord_chat_memes`.`"+interaction.guild.id+"` (link) VALUES('"+interaction.options.getString("link")+"') ON DUPLICATE KEY UPDATE `link` = '"+interaction.options.getString("link")+"'");
                return interaction.reply({
                    content: "<:pinkie_yes:852973753465831474> **Tops** Successfully saved this link: to the database:\n> "+interaction.options.getString("link")
                });
            case 'view':
                tops.select_for_view(DB, interaction.guild.id).then(result => {
                    if(result.length == 0) {
                        return interaction.reply({
                            content: "**Tops** There are no saved tops images in the database"
                        })
                    }
                    tops_embed.setURL(result[0]["link"]).setAuthor(interaction.user.username).setTitle("Link").setImage(result[0]["link"]);
                    return interaction.reply({
                        embeds: [tops_embed]
                    });
                });
                return;
            case 'remove':
                await check_everything(interaction, interaction.options.getString("link"));
                tops.delete(DB, interaction.guild.id, interaction.options.getString("link"));
                return interaction.reply({
                    content: "<:pinkie_yes:852973753465831474> **Tops** Successfully deleted image `"+interaction.options.getString("link")+"` from the database"
                });
        }
    }
};

async function check_everything(interaction, link) {
    if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) && !interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && !interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
        return interaction.reply({
            content: "**Tops** Sorry, but you cannot add top message to the database."
        });
    }

    if(!link) {
        return interaction.reply({
            content: "**Tops** Sorry, `link` must be provided to continue"
        });
    }

    if(!/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(link)) {
        return interaction.reply({
            content: "**Tops** Sorry, `link` must contain http or https at start and cannot contain spaces"
        });
    }
    if(!/(\.[png|jpg]+)/.test(link)) {
        return interaction.reply({
            content: "**Tops** Sorry, `link` must end with `.jpg` or `.png`"
        });
    }
};

async function call_check_for_table(DB, guild, string) {
    tops.check_table(DB, guild, string).then(result => {
        if(result[0]["COUNT(*)"] == 0) {
            return false;
        } else {
            return true;
        }                    
    });
};