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



## Tech Stack:
JavaScript
BDD Framework : Cucumber
Cypress


