/// <reference types="cypress" />
export { };

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
    cy.visit('/login');

    // Wait for login form specifically (not just any div)
    cy.get('input[data-qa="login-email"]', { timeout: 15000 }).should('be.visible');

    cy.get('input[data-qa="login-email"]').clear().type(email);
    cy.get('input[data-qa="login-password"]').clear().type(password);

    cy.get('button[data-qa="login-button"]').scrollIntoView().click({ force: true });

    // Verify logged in state
    cy.get('ul.nav.navbar-nav', { timeout: 20000 }).should('contain', 'Logged in as');
  }, {
    cacheAcrossSpecs: true
  });
});

Cypress.Commands.add('register', (user: any) => {
  cy.visit('/login');

  // Wait for the signup form to be ready
  cy.get('input[data-qa="signup-name"]', { timeout: 15000 }).should('be.visible').type(user.name);
  cy.get('input[data-qa="signup-email"]').should('be.visible').type(user.email);
  cy.get('button[data-qa="signup-button"]').click({ force: true });

  // Wait for redirect to signup details page - check URL and heading
  cy.url({ timeout: 15000 }).should('include', '/signup');
  cy.get('input[data-qa="password"]', { timeout: 15000 }).should('be.visible');

  // Fill all details
  cy.get('#id_gender1').scrollIntoView().click({ force: true });
  cy.get('input[data-qa="password"]').type(user.password);
  cy.get('#days').select('1');
  cy.get('#months').select('January');
  cy.get('#years').select('2000');

  cy.get('input[data-qa="first_name"]').scrollIntoView().type(user.firstName);
  cy.get('input[data-qa="last_name"]').type(user.lastName);
  cy.get('input[data-qa="address"]').type(user.address);
  cy.get('select[data-qa="country"]').select(user.country);
  cy.get('input[data-qa="state"]').type(user.state);
  cy.get('input[data-qa="city"]').type(user.city);
  cy.get('input[data-qa="zipcode"]').type(user.zipcode);
  cy.get('input[data-qa="mobile_number"]').type(user.mobile);

  cy.get('button[data-qa="create-account"]').scrollIntoView().click({ force: true });

  // Verify Account Created page - site text is "Account Created!" (mixed case)
  cy.get('h2[data-qa="account-created"]', { timeout: 20000 })
    .scrollIntoView()
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      expect(text.trim().toUpperCase()).to.include('ACCOUNT CREATED');
    });

  cy.get('a[data-qa="continue-button"]').click({ force: true });

  // Confirm we are now logged in
  cy.get('ul.nav.navbar-nav', { timeout: 20000 }).should('contain', 'Logged in as');
});


Cypress.Commands.add('deleteAccount', () => {
  cy.get('a[href="/delete_account"]').click({ force: true });
  cy.get('h2[data-qa="account-deleted"]', { timeout: 15000 }).should('be.visible');
  cy.get('a[data-qa="continue-button"]').click({ force: true });
});