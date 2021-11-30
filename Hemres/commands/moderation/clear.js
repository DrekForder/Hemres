const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'clear',
  description: 'Deletes a certain amount of messages',
  options: [
    {
      name: 'amount',
      description: 'Amount',
      type: 10,
      required: false,
    },
    {
      name: 'author',
      description: 'Author of messages you want to delete',
      type: 6,
      required: false,
    },
  ],
  run: async (interaction) => {   
    
    // Variuable definiing

    const amount = interaction.options.getNumber('amount');
    const author = interaction.options.getMember('author');

    // Stopping an action if (not fitting requirements)

    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
     return interaction.reply({ embeds: [new MessageEmbed().setColor('#660000').setTitle('❌ | Missing Permissions').setDescription(`You need MANAGE_CHANNELS permissions to use this command!`).setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp()]});
    if (amount && amount > 99)
     return interaction.reply({ embeds: [new MessageEmbed().setColor('#BB0000').setTitle('Your chosen amount is too high').setDescription('Maximum: 99 messages')], ephemeral: true });
    if (amount && amount < 1)
     return interaction.reply({ embeds: [new MessageEmbed().setColor('#BB0000').setTitle('Your chosen amount is too low').setDescription('Minimum: 1 message')], ephemeral: true });

    // Deleting messages || Main action

    if (amount) {
      if (!author) {
        try {
          await interaction.channel.messages.fetch({ limit: amount+1 }).then(msg => interaction.channel.bulkDelete(msg))
        } catch (error) {
          interaction.reply({
            embeds: [
              new MessageEmbed()
              .setColor('#BB0000')
              .setTitle('You can not delete messages older than 14 days')
            ],
          });
          console.error(error);
        }
      } else {
        try {
          const messages = (await interaction.channel.messages.fetch({ limit: amount+1 })).filter((msg) => msg.author.id === author.id)
        interaction.channel.bulkDelete(messages)
        } catch (error) {
          interaction.reply({
            embeds: [
              new MessageEmbed()
              .setColor('#BB0000')
              .setTitle('You can not delete messages older than 14 days')
            ],
          });
          console.error(error);
        }
      } 
    } else {
      await interaction.channel.clone().then((ch) => {
        ch.setParent((interaction.channel.parentId));
        ch.setPosition((interaction.channel.position));
        interaction.channel.delete();
        ch.send({
          embeds: [
            new MessageEmbed()    .setColor('#BB0000')
            .setTitle('This channel has been nuked')
          ],
        })
      });
    };

    // "${amount} messages were deleted" message

    interaction.reply({
      embeds: [
        new MessageEm
        .setColor()
        .setTitle(`${amount} messages have been deleted`)
      ],
      ephemeral: true,
    });
  },
};