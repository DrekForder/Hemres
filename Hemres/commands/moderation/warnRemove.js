

module.exports = {
  name: 'removewarning',
  description: 'removes a specific warning from selected member',
  options: [
    {
      name: 'target',
      description: `name of member that's warning you want to remove`,
      type: 6,
      required: true,
    },
    {
      name: 'warningId',
      description: 'id of warning you want to remove (exact position)',
      type: 10,
      required: true,
    },
  ],
  run: async () => {

    // Variuable definiing

    const target = interaction.options.getMember('target');
    const id = interaction.options.getNumber('warningId');

    // Stopping an action if (not fiting requirements)

    if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
     return interaction.reply({ embeds: [new MessageEmbed().setColor('#660000').setTitle('❌ | Missing Permissions').setDescription(`You need BAN_MEMBERS permissions to use this command!`).setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp()]});
    if (interaction.user.bot)
     return ;

    // Removing a warning from database|| Main action

    db.get(`${interaction.guild.id}-${target.id}.waringns`).splice(id, 1);
  },
};