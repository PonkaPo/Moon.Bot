const { Collection } = require("discord.js");
const { cwd } = require('process');
const fs = require("fs");
const ascii = require("ascii-table");
const chalk = require('chalk');
const table = new ascii().setHeading("Slash Commands", "Load Status");
function loadSlashCommands(client) {
    client.commands = new Collection();
    const slashcommands = fs.readdirSync(cwd()+"/commands").filter(f => f.endsWith('.js'));
    console.log("Loading Slash Commands: ");
    for (const file of slashcommands) {
        let command = require(cwd()+`/commands/${file}`);
        client.commands.set(command.data.name, command);
        if (command.name) {
            table.addRow(file, "✔️");
        } else {
            table.addRow(
              file,
              "❌ => Missing a `name` & but still loaded "
            );
        }
    };
    console.log(table.toString());
    console.log(chalk.bgGreenBright.black(" > Slash Commands Loaded! < "));
    
}

module.exports = {
    loadSlashCommands,
};