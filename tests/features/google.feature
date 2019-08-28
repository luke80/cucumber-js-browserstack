Feature: Google's Search Functionality

  Scenario: Can find search results
    When I type in the path /ncr
    Then I type "BrowserStack" into "Search the web"
    Then I click on "Google Search"
    Then the page has the title "BrowserStack - Google Search"
