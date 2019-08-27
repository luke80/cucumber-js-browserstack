let assert = require('cucumber-assert');

module.exports = {
  getSelectorFromDescription: function (description) {
    const knownElementsMap = [{
      pattern: /the login button\.?/i,
      selector: 'button.login, button#login, #gb_70'
    }, {
      pattern: /the logout button\.?/i,
      selector: 'button.logout, button#logout'
    }, {
      pattern: /^Improve your Website\.?$/i,
      selector: 'a[href$=\'test-my-site\']'
    }, {
      pattern: /^(Enter your .+\.?)$/i,
      selector: 'input[placeholder=\'%s\']'
    }, {
      pattern: /^(Test My Site\.?)$/i,
      selector: 'button[value=\'%s\']'
    }];
    /*const catchAll = {
      pattern: /^(.+)$/,
      selector: 'a:contains(\'%s\')'
    };
    knownElementsMap.push(catchAll);*/
    let selector;
    for (let mapItem of knownElementsMap) {
      if ((m = mapItem.pattern.exec(description)) !== null) {
        let i = 1;
        return mapItem.selector.replace(/%s/g, () => m[i++]);
      }
    };
    if (!selector) {
      throw `Invalid selector configured for description ${description}. Make sure you add a valid match into the map file: tests/lib/stepsGetters.js`;
    }
    return selector;
  },
  detectElementWithSelector: async function (selector, driver) {
    let elements = await driver.findElements({ css: selector });
    return !!elements.length;
  },
  getElementWithSelector: async function (selector, driver) {
    if (await module.exports.detectElementWithSelector(selector, driver)) {
      return await driver.findElement({ css: selector });
    }
    else {
      throw `Selector found no elements; '${selector}'`;
    }
  },
  getElement: async function (selectorDescription, driver) {
    return await module.exports.getElementWithSelector(await module.exports.getSelectorFromDescription(selectorDescription), driver);
  },
  detectPageSourceMatch: async function (copy, driver) {
    let test = !(await driver.wait(async function() {
      return await driver.getPageSource().then(function(source) {
        return source.indexOf(copy) > -1;
      });
    }, 5000));
    return await assert.notEqual(test, true, `Expected the page to have copy '${copy}', but did not.`);
  },
  detectPageTitleMatch: async function (copy, driver) {
    let test = !(await driver.wait(function() {
      return driver.getTitle().then(function(title) {
        return title.indexOf(copy) > -1;
      });
    }, 5000));
    return await assert.notEqual(test, true, `Expected the page to have title copy '${copy}', but did not.`);
  }
};
