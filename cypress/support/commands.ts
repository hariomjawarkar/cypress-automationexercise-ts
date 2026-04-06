/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Cypress.Chainable<void>
      register(user: any): Cypress.Chainable<void>
      deleteAccount(): Cypress.Chainable<void>
    }
  }
}




Cypress.Commands.add('login', (email: string, password: string) => {
    // Wrap in session to speed up subsequent tests
    cy.session([email, password], () => {
        // Direct navigation to login page is more stable
        cy.visit('/login');
        
        // Ensure the form is loaded
        cy.get('div.login-form', { timeout: 15000 }).should('be.visible');
        
        // Use visible check and clear to ensure clean input
        cy.get('input[data-qa="login-email"]').should('be.visible').clear().type(email);
        cy.get('input[data-qa="login-password"]').should('be.visible').clear().type(password);
        
        // Force click to bypass potential invisible ad overlays
        cy.get('button[data-qa="login-button"]').scrollIntoView().click({ force: true });
        
        // Increased timeout for slow redirects on the live site
        cy.get('ul.nav.navbar-nav', { timeout: 20000 }).should('contain', 'Logged in as');
    }, {
        cacheAcrossSpecs: true
    });
});

Cypress.Commands.add('register', (user: any) => {
    cy.visit('/login');
    cy.get('input[data-qa="signup-name"]').type(user.name);
    cy.get('input[data-qa="signup-email"]').type(user.email);
    cy.get('button[data-qa="signup-button"]').click({ force: true });
    
    // Fill details
    cy.get('#id_gender1').click();
    cy.get('input[data-qa="password"]').type(user.password);
    cy.get('#days').select('1');
    cy.get('#months').select('January');
    cy.get('#years').select('2000');
    cy.get('input[data-qa="first_name"]').type(user.firstName);
    cy.get('input[data-qa="last_name"]').type(user.lastName);
    cy.get('input[data-qa="address"]').type(user.address);
    cy.get('select[data-qa="country"]').select(user.country);
    cy.get('input[data-qa="state"]').type(user.state);
    cy.get('input[data-qa="city"]').type(user.city);
    cy.get('input[data-qa="zipcode"]').type(user.zipcode);
    cy.get('input[data-qa="mobile_number"]').type(user.mobile);
    cy.get('button[data-qa="create-account"]').click({ force: true });
    
    // Verify and continue
    cy.get('h2[data-qa="account-created"]', { timeout: 15000 }).should('be.visible');
    cy.get('a[data-qa="continue-button"]').click({ force: true });
});

Cypress.Commands.add('deleteAccount', () => {
    cy.get('a[href="/delete_account"]').click({ force: true });
    cy.get('h2[data-qa="account-deleted"]', { timeout: 15000 }).should('be.visible');
    cy.get('a[data-qa="continue-button"]').click({ force: true });
});