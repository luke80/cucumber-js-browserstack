Feature: Various important pages load
  In order to know the site is working
  As a user
  I want to see specific words on a few pages

  Scenario Outline: Pages contain words
    When I type in the path <Path>
    Then the page has the copy <Copy>

    Examples:
      | Path                                      | Copy          |
      | /search/howsearchworks/                   | Google Search |
      | /search/howsearchworks/crawling-indexing/ | Google Search |
      | /search/howsearchworks/algorithms/        | Google Search |
      | /search/howsearchworks/responses/         | Google Search |
