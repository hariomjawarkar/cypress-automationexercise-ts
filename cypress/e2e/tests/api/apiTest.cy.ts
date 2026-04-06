import { getProducts } from 'utils/apiHelper';

describe('Product API Tests', () => {

    it('Validate product API responds successfully', () => {
        // Allure Reporting Enhancements
        cy.allure().feature('API Collection');
        cy.allure().story('Inventory Retrieval');

        getProducts().then((response) => {
            // Log full response for debugging in CI
            cy.log('API Response:', JSON.stringify(response.body));

            // Validate standard HTTP status
            expect(response.status, 'Standard HTTP Status').to.eq(200);
            
            // Flexible parsing in case the response is a string or an object
            const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
            
            // Validate responseCode (handles both number and string "200")
            // AutomationExercise API often returns results in the body
            if (body.responseCode) {
                expect(body.responseCode.toString(), 'Business Logic Status').to.eq('200');
            }
            
            expect(body).to.have.property('products');
            expect(body.products).to.be.an('array');
        });
    });

});

