import React from 'react';
import { PageHeader } from '../../components/PageHeader';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing and using the Al Futura platform ("Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Platform.',
  },
  {
    title: '2. Investment Risks',
    content: 'Real estate investments carry inherent risks. Past performance is not indicative of future results. You should carefully consider your investment objectives, risks, and capabilities before making any investment.',
  },
  {
    title: '3. Account Registration',
    content: 'To use our Platform, you must create an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.',
  },
  {
    title: '4. Investment Process',
    content: 'All investments are made through our Platform according to the procedures and requirements we establish. We reserve the right to reject any investment at our sole discretion.',
  },
  {
    title: '5. User Conduct',
    content: 'You agree to use the Platform only for lawful purposes and in accordance with these Terms. You will not engage in any activity that interferes with or disrupts the Platform or violates any applicable laws.',
  },
];

const lastUpdated = 'March 15, 2024';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Terms of Service"
        description="Please read these terms carefully before using our platform."
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
              Welcome to Al Futura. These Terms of Service govern your use of our platform
              and services. By using Al Futura, you agree to these terms and our Privacy Policy.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-600">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="mt-16 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="text-gray-600">
              <p>Al Futura, Inc.</p>
              <p>Email: legal@alfutura.com</p>
              <p>Address: 123 Investment Street, Suite 100</p>
              <p>New York, NY 10001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage; 