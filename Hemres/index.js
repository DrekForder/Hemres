const Discord = require("discord.js"), { Client, Collection, Intents, Permissions } = require('discord.js');
const fs = require("fs"), { readdirSync } = require("fs");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const db = require("quick.db");
const path = require('path');
const client = new Client({ intents: 32767 })
const config = require("./config.json"), { clientId, guildId, TOKEN} = require("./config.json");

// Handlers

client.commands = new Discord.Collection();
client.slash = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
require('colors');

const commands = []
readdirSync("./commands/").map(async dir => {
	readdirSync(`./commands/${dir}/`).map(async (cmd) => {
	commands.push(require(path.join(__dirname, `./commands/${dir}/${cmd}`)))
    })
})
const rest = new REST({ version: "9" }).setToken(TOKEN);
(async () => {
	try {
		console.log('[Discord API] Started refreshing aplication (/) commands'.yellow);
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);
		console.log('[Discord API] Succesfuly refreshed application (/) commands'.green);
	} catch (error) {
		console.error(error);
	}
})();

["eventHandler", "commandHandler"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

// LogIn

client.login( TOKEN )