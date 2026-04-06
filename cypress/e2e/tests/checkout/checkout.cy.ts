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

            // Register using consistent command
            cy.register(newUser);
            
            // Clean account for fresh start
            cy.get('a[href="/logout"]').click({ force: true });
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