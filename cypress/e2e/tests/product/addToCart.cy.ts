import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import ProductPage from 'pages/ProductPage';
import CartPage from 'pages/CartPage';

describe('Product Tests', () => {

    const loginPage = new LoginPage();
    const registerPage = new RegisterPage();
    const productPage = new ProductPage();
    const cartPage = new CartPage();
    
    let testUser: any;

    before(() => {
        cy.fixture('user').then((data) => {
            testUser = { ...data.user };
            testUser.email = `product_test_${Date.now()}@test.com`;

            // Register using the shared command for reliability
            cy.register(testUser);
            
            // Clean logout
            cy.get('a[href="/logout"]').click({ force: true });
        });
    });


    beforeEach(() => {
        cy.login(testUser.email, testUser.password);
    });

    it('Add product to cart and verify', () => {
        // Allure Reporting Enhancements
        cy.allure().feature('Product Selection');
        cy.allure().story('User adds item to cart');

        productPage.openProducts();
        productPage.addFirstProductToCart();
        productPage.goToCart();

        cartPage.verifyProductInCart();
        cartPage.verifyProductName();
    });

});