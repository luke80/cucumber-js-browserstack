const { Then } = require('cucumber');
const assert = require('cucumber-assert');
const { detectPageSourceMatch, detectPageTitleMatch } = require('../../lib/stepsGetters.js');


Then(/^the page has the copy ['"]?(.+?)['"]?$/, async function (copy) {
  return await detectPageSourceMatch(copy, this.driver);
});

Then(/^the page has the title ['"]?(.+?)['"]?$/, async function (copy) {
  return await detectPageTitleMatch(copy, this.driver);
});
