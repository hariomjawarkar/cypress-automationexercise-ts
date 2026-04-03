import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import ProductPage from 'pages/ProductPage';
import CartPage from 'pages/CartPage';
import CheckoutPage from 'pages/CheckoutPage';

describe('Checkout Flow', () => {

    const loginPage = new LoginPage();
    const registerPage = new RegisterPage();
    const productPage = new ProductPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();

    let newUser: any;

    before(() => {
        cy.fixture('user').then((data) => {
            newUser = { ...data.user };
            newUser.email = `checkout_${Date.now()}@test.com`;

            // Register the user first to make the test self-healing
            loginPage.visit();
            loginPage.clickSignupLogin();
            registerPage.enterName(newUser.name);
            registerPage.enterEmail(newUser.email);
            registerPage.clickSignup();
            registerPage.fillAccountInformation(newUser);
            
            // Verify account creation success
            cy.get('h2[data-qa="account-created"]', { timeout: 15000 })
                .should('be.visible')
                .invoke('text')
                .then((text) => {
                    expect(text.toLowerCase()).to.contain('account created');
                });
            cy.get('a[data-qa="continue-button"]').click();
            cy.get('a[href="/logout"]').click();
        });
    });

    beforeEach(() => {
        cy.login(newUser.email, newUser.password);
    });

    it('Complete end-to-end order flow', () => {
        // Allure Reporting Enhancements
        cy.allure().feature('Checkout Flow');
        cy.allure().story('User places order');

        productPage.openProducts();
        productPage.addFirstProductToCart();
        productPage.goToCart();

        cartPage.verifyProductInCart();

        checkoutPage.proceedToCheckout();
        checkoutPage.placeOrder();

        checkoutPage.enterPaymentDetails();
        checkoutPage.clickPay();

        checkoutPage.verifyOrderSuccess();
    });

});