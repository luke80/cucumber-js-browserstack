const { Then } = require("cucumber");
const { getSelectorFromDescription } = require('../../lib/stepsGetters.js');

Then(/^I type ['"]?(.+?)['"]? into ['"]?(.+?)['"]?$/, function (typeString, selectionDescription, next) {
  let selector = getSelectorFromDescription(selectionDescription);
  if (selector) {
    this.driver.findElements({ css: selector }).then(function (elements) {
      if (elements.length > 0) {
        elements[0].sendKeys(typeString).then(next);
      }
      else
        throw `Element not found. CSS-selector '${selector}' mapped to '${selectionDescription}' failed to match any elements on the page.`;
    });
  }
  else {
    console.warn(`No selector found for text ${selectionDescription}.`, selector);
    throw `Invalid selector configured for description ${selectionDescription}. Make sure you add a valid match into the map file: tests/lib/stepsGetters.js`;
  }
});
