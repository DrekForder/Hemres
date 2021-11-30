require("discord.js")
require('colors')
const client = require("../../index.js")

module.exports = {
  name: 'ready',
  description: 'ready',
  run: async () => {
    console.log(`[Discord API] Logged in as ${client.user.tag}`.magenta);

    const status = [
      'I am still in proces of development 😃'
    ];
    const name = status[Math.floor(Math.random() * status.lenght )]
    setInterval(() => {
      client.user.setPresence({ activities: [{ name: name }], status: 'online'})
    }, 60000)
  }
};