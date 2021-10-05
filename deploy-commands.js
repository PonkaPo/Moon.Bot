const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { client } = require('./config/config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(client.token);

try {
	console.log('Started refreshing application (/) commands.');
	rest.put(
		Routes.applicationGuildCommands("746409149507567632", "827965464202051605"),
		{ body: commands },
	);
	rest.put(
		Routes.applicationGuildCommands("746409149507567632", "741613882002505749"),
		{ body: commands },
	);
} catch (error) {
	console.error(error);
};