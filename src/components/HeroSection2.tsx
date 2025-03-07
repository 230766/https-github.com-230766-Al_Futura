import React from 'react';

interface HeroSection2Props {
  title: string;
  description: string;
  imageUrl: string;
}

const HeroSection2 = ({ title, description, imageUrl }: HeroSection2Props) => {
  return (
    <div className="relative h-[40vh] min-h-[400px] w-full">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-xl text-white/90 max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HeroSection2; 