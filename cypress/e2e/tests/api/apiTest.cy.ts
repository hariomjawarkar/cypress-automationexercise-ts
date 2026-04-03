import { getProducts } from 'utils/apiHelper';

describe('Product API Tests', () => {

    it('Validate product API responds successfully', () => {
        // Allure Reporting Enhancements
        cy.allure().feature('API Collection');
        cy.allure().story('Inventory Retrieval');

        getProducts().then((response) => {
            // Check HTTP status code (standard browser level)
            expect(response.status).to.eq(200);
            
            // Flexible parsing in case the response is a string or an object
            const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
            
            // Validate responseCode (handles both number and string "200")
            expect(body.responseCode.toString()).to.eq('200');
            expect(body).to.have.property('products');
            expect(body.products).to.be.an('array');
        });
    });

});
