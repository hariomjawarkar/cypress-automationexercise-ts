class CartPage {

    private locators = {
        cartItems: '.cart_info tbody tr',
        productName: '.cart_description h4 a'
    };

    verifyProductInCart() {
        cy.get(this.locators.cartItems).should('have.length.greaterThan', 0);
    }

    verifyProductName() {
        cy.get(this.locators.productName).should('be.visible');
    }
}

export default CartPage;