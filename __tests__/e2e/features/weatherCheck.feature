Feature: Checking weather for a city

  Background:
    Given I am on the SearchWeather page

  Scenario: Successful weather check
    When I type "Reit im Winkl" into the search field
    And I select "Reit im Winkl" from the suggestions
    And I click the search button
    Then the weather forecast for "Reit im Winkl" should be displayed

  Scenario: Unsuccessful weather check with less than three characters in the search term
    When I type "Be" into the search field
    Then no suggestions should be displayed
    When I click the search button
    Then no weather forecast should be displayed

  Scenario: Unsuccessful weather check with no city selected
    When I type "Ber" into the search field
    And I click the search button
    Then no weather forecast should be displayed
