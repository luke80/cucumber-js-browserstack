const { Given, When, Then } = require("cucumber");
const assert = require("cucumber-assert");

When(/^I type in the path ['"]?([^'"]+)['"]?$/, function (path, next) {
  var t = this;
  t.request(path)
    .then(function () {
      t.driver.wait(function () {
        return t.driver.getTitle();
      }, 10000);
    }).then(next);
});

Then(/^the page has the copy ['"]?(.+?)['"]?$/, function (copy, next) {
  var t = this;
  t.driver.wait(function () {
    return t.driver.getPageSource();
  }, 10000).then(function (source) {
    return assert.notEqual(source.indexOf(copy) > -1, true, next, `Expected the page to have copy '${copy}', but did not.`);
  }).then(next);
});
