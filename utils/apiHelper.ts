export const getProducts = () => {
    return cy.request('GET', 'https://automationexercise.com/api/productsList');
};