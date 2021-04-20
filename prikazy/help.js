const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  name: 'help',
  description: 'Zobrazí embed s pomocou.',
  usage: '=help',
  async execute(message, args) {
    const helpmsg = new Discord.MessageEmbed()
			.setColor('#7162ba')
			.setTitle('Potrebuješ pomôcť?')
			.setDescription('Zoznam príkazov máš cez:\n```' + config.prefix + 'cmd\n' + config.prefix + 'cmds\n' + config.prefix + 'prikazy\n' + config.prefix + 'commands```\n\nPokiaľ potrebuješ pomoc s botom, stačí napísať <@409731934030135306>.')
		message.channel.send(helpmsg);
	},

}