Feature: Usability tests
  In order to know the site is working
  As a user
  I want to use various pages functions

  Scenario: Test the site speed tester
    When I type in the path /services
    Then I click on "Improve your Website"
    Then I type "www.facebook.com" into "Enter your website URL"
    Then I click on "Test My Site"
    Then a new tab opens and I switch to it
    Then the page has the copy "Compare your mobile site speed"
