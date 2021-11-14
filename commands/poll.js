const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require("discord.js");
const { check_for_poll_in_db } = require("../functions/basic.js");
let Mention;

module.exports = {
    name: "poll",
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Post Yes/No poll in specific channel")
        .addStringOption(option => option.setName("question").setDescription("Question to be asked for int the poll").setRequired(true)),
    async execute(interaction, DB) {
        let check_for_poll_details = await check_for_poll_in_db(DB, interaction);
        if (check_for_poll_details[0]["poll_mention"] == "-" || check_for_poll_details[0]["poll_mention"] == "here") {
            if (!interaction.member.permissions.has(Permissions.FLAGS.MENTION_EVERYONE)) return interaction.reply({
                content: "**Poll**: You don't have permission to mention everyone or here."
            });
            if (check_for_poll_details[0]["poll_mention"] == "-") Mention = "@everyone";
            if (check_for_poll_details[0]["poll_mention"] == "here") Mention = "@here";
        } else {
            Mention = "<@&"+check_for_poll_details[0]["poll_mention"]+">";
        }

        let AnketaEmbed = new MessageEmbed()
            .setColor('#F9A3BB')
            .setTitle('Poll')
            .setAuthor(interaction.user.username, interaction.user.avatarURL({ dynamic: true }))
            .setThumbnail("https://media.discordapp.net/attachments/741613882002505752/846793744207708170/7443_Fall_question_mark.png")
            .setDescription(interaction.options.getString("question"))
            .setTimestamp()
            .setFooter("Moon.Bot V2");

        if(check_for_poll_details[0]["poll_channel"] == "same") {
            interaction.reply({
                content: Mention,
                embeds: [AnketaEmbed] 
            }).then(sentEmoji => {
                sentEmoji.react("<:pinkie_yes:852973753465831474>");
                sentEmoji.react("<:pinkie_no:852973704556183552>");
            });
        } else {
            interaction.client.channels.cache.get(check_for_poll_details[0]["poll_channel"]).send({
                content: Mention,
                embeds: [AnketaEmbed]
            }).then(sentEmoji => {
                sentEmoji.react("<:pinkie_yes:852973753465831474>");
                sentEmoji.react("<:pinkie_no:852973704556183552>");
                interaction.reply({
                    content: "Done!"
                });
            });
        }
    }
};