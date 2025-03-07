import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import Navbar from '../../components/Navbar';
import HeroSection2 from '../../components/HeroSection2';

const PrivacyPage = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      content: `We collect various types of information, including:
      • Personal identification information (name, email, phone number, etc.)
      • Financial information for investment processing
      • Account credentials and authentication data
      • Usage data and platform interaction metrics
      • Device and browser information`
    },
    {
      title: '2. How We Use Your Information',
      content: `Your information is used for:
      • Processing investments and maintaining your account
      • Verifying your identity and preventing fraud
      • Communicating about your investments and platform updates
      • Improving our platform and user experience
      • Complying with legal and regulatory requirements`
    },
    {
      title: '3. Information Sharing',
      content: `We may share your information with:
      • Third-party service providers (payment processors, identity verification services)
      • Regulatory authorities and law enforcement agencies
      • Professional advisors (lawyers, accountants, auditors)
      • Business partners with your consent
      We never sell your personal information to third parties.`
    },
    {
      title: '4. Data Security',
      content: `We implement robust security measures to protect your information:
      • 256-bit encryption for data transmission
      • Secure data storage with regular backups
      • Access controls and authentication protocols
      • Regular security audits and vulnerability assessments
      • Employee training on data protection`
    },
    {
      title: '5. Your Rights',
      content: `You have the right to:
      • Access your personal information
      • Correct inaccurate data
      • Request deletion of your data
      • Opt-out of marketing communications
      • Export your data in a portable format
      Contact our privacy team to exercise these rights.`
    },
    {
      title: '6. Cookies and Tracking',
      content: `We use cookies and similar technologies to:
      • Maintain your session and preferences
      • Analyze platform usage and performance
      • Enhance security and prevent fraud
      • Personalize your experience
      You can manage cookie preferences in your browser settings.`
    },
    {
      title: '7. International Data Transfers',
      content: `Your data may be transferred to and processed in countries outside your residence. We ensure appropriate safeguards are in place for international data transfers in compliance with applicable data protection laws.`
    },
    {
      title: '8. Children\'s Privacy',
      content: `Our platform is not intended for individuals under 18 years of age. We do not knowingly collect or maintain information from persons under 18.`
    },
    {
      title: '9. Changes to Privacy Policy',
      content: `We may update this privacy policy periodically. We will notify you of any material changes through the platform or via email. Continued use of the platform after changes indicates acceptance of the updated policy.`
    },
    {
      title: '10. Contact Information',
      content: `For privacy-related inquiries or concerns, contact our Data Protection Officer:
      • Email: privacy@alfutura.com
      • Phone: +1 (234) 567-890
      • Address: 123 Investment Street, New York, NY 10001`
    }
  ];

  return (
    <>
      <Navbar transparent={true} />
      <HeroSection2
        title="Privacy Policy"
        description="How we protect and handle your personal information"
        imageUrl="/dubai/dubai-mall-interior.jpg"
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
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Questions or Concerns?
              </h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer:
              </p>
              <ul className="text-gray-600">
                <li>Email: privacy@alfutura.com</li>
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

export default PrivacyPage; 