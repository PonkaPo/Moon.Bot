const fs = require("fs");
let LibraryInfo = JSON.parse(fs.readFileSync('./music/library_db_new.json', 'utf8'));

module.exports = {
  name: 'musiclink',
  description: 'Pošle link podľa parametrov.',
  usage: '=musiclink <Artista> <Skladba>',
  async execute(message, args) {
    if (!args[0]) {
      message.reply('Nezadal si artistu!');
    } else {
      if (!args[1]) {
        message.reply('Nezadal si skladbu ty koňo, čo skúšaš, taká vec neexistuje v zozname!');
      } else {
        message.reply("pre tvoje potešenie: " + LibraryInfo[args[0]][args[1]]);
      }
    }
	},

}