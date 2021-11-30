const Discord = require("discord.js");
const config = require("../../config.json");
const { Permissions } = require("discord.js");

module.exports = {
  name: 'kick',
  description: 'Kicks memonitioned member',
  //permissions: [Permissions.FLAGS.KICK_MEMBERS],
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
  run: async (interaction, args) => {

    // Variuable definiing

    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason');
    const server = interaction.guild.name

    // Stopping action if (not fitting requirements)

    if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
     return interaction.reply({ embeds: [new MessageEmbed().setColor('#660000').setTitle('❌ | Missing Permissions').setDescription(`You need KICK_MEMBERS permissions to use this command!`).setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp()]});
    if (interaction.user.bot)
     return;
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) 
     return interaction.channel.send(`I do not have permissions to run this command`);
    if (target === interaction.guild.me) 
     return interaction.channel.send(`I can not ban myself`);
    
    // "You have been kicked" message

    try {
      if (reason) {
        const embed = new Discord.MessageEmbed()
          .setColor('#BB0000')
          .setTitle(`You were kicked from ${server} for ${reason}`)
          .setFooter(`You can join back after solving this issue by clicking https://discord.gg/JkUFm6kp`)
        await target.send({ embeds: [embed] });
      } else {
        const embed = new Discord.MessageEmbed()
          .setColor('#BB0000')
          .setTitle(`You were kicked from ${server}. Reason was not defined`)
          .setFooter(`You can join back by clicking https://discord.gg/JkUFm6kp`)
        await target.send({ embeds: [embed] });
      };
    } catch (error) {
      console.error(error)
    };

    // Kicking target || main action

    const targetedMember = interaction.guild.members.cache.get(target.id)
    targetedMember.kick();

    // "member has been kicked" message

    if (reason) {
      const embed = new Discord.MessageEmbed()
        .setColor('#BB0000')
        .setTitle(`${target.tag} has been kicked`)
        .setDescription(`Reason: ${reason}`)
      interaction.reply({ embeds: [embed] });
    } else {
      const embed = new Discord.MessageEmbed()
        .setColor('#BB0000')
        .setTitle(`${target.tag} has been kicked`)
      interaction.reply({ embeds: [embed] });
    };
  },
};