const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const componentsDir = './components';
const components = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css'));

console.log("Checking for orphaned components...");

for (const comp of components) {
  const name = comp.replace(/\.(tsx|ts|css)$/, '');
  // Ignore index files or specific folders if needed
  try {
    // Grep across app, components, lib, hooks
    // -r recursive, -l just list files, -q quiet (we just want exit code)
    // We look for the exact filename or the component name being imported
    const res = execSync(`grep -rEl "from.*${name}['\\\"]|import.*${name}['\\\"]|import.*${comp}" app/ components/ lib/ hooks/`).toString().trim();
    const files = res.split('\n').filter(f => f !== `components/${comp}` && f !== '');
    
    if (files.length === 0) {
      console.log(`ORPHAN: ${comp}`);
    }
  } catch (e) {
    // grep returns 1 if not found
    console.log(`ORPHAN: ${comp}`);
  }
}
