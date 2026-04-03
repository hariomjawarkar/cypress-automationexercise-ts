class LoginPage {

    private locators = {
        signupLoginBtn: 'a[href="/login"]',
        emailInput: 'input[data-qa="login-email"]',
        passwordInput: 'input[data-qa="login-password"]',
        loginBtn: 'button[data-qa="login-button"]',
        errorMsg: 'p[style="color: red;"]'
    };

    visit() {
        cy.visit('/');
    }

    clickSignupLogin() {
        cy.get(this.locators.signupLoginBtn).click({ force: true });
    }

    enterEmail(email: string) {
        cy.get(this.locators.emailInput).type(email);
    }

    enterPassword(password: string) {
        cy.get(this.locators.passwordInput).type(password);
    }

    clickLogin() {
        cy.get(this.locators.loginBtn).click({ force: true });
    }

    login(email: string, password: string) {
        this.clickSignupLogin();
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickLogin();
    }

    verifyLoginSuccess() {
        cy.contains('Logged in as').should('be.visible');
    }

    verifyLoginError() {
        cy.get(this.locators.errorMsg).should('be.visible');
    }
}

export default LoginPage;