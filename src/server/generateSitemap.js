import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the sitemap structure (we'll need to convert this to CommonJS)
const sitemapStructure = [
  {
    path: '/',
    label: 'Home',
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    path: '/properties',
    label: 'Properties',
    changeFrequency: 'daily',
    priority: 0.9,
  },
  {
    path: '/about',
    label: 'About',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/how-it-works',
    label: 'How It Works',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/contact',
    label: 'Contact',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/team',
    label: 'Team',
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    path: '/careers',
    label: 'Careers',
    changeFrequency: 'weekly',
    priority: 0.6,
  },
  {
    path: '/press',
    label: 'Press',
    changeFrequency: 'weekly',
    priority: 0.6,
  },
  {
    path: '/blog',
    label: 'Blog',
    changeFrequency: 'weekly',
    priority: 0.6,
  },
  {
    path: '/guides',
    label: 'Guides',
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    path: '/faq',
    label: 'FAQ',
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    path: '/help',
    label: 'Help Center',
    changeFrequency: 'monthly',
    priority: 0.5,
  },
  {
    path: '/terms',
    label: 'Terms of Service',
    changeFrequency: 'yearly',
    priority: 0.4,
  },
  {
    path: '/privacy',
    label: 'Privacy Policy',
    changeFrequency: 'yearly',
    priority: 0.4,
  },
  {
    path: '/cookie-policy',
    label: 'Cookie Policy',
    changeFrequency: 'yearly',
    priority: 0.4,
  },
  {
    path: '/investor-protection',
    label: 'Investor Protection',
    changeFrequency: 'yearly',
    priority: 0.4,
  },
  {
    path: '/risk-disclosure',
    label: 'Risk Disclosure',
    changeFrequency: 'yearly',
    priority: 0.4,
  },
  {
    path: '/sitemap',
    label: 'Sitemap',
    changeFrequency: 'weekly',
    priority: 0.3,
  },
];

// Function to generate XML sitemap
const generateXmlSitemap = (baseUrl, entries) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  entries.forEach(entry => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${entry.path}</loc>\n`;
    
    if (entry.lastModified) {
      xml += `    <lastmod>${entry.lastModified}</lastmod>\n`;
    } else {
      // Use today's date if no last modified date is provided
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    }
    
    if (entry.changeFrequency) {
      xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
    }
    
    if (entry.priority !== undefined) {
      xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
    }
    
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
};

// Main function to generate and save the sitemap
const main = () => {
  const baseUrl = 'https://alfutura.com'; // Replace with your actual domain
  const today = new Date().toISOString().split('T')[0];
  
  // Update all entries with today's date
  const updatedEntries = sitemapStructure.map(entry => ({
    ...entry,
    lastModified: today,
  }));
  
  // Generate the XML
  const xmlSitemap = generateXmlSitemap(baseUrl, updatedEntries);
  
  // Write to file
  const publicDir = path.resolve(__dirname, '../../public');
  
  // Ensure the public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xmlSitemap);
  console.log('Sitemap generated successfully at public/sitemap.xml');
};

// Run the main function
main(); 