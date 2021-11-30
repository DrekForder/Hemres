const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: 'warningslist',
  description: 'shows a list of warns coresponding to a specified member',
  options: [
    {
      name: 'target',
      description: 'tag of member theyr warns you want to see',
      type: 6,
      required: true,
    }
  ],
  run: async (interaction) => {

    // Variuable definiing

    const target = interaction.options.getUser('target');
    const warnings = db.get(`${interaction.guild.id}-${target.id}.waringns`);

    // Stopping an action if (not fiting requirements)

    if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
     return interaction.reply({ embeds: [new MessageEmbed().setColor('#660000').setTitle('❌ | Missing Permissions').setDescription(`You need BAN_MEMBERS permissions to use this command!`).setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp()]});
    if (interaction.user.bot)
     return ;

    // Sending Members Warnings list || Main action

    if (warnings) {
      const embed = new MessageEmbed()
      .setColor('#660099')
      .setTitle(`${target.tag}'s warn list`)
      .setDescription(`${warnings}`)
      .setFooter(`This person has ${warnings.lenght} warnings`)

      interaction.reply({
        embeds: [embed],
        ephemeral: true,
      })
    } else {
      const embed = new MessageEmbed()
      .setColor('#660099')
      .setTitle(`${target.tag}'s warn list`)
      .setFooter('This person has no warnings yet')

      interaction.reply({
        embeds: [embed],
        ephemeral: true ,
      });
    };
  },
};