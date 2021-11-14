const { SlashCommandBuilder } = require('@discordjs/builders');
let HugMSG;

module.exports = {
    name: "hug",
    data: new SlashCommandBuilder()
        .setName("hug")
        .setDescription("hug a member")
        .addUserOption(option => option.setName("target").setDescription("Select target member to hug").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("Reason for hug")),
    async execute(interaction) {
        if(!interaction.options.getUser("target")) return interaction.reply({ 
            content: "**Hug**: You didn't wrote which member you want to hug"
        });

        let user = interaction.options.getUser("target");
        if (user == interaction.user.id) return interaction.reply({
            content: "**Hug**: You can't hug yourself."
        });

        if(!interaction.options.getString("reason")) {
            HugMSG = "<:BoopSomeone:833733370420265021> | **"+interaction.user.username+"** booped **"+user.username+"**";
        } else {
            HugMSG = "<:BoopSomeone:833733370420265021> | **"+interaction.user.username+"** booped **"+user.username+"**, "+interaction.options.getString("reason");
        }
        return interaction.reply({
            content: HugMSG
        });
    }
};