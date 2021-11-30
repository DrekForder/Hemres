const Discord = require("discord.js"), { MANAGE_CHANNELS, Permissions } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: 'setlevelchannel',
  description: `makes a chosen channel, channel for level up messages in your server`,
  permissions: [MANAGE_CHANNELS],
  options: [
    {
      name: 'channel',
      description: `channel you want to set as Level channel`,
      type: 7,
      required: false
    },
  ],
  run: async (interaction) => {

    // Variuable definiing

    const channel = interaction.options.getChannel('channel');

    // Stopping action if (not fitting requirements)

    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
     return interaction.reply({ embeds: [new MessageEmbed().setColor('#660000').setTitle('❌ | Missing Permissions').setDescription(`You need MANAGE_CHANNELS permissions to use this command!`).setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp()]});

    // Setting a LevelChannel || Main action
    
    if (channel) {
      db.set(`${channel.id}.isLvlChannel`, channel)
      interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
          .setColor('GREEN')
          .setTitle(`${channel} has been succesfuly set to Level channel`)
        ],
        ephemeral: true,
      })
    } else {
      db.set(`${interaction.channel.id}`, interaction.channel)
      interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
          .setColor('GREEN')
          .setTitle(`This channel has been succesfuly set to Level channel`)
        ],
        ephemeral: true,
      })
    };
  },
};