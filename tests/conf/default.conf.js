exports.config = {
  user: `${process.env.BROWSERSTACK_USERNAME}`,
  key: `${process.env.BROWSERSTACK_ACCESS_KEY}`,
  server: 'hub-cloud.browserstack.com',
  //proxy: 'https://http-proxy.ntrs.com:443',
  protocol: 'https://',
  host: 'www.capitalmarketassumptions.com',
  singleSession: false,

  capabilities: [{
    browserName: 'chrome',
    name: "Chrome - Combined tests",
    build: "Cucumber Selenium BrowserStack Testing",
    project: 'BrowserStack Trials',
    'browserstack.local': true
  }]
};