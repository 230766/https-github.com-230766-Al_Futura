import React from 'react';
import { PageHeader } from '../../components/PageHeader';

const sections = [
  {
    title: '1. Information We Collect',
    content: [
      {
        subtitle: 'Personal Information',
        text: 'We collect information that you provide directly to us, including name, email address, phone number, and other contact or identification information.',
      },
      {
        subtitle: 'Financial Information',
        text: 'To facilitate investments, we collect financial information such as bank account details, investment history, and accreditation status.',
      },
      {
        subtitle: 'Usage Information',
        text: 'We automatically collect information about your usage of our platform, including log data, device information, and cookies.',
      },
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      {
        subtitle: 'Platform Operations',
        text: 'We use your information to operate, maintain, and improve our platform and services.',
      },
      {
        subtitle: 'Communications',
        text: 'We may use your contact information to send you updates, newsletters, and marketing communications.',
      },
      {
        subtitle: 'Legal Compliance',
        text: 'We use your information to comply with legal obligations and enforce our terms.',
      },
    ],
  },
  {
    title: '3. Information Sharing',
    content: [
      {
        subtitle: 'Service Providers',
        text: 'We may share your information with third-party service providers who assist in operating our platform.',
      },
      {
        subtitle: 'Legal Requirements',
        text: 'We may disclose your information if required by law or in response to valid requests from public authorities.',
      },
    ],
  },
];

const lastUpdated = 'March 15, 2024';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Privacy Policy"
        description="Learn how we collect, use, and protect your personal information."
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Last Updated */}
          <div className="mb-8 text-gray-600">
            Last Updated: {lastUpdated}
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p>
              At Al Futura, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our platform.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {section.title}
                </h2>
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {item.subtitle}
                      </h3>
                      <p className="text-gray-600">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Your Rights */}
          <div className="mt-16 bg-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Privacy Rights
            </h2>
            <p className="text-gray-600 mb-6">
              You have the right to access, correct, or delete your personal information.
              You can also opt out of marketing communications at any time.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
              Manage Privacy Settings
            </button>
          </div>

          {/* Contact Information */}
          <div className="mt-16 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us About Privacy
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact our Privacy Officer at:
            </p>
            <div className="text-gray-600">
              <p>Privacy Officer</p>
              <p>Al Futura, Inc.</p>
              <p>Email: privacy@alfutura.com</p>
              <p>Address: 123 Investment Street, Suite 100</p>
              <p>New York, NY 10001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 