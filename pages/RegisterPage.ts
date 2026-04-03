class RegisterPage {

    private locators = {
        nameInput: 'input[data-qa="signup-name"]',
        emailInput: 'input[data-qa="signup-email"]',
        signupBtn: 'button[data-qa="signup-button"]',
        passwordInput: 'input[data-qa="password"]',
        firstNameInput: 'input[data-qa="first_name"]',
        lastNameInput: 'input[data-qa="last_name"]',
        addressInput: 'input[data-qa="address"]',
        countrySelect: 'select[data-qa="country"]',
        stateInput: 'input[data-qa="state"]',
        cityInput: 'input[data-qa="city"]',
        zipcodeInput: 'input[data-qa="zipcode"]',
        mobileInput: 'input[data-qa="mobile_number"]',
        createAccountBtn: 'button[data-qa="create-account"]'
    };

    enterName(name: string) {
        cy.get(this.locators.nameInput).type(name);
    }

    enterEmail(email: string) {
        cy.get(this.locators.emailInput).type(email);
    }

    clickSignup() {
        cy.get(this.locators.signupBtn).click({ force: true });
    }

    fillAccountInformation(user: any) {
        cy.get('#id_gender1').click();
        cy.get(this.locators.passwordInput).type(user.password);
        cy.get('#days').select('1');
        cy.get('#months').select('January');
        cy.get('#years').select('2000');
        cy.get(this.locators.firstNameInput).type(user.firstName);
        cy.get(this.locators.lastNameInput).type(user.lastName);
        cy.get(this.locators.addressInput).type(user.address);
        cy.get(this.locators.countrySelect).select(user.country);
        cy.get(this.locators.stateInput).type(user.state);
        cy.get(this.locators.cityInput).type(user.city);
        cy.get(this.locators.zipcodeInput).type(user.zipcode);
        cy.get(this.locators.mobileInput).type(user.mobile);
        cy.get(this.locators.createAccountBtn).click({ force: true });
    }

    verifySignupPage() {
        // Use a more robust check that handles potential case-sensitivity or styling issues
        cy.get('h2.title.text-center b', { timeout: 10000 })
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.toUpperCase()).to.contain('ENTER ACCOUNT INFORMATION');
            });
    }
}

export default RegisterPage;