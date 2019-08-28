const { Then } = require('cucumber');
const assert = require('cucumber-assert');
const { detectPageSourceMatch, detectPageTitleMatch } = require('../../../lib');

Then(/^the page has the copy ['"]?(.+?)['"]?$/, async function (copy) {
  return await assert.notEqual(detectPageSourceMatch(copy, this.driver), true, `Expected the page to have copy '${copy}', but did not.`);
});

Then(/^the page has the title ['"]?(.+?)['"]?$/, async function (copy) {
  return await assert.notEqual(detectPageTitleMatch(copy, this.driver), true, `Expected the page to have title copy '${copy}', but did not.`);
});
