class ProductPage {

    private locators = {
        productsMenu: 'a[href="/products"]',
        productList: '.productinfo',
        addToCartBtn: '.productinfo .add-to-cart',
        continueShoppingBtn: 'button.close-modal',
        viewCartBtn: 'a[href="/view_cart"]'
    };

    openProducts() {
        // Direct navigation is more stable than clicking header links on this site
        cy.visit('/products');
        cy.get('h2.title.text-center', { timeout: 10000 }).should('be.visible');
    }

    addFirstProductToCart() {
        cy.get(this.locators.addToCartBtn)
          .first()
          .click({ force: true });

        cy.get(this.locators.continueShoppingBtn, { timeout: 10000 })
            .should('be.visible')
            .first()
            .click({ force: true });
    }

    goToCart() {
        cy.get(this.locators.viewCartBtn)
            .first()
            .click({ force: true });
    }

}


export default ProductPage;