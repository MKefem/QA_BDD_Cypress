// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Find iframe with selector. Wait for element to exist inside the iframe
// return all body
//import 'cypress-iframe';

Cypress.Commands.add('switchToIframe', (locator) => {
    return cy
        .get(locator)
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap);
});

Cypress.Commands.add('clickx', { prevSubject: true }, (subject) => {
    // Intercept all API calls
    cy.intercept('**').as('requests');

    // Click the element using force
    cy.get(subject).click({ force: true });

    // Wait for all intercepted requests to complete
    cy.wait('@requests');
});



