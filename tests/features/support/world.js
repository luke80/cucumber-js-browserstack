var { setWorldConstructor } = require('cucumber');

class TestingWorld {
  constructor() {
    this.config = require('../../conf/' + (process.env.CONFIG_FILE || 'default') + '.conf.js').config;
    this.oneSessionPerScenario = !this.config.singleSession;
    this.driver = (!this.oneSessionPerScenario) ? global.driver : null;
    this.protocol = (/https?/.test(process.env.TESTING_PROTOCOL)) ? process.env.TESTING_PROTOCOL : (this.config.protocol) ? this.config.protocol : 'https://';
    this.host = ((/^(https?\:\/\/)?((?:\w+\.)+\w+)/.test(process.env.TESTING_HOST)) ? process.env.TESTING_HOST : (this.config.host) ? this.config.host : 'www.capitalmarketassumptions.com').replace(/^https?\:\/\//i, '');
  }

  async request(path) {
    return await this.driver.get(this.protocol + this.host + path);
  }
}

setWorldConstructor(TestingWorld);
