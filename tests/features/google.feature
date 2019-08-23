Feature: Google's Search Functionality

  Scenario: Can find search results
    When I search "BrowserStack"
    Then I submit
    Then I should see title "BrowserStack - Google Search"
