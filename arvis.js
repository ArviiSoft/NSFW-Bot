const Discord = require("discord.js"),
  nsfwBot = require("./handler/Client.js"),
  client = new nsfwBot(),
  ayarlar = require('./ayarlar.json');


const Eris = require('eris')
const _client = new Eris(ayarlar.token, {
  intents: ["all"]
});

_client.connect();

_client.on("ready", () => {
 _client.joinVoiceChannel(ayarlar.SesKanali1, {selfMute: false, selfDeaf: true});
  _client.joinVoiceChannel(ayarlar.SesKanali2, {selfMute: false, selfDeaf: true});
});


require("discord-buttons")(client);
require("./handler/Module.js")(client);
require("./handler/Event.js")(client);


client.on("warn", console.warn); 
client.on("error", console.error); 


client.on('ready', () => {
  console.log(`\n [AKTİF] ${client.user.tag}`);

  client.user.setPresence({
      activity: { name: ayarlar.BotOynuyor },
      status: ayarlar.BotStatus
  });
});

client.login(ayarlar.token)