class SearchWeatherPage {
    static visit() {
        cy.visit('/');
    }

    static checkIfSearchWeatherPageIsDisplayed() {
        cy.get('button').contains('Search').should('be.visible');
    }

    static checkIfNoCitiesAreSuggested() {
        cy.get('li[class*="suggestionItem"]').should('not.exist');
    }

    static checkIfSpecificCityIsSuggested(city: string) {
        cy.get('li[class*="suggestionItem"]').contains(city).should('be.visible');
    }

    static typeIntoSearchField(searchTerm: string) {
        cy.get('input[class*="searchTermInput"]').clear().type(searchTerm);
    }

    static selectCityFromSuggestions(city: string) {
        cy.get('li[class*="suggestionItem"]').contains(city).click();
    }

    static clickSearchButton() {
        cy.get('button').contains('Search').click();
    }
}

export default SearchWeatherPage;
