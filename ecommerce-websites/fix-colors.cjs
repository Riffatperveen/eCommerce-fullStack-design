const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (filePath.endsWith('.jsx')) {
      if (file === 'Footer.jsx') continue;
      
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(/text-gray-400/g, 'text-gray-600');
      content = content.replace(/text-gray-500/g, 'text-gray-700');
      content = content.replace(/text-gray-600/g, 'text-gray-800');
      
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
}

walk(directoryPath);
console.log('Colors updated successfully!');
