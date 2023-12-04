# QA_BDD_Cypress
=================


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
