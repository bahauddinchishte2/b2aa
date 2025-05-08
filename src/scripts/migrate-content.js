/**
 * Migration script to move content from blog to scholarships and opportunities collections
 * 
 * This script:
 * 1. Reads all MDX files from src/content/blog
 * 2. Determines if they should go to 'scholarships' or 'opportunities' based on category
 * 3. Copies the files to the appropriate directory
 * 4. Logs the migration process
 */

const fs = require('fs');
const path = require('path');

// Define source and destination directories
const sourceDir = path.join(__dirname, '../content/blog');
const scholarshipsDir = path.join(__dirname, '../content/scholarships');
const opportunitiesDir = path.join(__dirname, '../content/opportunities');

// Create destination directories if they don't exist
if (!fs.existsSync(scholarshipsDir)) {
  fs.mkdirSync(scholarshipsDir, { recursive: true });
  console.log('Created scholarships directory');
}

if (!fs.existsSync(opportunitiesDir)) {
  fs.mkdirSync(opportunitiesDir, { recursive: true });
  console.log('Created opportunities directory');
}

// Get all .mdx files from blog directory
const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.mdx'));

if (files.length === 0) {
  console.log('No files found in blog directory');
  process.exit(0);
}

console.log(`Found ${files.length} files to migrate`);

// Track migration stats
let scholarshipCount = 0;
let opportunityCount = 0;
let errorCount = 0;

// Process each file
files.forEach(file => {
  const filePath = path.join(sourceDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract category from frontmatter
  const categoryMatch = content.match(/category:\s*['"]([^'"]+)['"]/);
  
  if (!categoryMatch) {
    console.error(`Error: Could not determine category for ${file}`);
    errorCount++;
    return;
  }
  
  const category = categoryMatch[1];
  let destDir;
  
  // Determine destination based on category
  if (category === 'government-scholarship' || category === 'university-scholarship') {
    destDir = scholarshipsDir;
    scholarshipCount++;
  } else if (category === 'internship' || category === 'fellowship') {
    destDir = opportunitiesDir;
    opportunityCount++;
  } else {
    console.error(`Error: Unknown category "${category}" for ${file}`);
    errorCount++;
    return;
  }
  
  // Copy the file to the destination
  const destPath = path.join(destDir, file);
  fs.copyFileSync(filePath, destPath);
  console.log(`Migrated ${file} to ${category}`);
});

// Log summary
console.log('\n----- Migration Summary -----');
console.log(`Total files processed: ${files.length}`);
console.log(`Scholarships migrated: ${scholarshipCount}`);
console.log(`Opportunities migrated: ${opportunityCount}`);
console.log(`Errors: ${errorCount}`);
console.log('-----------------------------');