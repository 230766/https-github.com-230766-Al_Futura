import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import Navbar from '../../components/Navbar';
import HeroSection2 from '../../components/HeroSection2';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('General');
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const categories = [
    'General',
    'Investment',
    'Account',
    'Legal',
    'Security'
  ];

  const faqs = {
    General: [
      {
        id: 1,
        question: 'What is Al Futura?',
        answer: 'Al Futura is a modern real estate investment platform that allows investors to purchase shares in high-quality commercial and residential properties. We use advanced technology to make real estate investing accessible, transparent, and efficient.'
      },
      {
        id: 2,
        question: 'How does Al Futura work?',
        answer: 'Al Futura works by tokenizing real estate properties into shares that investors can purchase. We handle all the property management, while investors receive their proportional share of rental income and property appreciation.'
      }
    ],
    Investment: [
      {
        id: 3,
        question: 'What is the minimum investment amount?',
        answer: 'The minimum investment varies by property but typically starts at $1,000. This low minimum allows investors to diversify their portfolio across multiple properties.'
      },
      {
        id: 4,
        question: 'How do I earn returns?',
        answer: 'Returns come from two sources: regular rental income distributions and potential property value appreciation when the property is sold.'
      }
    ],
    Account: [
      {
        id: 5,
        question: 'How do I create an account?',
        answer: 'Creating an account is simple. Click the "Sign Up" button, provide your email and basic information, verify your identity, and you can start investing.'
      },
      {
        id: 6,
        question: 'How do I verify my account?',
        answer: 'Account verification requires government-issued ID and proof of address. This process typically takes 1-2 business days.'
      }
    ],
    Legal: [
      {
        id: 7,
        question: 'Is Al Futura regulated?',
        answer: 'Yes, Al Futura operates in compliance with all applicable securities regulations and is registered with relevant regulatory authorities.'
      },
      {
        id: 8,
        question: 'What happens to my investment if Al Futura closes?',
        answer: 'Your investments are held in separate legal entities and are not affected by Al Futura\'s operational status. Your ownership rights are protected by law.',
      },
    ],
    Security: [
      {
        id: 9,
        question: 'How secure is my investment?',
        answer: 'We implement bank-level security measures, including 256-bit encryption and two-factor authentication. All investments are legally structured and documented.'
      },
      {
        id: 10,
        question: 'How do you protect my personal information?',
        answer: 'We use industry-standard encryption and security protocols to protect your personal and financial information. We never share your data with unauthorized parties.'
      }
    ]
  };

  const toggleQuestion = (id: number) => {
    setOpenQuestions(prev =>
      prev.includes(id)
        ? prev.filter(q => q !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <Navbar transparent={true} />
      <HeroSection2
        title="Frequently Asked Questions"
        description="Find answers to common questions about Al Futura"
        imageUrl="/dubai/dubai-palm-jumeirah.jpg"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="mt-8">
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 whitespace-nowrap
                  ${activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-600'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs[activeCategory as keyof typeof faqs].map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200
                      ${openQuestions.includes(faq.id) ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openQuestions.includes(faq.id) && (
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you with any questions you may have.
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </>
  );
};

export default FAQPage; 