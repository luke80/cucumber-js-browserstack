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
    return selector;
  }
};
