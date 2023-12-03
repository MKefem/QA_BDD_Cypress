import {Given, WHen, Then, And, Before} from 'cypress-cucumber-preprocessor/steps'
import {weathershopperPage} from '../../../pages/weathershopperPage'

const weatherPage = new weathershopperPage()

Given(/^I am on the Weather Shopper website$/, function () {
    cy.viewport(1400, 660);
    cy.visit('/');
});

When(/^I see the weather is below (\d+) degrees$/, function () {
    weatherPage.setBelow19();
});

When(/^I click on the "([^"]*)" button$/, function (pageName) {
    weatherPage.pageSelection(pageName);
});

When(/^I select the least expensive product containing "([^"]*)" and add to card$/, function (productIngredient) {
    weatherPage.selectLeastExpensive(productIngredient);
});

Then(/^the cart list should contain "([^"]*)" and "([^"]*)" products$/, function (type1, type2) {
    weatherPage.verifyCardList(type1, type2);
});

Then(/^I fill out valid payment details and submit the form$/, function () {
    weatherPage.fillPaymentDetails();
});

Then(/^I should see a success message on the confirmation page$/, function () {
    weatherPage.verifyConfirmationPage();

});

When(/^I see the weather is above (\d+) degrees$/, function () {
    weatherPage.setAbove34();
});

When(/^the weather is between (\d+) and (\d+) degrees$/, function () {
    weatherPage.setBetween19And34();
});

Then(/^I should see the message "([^"]*)"$/, function (message) {
    weatherPage.verifyNonShoppingWeather(message);
});