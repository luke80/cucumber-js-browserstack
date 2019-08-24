var { When, Then } = require('cucumber');
var assert = require('cucumber-assert');

When(/^I search "([^"]*)"$/, function (searchQuery, next) {
  var t = this;
  t.driver.get('https://www.google.com/ncr')
    .then(function() {
      t.driver.wait(function() {
        return t.driver.findElement({name: 'btnK' });
      }, 2500);
      t.driver.findElement({ name: 'q' })
        .sendKeys(searchQuery).then(next);
    });
});

When(/^I submit$/, function (next) {
  var t = this;
  t.driver.findElement({ name: 'btnK' })
    .click()
    .then(function() {
      t.driver.wait(function () {
        return t.driver.findElement({id: 'top_nav' });
      }, 1000);
      next();
    });
});

Then(/^I should see title "([^"]*)"$/, function (titleMatch, next) {
  var t = this;
  t.driver.getTitle()
    .then((title) => {
      assert.equal(title, titleMatch, next, 'Expected title to be ' + titleMatch);
      next();
    });
});
