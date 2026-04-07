class LoginPage {

    private locators = {
        signupLoginBtn: 'a[href="/login"]',
        emailInput: 'input[data-qa="login-email"]',
        passwordInput: 'input[data-qa="login-password"]',
        loginBtn: 'button[data-qa="login-button"]',
        errorMsg: 'p[style="color: red;"]'
    };

    visit() {
        cy.visit('/login');
        cy.get('div.login-form', { timeout: 15000 }).should('be.visible');
    }


    clickSignupLogin() {
        cy.get(this.locators.signupLoginBtn).click({ force: true });
    }

    enterEmail(email: string) {
        cy.get(this.locators.emailInput).clear().type(email);
    }

    enterPassword(password: string) {
        cy.get(this.locators.passwordInput).clear().type(password);
    }

    clickLogin() {
        cy.get(this.locators.loginBtn).scrollIntoView().click({ force: true });
    }

    login(email: string, password: string) {
        // Form is already visible after visit(), directly fill credentials
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickLogin();
    }

    verifyLoginSuccess() {
        cy.get('ul.nav.navbar-nav', { timeout: 20000 }).should('contain', 'Logged in as');
    }

    verifyLoginError() {
        cy.get(this.locators.errorMsg).should('be.visible');
    }
}

export default LoginPage;