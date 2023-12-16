const fs = require('fs');
const path = require('path');

// Define the path to the cypress/reports/Results folder
const resultsFolderPath = path.join(__dirname, 'cypress', 'reports', 'Results');

// Read the contents of the Results folder
fs.readdir(resultsFolderPath, (err, files) => {
    if (err) {
        console.error('Error reading Results folder:', err);
        return;
    }

    // Filter out non-HTML files
    const htmlFiles = files.filter((file) => file.endsWith('.html'));

    if (htmlFiles.length === 0) {
        console.log('No HTML files found in the Results folder.');
        return;
    }

    // Log the list of HTML files
    console.log('HTML files:', htmlFiles);

    // Concatenate the contents of all HTML files
    const combinedHTML = htmlFiles.map((file) => fs.readFileSync(path.join(resultsFolderPath, file), 'utf-8')).join('\n');

    // Log the combined HTML
    console.log('Combined HTML:', combinedHTML);

    // Write the combined HTML to a new file
    fs.writeFileSync('combinedReport.html', combinedHTML);

    console.log('Combined HTML report generated successfully.');
});
