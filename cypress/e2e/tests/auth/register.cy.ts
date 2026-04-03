import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';

describe('Register Tests', () => {

    const loginPage = new LoginPage();
    const registerPage = new RegisterPage();

    it('User Registration Flow', () => {
        cy.fixture('user').then((data) => {
            const uniqueEmail = `testuser_${Date.now()}@gmail.com`;
            loginPage.visit();
            loginPage.clickSignupLogin();

            registerPage.enterName(data.user.name);
            registerPage.enterEmail(uniqueEmail);
            registerPage.clickSignup();

            // Explicitly wait for navigation to the signup page
            cy.url().should('include', '/signup');
            registerPage.verifySignupPage();
        });
    });

});