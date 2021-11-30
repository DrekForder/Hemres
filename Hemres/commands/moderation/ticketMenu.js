const Discord = require("discord.js"), { Permissions } = require("discord.js");

module.exports = {
  name: 'ticketmenu',
  description: `Sends a Ticket Menu`,
  run: async(interaction) => {

    // Stopping action if (not fitting requirements)

    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
     return interaction.reply({ embeds: [new MessageEmbed().setColor('#660000').setTitle('❌ | Missing Permissions').setDescription(`You need MANAGE_CHANNELS permissions to use this command!`).setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp()]});

    // Sending TicketMenu || Main Action

    const components = new Discord.MessageActionRow()
    .addComponents(
      new Discord.MessageButton()
      .setCustomId('lockTicket')
      .setEmoji('🔒')
      .setLabel(`Lock Ticket`)
      .setStyle('PRIMARY')
    )
    .addComponents(
      new Discord.MessageButton()
      .setCustomId('closeTicket')
      .setEmoji('⛔')
      .setLabel(` Close Ticket`)
      .setStyle('DANGER')
    )

    interaction.reply({
      content: `ㅤ`,
      components: [components],
      ephemeral: true,
    });
  },
};