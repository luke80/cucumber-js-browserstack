require('dotenv').config();
var { setWorldConstructor } = require('cucumber');
var { scaffold } = require('cucumber-selenium-browserstack');

let configuration = require('../../conf/' + (process.env.CONFIG_FILE || 'default') + '.conf.js').config;
scaffold(configuration);

class TestingWorld {
  constructor(configuration) {
    this.config = configuration;
    this.driver = null;
  }
}

setWorldConstructor(TestingWorld.bind(null, [configuration]));
