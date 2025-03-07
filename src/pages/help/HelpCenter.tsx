import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import Navbar from '../../components/Navbar';
import HeroSection2 from '../../components/HeroSection2';

const HelpCenterPage = () => {
  const helpCategories = [
    {
      title: 'Getting Started',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      topics: [
        'Creating an account',
        'Verifying your identity',
        'Making your first investment',
        'Understanding investment types'
      ]
    },
    {
      title: 'Account Management',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      topics: [
        'Managing your profile',
        'Security settings',
        'Payment methods',
        'Account verification'
      ]
    },
    {
      title: 'Investments',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      topics: [
        'Investment process',
        'Property analysis',
        'Risk management',
        'Returns and distributions'
      ]
    },
    {
      title: 'Legal & Compliance',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      topics: [
        'Terms of service',
        'Privacy policy',
        'Regulatory compliance',
        'Investor rights'
      ]
    }
  ];

  const popularArticles = [
    'How to start investing in real estate',
    'Understanding property valuations',
    'Investment strategies for beginners',
    'Tax implications of real estate investing',
    'Managing your investment portfolio'
  ];

  return (
    <>
      <Navbar transparent={true} />
      <HeroSection2
        title="Help Center"
        description="Find answers and support for all your questions"
        imageUrl="/dubai/dubai-skyscrapers-blue.jpg"
      />
      <div className="container mx-auto px-4 py-12">
        {/* Search */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Help Categories */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {helpCategories.map((category) => (
            <div
              key={category.title}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="text-blue-600 mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.topics.map((topic) => (
                  <li key={topic}>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                      {topic}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Popular Articles</h2>
          <div className="bg-white rounded-lg shadow-md">
            {popularArticles.map((article, index) => (
              <a
                key={article}
                href="#"
                className={`block px-6 py-4 hover:bg-gray-50 transition-colors duration-200
                  ${index !== popularArticles.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-gray-600 hover:text-blue-600">{article}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Can't find what you're looking for?</h3>
          <p className="text-gray-600 mb-6">
            Our support team is available 24/7 to help you with any questions you may have.
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </>
  );
};

export default HelpCenterPage; 