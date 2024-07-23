const {
  Collection
} = require("discord.js"), {
  readdir
} = require("fs"), homePath = process.cwd();

module.exports = client => {
  client.commands = new Collection();
  client.aliases = new Collection();
  client.helps = new Collection();

  readdir(`${homePath}/commands/`, (err, categories) => {
    if (err) console.log(err);
    console.log(`[KATEGORİ] " ${categories.length} Adet " Kategori Yüklendi. \n`);
    categories.forEach(category => {
      let moduleConf = require(`${homePath}/commands/${category}/module.json`);
      if (moduleConf) {
        moduleConf.path = `${homePath}/commands/${category}`;
        moduleConf.cmds = [];
        client.helps.set(category, moduleConf);
        readdir(`${homePath}/commands/${category}`, (err, files) => {
          console.log(`[KOMUT] ${category} Kategorisinde " ${files.length - 1} Adet " Komut Bulunuyor.`);
          if (err) console.log(err);
          // let commands = new Array();
          files.forEach(file => {
            if (file.endsWith(".js")) {
              let prop = require(`${homePath}/commands/${category}/${file}`);
              // let cmdName = file.split(".")[0];
              client.commands.set(prop.help.name, prop);
              prop.conf.aliases.forEach(alias => client.aliases.set(alias, prop.help.name));
              client.helps.get(category).cmds.push(prop.help.name);
            };
          });
        });
      };
    });
  });
};