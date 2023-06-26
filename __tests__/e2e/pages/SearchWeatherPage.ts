/// <reference types="cypress" />
class SearchWeatherPage {
    static visit() {
        cy.visit('/');
    }

    static checkIfSearchWeatherPageIsDisplayed() {
        cy.get('button').contains('Search').should('be.visible');
    }

    static checkIfNoLocationsAreSuggested() {
        cy.get('li[class*="suggestionItem"]').should('not.exist');
    }

    static checkIfSpecificLocationIsSuggested(location: string) {
        cy.get('li[class*="suggestionItem"]').contains(location).should('be.visible');
    }

    static typeIntoSearchField(searchTerm: string) {
        cy.get('input[class*="searchTermInput"]').clear().type(searchTerm);
    }

    static selectLocationFromSuggestions(location: string) {
        cy.get('li[class*="suggestionItem"]').contains(location).click();
    }

    static clickSearchButton() {
        cy.get('button').contains('Search').click();
    }
}

export default SearchWeatherPage;
