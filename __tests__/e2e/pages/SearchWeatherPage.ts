class SearchWeatherPage {
    static visit() {
        cy.visit('/');
    }

    static checkIfSearchWeatherPageIsDisplayed() {
        cy.get('button').contains('Search').should('be.visible');
    }

    static checkIfNoSuggestionsAreDisplayed() {
        cy.get('li[class*="suggestionItem"]').should('not.exist');
    }

    static typeIntoSearchField(searchTerm: string) {
        cy.get('input[class*="searchTermInput"]').type(searchTerm);
    }

    static selectCityFromSuggestions(city: string) {
        cy.get('li[class*="suggestionItem"]').contains(city).click();
    }

    static clickSearchButton() {
        cy.get('button').contains('Search').click();
    }
}

export default SearchWeatherPage;
