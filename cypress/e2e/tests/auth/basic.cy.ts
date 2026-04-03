describe('Basic Test', () => {

    it('Visit homepage', () => {
        cy.visit('/');
        cy.title().should('include', 'Automation Exercise');
    });

});