const Discord = require("discord.js"), { Permissions } = require("discord.js");

module.exports = {
  name: 'setticketchannel',
  description: 'This command will set this channel to a Ticket channel',
  //permissions: [Permissions.FLAGS.MANAGE_CHANNELS],
  options: [
    {
      name: 'channel',
      description: 'Name of channel you want to set as a ticket channel',
      type: 7,
      required: false,
    },
  ],
  run: async (interaction, channel) => {

    // Variuable definiing

    const chnl = interaction.options.getChannel('channel');

    // Stopping action if (not fitting requirements)

    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
     return interaction.reply({ embeds: [new MessageEmbed().setColor('#660000').setTitle('❌ | Missing Permissions').setDescription(`You need MANAGE_CHANNELS permissions to use this command!`).setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp()]});

    // Sending "OpenTicket" message || Main Action
    
    const components = new Discord.MessageActionRow()
    .addComponents(
      new Discord.MessageButton()
      .setCustomId('openTicket')
      .setEmoji('🎫')
      .setLabel('Open Ticket')
      .setStyle('SECONDARY')
    )
    const embed = new Discord.MessageEmbed()
    .setColor('#FFC400')
    .setTitle('Open a Ticket')
    .setFields({ name: 'Click 🎫 to open a Ticket', value: 'Please do not open a Ticket witouth a good reason' })

    if (chnl) {
      chnl.send({
        embeds: [embed],
        components: [components]
      });
    } else {
      interaction.reply({
        embeds: [embed],
        components: [components],
      });
    };
  },
};