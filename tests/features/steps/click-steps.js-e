const { When } = require("cucumber");
const { getSelectorFromDescription } = require('../support/stepsGetters.js');

When(/^I click on (.+)$/, function (selectionDescription, next) {
  let selector = getSelectorFromDescription(selectionDescription);
  this.driver.findElement({ css: selector }).click().then(next);
});
