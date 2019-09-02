const { When } = require("cucumber");
const { clickElement, addSelector } = require('cucumber-selenium-browserstack');

addSelector(/^Improve your Website\.?$/i, 'a[href$=\'test-my-site\']');
addSelector(/^(Test My Site\.?)$/i, 'button[value=\'%s\']');
addSelector(/^(Google Search)$/i, 'input[value=\'%s\']');
addSelector(/^(Is your site fast enough\?)$/i, { xpath: `//*[contains(text(), '%s')]` });

When(/^I click on ['"]?(.+?)['"]?(?: and see ['"]?(.+?)['"]?$|$)/, async function (selectionDescription, confirmationDescription) {
  return await clickElement(selectionDescription, this.driver, confirmationDescription);
});
