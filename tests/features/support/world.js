/**
  * export BROWSERSTACK_USERNAME=lukerebarchik2 && export BROWSERSTACK_ACCESS_KEY=dtsHnGyZrAgPJ9QaK6Kg
  * export TESTING_HOST=https://capitalmarketassumptions.com
**/

var { setWorldConstructor } = require('cucumber');

class TestingWorld {
  constructor() {
    this.task_id = parseInt(process.env.TASK_ID || 0);
    this.config_file = '../../conf/' + (process.env.CONFIG_FILE || 'default') + '.conf.js';
    this.config = require(this.config_file).config;
    this.oneSessionPerScenario = !this.config.singleSession;
    this.driver = (!this.oneSessionPerScenario) ? global.driver : null;
    
    this.protocol = (/https?/.test(process.env.TESTING_PROTOCOL)) ? process.env.TESTING_PROTOCOL : (this.config.protocol) ? this.config.protocol : 'https://';
    this.host = (/^\//.test(process.env.TESTING_HOST)) ? process.env.TESTING_HOST : (this.config.host) ? this.config.host : 'www.capitalmarketassumptions.com';
  }

  request(path) {
    let url = this.protocol+this.host+path;
    return this.driver.get(url);
  }
}

setWorldConstructor(TestingWorld);