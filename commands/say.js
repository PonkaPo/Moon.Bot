const { SlashCommandBuilder } = require('@discordjs/builders');
let C_Emoji, EmojiResult, Allowed;
let C_Sprava = [];
let Args = [];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Bot will say your message."),
    async execute(interaction) {
        interaction.reply({
            embeds: [{
                color: "#F9A3BB",
                title: "Say",
                author: {
                    name: interaction.user.username,
                    icon_url: interaction.user.avatarURL()
                },
                description: "How to use say?\nWell it's pretty easy, to still leave it simple, say can't be used by interaction (Slash Command).",
                fields: [
                    {
                        name: "What command is it?",
                        value: "The whole command is `=say` with arguments.",
                        inline: false,
                    },
                    {
                        name: 'What arguments to use?',
			            value: 'There is only 1 argument `-i` it can be used to send message as bot without sending username of the message sender.\n\nSo, instead of:\n**Pinkamena Diane Song**: _this is best bot_\nWill bot just send:\n_this is best bot_',
			            inline: false,
                    },
                    {
                        name: 'What the error codes means?',
			            value: "`Error 1` means that the you didn't typed any message that could be send\n`Error 2` means that you don't have at least one of the permissions: `MANAGE_MESSAGES`, `MANAGE_GUILD` or `ADMINISTRATOR` to use -i argument",
			            inline: false,
                    },
                ]
            }]
        });
    }
}