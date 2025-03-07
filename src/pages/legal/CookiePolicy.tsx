import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import Navbar from '../../components/Navbar';
import HeroSection2 from '../../components/HeroSection2';

const CookiePolicyPage = () => {
  const sections = [
    {
      title: '1. What Are Cookies',
      content: `Cookies are small text files that are placed on your device when you visit our website. They help make websites work more efficiently and provide information to website owners. Some cookies are essential for the operation of our platform, while others help us improve your experience.`
    },
    {
      title: '2. Types of Cookies We Use',
      subsections: [
        {
          title: 'Essential Cookies',
          content: 'Required for the platform to function properly. They enable basic features like page navigation and access to secure areas.'
        },
        {
          title: 'Performance Cookies',
          content: 'Help us understand how visitors interact with our platform by collecting and reporting information anonymously.'
        },
        {
          title: 'Functionality Cookies',
          content: 'Remember choices you make to improve your experience, such as login details and language preferences.'
        },
        {
          title: 'Targeting Cookies',
          content: 'Track your browsing habits to enable us to show advertising which is more likely to be of interest to you.'
        }
      ]
    },
    {
      title: '3. How We Use Cookies',
      content: `We use cookies to:
      • Keep you signed in
      • Remember your preferences
      • Understand how you use our platform
      • Improve our services
      • Protect against fraud
      • Provide personalized content and advertising`
    },
    {
      title: '4. Third-Party Cookies',
      content: `Some cookies are placed by third-party services that appear on our pages. We use third-party cookies for:
      • Analytics (Google Analytics)
      • Payment processing
      • Social media integration
      • Security verification
      These third parties may use cookies for their own purposes.`
    },
    {
      title: '5. Managing Cookies',
      content: `You can control and manage cookies in various ways:
      • Browser settings: You can modify your browser settings to accept or reject cookies
      • Our platform settings: You can adjust your cookie preferences in your account settings
      • Third-party tools: You can use various tools to manage cookies across all websites
      
      Please note that blocking some types of cookies may impact your experience on our platform.`
    },
    {
      title: '6. Cookie Consent',
      content: `When you first visit our platform, we will ask for your consent to place cookies on your device. You can change your cookie preferences at any time through your browser settings or our platform settings.`
    },
    {
      title: '7. Updates to This Policy',
      content: `We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Any changes will be posted on this page with an updated revision date.`
    }
  ];

  return (
    <>
      <Navbar transparent={true} />
      <HeroSection2
        title="Cookie Policy"
        description="Understanding how we use cookies on our platform"
        imageUrl="/dubai/dubai-frame-landmark.jpg"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600 mb-8">
              Last updated: March 21, 2024
            </p>

            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  {'subsections' in section ? (
                    <div className="space-y-4">
                      {section.subsections.map((subsection) => (
                        <div key={subsection.title}>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {subsection.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {subsection.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Questions About Cookies?
              </h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <ul className="text-gray-600">
                <li>Email: privacy@alfutura.com</li>
                <li>Phone: +1 (234) 567-890</li>
                <li>Address: 123 Investment Street, New York, NY 10001</li>
              </ul>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Cookie Preferences
              </h3>
              <p className="text-gray-600 mb-4">
                You can adjust your cookie preferences at any time using our cookie settings:
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                Manage Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicyPage; 