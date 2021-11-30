const Discord = require("discord.js"), { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: 'warn',
  description: 'warns a selected member',
  options: [
    {
      name: 'target',
      description: 'member you want to warn',
      type: 6,
      required: true,
    },
    {
      name: 'reason',
      description: 'reason you want to earn this member for',
      type: 3,
      required: false,
    },
  ],
  run: async (interaction) => {

    // Variuable definiing

    const target = interaction.options.getMember('target');
    let reason = interaction.options.getString('reason');
    if (!reason) reason = `undefined`;

    // Stopping an action if (not fiting requirements)

    if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
     return interaction.reply({ embeds: [new MessageEmbed().setColor('#660000').setTitle('❌ | Missing Permissions').setDescription(`You need BAN_MEMBERS permissions to use this command!`).setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp()]});
    if (interaction.user.bot)
     return ;

    // Creating required database || Backup action

    if (!db.get(`${interaction.guild.id}-${target.id}`)) db.set(`${interaction.guild.id}-${target.id}`, { userInfo: 'Error' });

    // Adding warning to database || Main action
    
    db.push(`${interaction.guild.id}-${target.id}.waringns`, ` ${reason}` );

    // "${target} has been warned" message

    interaction.reply({
      embeds: [
        new MessageEmbed()
        .setColor('#BB0000')
        .setTitle(`${target.tag} has been warned`)
        .setDescription(`Reason: ${reason}`)
        .setTimestamp()
      ],
    });
  },
};