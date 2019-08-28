const { Then } = require("cucumber");
const { getElement } = require('../../lib/stepsGetters.js');

Then(/^I type ['"]?(.+?)['"]? into ['"]?(.+?)['"]?$/, async function (typeString, selectionDescription) {
  return await (await getElement(selectionDescription, this.driver)).sendKeys(typeString);
});
