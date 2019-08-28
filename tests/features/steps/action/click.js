const { When } = require("cucumber");
const { getElement, addSelector } = require('../../../lib');

addSelector(/^Improve your Website\.?$/i, 'a[href$=\'test-my-site\']');
addSelector(/^(Test My Site\.?)$/i, 'button[value=\'%s\']');
addSelector(/^(Google Search)$/i, 'input[value=\'%s\']');

When(/^I click on ['"]?(.+?)['"]?$/, async function (selectionDescription) {
  return await (await getElement(selectionDescription, this.driver)).click();
});
