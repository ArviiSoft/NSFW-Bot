const {
  Client,
  Collection
} = require("discord.js"),
superagent = require('superagent');

module.exports = class TutorialBot extends Client {
  constructor(options) {
    super(options)

    this.commands = new Collection(); 
    this.cooldowns = new Collection();
    this.aliases = new Collection(); 
    this.config = require('../ayarlar.json');
    this.superagent = superagent
    this.package = require("../package.json");
    this.recent = new Set();
  }
}