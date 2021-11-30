const Discord = require("discord.js"), { Permissions } = require("discord.js");
const db = require("quick.db");

module.exports = { 
  name: 'interactionCreate',
  description: 'ticket button reacting',
  run: async (client, interaction) => {
    if (interaction.isButton()) {
      if (interaction.customId === 'openTicket') {

        // Topic selector components

        const components = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageSelectMenu()
          .setCustomId('selectTicketTopic')
          .setMinValues(1)
          .setMaxValues(1)
          .setPlaceholder(`Select your reason for opening this Ticket`)
          .addOptions([
            {
              label: `Error`,
              value: 'first',
              description: `Reporting an Error`,
              emoji: '‼'
            },
            {
              label: `Breaking rules`,
              value: 'second',
              description: `Reporting a member breaking rules`,
              emoji: '📛'
            },
            {
              label: `Other`,
              value: 'thirth',
              description: `None of the options above`,
              emoji: '➕'},
          ])
        );

        // Creating channel || Main action

        await interaction.guild.channels.create(`🎫〘ticket-${interaction.user.username}〙`, {
          type: 'Text',
          parent: interaction.channel.parentId,
          topic: `${interaction.user.username} ticket`,
          PermissionOverwrites: [{
              id: interaction.user.id,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            },
            {
              id: interaction.guild.roles.everyone,
              deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
            },
          ]
        }).then(ch => {
          interaction.reply({
            content: `${interaction.user} Your Ticket has been created (${ch})`,
            ephemeral: true
          });
          ch.send({
            content: `ㅤ`,
            components: [components],
          });
          db.set(`ticket${ch.id}.author`, interaction.user.id)
        });
      };

      // Lock Ticket

      if (interaction.customId === 'lockTicket') {
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return interaction.reply({
          embeds: [new Discord.MessageEmbed()
          .setColor('#BB0000')
          .setTitle(`Sorry but you do not have permissions to lock this Ticket`)
        ],
        ephemeral: true
        });

        if (!db.get(`ticket${interaction.channel.id}.locked`)) db.set(`ticket${interaction.channel}.locked`, false)
        const author = db.get(`ticket${interaction.channel.id}.author`)

        if (db.get(`ticket${interaction.channel.id}.locked`) === false ) {
          interaction.channel.permissionOverwrites.edit( author, {
            VIEW_CHANNEL: false, 
            SEND_MESSAGES: false,
          });
          //db.delete(db.get(`ticket${interaction.channel.id}.locked`));
          //db.set(`ticket${interaction.channel.id}.locked`, true);
        } else {
          interaction.channel.permissionOverwrites.edit( author, {
            VIEW_CHANNEL: true, 
            SEND_MESSAGES: true,
          });
          //db.delete(db.get(`ticket${interaction.channel.id}.locked`));
          //db.set(`ticket${interaction.channel.id}.locked`, false);
        }
      };

      // Close Ticket
      
      if (interaction.customId === 'closeTicket') {
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return interaction.reply({
          embeds: [new Discord.MessageEmbed()
          .setColor('#BB0000')
          .setTitle(`Sorry but you do not have permissions to delete this Ticket`)
        ],
        ephemeral: true
        });

        const embed = new Discord.MessageEmbed()
        .setColor('#BB0000')
        .setTitle(`Deleting this Ticket in 10 seconds`)

        interaction.reply({ embeds: [embed] })

        setTimeout( function() {
          interaction.channel.delete();
          if (db.get(`ticket${interaction.channel.id}.locked`)) db.delete(db.get(`ticket${interaction.channel.id}.locked`));
          db.delete(`ticket${interaction.channel.id}.author`);
        }, 10000);
      };
    };

    // Topic Selector

    if (interaction.isSelectMenu()) {
      if (interaction.customId === 'selectTicketTopic') {
        if (!interaction.user.id === db.get(`ticket${interaction.channel.id}.author`).id) return interaction.reply({
          embeds: [ new Discord.MessageEmbed()
          .setColor('#BB0000')
          .setTitle(`You are not allowed to chose the reason of opening this ticket if you are not its author!`)
        ],
          ephemeral: true,
        })

        
          const value = interaction.values[0]

        if (value === 'first') {
          interaction.channel.setTopic('Error report')
        }
        if (value === 'second') {
          interaction.channel.setTopic('Breaking rules report')
        }
        if (value === 'thirth') {
          interaction.channel.setTopic('Custom reason')
        };
      };
    };
  },
};