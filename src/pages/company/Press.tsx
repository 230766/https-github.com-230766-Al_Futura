import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import Navbar from '../../components/Navbar';
import HeroSection2 from '../../components/HeroSection2';

const PressPage = () => {
  const pressReleases = [
    {
      date: 'March 15, 2024',
      title: 'Al Futura Raises $50M Series B to Expand Real Estate Investment Platform',
      source: 'TechCrunch',
      link: '#'
    },
    {
      date: 'February 1, 2024',
      title: 'Al Futura Named Among Top 10 PropTech Companies to Watch in 2024',
      source: 'Forbes',
      link: '#'
    },
    {
      date: 'January 10, 2024',
      title: 'Al Futura Launches New Investment Products for International Markets',
      source: 'Reuters',
      link: '#'
    }
  ];

  const mediaContacts = {
    press: {
      name: 'Sarah Williams',
      role: 'Head of Communications',
      email: 'press@alfutura.com',
      phone: '+1 (234) 567-8901'
    },
    media: {
      name: 'James Thompson',
      role: 'Media Relations Manager',
      email: 'media@alfutura.com',
      phone: '+1 (234) 567-8902'
    }
  };

  return (
    <>
      <Navbar transparent={true} />
      <HeroSection2
        title="Press"
        description="Latest news and media coverage about Al Futura"
        imageUrl="/dubai/dubai-burj-khalifa-night.jpg"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Recent Press Releases</h2>
          
          <div className="space-y-6">
            {pressReleases.map((release) => (
              <div 
                key={release.title}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="text-sm text-gray-500 mb-2">{release.date}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <a href={release.link} className="hover:text-blue-600 transition-colors duration-200">
                    {release.title}
                  </a>
                </h3>
                <div className="text-blue-600">{release.source}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Press Contact</h3>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{mediaContacts.press.name}</p>
                <p className="text-gray-600">{mediaContacts.press.role}</p>
                <p className="text-gray-600">{mediaContacts.press.email}</p>
                <p className="text-gray-600">{mediaContacts.press.phone}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Media Contact</h3>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{mediaContacts.media.name}</p>
                <p className="text-gray-600">{mediaContacts.media.role}</p>
                <p className="text-gray-600">{mediaContacts.media.email}</p>
                <p className="text-gray-600">{mediaContacts.media.phone}</p>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Download Media Kit</h3>
            <p className="text-gray-600 mb-6">
              Access our brand assets, company information, and high-resolution images.
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
              Download Kit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PressPage; 