const { When } = require("cucumber");
const { getElement } = require('../../lib/stepsGetters.js');

When(/^I click on ['"]?(.+?)['"]?$/, async function (selectionDescription) {
  (await getElement(selectionDescription, this.driver)).click();
});
