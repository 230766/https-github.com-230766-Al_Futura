import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import Navbar from '../../components/Navbar';
import HeroSection2 from '../../components/HeroSection2';

const CareersPage = () => {
  const openings = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'New York, NY / Remote',
      type: 'Full-time'
    },
    {
      title: 'Real Estate Investment Analyst',
      department: 'Investments',
      location: 'New York, NY',
      type: 'Full-time'
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'New York, NY / Remote',
      type: 'Full-time'
    },
    {
      title: 'Customer Success Manager',
      department: 'Operations',
      location: 'New York, NY',
      type: 'Full-time'
    }
  ];

  return (
    <>
      <Navbar transparent={true} />
      <HeroSection2
        title="Careers at Al Futura"
        description="Join us in revolutionizing real estate investment"
        imageUrl="/dubai/dubai-downtown.jpg"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Open Positions</h2>
          
          <div className="space-y-4">
            {openings.map((job) => (
              <div 
                key={job.title} 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <div className="mt-2 space-x-4">
                      <span className="text-gray-600">{job.department}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{job.location}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{job.type}</span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Don't see the right position?</h3>
            <p className="text-gray-600 mb-6">
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button className="px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200">
              Send Resume
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareersPage; 