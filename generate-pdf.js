const puppeteer = require('puppeteer');

async function generatePDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load your HTML file
  await page.goto('file:///path/to/cypress/reports/Results/index.html', {
    waitUntil: 'networkidle2', // Wait for network requests to complete
  });

  // Generate PDF
  await page.pdf({ path: 'cypress/reports/Results/report.pdf', format: 'A4' });

  await browser.close();
}

generatePDF();