const { When } = require("cucumber");
const { getSelectorFromDescription } = require('../../lib/stepsGetters.js');

When(/^I click on ['"]?(.+?)['"]?$/, function (selectionDescription, next) {
  let selector = getSelectorFromDescription(selectionDescription);
  let t = this;
  if (selector) {
    t.driver.wait(function () {
      return t.driver.getTitle();
    }, 1000);
    t.driver.findElement({ css: selector }).click().then(next);
  }
  else {
    console.warn(`No selector found for text ${selectionDescription}.`, selector);
    throw `Invalid selector configured for description ${selectionDescription}. Make sure you add a valid match into the map file: tests/lib/stepsGetters.js`;
  }
});
