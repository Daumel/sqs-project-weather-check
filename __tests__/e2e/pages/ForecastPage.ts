class ForecastPage {
    static checkIfForecastIsDisplayed(city: string) {
        cy.get('div[class*="forecast"]').contains(city).should('be.visible');
    }

    static checkIfNoForecastIsDisplayed() {
        cy.get('div[class*="forecast"]').should('not.exist');
    }
}

export default ForecastPage;
