import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Al Futura</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Al Futura is revolutionizing real estate investment in the UAE by making property investment accessible, transparent, and efficient through our innovative digital platform.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To democratize real estate investment by providing everyone with the opportunity to invest in premium properties with minimal capital, while ensuring maximum transparency and security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To become the leading digital real estate investment platform in the Middle East, making property investment accessible to investors worldwide.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Al Futura?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility</h3>
                <p className="text-gray-600">
                  Start investing in premium real estate with as little as AED 500, breaking down traditional barriers to entry.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparency</h3>
                <p className="text-gray-600">
                  Access detailed property information, real-time updates, and comprehensive investment tracking.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Security</h3>
                <p className="text-gray-600">
                  Enjoy peace of mind with our robust security measures and regulatory compliance.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, Al Futura emerged from a vision to transform the real estate investment landscape in the UAE. Our founders recognized the need for a platform that could make property investment more accessible while maintaining the highest standards of security and transparency.
            </p>
            <p className="text-gray-600">
              Today, we're proud to serve thousands of investors from around the world, helping them build their real estate portfolios through our innovative digital platform.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage; 