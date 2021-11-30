const { MessageEmbed } = require('discord.js');
const humanizeDuration = require("humanize-duration");
const config = require('../../config.json');
const Timeout = new Set()

module.exports = {
	name: 'interactionCreate',
	description: 'Slash command executor',
	run: async (client, interaction) => {
		if (interaction.isCommand()) {
			if (!client.commands.has(interaction.commandName)) return;
			if (!interaction.guild) return;
			const command = client.commands.get(interaction.commandName)
			try {
				command.run(interaction, client);
				Timeout.add(`${interaction.user.id}${command.name}`)
				setTimeout(() => {
					Timeout.delete(`${interaction.user.id}${command.name}`)
				}, command.timeout);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: '❌ | Error!',
					ephemeral: true
				});
			};
		};
	}
};