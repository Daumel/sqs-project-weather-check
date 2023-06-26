/// <reference types="cypress" />
class ForecastPage {
    static checkIfForecastIsDisplayed(location: string) {
        cy.get('div[class*="forecast"]').contains(location).should('be.visible');
    }

    static checkIfNoForecastIsDisplayed() {
        cy.get('div[class*="forecast"]').should('not.exist');
    }
}

export default ForecastPage;
