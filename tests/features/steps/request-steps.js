const { Given, When, Then } = require("cucumber");
const assert = require("cucumber-assert");

When(/^I type in the path ['"]?([^'"]+)['"]?$/, async function (path) {
  await this.request(path);
  if (!(await this.driver.getTitle())) {
    throw `Error retrieving the page at '${path}'`;
  }
});

Then(/^the page has the copy ['"]?(.+?)['"]?$/, async function (copy) {
  return await assert.notEqual((await this.driver.getPageSource()).indexOf(copy) === -1, true, `Expected the page to have copy '${copy}', but did not.`);
});
