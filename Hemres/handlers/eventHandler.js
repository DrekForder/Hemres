const { Interaction } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = (client) => {
  const load = dirs => {
    const eventFiles = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith("js") );
    for (const file of eventFiles) {
      const event = require(`../events/${dirs}/${file}`);
      client.on(event.name, event.run.bind(null, client));
    }
  };
  ["client", "guild"].forEach((x) => load(x));
};