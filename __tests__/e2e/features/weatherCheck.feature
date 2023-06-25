Feature: Weather Check

  Background:
    Given I am on the SearchWeather page

  Scenario: Checking weather for a valid location
    When I type "Reit im Winkl" into the search field
    And I select "Reit im Winkl" from the suggestions
    And I click the search button
    Then the weather forecast for "Reit im Winkl" should be displayed

  Scenario: Checking weather without selecting a location
    When I type "Ber" into the search field
    And I click the search button
    Then no weather forecast should be displayed

  Scenario: Searching for multiple locations in a row
    When I type "Reit im Winkl" into the search field
    Then a location with the name "Reit im Winkl" should be suggested
    When I type "Berlin" into the search field
    Then a location with the name "Berlin" should be suggested

  Scenario: Searching for suggestions with a search term of less than three characters
    When I type "Be" into the search field
    Then no locations should be suggested

  Scenario: Searching for suggestions using a non-existent location
    When I type "jkhdashfjdfkj" into the search field
    Then no locations should be suggested
