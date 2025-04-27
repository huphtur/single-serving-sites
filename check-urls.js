#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define the directory where site JSON files are stored
const sitesDir = path.join(__dirname, 'src/_data/sites');

// Check if the directory exists
try {
  if (fs.existsSync(sitesDir)) {
    const files = fs.readdirSync(sitesDir).filter(file => file.endsWith('.json'));
    let warningCount = 0;
    
    console.log('Checking site URLs for trailing slashes...');
    
    files.forEach(file => {
      const filePath = path.join(sitesDir, file);
      try {
        const siteData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Check URL field
        if (siteData.url && !siteData.url.endsWith('/')) {
          console.warn(`\x1b[33mWarning:\x1b[0m URL in ${file} does not end with a slash: ${siteData.url}`);
          warningCount++;
        }
        
        // Check authorSite field
        if (siteData.authorSite && !siteData.authorSite.endsWith('/')) {
          console.warn(`\x1b[33mWarning:\x1b[0m authorSite in ${file} does not end with a slash: ${siteData.authorSite}`);
          warningCount++;
        }
      } catch (err) {
        console.error(`\x1b[31mError processing ${file}: ${err.message}\x1b[0m`);
      }
    });
    
    if (warningCount === 0) {
      console.log('\x1b[32mAll URLs end with a trailing slash. Good job!\x1b[0m');
    } else {
      console.log(`\x1b[33mFound ${warningCount} URL(s) without trailing slashes.\x1b[0m`);
    }
  } else {
    console.error(`\x1b[31mDirectory ${sitesDir} does not exist\x1b[0m`);
  }
} catch (err) {
  console.error(`\x1b[31mError checking site URLs: ${err.message}\x1b[0m`);
}