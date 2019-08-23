/**
  * export BROWSERSTACK_USERNAME=<BrowserStack Username> && export BROWSERSTACK_ACCESS_KEY=<BrowserStack Access Key>
  * export TESTING_HOST=https://www.google.com
**/
exports.config = {
  user: `${process.env.BROWSERSTACK_USERNAME}`,
  key: `${process.env.BROWSERSTACK_ACCESS_KEY}`,
  server: 'hub-cloud.browserstack.com',
  //proxy: 'https://http-proxy.com:443',
  protocol: 'https://',
  host: 'www.google.com',
  singleSession: false,

  capabilities: [{
    browserName: 'chrome',
    name: "Chrome - Combined tests",
    build: "Cucumber Selenium BrowserStack Testing",
    project: 'BrowserStack Trials',
    'browserstack.local': false
  }]
};