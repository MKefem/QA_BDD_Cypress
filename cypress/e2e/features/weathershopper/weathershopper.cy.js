/// <reference types="Cypress" />

// Common function to select the least expensive product containing the specified text
function selectLeastExpensiveProduct(products, searchText) {
    let leastExpensivePrice = Number.MAX_SAFE_INTEGER;
    let leastExpensiveProduct;

    products.each((index, product) => {
        const productName = Cypress.$(product).find('p.font-weight-bold').text().toLowerCase();
        const productPrice = parseInt(Cypress.$(product).find('p').last().text().match(/\d+/)[0]);

        if (productName.includes(searchText) && productPrice < leastExpensivePrice) {
            leastExpensivePrice = productPrice;
            leastExpensiveProduct = product;
        }
    });

    return leastExpensiveProduct;
}
const iframeSelector = '.stripe_checkout_app';

describe('Weather Shopper Web Site Test Cases', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Weather Shopper  situational test scenario for weather condition', () => {
        cy.get('#temperature').invoke('text').then((temperature) => {
            let aloeMoisturizerPrice, almondMoisturizerPrice, sunscreensSPF50Price, sunscreensSPF30Price,
                aloeMoisturizerName, almondMoisturizerName, sunscreensSPF50Name, sunscreensSPF30Name;

            if (parseInt(temperature) < 19) {
                cy.contains('Buy moisturizers').click();

                // Select the least expensive moisturizer containing Aloe
                cy.get('.text-center.col-4').filter((index, element) => {
                    const textContent = Cypress.$(element).text().toLowerCase();
                    return textContent.includes('aloe');
                }).then((moisturizersAloe) => {
                    const leastExpensiveAloeMoisturizer = selectLeastExpensiveProduct(moisturizersAloe, "aloe");
                    cy.wrap(leastExpensiveAloeMoisturizer).contains('Add').click();
                });

                // Select the least expensive moisturizer containing Almond
                cy.get('.text-center.col-4').filter((index, element) => {
                    const textContent = Cypress.$(element).text().toLowerCase();
                    return textContent.includes('almond');
                }).then((moisturizersAloe) => {
                    const leastExpensiveAloeMoisturizer = selectLeastExpensiveProduct(moisturizersAloe, "almond");
                    cy.wrap(leastExpensiveAloeMoisturizer).contains('Add').click();
                });

                // Go to Cart
                cy.contains('Cart').click();
                // Check if the least expensive moisturizer containing Aloe and Almond is added to the cart
                const textValues = ["almond", "aloe"];
                textValues.forEach((text) => {
                    cy.get('.table.table-striped>tbody>tr>td:nth-child(1)').should(($td) => {
                        const actualText = $td.text().toLowerCase(); // Convert actual text to lowercase
                        expect(actualText).to.contain(text)
                    });
                    cy.log("Cart contains " + text + " moisturizer");
                });
                // Payment steps.
                cy.get('button span').click();

                //make payment with the card details
                cy.fixture('payment').then((data) => {
                    cy.switchToIframe(iframeSelector).find(data.locators.email).type(data.values.email); cy.wait(500);
                    cy.switchToIframe(iframeSelector).find(data.locators.cardNumber).type(data.values.cardNumber); cy.wait(500);
                    cy.switchToIframe(iframeSelector).find(data.locators.cardExpires).type(data.values.cardExpires); cy.wait(500);
                    cy.switchToIframe(iframeSelector).find(data.locators.cardCVC).type(data.values.cardCVC); cy.wait(500);
                    cy.switchToIframe(iframeSelector).find(data.locators.zipCode).type(data.values.zipCode); cy.wait(500);
                    cy.switchToIframe(iframeSelector).find(data.locators.submitButton).click();
                });

                //Verify the payment is successful or unsuccessful
                cy.url().should('include', '/confirmation')
                cy.get('h2').should(($h2) => {
                    const text = $h2.text();
                    if (text.includes('PAYMENT SUCCESS')) {
                        expect(text).to.include('PAYMENT SUCCESS')
                    } else if (text.includes('PAYMENT FAILED')) {
                        expect(text).to.include('PAYMENT FAILED')
                    } else {
                        throw new Error('Expected either "PAYMENT SUCCESS" or "PAYMENT FAILED" in the text');
                    }
                });
            } else if (parseInt(temperature) > 34) {
                cy.contains('Buy sunscreens').click();

                // Select the least expensive sunscreen with SPF-50
                cy.get('.text-center.col-4').filter((index, element) => {
                    const textContent = Cypress.$(element).text().toLowerCase();
                    return textContent.includes('spf-50');
                }).then((moisturizersAloe) => {
                    const leastExpensiveAloeMoisturizer = selectLeastExpensiveProduct(moisturizersAloe, "spf-50");
                    cy.wrap(leastExpensiveAloeMoisturizer).contains('Add').click();
                });

                // Select the least expensive sunscreen with SPF-30
                cy.get('.text-center.col-4').filter((index, element) => {
                    const textContent = Cypress.$(element).text().toLowerCase();
                    return textContent.includes('spf-30');
                }).then((moisturizersAloe) => {
                    const leastExpensiveAloeMoisturizer = selectLeastExpensiveProduct(moisturizersAloe, "spf-30");
                    cy.wrap(leastExpensiveAloeMoisturizer).contains('Add').click();
                });

                // Go to Cart
                cy.contains('Cart').click();
                // Check if the least expensive sunscreen with SPF-50 snd SPF-30 is added to the cart
                const textValues = ["spf-50", "spf-30"];
                textValues.forEach((text) => {
                    cy.get('.table.table-striped>tbody>tr>td:nth-child(1)').should(($td) => {
                        const actualText = $td.text().toLowerCase(); // Convert actual text to lowercase
                        expect(actualText).to.contain(text)
                    });
                    cy.log("Cart contains " + text + " sunscreen");
                });

                // Payment steps.
                cy.get('button span').click();

                //make payment with the card details
                cy.fixture('payment').then((paymentData) => {
                    cy.switchToIframe(iframeSelector).find(paymentData.locators.email).type(paymentData.values.email); cy.wait(500);
                    cy.switchToIframe(iframeSelector).find(paymentData.locators.cardNumber).type(paymentData.values.cardNumber); cy.wait(500);
                    cy.switchToIframe(iframeSelector).find(paymentData.locators.cardExpires).type(paymentData.values.cardExpires); cy.wait(500);
                    cy.switchToIframe(iframeSelector).find(paymentData.locators.cardCVC).type(paymentData.values.cardCVC); cy.wait(500);
                    cy.switchToIframe(iframeSelector).find(paymentData.locators.zipCode).type(paymentData.values.zipCode); cy.wait(500);
                    cy.switchToIframe(iframeSelector).find(paymentData.locators.submitButton).click();
                });

                //Verify the payment is successful or unsuccessful
                cy.url().should('include', '/confirmation')
                cy.get('h2').should(($h2) => {
                    const text = $h2.text();
                    if (text.includes('PAYMENT SUCCESS')) {
                        expect(text).to.include('PAYMENT SUCCESS')
                    } else if (text.includes('PAYMENT FAILED')) {
                        expect(text).to.include('PAYMENT FAILED')
                    } else {
                        throw new Error('Expected either "PAYMENT SUCCESS" or "PAYMENT FAILED" in the text');
                    }
                });
            } else {
                cy.log('The weather condition is not suitable for shopping :)');
            }
        });
    });
});
