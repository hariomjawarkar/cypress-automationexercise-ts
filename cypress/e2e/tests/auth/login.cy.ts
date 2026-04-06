import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';

describe('Login Tests', () => {

    const loginPage = new LoginPage();
    const registerPage = new RegisterPage();
    let testUserEmail: string;

    before(() => {
        cy.fixture('user').then((data) => {
            testUserEmail = `test_session_${Date.now()}@gmail.com`;
            const newUser = { ...data.user, email: testUserEmail };
            
            // Integrated professional registration command
            cy.register(newUser);
            
            // Clean logout for testing login specifically
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