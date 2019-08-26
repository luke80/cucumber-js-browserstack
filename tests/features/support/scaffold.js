const { BeforeAll, Before, After, AfterAll, setDefaultTimeout } = require('cucumber');
const { Builder } = require('selenium-webdriver');
const { Local } = require('browserstack-local');

BeforeAll((next) => {
  let config = require('../../conf/' + (process.env.CONFIG_FILE || 'default') + '.conf.js').config;
  if (detectEnvironmentProblems(!config.singleSession)) {
    throw 'Environment configuration error detected. Please verify you have your credentials stored in BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY';
  }
  if (config.capabilities[parseInt(process.env.TASK_ID || 0)]["browserstack.local"]) {
    // Code to start browserstack local before start of test and stop browserstack local after end of test
    global.bsLocal = new Local();
    let localConfig = {
      'key': process.env.BROWSERSTACK_ACCESS_KEY,
      'verbose': 'true'
    };
    if (config.proxy && config.proxy !== 'undefined') {
      var proxyPieces = config.proxy.match(/\w+\:\/\/([\w\.-]+)(?:\:(\d+))?/);
      if (proxyPieces) {
        if (proxyPieces.length > 1) {
          localConfig.proxyHost = proxyPieces[1];
        }
        if (proxyPieces.length > 2) {
          localConfig.proxyPort = proxyPieces[2];
        }
      }
      else {
        console.warn('Proxy configuration not parsed.');
      }
    }
    global.bsLocal.start(localConfig, function (error) {
      if (error) return console.log(error.red);
      if (config.singleSession) {
        global.driver = global.createBrowserStackSession();
      }
      next();
    });
  }
  else {
    if (config.singleSession) {
      global.driver = global.createBrowserStackSession();
    }
    next();
  }
});

Before(function (scenario, done) {
  if (process.env.BROWSERSTACK_USERNAME === '' || process.env.BROWSERSTACK_ACCESS_KEY === '') {
    return 'skipped';
  }
  if (this.oneSessionPerScenario) {
    let name = scenario.pickle.name + ' - ' + scenario.sourceLocation.uri + ' - line ' + scenario.sourceLocation.line;
    this.driver = global.createBrowserStackSession(name);
    done();
  }
  else {
    done();
  }
});

After(function (scenario, done) {
  let world = this;
  if (scenario.result) {
    if (scenario.result.status === 'failed') {
      //byte[] screenshot = world.driver.getScreenshotAs(OutputType.BYTES);
      //scenario.embed(screenshot, "image/png");
    }
  }
  this.driver.sleep(2000).then(() => {
    if (world.oneSessionPerScenario) {
      world.driver.session_.then(function (sessionData) {
        console.log('\nBrowserStack Session Complete:', sessionData.id_);
        //console.log('\nSee the resulting build record on BrowserStack:', `https://automate.browserstack.com/builds/${process.env.BUILD_ID}/sessions/${sessionData.id_}`);
      });
      world.driver.quit().then(done);
    }
    else {
      done();
    }
  });
});

AfterAll(() => {
  if (global.driver) {
    global.driver.session_.then(function (sessionData) {
      console.log('\nBrowserStack Session Complete:', sessionData.id_);
      //console.log('\nSee the resulting build record on BrowserStack:', `https://automate.browserstack.com/builds/${process.env.BUILD_ID}/sessions/${sessionData.id_}`);
    });
    global.driver.quit().then(() => {
      if (global.bsLocal) {
        global.bsLocal.stop(() => { return Promise.resolve(); });
      }
      return Promise.resolve();
    });
  }
  else {
    return Promise.resolve();
  }
});

global.createBrowserStackSession = function (name) {
  let b = new Builder();
  let config = require('../../conf/' + (process.env.CONFIG_FILE || 'default') + '.conf.js').config;
  let task = parseInt(process.env.TASK_ID || 0);
  let proxy = (config.proxy && config.proxy != 'undefined') ? config.proxy : process.env.PROXY;
  config.capabilities[task]['browserstack.user'] = process.env.BROWSERSTACK_USERNAME;
  config.capabilities[task]['browserstack.key'] = process.env.BROWSERSTACK_ACCESS_KEY;
  if (name) {
    config.capabilities[task].name = name;
  }
  if (proxy) {
    b.usingWebDriverProxy(proxy);
  }
  return b.usingServer('http://hub-cloud.browserstack.com/wd/hub')
    .withCapabilities(config.capabilities[task])
    .build();
};

detectEnvironmentProblems = function () {
  let credentialsMissing = (!process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_ACCESS_KEY);
  return (credentialsMissing);
};

let timeoutSeconds = 30;
setDefaultTimeout(timeoutSeconds * 1000);
