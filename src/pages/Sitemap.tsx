import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { SitemapEntry, sitemapStructure, generateHtmlSitemap } from '../utils/sitemapGenerator';
import { Link } from 'react-router-dom';

const Sitemap = () => {
  const [sitemap, setSitemap] = useState<SitemapEntry[]>([]);
  
  useEffect(() => {
    // Generate the sitemap
    const generatedSitemap = generateHtmlSitemap(sitemapStructure);
    setSitemap(generatedSitemap);
  }, []);

  // Render a sitemap entry and its children
  const renderSitemapEntry = (entry: SitemapEntry, level: number = 0) => {
    return (
      <div key={entry.path} className={`ml-${level * 4} mb-2`}>
        <div className="flex items-center">
          <Link 
            to={entry.path} 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {entry.label}
          </Link>
          {entry.lastModified && (
            <span className="ml-2 text-sm text-gray-500">
              (Updated: {entry.lastModified})
            </span>
          )}
        </div>
        
        {entry.children && entry.children.length > 0 && (
          <div className="mt-2 ml-4 pl-4 border-l border-gray-200">
            {entry.children.map(child => renderSitemapEntry(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sitemap</h1>
          <p className="text-gray-600 mb-8">
            A complete list of all pages on our website.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            {sitemap.map(entry => renderSitemapEntry(entry))}
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              <a 
                href="/sitemap.xml" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                View XML Sitemap
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap; 