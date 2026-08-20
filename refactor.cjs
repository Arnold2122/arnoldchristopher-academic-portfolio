const fs = require('fs');
const path = require('path');

const files = [
  'src/components/layout/Footer.tsx',
  'src/components/layout/MinimalFooter.tsx',
  'src/components/layout/SectionFooter.tsx',
  'src/components/sections/Certificates.tsx',
  'src/components/sections/Contact.tsx',
  'src/components/sections/Education.tsx',
  'src/components/sections/Experience.tsx',
  'src/components/sections/Hero.tsx',
  'src/components/sections/Profiles.tsx',
  'src/components/sections/Projects.tsx',
  'src/components/sections/Publications.tsx',
  'src/components/sections/Research.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace import
    content = content.replace(/import\s*{\s*profile\s*}\s*from\s*['"](\.\.\/)*(\.\.\/)*data\/profile['"];?/g, "import { usePortfolio } from '../../context/PortfolioContext';");
    
    // Function start regex
    // e.g. export function Hero() { or const Footer = () => {
    content = content.replace(/(export\s+(default\s+)?function\s+[A-Za-z0-9_]+\s*\([^)]*\)\s*{|const\s+[A-Za-z0-9_]+\s*=\s*\([^)]*\)\s*=>\s*{)/g, "$1\n  const profile = usePortfolio();");
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
