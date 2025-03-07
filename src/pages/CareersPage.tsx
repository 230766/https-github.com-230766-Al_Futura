import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Clock, Briefcase, Check } from 'lucide-react';
import { Button } from '../components/ui/button';

const CareersPage = () => {
  const jobOpenings = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Dubai, UAE",
      type: "Full-time",
      description: "We're looking for an experienced Full Stack Developer to help build and scale our real estate investment platform.",
      requirements: [
        "5+ years of experience with React and Node.js",
        "Experience with TypeScript and modern web technologies",
        "Knowledge of cloud services (AWS/GCP)",
        "Understanding of financial technology"
      ]
    },
    {
      title: "Investment Analyst",
      department: "Investment",
      location: "Dubai, UAE",
      type: "Full-time",
      description: "Join our investment team to analyze real estate opportunities and help create compelling investment offerings.",
      requirements: [
        "3+ years of real estate investment analysis experience",
        "Strong financial modeling skills",
        "Knowledge of UAE real estate market",
        "CFA or relevant qualification"
      ]
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Dubai, UAE",
      type: "Full-time",
      description: "Lead our marketing efforts to expand our investor base and establish Al Futura as the premier real estate investment platform.",
      requirements: [
        "5+ years of digital marketing experience",
        "Experience in fintech or real estate",
        "Strong analytical and creative skills",
        "Knowledge of MENA market"
      ]
    }
  ];

  const benefits = [
    "Competitive salary and equity package",
    "Health insurance for you and your family",
    "Annual learning and development budget",
    "Flexible working hours",
    "Remote work options",
    "Regular team events and activities",
    "Modern office in Dubai's business district",
    "Career growth opportunities"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600">
            Help us revolutionize real estate investment in the UAE. We're looking for passionate individuals to join our growing team.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Why Work at Al Futura?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 mt-1" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Job Openings */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Open Positions
        </h2>
        <div className="space-y-6">
          {jobOpenings.map((job, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Apply Now
                </Button>
              </div>

              <p className="text-gray-600 mb-4">{job.description}</p>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* No Positions Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Don't see a position that matches your skills?
          </h3>
          <p className="text-gray-600 mb-6">
            We're always interested in meeting talented people. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Send Your Resume
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage; 