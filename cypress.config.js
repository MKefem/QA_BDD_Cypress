const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
// import allureWriter from "@shelex/cypress-allure-plugin/writer";

module.exports = defineConfig({
  projectId: "",
  CYPRESS_RECORD_KEY: '',

  e2e: {
    baseUrl: "https://weathershopper.pythonanywhere.com/",
    setupNodeEvents(on, config) {
      const cucumber = require('cypress-cucumber-preprocessor').default
      on('file:preprocessor', cucumber());
      allureWriter(on, config);
      return config;
    },
    env: {
      allureReuseAfterSpec: true
    },

    specPattern: 'cypress/e2e/features/**/*.{feature,cy.js}',
    excludeSpecPattern: "**/cypress/pages/*,cypress/integration/step-definition/*",
    experimentalSessionAndOrigin: true,
    failOnStatusCode: false,
    experimentalWebKitSupport: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 8000,
    watchForFileChanges: false,
    chromeWebSecurity: false,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      overwrite: true,
      html: false,
      json: true,
      reportPageTitle: 'Cypress Test Runner',
      embeddedScreenshots: true,
      inlineAssets: true, //Adds the asserts inline
      reportDir: 'cypress/report/mochawesome-report',
    },

    "retries": {

      "runMode": 1,

      "openMode": 1
    },
  }
});
