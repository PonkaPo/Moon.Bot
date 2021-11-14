const { MessageActionRow, MessageButton } = require('discord.js');

module.exports.send = async(interaction, image_array, site) => {
    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('again')
					.setLabel('Again!')
					.setStyle('PRIMARY'),
			)
            .addComponents(
				new MessageButton()
					.setLabel(site + ' Link')
					.setStyle('LINK')
                    .setURL(image_array[2]),
			)
            .addComponents(
				new MessageButton()
					.setLabel('Full Link')
					.setStyle('LINK')
                    .setURL(image_array[3]),
			);
    switch(image_array[0]) {
        case 'No':
            return interaction.reply({
                embeds: [{
                    color: '#F9A3BB',
                    author: {
                        name: site
                    },
                    title: "Not Found",
                    footer: {
                        text: "For "+interaction.user.username
                    },
                    description: "No images found for your tags: "+interaction.options.getString("tags")
                }]
            });
        case 'Yes':
            return interaction.reply({
                embeds: [{
                    color: '#F9A3BB',
                    author: {
                        name: site
                    },
                    title: "ID: "+image_array[1],
                    url: image_array[2],
                    image: {
                        url: image_array[3]
                    },
                    description: "Search tags: `"+interaction.options.getString("tags")+"`",
                    footer: {
                        text: "For "+interaction.user.username
                    }
                }]
                , components: [row]});
    }    
}

module.exports.send_from_button = async(interaction, image_array, store_images_for_button) => {
    const button_row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('again')
					.setLabel('Again!')
					.setStyle('PRIMARY'),
			)
            .addComponents(
				new MessageButton()
					.setLabel(image_array[4]+' Link')
					.setStyle('LINK')
                    .setURL(image_array[2]),
			)
            .addComponents(
				new MessageButton()
					.setLabel('Full Link')
					.setStyle('LINK')
                    .setURL(image_array[3]),
			);
    switch(image_array[0]) {
        case 'No':
            return interaction.reply({
                embeds: [{
                    color: '#F9A3BB',
                    author: {
                        name: image_array[4]
                    },
                    title: "Not Found",
                    footer: {
                        text: "For "+interaction.user.username
                    },
                    description: "No images found for your tags: "+store_images_for_button[interaction.channelId][1]
                }]
            });
        case 'Yes':
            return interaction.reply({
                embeds: [{
                    color: '#F9A3BB',
                    author: {
                        name: image_array[4]
                    },
                    title: "ID: "+image_array[1],
                    url: image_array[2],
                    image: {
                        url: image_array[3]
                    },
                    description: "Search tags: `"+store_images_for_button[interaction.channelId][1]+"`",
                    footer: {
                        text: "For "+interaction.user.username
                    }
                }]
                , components: [button_row]});
    }    
}