import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Linkedin, Mail } from 'lucide-react';

const TeamPage = () => {
  const teamMembers = [
    {
      name: "Mohammed Al Rashid",
      role: "Chief Executive Officer",
      bio: "Former investment banker with 15 years of experience in real estate and fintech. Led multiple successful property technology ventures in the UAE.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
    },
    {
      name: "Sarah Thompson",
      role: "Chief Technology Officer",
      bio: "Tech veteran with experience at leading Silicon Valley companies. Specializes in blockchain and financial technology solutions.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
    },
    {
      name: "Ahmed Hassan",
      role: "Chief Investment Officer",
      bio: "20+ years of experience in UAE real estate and investment management. Previously managed a $2B real estate portfolio.",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
    },
    {
      name: "Lisa Chen",
      role: "Head of Operations",
      bio: "Expert in scaling operations for high-growth companies. Led operations at multiple successful startups in Singapore and Dubai.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
    },
    {
      name: "James Wilson",
      role: "Chief Legal Officer",
      bio: "International property law expert with extensive experience in UAE real estate regulations and compliance.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
    },
    {
      name: "Fatima Al Mansoori",
      role: "Head of Marketing",
      bio: "Digital marketing strategist with expertise in MENA markets. Previously led marketing at major UAE property developers.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h1>
          <p className="text-xl text-gray-600">
            Meet the experienced professionals leading Al Futura's mission to revolutionize real estate investment in the UAE.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex items-center gap-4">
                  <button className="text-gray-600 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-blue-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Join Our Team
          </h2>
          <p className="text-gray-600 mb-6">
            We're always looking for talented individuals who are passionate about real estate, technology, and innovation.
          </p>
          <a
            href="/careers"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View Open Positions
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage; 