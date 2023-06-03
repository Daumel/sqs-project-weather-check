/// <reference types="cypress" />
import ForecastPage from '../pages/ForecastPage';
import SearchWeatherPage from '../pages/SearchWeatherPage';
import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the SearchWeather page', function () {
    SearchWeatherPage.visit();
    SearchWeatherPage.checkIfSearchWeatherPageIsDisplayed();
});

When('I type {string} into the search field', function (searchTerm) {
    SearchWeatherPage.typeIntoSearchField(searchTerm.toString());
});

When('I select {string} from the suggestions', function (city) {
    SearchWeatherPage.selectCityFromSuggestions(city.toString());
});

When('I click the search button', function () {
    SearchWeatherPage.clickSearchButton();
});

Then('the weather forecast for {string} should be displayed', function (city) {
    ForecastPage.checkIfForecastIsDisplayed(city.toString());
});

Then('no weather forecast should be displayed', function () {
    ForecastPage.checkIfNoForecastIsDisplayed();
});

Then('no suggestions should be displayed', function () {
    SearchWeatherPage.checkIfNoSuggestionsAreDisplayed();
});
