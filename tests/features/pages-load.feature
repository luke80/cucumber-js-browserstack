Feature: Various important pages load
  In order to know the site is working
  As a user
  I want to see specific words on a few pages

  Scenario Outline: Pages contain words
    When I type in the path <Path>
    Then the page has the copy <Copy>

    Examples:
      | Path            | Copy                                           |
      | /               | Northern Trust Capital Market Assumptions 2018 |
      | /1year/         | Northern Trust Capital Market Assumptions      |
      #| /1year/products | Northern Trust Capital Market Assumptions      |
