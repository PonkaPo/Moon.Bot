const fs = require("fs");

module.exports = {
  name: 'musiclink',
  description: 'Pošle link podľa parametrov.',
  usage: '=musiclink <Artista> <Skladba>',
  async execute(message, args) {
    if (!args[0]) return message.reply('Nezadal si artistu!');
    if (!args[1]) return message.reply('Nezadal si skladbu ty koňo, čo skúšaš, taká vec neexistuje v zozname!');
    let LibraryInfo = JSON.parse(fs.readFileSync('./music/library_db_new.json', 'utf8'));
    message.reply(LibraryInfo[args[0]][args[1]]);
	},

}