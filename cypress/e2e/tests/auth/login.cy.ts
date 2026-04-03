import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';

describe('Login Tests', () => {

    const loginPage = new LoginPage();
    const registerPage = new RegisterPage();
    let testUserEmail: string;

    before(() => {
        cy.fixture('user').then((data) => {
            // Register a fresh user specifically for this test run
            testUserEmail = `test_session_${Date.now()}@gmail.com`;
            const newUser = { ...data.user, email: testUserEmail };
            
            loginPage.visit();
            loginPage.clickSignupLogin();
            registerPage.enterName(newUser.name);
            registerPage.enterEmail(newUser.email);
            registerPage.clickSignup();
            registerPage.fillAccountInformation(newUser);
            
            // Use case-insensitive matching to handle styling differences
            cy.get('h2[data-qa="account-created"]', { timeout: 15000 })
                .should('be.visible')
                .invoke('text')
                .then((text) => {
                    expect(text.toLowerCase()).to.contain('account created');
                });
                
            cy.get('a[data-qa="continue-button"]').click({ force: true });
            cy.get('a[href="/logout"]').click({ force: true });
        });
    });

    beforeEach(() => {
        loginPage.visit();
    });

    it('Login with valid credentials', () => {
        cy.fixture('user').then((data) => {
            loginPage.login(testUserEmail, data.user.password);
            loginPage.verifyLoginSuccess();
        });
    });

    it('Login with invalid credentials', () => {
        cy.fixture('user').then((data) => {
            loginPage.login(data.invalidUser.email, data.invalidUser.password);
            loginPage.verifyLoginError();
        });
    });

});