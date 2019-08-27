const { When, Then } = require("cucumber");

When(/^I type in the path ['"]?([^'"]+)['"]?$/i, async function (path) {
  await this.request(path);
  if (!(await this.driver.getTitle())) {
    throw `Error retrieving the page at '${path}'`;
  }
});

Then(/a new tab opens and I switch to it/i, async function () {
  //let currentTab = await this.driver.getWindowHandle();
  let tabs = await this.driver.getAllWindowHandles(); 
  if (tabs.length > 1) {
    this.driver.switchTo().window(tabs[1]);
    return true;
  }
  return false;
});
