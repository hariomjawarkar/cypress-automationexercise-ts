class CheckoutPage {

    private locators = {
        proceedToCheckoutBtn: 'a.check_out',
        placeOrderBtn: 'a[href="/payment"]',

        nameInput: 'input[data-qa="name-on-card"]',
        cardNumber: 'input[data-qa="card-number"]',
        cvc: 'input[data-qa="cvc"]',
        expiryMonth: 'input[data-qa="expiry-month"]',
        expiryYear: 'input[data-qa="expiry-year"]',

        payBtn: 'button[data-qa="pay-button"]',
        successMsg: '#success_message'
    };

    proceedToCheckout() {
        cy.get(this.locators.proceedToCheckoutBtn).click();
    }

    placeOrder() {
        cy.get(this.locators.placeOrderBtn).click();
    }

    enterPaymentDetails() {
        cy.get(this.locators.nameInput, { timeout: 10000 }).should('be.visible').type('Test User');
        cy.get(this.locators.cardNumber).should('be.visible').type('4111111111111111');
        cy.get(this.locators.cvc).should('be.visible').type('123');
        cy.get(this.locators.expiryMonth).should('be.visible').type('12');
        cy.get(this.locators.expiryYear).should('be.visible').type('2028');
    }

    clickPay() {
        cy.get(this.locators.payBtn).click();
    }

    verifyOrderSuccess() {
        // The final page shows "Order Placed!" in an h2 with data-qa="order-placed"
        cy.get('h2[data-qa="order-placed"]', { timeout: 15000 })
            .should('be.visible')
            .should('contain.text', 'Order Placed!');
    }
}

export default CheckoutPage;