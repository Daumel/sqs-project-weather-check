Feature: Checking weather for a city

  Background:
    Given I am on the SearchWeather page

  Scenario: Checking weather for a valid city
    When I type "Reit im Winkl" into the search field
    And I select "Reit im Winkl" from the suggestions
    And I click the search button
    Then the weather forecast for "Reit im Winkl" should be displayed

  Scenario: Checking weather without selecting a city
    When I type "Ber" into the search field
    And I click the search button
    Then no weather forecast should be displayed

  Scenario: Searching for suggestions with a search term of less than three characters
    When I type "Be" into the search field
    Then no suggestions should be displayed

  Scenario: Searching for suggestions using a non-existent city
    When I type "jkhdashfjdfkj" into the search field
    Then no suggestions should be displayed
