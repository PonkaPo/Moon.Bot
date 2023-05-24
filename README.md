# Moon.Bot

**This bot is really old and code will no longer works on latest node & discord.js, consider this as archive now.**

Simple & Advanced Discord bot.
Actually the bot is capable of more things to do. With simple Chat Activity with levels reward to simple moderating.
**One** original game _What is it_ is included.
Couple of random commands to make it more useful.

## Running own instance of the bot
First thing to do is by creating `config/config.json` after that follow next steps what to put inside the JSON file.
The bot require MySQL Server to get this bot up.
This can be done by doing:
```json
"mysql": {
    "host": "Your IP Address of the MySQL Server",
    "user": "Your username for the server",
    "password": "Your password for the server"
}
```
But that's not all what the bot needs to run. Now you need to put in the config more details in this style:
```json
"client": {
    "token": "Your Discord Bot Token",
    "prefix": "Any charactere to use as prefix to react for messages"
}
```
After you did these two things, the bot should run without any problem.

## Images (Image Command)
In any case you don't need this command, simply you don't put it inside the commands folder and that's all, then you won't ran into any issues with the command if there are no API keys written in the config. If you don't need only one site, just simply comment/remove it from the code itself.

## How customizable is the bot?
Well, the bot is using MySQL storage to save settings for every guild. To change this, there is database called `discord` & `discord_levels` to make basic & levels feature working correctly. The levels can be easily for example turned off/on, change actual channel/role to mention. Or just send poll to specific channel. Even set custom prefix can bet set for each guild. And if you forget the prefix it can be obtained by mentioning the bot.
