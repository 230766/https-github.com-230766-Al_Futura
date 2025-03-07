import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { Button } from '../../components/ui/button';
import Navbar from '../../components/Navbar';
import HeroSection2 from '../../components/HeroSection2';

const guides = [
  {
    title: 'Getting Started with Real Estate Investment',
    level: 'Beginner',
    duration: '15 min read',
    topics: ['Investment Basics', 'Risk Management', 'Market Analysis'],
    description: 'Learn the fundamentals of real estate investment and how to get started with your first property.',
  },
  {
    title: 'Advanced Property Valuation Techniques',
    level: 'Advanced',
    duration: '25 min read',
    topics: ['Valuation Methods', 'Market Comparison', 'Income Approach'],
    description: 'Deep dive into professional property valuation methods used by industry experts.',
  },
  // Add more guides as needed
];

const categories = [
  'Investment Strategies',
  'Market Analysis',
  'Risk Management',
  'Legal & Compliance',
  'Property Management',
  'Financial Planning',
];

const GuidesPage = () => {
  return (
    <>
      <Navbar transparent={true} />
      <HeroSection2
        title="Guides"
        description="Explore our comprehensive guides to real estate investing"
        imageUrl="/dubai/dubai-desert.jpg"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="mt-12 max-w-4xl mx-auto">
          <PageHeader
            title="Investment Guides"
            description="Comprehensive resources to help you make informed real estate investment decisions."
          />
          
          {/* Categories */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Guides */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Guides</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {guides.map((guide, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {guide.level}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500 text-sm">{guide.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{guide.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {guide.topics.map((topic, topicIndex) => (
                        <span
                          key={topicIndex}
                          className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Read Guide
                      </Button>
                      <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-blue-50 rounded-xl p-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Stay Updated with New Guides
              </h2>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter to receive the latest investment guides and market insights.
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuidesPage; 