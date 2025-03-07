import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import Navbar from '../../components/Navbar';
import HeroSection2 from '../../components/HeroSection2';

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: '/team/john-smith.jpg',
      bio: 'Over 15 years of experience in real estate investment and development.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Chief Investment Officer',
      image: '/team/sarah-johnson.jpg',
      bio: 'Former VP at Goldman Sachs with expertise in real estate portfolio management.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Technology',
      image: '/team/michael-chen.jpg',
      bio: 'Tech veteran with experience at leading fintech companies.'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Head of Operations',
      image: '/team/lisa-rodriguez.jpg',
      bio: 'Specialized in scaling real estate operations and investor relations.'
    }
  ];

  return (
    <>
      <Navbar transparent={true} />
      <HeroSection2
        title="Our Team"
        description="Meet the experts behind Al Futura's success"
        imageUrl="/dubai/dubai-skyline-panorama.jpg"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x400?text=Photo';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 mt-1">{member.role}</p>
                <p className="text-gray-600 mt-4">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TeamPage; 