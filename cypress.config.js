const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "",
  CYPRESS_RECORD_KEY: '',

  e2e: {
    baseUrl: "https://weathershopper.pythonanywhere.com/",
    setupNodeEvents(on, config) {
      const cucumber = require('cypress-cucumber-preprocessor').default
      on('file:preprocessor', cucumber())
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


    "retries": {

      "runMode": 1,

      "openMode": 1
    },
  }
});
