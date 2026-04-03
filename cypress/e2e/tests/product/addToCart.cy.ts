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

            // Register the user first to make the test self-healing
            loginPage.visit();
            loginPage.clickSignupLogin();
            registerPage.enterName(testUser.name);
            registerPage.enterEmail(testUser.email);
            registerPage.clickSignup();
            registerPage.fillAccountInformation(testUser);
            
            // Wait for account created success before logging out
            cy.get('h2[data-qa="account-created"]', { timeout: 15000 }).should('be.visible');
            cy.get('a[data-qa="continue-button"]').click();
            cy.get('a[href="/logout"]').click();
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