const data = require('../fixtures/payment.json')
export class weathershopperPage {

    weblocators = {
        temperature: '#temperature',
        productCard: '.text-center.col-4',
        tableFirstColumn: '.table.table-striped>tbody>tr>td:nth-child(1)',
        justifyText: '.text-justify',
        iframeSelector: '.stripe_checkout_app',
        succesMessage: 'h2',
    }


    setBelow19() {
        const temperatureValue = Math.floor(Math.random() * 19);

        // Mock the temperature value
        cy.get(this.weblocators.temperature).invoke('text', `${temperatureValue} ℃`);
        cy.contains(this.weblocators.temperature, `${temperatureValue} ℃`).should('exist');
    }

    setAbove34() {
        const temperatureValue = Math.floor(Math.random() * 16) + 35;
        // Mock the temperature value
        cy.get(this.weblocators.temperature).invoke('text', `${temperatureValue} ℃`);
        cy.contains(this.weblocators.temperature, `${temperatureValue} ℃`).should('exist');
    }

    setBetween19And34() {
        const temperatureValue = Math.floor(Math.random() * 16) + 19;
        // Mock the temperature value
        cy.get(this.weblocators.temperature).invoke('text', `${temperatureValue} ℃`);
        cy.contains(this.weblocators.temperature, `${temperatureValue} ℃`).should('exist');
    }

    pageSelection(pageName) {
        cy.contains(pageName).click();
    }

    selectLeastExpensive(productIngredient) {
        cy.get(this.weblocators.productCard).filter((index, element) => {
            const textContent = Cypress.$(element).text().toLowerCase();
            return textContent.includes(productIngredient);
        }).then((moisturizersAloe) => {
            const leastExpensiveAloeMoisturizer = this.selectLeastExpensiveProduct(moisturizersAloe, productIngredient);
            cy.wrap(leastExpensiveAloeMoisturizer).contains('Add').click();
        });
    }

    verifyCardList(type1, type2){
        const textValues = [type1, type2];
        textValues.forEach((text) => {
            cy.get(this.weblocators.tableFirstColumn).should(($td) => {
                const actualText = $td.text().toLowerCase(); // Convert actual text to lowercase
                expect(actualText).to.contain(text)
            });
            cy.log("Cart contains " + type1 + " and " + type2 + " products");
        });
    }

    fillPaymentDetails() {
            cy.switchToIframe(this.weblocators.iframeSelector).find(data.locators.email).type(data.values.email); cy.wait(500);
            cy.switchToIframe(this.weblocators.iframeSelector).find(data.locators.cardNumber).type(data.values.cardNumber); cy.wait(500);
            cy.switchToIframe(this.weblocators.iframeSelector).find(data.locators.cardExpires).type(data.values.cardExpires); cy.wait(500);
            cy.switchToIframe(this.weblocators.iframeSelector).find(data.locators.cardCVC).type(data.values.cardCVC); cy.wait(500);
            cy.switchToIframe(this.weblocators.iframeSelector).find(data.locators.zipCode).type(data.values.zipCode); cy.wait(500);
            cy.switchToIframe(this.weblocators.iframeSelector).find(data.locators.submitButton).click();
    }

    verifyConfirmationPage() {
        cy.url().should('include', '/confirmation')
        cy.get(this.weblocators.succesMessage).should(($h2) => {
            const text = $h2.text();
            if (text.includes('PAYMENT SUCCESS')) {
                expect(text).to.include('PAYMENT SUCCESS')
            } else if (text.includes('PAYMENT FAILED')) {
                expect(text).to.include('PAYMENT FAILED')
            } else {
                throw new Error('Expected either "PAYMENT SUCCESS" or "PAYMENT FAILED" in the text');
            }
        });
    }

    selectLeastExpensiveProduct(products, productIngredient) {
        let leastExpensivePrice = Number.MAX_SAFE_INTEGER;
        let leastExpensiveProduct;

        products.each((index, product) => {
            const productName = Cypress.$(product).find('p.font-weight-bold').text().toLowerCase();
            const productPrice = parseInt(Cypress.$(product).find('p').last().text().match(/\d+/)[0]);

            if (productName.includes(productIngredient) && productPrice < leastExpensivePrice) {
                leastExpensivePrice = productPrice;
                leastExpensiveProduct = product;
            }
        });

        return leastExpensiveProduct;
    }

    verifyNonShoppingWeather(message) {
        cy.get(this.weblocators.justifyText).invoke('text', message);
        cy.contains(this.weblocators.justifyText, message).should('exist');
    }
}