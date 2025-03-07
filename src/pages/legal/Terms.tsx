import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import Navbar from '../../components/Navbar';
import HeroSection2 from '../../components/HeroSection2';

const TermsPage = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using Al Futura's platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.`
    },
    {
      title: '2. Investment Risks',
      content: `Real estate investments carry inherent risks, including but not limited to market volatility, illiquidity, and potential loss of capital. Past performance is not indicative of future results. All investments should be made with careful consideration of your financial situation and risk tolerance.`
    },
    {
      title: '3. User Accounts',
      content: `You must be at least 18 years old and provide accurate, complete, and current information to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.`
    },
    {
      title: '4. Investment Process',
      content: `All investments are made through our platform according to the specified procedures. We reserve the right to reject any investment for any reason. Investment confirmations are subject to successful payment processing and compliance checks.`
    },
    {
      title: '5. Fees and Payments',
      content: `Platform fees, management fees, and any other applicable charges will be clearly disclosed before investment confirmation. All fees are non-refundable unless otherwise specified. Payment processing is handled through secure third-party payment providers.`
    },
    {
      title: '6. Privacy and Data Protection',
      content: `We collect and process personal data in accordance with our Privacy Policy. By using our platform, you consent to such processing and warrant that all data provided by you is accurate and complete.`
    },
    {
      title: '7. Intellectual Property',
      content: `All content, features, and functionality of the Al Futura platform, including but not limited to text, graphics, logos, and software, are the exclusive property of Al Futura and are protected by international copyright, trademark, and other intellectual property laws.`
    },
    {
      title: '8. Limitation of Liability',
      content: `To the maximum extent permitted by law, Al Futura shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.`
    },
    {
      title: '9. Modifications',
      content: `We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the platform. Your continued use of the platform following any changes indicates your acceptance of such changes.`
    },
    {
      title: '10. Governing Law',
      content: `These terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.`
    }
  ];

  return (
    <>
      <Navbar transparent={true} />
      <HeroSection2
        title="Terms of Service"
        description="Please read these terms carefully before using our platform"
        imageUrl="/dubai/dubai-burj-khalifa.jpg"
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
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="text-gray-600">
                <li>Email: legal@alfutura.com</li>
                <li>Phone: +1 (234) 567-890</li>
                <li>Address: 123 Investment Street, New York, NY 10001</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage; 