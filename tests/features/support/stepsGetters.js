export function getSelectorFromDescription(description) {
  const knownElementsMap = [{
    pattern: /the login button\.?/,
    selector: 'button.login, button#login, #gb_70'
  }, {
    pattern: /the logout button\.?/,
    attribute: 'button.logout, button#logout'
  }];
  knownElementsMap.forEach((mapItem) => {
    if (description.test(mapItem.pattern)) {
      return mapItem.selector;
    }
  })
};
