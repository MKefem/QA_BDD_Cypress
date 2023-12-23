/// <reference types="cypress" />

import {Given, WHen, Then, And, Before} from 'cypress-cucumber-preprocessor/steps'
import GerpaasPage from '../../../pages/gerpaasPage'

let gerpaasPage;

before(function () {
    cy.fixture('locators').then(locatorsJson => {
        cy.fixture('data').then(dataJson => {
            gerpaasPage = new GerpaasPage(locatorsJson.gerpaas, dataJson.gerpaas);
        });
    });
    // root-level hook
    // runs once before all tests
    /*   Cypress.on('uncaught:exception', (err, runnable) => {
           // returning false here prevents Cypress from
           // failing the test
           return false
       });

       Cypress.on('uncaught:exception', (err, runnable, promise) => {
           // when the exception originated from an unhandled promise
           // rejection, the promise is provided as a third argument
           // you can turn off failing the test in this case
           if (promise) {
               return false
           }
           // we still want to ensure there are no other unexpected
           // errors, so we let them fail the test
       }) */
})


Given(/^the user is on the "([^"]*)" website homepage$/, function (website) {
    gerpaasPage.navigateTo(website);
});
When(/^the user clicks on the "([^"]*)" link in the navigation menu$/, function (pageName) {
    gerpaasPage.selectPage(pageName);

});
Then(/^the user should see the "([^"]*)" on the URL$/, function (searchText) {
    gerpaasPage.verifyURLContains(searchText);
});
When(/^the user should see slider texts are loaded correctly$/, function () {
    gerpaasPage.checkSliderText();
});
When(/^the user should see the social media icons and links are correct on the header$/, function () {
    gerpaasPage.verifyHeaderSMicons();
});
Then(/^the footer section should exist$/, function () {
    gerpaasPage.verifyContact();

});
Then(/^the company logo should be displayed$/, function () {
    gerpaasPage.verifyBottomLogo();

});
Then(/^there should be a "([^"]*)" link with the email address "([^"]*)"$/, function () {
    gerpaasPage.verifyMailLink()

});
Then(/^there should be a "([^"]*)" link with the phone number "\+902164897005"$/, function () {
    gerpaasPage.verifyPhoneLink();

});
Then(/^the "([^"]*)" button should exist$/, function (button) {
    switch (button) {
        case "subscribe":
            gerpaasPage.verifySubscribe();
            break;
        case "About Us":
            gerpaasPage.verifyAboutUsBttn();
            break
        default:
            throw new Error(`Unsupported button name as ${button}`);
    }

});
Then(/^the footer social media links should exist$/, function () {
    gerpaasPage.verifyFooterSMicons();

});
Then(/^the "([^"]*)" images should exist$/, function (section) {
    switch (section){
        case "News":
            gerpaasPage.verifyNewsImages();
            break;
        case "What We are Doing":
            gerpaasPage.verifyWhatWeAreDoingImages();
            break;
        default:
            throw new Error('Section is not defined yet')
    }

});