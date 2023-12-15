const report = require('multiple-cucumber-html-reporter');
const date = new Date();
const Report_Time = (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '-' + date.getHours())

report.generate({
  jsonDir: 'cypress/reports/cucumber-json', // ** Path of .json file **//
  reportPath: 'cypress/reports/Results', // ** Path of .html file **//
  reportName: 'cucumber-report.html',
  generateReportFile: true,
  metadata: {

    browser: {
      name: 'Chrome',
      version: '10'
    },

    device: 'Virtual Machine',
    platform: {
      name: 'Linux'
    },

    displayReportTime: true,
    displayDuration: true,
    pageTitle: "Web-Automation"
  },

  customData: {
    title: 'Run info',
    data: [
      { label: 'QA BDD Cypress', value: '' },
      { label: 'Org Name', value: '' },
      { label: 'Execution Date', value: Report_Time },
    ]
  },
  storeScreenShots: true,
  merge: true,
});