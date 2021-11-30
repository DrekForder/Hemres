const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'ban',
  description: 'Bans memonitioned member',
  options: [
    {
      name: 'target',
      description: 'tag of user you want to ban/tempBan',
      type: 6,
      required: true
    },
    {
      name: 'reason',
      description: 'reason for banning/tempBanning this user',
      type: 3,
      required: false
    },
  ],
  run: async(interaction, client) => {

    // Variuable definiing

    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason');
    const server = interaction.guild.name ;

    // Stopping an action if (not fiting requirements)

    if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
     return interaction.reply({ embeds: [new MessageEmbed().setColor('#660000').setTitle('❌ | Missing Permissions').setDescription(`You need BAN_MEMBERS permissions to use this command!`).setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp()]});
    if (interaction.user.bot)
     return ;
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
     return interaction.reply({ embeds: [new MessageEmbed().setColor('#660000').setTitle('I do not have permissions to run this command')], ephemeral: true, });
    if (target === interaction.guild.me)
     return interaction.reply({ embeds: [new MessageEmbed().setColor('#660000').setTitle('I can not ban myself')], ephemeral: true, });
    if (target.id === interaction.user.id)
     return interaction.reply({ embeds: [new MessageEmbed().setColor('#660000').setTitle('You can not ban yourself')], ephemeral: true, });
    if (reason && reason.lenght > 512)
     return interaction.reply({ embeds: [new MessageEmbed().setColor('#660000').setTitle('Your reason is too long. (maximum is set to 512 characters)')], ephemeral: true, });
    
    // "you have been banned" message

    if (!duration) {
      if (reason) {
        const embed = new MessageEmbed()
        .setColor('#BB0000')
        .setTitle(`You have been banned from ${server} for ${reason}`)
        await target.send({ embeds: [ embed ] });
      } else {
        const embed = new MessageEmbed()
        .setColor('#BB0000')
        .setTitle(`You have been banned from ${server}. Reason was not defined`)
        await target.send({ embeds: [embed] });
      };
    } else {
      if (reason) {
        const embed = new MessageEmbed()
        .setColor('#BB0000')
        .setTitle(`You have been banned from ${server} for ${reason}`)
        .setFooter(`You can join back after ${unbanTimeout}`)
        await target.send({ embeds: [embed] });
      } else if (duration) {
        const embed = new MessageEmbed()
        .setColor('#BB0000')
        .setTitle(`You have been banned from ${server}. Reason was not defined`)
        .setFooter(`You can join back after ${unbanTimeout}`)
        await target.send({ embeds: [embed] });
      };
    };

    // Banning target || main action

    if (reason) {
      const targetedMember = interaction.guild.members.cache.get(target.id);
      targetedMember.ban({ reason: reason })
    } else {
      const targetedMember = interaction.guild.members.cache.get(target.id);
      targetedMember.ban();
    };
      
    // "member has been banned" message
    
    if (reason) {
      const embed = new MessageEmbed()
      .setColor('#BB0000')
      .setTitle(`${target.tag} has been banned from the server`)
      .setDescription(`Reason: ${reason}`)
      interaction.reply({ embeds: [embed] });
    } else {
      const embed = new MessageEmbed()
      .setColor('#BB0000')
      .setTitle(`${target.tag} has been banned from the server`)
      .setDescription(`Reason: undefined`)
      interaction.reply({ embeds: [embed] });
    };
  },
};