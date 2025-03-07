import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { AlertTriangle, TrendingDown, Building2, Coins } from 'lucide-react';
import Navbar from '../../components/Navbar';
import HeroSection2 from '../../components/HeroSection2';

const riskCategories = [
  {
    icon: <Building2 className="h-8 w-8" />,
    title: 'Real Estate Market Risks',
    risks: [
      'Property value fluctuations due to market conditions',
      'Changes in local real estate markets',
      'Economic downturns affecting property values',
      'Interest rate changes impacting property financing',
    ],
  },
  {
    icon: <Coins className="h-8 w-8" />,
    title: 'Investment Risks',
    risks: [
      'Potential loss of invested capital',
      'Illiquidity of real estate investments',
      'Delayed or reduced returns',
      'Property management and operational risks',
    ],
  },
  {
    icon: <TrendingDown className="h-8 w-8" />,
    title: 'Financial Risks',
    risks: [
      'Changes in property income',
      'Unexpected property expenses',
      'Tax law changes',
      'Insurance coverage gaps',
    ],
  },
];

const RiskDisclosurePage = () => {
  return (
    <>
      <Navbar transparent={true} />
      <HeroSection2
        title="Risk Disclosure"
        description="Understand the risks involved in real estate investments"
        imageUrl="/dubai/dubai-skyline.jpg"
      />
      <div className="container mx-auto px-4 py-12">
        {/* Important Notice */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">
                Important Notice About Risk
              </h2>
              <p className="text-yellow-800">
                Investing in real estate involves substantial risk and is not suitable for all investors.
                Please read this disclosure carefully before making any investment decisions. Past
                performance is not indicative of future results.
              </p>
            </div>
          </div>
        </div>

        {/* Risk Categories */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {riskCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.risks.map((risk, riskIndex) => (
                    <li key={riskIndex} className="flex items-start">
                      <span className="h-2 w-2 rounded-full bg-blue-600 mt-2 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Risk Information */}
        <div className="max-w-3xl mx-auto">
          {/* General Investment Risks */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              General Investment Risks
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Real estate investments are subject to various risks, including but not limited to
                market risks, financial risks, and operational risks. The value of your investment
                may fluctuate and you may lose some or all of your invested capital.
              </p>
              <p>
                While we strive to minimize risks through careful property selection and professional
                management, all investments carry inherent risks that investors should understand
                and consider carefully.
              </p>
            </div>
          </div>

          {/* Risk Mitigation */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How We Help Mitigate Risks
            </h2>
            <div className="bg-gray-50 rounded-xl p-8">
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Professional Due Diligence
                    </h3>
                    <p className="text-gray-600">
                      Thorough property and market analysis by experienced professionals
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 font-semibold">2</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Diversification Options
                    </h3>
                    <p className="text-gray-600">
                      Multiple property types and locations to spread investment risk
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 font-semibold">3</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Professional Management
                    </h3>
                    <p className="text-gray-600">
                      Experienced property management teams and ongoing monitoring
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Acknowledgment */}
          <div className="bg-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Risk Acknowledgment
            </h2>
            <p className="text-gray-600 mb-6">
              Before investing, you must acknowledge that you have read and understood the risks
              associated with real estate investment through our platform.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
              Download Full Risk Disclosure
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RiskDisclosurePage; 