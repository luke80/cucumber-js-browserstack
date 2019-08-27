const { Then } = require("cucumber");
const { getSelectorFromDescription } = require('../../lib/stepsGetters.js');

Then(/^I type ['"]?(.+?)['"]? into ['"]?(.+?)['"]?$/, async function (typeString, selectionDescription) {
  (await getElement(selectionDescription, this.driver)).sendKeys(typeString);
});
