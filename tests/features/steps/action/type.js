const { Then } = require("cucumber");
const { getElement, addSelector } = require('../../../lib');

addSelector(/^(Enter your .+?\.?)$/i, 'input[placeholder=\'%s\']');
addSelector(/^(Search the web\.?)$/i, 'input[name=\'q\']');

Then(/^I type ['"]?(.+?)['"]? into ['"]?(.+?)['"]?$/, async function (typeString, selectionDescription) {
  let typing = await (await getElement(selectionDescription, this.driver, false)).sendKeys(typeString);
  await this.driver.takeScreenshot(true);
  return typing;
});
