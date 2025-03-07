import { RouteObject } from 'react-router-dom';

// Define the structure for a sitemap entry
export interface SitemapEntry {
  path: string;
  label: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  children?: SitemapEntry[];
}

// Main sections of the site
export const sitemapStructure: SitemapEntry[] = [
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
    path: '/company',
    label: 'Company',
    priority: 0.7,
    children: [
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
    ],
  },
  {
    path: '/resources',
    label: 'Resources',
    priority: 0.7,
    children: [
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
    ],
  },
  {
    path: '/help',
    label: 'Help',
    priority: 0.5,
    children: [
      {
        path: '/help',
        label: 'Help Center',
        changeFrequency: 'monthly',
        priority: 0.5,
      },
    ],
  },
  {
    path: '/legal',
    label: 'Legal',
    priority: 0.4,
    children: [
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
    ],
  },
];

// Function to extract routes from React Router configuration
export const extractRoutesFromRouter = (routes: RouteObject[]): SitemapEntry[] => {
  const entries: SitemapEntry[] = [];
  
  const processRoute = (route: RouteObject, parentPath: string = ''): void => {
    if (!route.path) return;
    
    // Skip routes with path parameters or special characters
    if (route.path.includes(':') || route.path.includes('*')) return;
    
    const fullPath = route.path.startsWith('/')
      ? route.path
      : `${parentPath}/${route.path}`;
    
    // Find if this route is already in our structure
    const existingEntry = findEntryByPath(sitemapStructure, fullPath);
    
    if (existingEntry) {
      entries.push({
        ...existingEntry,
        lastModified: new Date().toISOString().split('T')[0], // Update the last modified date
      });
    } else {
      // Add as a new entry
      entries.push({
        path: fullPath,
        label: generateLabelFromPath(fullPath),
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
    
    // Process child routes
    if (route.children) {
      route.children.forEach(childRoute => {
        processRoute(childRoute, fullPath);
      });
    }
  };
  
  routes.forEach(route => processRoute(route));
  
  return entries;
};

// Helper function to find an entry by path in the sitemap structure
const findEntryByPath = (entries: SitemapEntry[], path: string): SitemapEntry | undefined => {
  for (const entry of entries) {
    if (entry.path === path) {
      return entry;
    }
    
    if (entry.children) {
      const found = findEntryByPath(entry.children, path);
      if (found) return found;
    }
  }
  
  return undefined;
};

// Helper function to generate a label from a path
const generateLabelFromPath = (path: string): string => {
  const lastSegment = path.split('/').filter(Boolean).pop() || 'Home';
  return lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Function to generate XML sitemap
export const generateXmlSitemap = (baseUrl: string, entries: SitemapEntry[]): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  const addEntry = (entry: SitemapEntry, parentPath: string = ''): void => {
    const fullPath = entry.path.startsWith('/')
      ? entry.path
      : `${parentPath}${entry.path}`;
    
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${fullPath}</loc>\n`;
    
    if (entry.lastModified) {
      xml += `    <lastmod>${entry.lastModified}</lastmod>\n`;
    }
    
    if (entry.changeFrequency) {
      xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
    }
    
    if (entry.priority !== undefined) {
      xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
    }
    
    xml += '  </url>\n';
    
    if (entry.children) {
      entry.children.forEach(child => addEntry(child, fullPath));
    }
  };
  
  entries.forEach(entry => addEntry(entry));
  
  xml += '</urlset>';
  return xml;
};

// Function to generate HTML sitemap
export const generateHtmlSitemap = (entries: SitemapEntry[]): SitemapEntry[] => {
  // Update lastModified dates for all entries
  const updateLastModified = (entry: SitemapEntry): SitemapEntry => {
    const updated = {
      ...entry,
      lastModified: entry.lastModified || new Date().toISOString().split('T')[0],
    };
    
    if (entry.children) {
      updated.children = entry.children.map(updateLastModified);
    }
    
    return updated;
  };
  
  return entries.map(updateLastModified);
}; 