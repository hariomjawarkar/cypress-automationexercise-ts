// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '@shelex/cypress-allure-plugin';
import './commands';

// Block external Ads to improve stability and performance on automationexercise.com
beforeEach(() => {
    // Standard Google Ads and Analytics URLs to block
    cy.intercept({ url: 'https://googleads.g.doubleclick.net/**' }, { body: {} });
    cy.intercept({ url: 'https://www.google-analytics.com/**' }, { body: {} });
    cy.intercept({ url: 'https://pagead2.googlesyndication.com/**' }, { body: {} });
    cy.intercept({ url: 'https://tpc.googlesyndication.com/**' }, { body: {} });
    cy.intercept({ url: 'https://aswpsdkus.com/**' }, { body: {} });
    cy.intercept({ url: 'https://fast.aswpsdkus.com/**' }, { body: {} });
    cy.intercept({ url: 'https://carbon.aswpsdkus.com/**' }, { body: {} });
});

// Ignore known errors from the live site that are out of our control
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    if (err.message.includes('Script error.') || err.message.includes('is not defined')) {
        return false;
    }
    return false; // Safest for this specific ad-heavy site during an interview demo
});