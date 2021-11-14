const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const axios = require("axios").default;

module.exports = {
    name: "randomhex",
    data: new SlashCommandBuilder()
        .setName("randomhex")
        .setDescription("Random HEX Color Generator"),
    async execute(interaction) {
        await randomhexgenerator(interaction);
    }
};

module.exports.call_random_hex = async(interaction, cmd_id) => {
    await randomhexgenerator(interaction,cmd_id);
}

async function randomhexgenerator(interaction, cmd_id) {
    if(cmd_id) {
        await interaction.update({ 
            components: [{
                type: 1,
                components: [
                    {
                        type: 2,
                        style: "SECONDARY",
                        custom_id: "hex_another",
                        label: "Another",
                        disabled: true
                    }
                ]
            }] 
        });
    }
    const another_color = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('hex_another')
				.setLabel('Another')
				.setStyle('PRIMARY'),
		);
    let randomhex = await random_hex();
    await axios.get("https://api.popcat.xyz/color/"+randomhex).then(response => {
        return interaction.followUp({
	    embeds: [{
            color: '#'+randomhex,
            title: "Random HEX color",
            description: "<- Check it here, it's: #"+randomhex+" ("+response.data.name+")",
            image: {
                url: "https://api.popcat.xyz/color/image/"+randomhex
            },
            footer: {
                text: "For "+interaction.user.username
            }
        }], components: [another_color]
	});
    });
}

function random_hex() {
    var create_result = '';
    var characters = 'abcdef0123456789';
    for ( var i = 0; i < 6; i++ ) {
      create_result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return create_result;
}