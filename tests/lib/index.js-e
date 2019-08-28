let { scaffold } = require('./scaffold.js');

module.exports = {
  scaffold: scaffold,
  addSelector: function (pattern, selector = null) {
    global.selectorMap = global.selectorMap || [];
    if (pattern instanceof String) {
      pattern = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    }
    if (pattern instanceof RegExp && !!selector) {
      global.selectorMap.push({ pattern: pattern, selector: selector});
    }
    else if (pattern instanceof Object && !!selector) {
      global.selectorMap.push(pattern);
    }
    else {
      console.warn('Did not add selector. The format looks bad.', 'The pattern was valid:' + pattern instanceof RegExp, 'The selector was set:' + !!selector);
    }
  },
  getSelectorFromDescription: function (description) {
    const selectorMap = global.selectorMap || [{
      pattern: /the login button\.?/i,
      selector: 'button.login'
    }, {
      pattern: /the logout button\.?/i,
      selector: 'button.logout'
    }];
    let selector;
    for (let mapItem of selectorMap) {
      if (mapItem.pattern instanceof RegExp && (m = mapItem.pattern.exec(description)) !== null) {
        /* jshint -W083 */
        let i = 1;
        return mapItem.selector.replace(/%s/g, () => m[i++]); // This potentially confusing syntax iteratively replaces %s with matched groups within the pattern regexp.
        /* jshint +W083 */
      }
    }
    if (!selector) {
      throw `Invalid selector configured for description ${description}. Make sure you add a valid match using addSelector`;
    }
    return selector;
  },
  detectElementWithSelector: async function (selector, driver) {
    let elements = await driver.findElements({ css: selector });
    return !!elements.length;
  },
  getElementWithSelector: async function (selector, driver) {
    if (await module.exports.detectElementWithSelector(selector, driver)) {
      let element = await driver.findElement({ css: selector });
      await driver.takeScreenshot(true);
      return element;
    }
    else {
      throw `Selector found no element; '${selector}'`;
    }
  },
  getElement: async function (selectorDescription, driver, successSelector=null) {
    let element = await module.exports.getElementWithSelector(await module.exports.getSelectorFromDescription(selectorDescription), driver);
    if (!!successSelector) {
      element = await element.then(getElement(successSelector, driver));
    }
    return element;
  },
  detectPageSourceMatch: async function (copy, driver) {
    let test = !(await driver.wait(async function() {
      return await driver.getPageSource().then(function(source) {
        return source.indexOf(copy) > -1;
      });
    }, 5000));
    return test;
  },
  detectPageTitleMatch: async function (copy, driver, returnTitle=false) {
    let t = null;
    let test = !(await driver.wait(function() {
      return driver.getTitle().then(function(title) {
        t = title;
        return title.indexOf(copy) > -1;
      });
    }, 5000));
    return (!returnTitle) ? test : t;
  },
  getPageTitle: async function (driver, expectedTitle = null) {
    let t = null;
    if (expectedTitle) {
      await driver.wait(function() {
        return driver.getTitle().then(function(title) {
          t = title;
          return title.indexOf(expectedTitle) > -1;
        });
      }, 5000);
    }
    else {
      t = await driver.getTitle();
    }
    return t;
  },
  getPage: async function(path, driver, config) {
    const protocol = config.protocol || process.env.TESTING_PROTOCOL || 'https://';
    const host = (config.host || process.env.TESTING_HOST).replace(/(?:^https?:\/\/|[\/\\]$)/, '');
    let page = await driver.get(protocol + host + path);
    await driver.takeScreenshot();
    return page;
  }

};
