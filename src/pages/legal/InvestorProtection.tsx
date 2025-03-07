import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { Shield, Lock, FileCheck, Scale } from 'lucide-react';

const protectionMeasures = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Asset Protection',
    description: 'Your investments are held in a segregated account separate from Al Futura\'s operational funds. Each property investment is structured as a separate legal entity.',
  },
  {
    icon: <Lock className="h-8 w-8" />,
    title: 'Security Measures',
    description: 'We employ bank-level security measures, including 256-bit encryption, two-factor authentication, and continuous security monitoring.',
  },
  {
    icon: <FileCheck className="h-8 w-8" />,
    title: 'Regulatory Compliance',
    description: 'Al Futura operates in full compliance with SEC regulations and other applicable laws governing real estate investment platforms.',
  },
  {
    icon: <Scale className="h-8 w-8" />,
    title: 'Legal Structure',
    description: 'Each investment is structured to provide maximum legal protection for investors while maintaining transparency and efficiency.',
  },
];

const InvestorProtectionPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Investor Protection"
        description="Learn about the measures we take to protect your investments and interests."
      />
      
      <div className="container mx-auto px-4 py-16">
        {/* Protection Measures Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {protectionMeasures.map((measure, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4">{measure.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {measure.title}
                </h3>
                <p className="text-gray-600">{measure.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Information */}
        <div className="max-w-3xl mx-auto">
          {/* Investment Protection */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How We Protect Your Investments
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                At Al Futura, protecting your investments is our top priority. We implement
                multiple layers of security and protection measures to ensure your investments
                are safe and your interests are protected.
              </p>
              <p>
                Each property investment is structured as a separate Special Purpose Vehicle (SPV),
                ensuring that your investment is legally separated from both Al Futura's operations
                and other property investments.
              </p>
            </div>
          </div>

          {/* Due Diligence */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Our Due Diligence Process
            </h2>
            <div className="bg-gray-50 rounded-xl p-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <span className="ml-3 text-gray-600">Comprehensive property evaluation and market analysis</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 font-semibold">2</span>
                  </div>
                  <span className="ml-3 text-gray-600">Legal and regulatory compliance verification</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 font-semibold">3</span>
                  </div>
                  <span className="ml-3 text-gray-600">Financial and operational risk assessment</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 font-semibold">4</span>
                  </div>
                  <span className="ml-3 text-gray-600">Independent third-party verification</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Regulatory Compliance */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Regulatory Compliance
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Al Futura maintains strict compliance with all applicable securities laws and
                regulations. We are registered with the Securities and Exchange Commission (SEC)
                and operate under the guidance of relevant regulatory bodies.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Have Questions About Investor Protection?
            </h2>
            <p className="text-gray-600 mb-6">
              Our investor relations team is here to help you understand how we protect
              your investments and interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                Contact Investor Relations
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200">
                Download Protection Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorProtectionPage; 