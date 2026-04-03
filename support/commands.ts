Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('/');
    cy.get('a[href="/login"]').click();
    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(password);
    cy.get('button[data-qa="login-button"]').click();
});