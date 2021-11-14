const { SlashCommandBuilder } = require('@discordjs/builders');
let BoopMSG;

module.exports = {
    name: "boop",
    data: new SlashCommandBuilder()
        .setName("boop")
        .setDescription("boop a member")
        .addUserOption(option => option.setName("target").setDescription("Select target member to boop").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("Reason for boop")),

    async execute(interaction) {
        if(!interaction.options.getUser("target")) return interaction.reply({ 
            content: "**Boop**: You didn't wrote which member you want to boop"
        });

        let user = interaction.options.getUser("target");
        if (user == interaction.user.id) return interaction.reply({
            content: "**Boop**: You can't boop yourself."
        });

        if(!interaction.options.getString("reason")) {
            BoopMSG = "<:BoopSomeone:833733370420265021> | **"+interaction.user.username+"** booped **"+user.username+"**";
        } else {
            BoopMSG = "<:BoopSomeone:833733370420265021> | **"+interaction.user.username+"** booped **"+user.username+"**, "+interaction.options.getString("reason");
        }
        return interaction.reply({
            content: BoopMSG
        });
    }
};