const { send_as_button } = require("../commands/image.js");
const { call_random_hex } = require("../commands/randomhex.js");

module.exports.catch_custom_button_id = async(cmd_id, interaction, store_images_for_button, store_image_tags_sites) => {
    switch(cmd_id) {
        case 'again':
            if(interaction.user.id == "863472647479099422") return disable_image_button(interaction);
            return send_as_button(interaction, store_images_for_button, store_image_tags_sites);
        case 'hex_another':
            return call_random_hex(interaction, cmd_id);
        default:
            break;
    }
    return;
};

async function disable_image_button(interaction) {
    await interaction.update({
        components: [{
            type: 1,
            components: [
                {
                    type: 2,
                    style: "SECONDARY",
                    custom_id: "again",
                    label: "Again",
                    disabled: true
                }
            ]
        }] 
    });
}