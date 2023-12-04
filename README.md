# QA_BDD_Cypress
=================

## Test case explanation
    1. "raw-code-weathershopper.cy.js" - This file contains raw code of the test scenario.
        - The test case is written in Cypress as a raw
        TC. steps shorlisted are
            - Visit the website
            - Check the temperature
            - Decide for moisturer or sunscreen and click on the button
            - Choose the least expensive products for the given type
            - Add the products to the cart
            - Verify the cart
            - Checkout
            - Verify the order confirmation
    2. "weathershopper.feature"- This file contains the BDD test case for the BDD code of the test scenario.
        - The test case is written in Cypress as a BDD
        TC. steps shorlisted are
            - Visit the website
            - Mock the temperature for the desired value
            - Decide for moisturer or sunscreen according to the given vlaue and click on the button
            - Choose the least expensive products for the given type
            - Add the products to the cart
            - Verify the cart
            - Checkout
            - Verify the order confirmation

### Installation
`npm install --save-dev`

### Run All specs in headless mode
`npx cypress run --headless`

### Run a specific spec in headless mode
`npx cypress run --spec "cypress/integration/step-definition/your_spec_name.feature"`

### Run All specs in headless mode and generate html report
`npm run TestWithReportGeneration`

### Run All specs in headed mode
`npx cypress open`

### Run a specific spec in headed mode
`npx cypress open --spec "cypress/integration/step-definition/your_spec_name.feature"`

### Build and run docker image
`docker build -t bdd-cypress-image:1.0.0 .

### Retrieve the html report from docker container to local
`docker run -it --rm --name bdd-cypress-container -v $PWD:/Qa-BDD-Cypress bdd-cypress-image:1.0.0`

***
___

## Tech Stack:
> * JavaScript
> * BDD Framework : Cucumber
> * Cypress

## How to write test case

Below is the heirarchy:

Features  
Step-Definition
Pages

1. Features: Go to e2e/features. Create a .feature file . Write the scenarios in feature file

2. Step-Definition: Go to integration/step-definition. Write the corresponding steps here and import the Gherkin keywords from "cypress-cucumber-preprocessor/steps";
3. Pages: Create a page class which would basically create all the actions performed on the web page ( Eg : clicking on an element / typing text in and input)

Once you are done doing all the three steps, run "npx cypress open" - Choose E2E Testing then select the browser and finally select your .feature file
