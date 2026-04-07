import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';

describe('Register Tests', () => {

    const loginPage = new LoginPage();
    const registerPage = new RegisterPage();

    it('User Registration Flow', () => {
        cy.fixture('user').then((data) => {
            const uniqueEmail = `testuser_${Date.now()}@gmail.com`;

            // Visit the login page which also has the signup form
            loginPage.visit();

            // Fill the signup section (name + email) on the login page
            registerPage.enterName(data.user.name);
            registerPage.enterEmail(uniqueEmail);
            registerPage.clickSignup();

            // After submitting, we should be redirected to signup details
            cy.url().should('include', '/signup');
            registerPage.verifySignupPage();
        });
    });

});