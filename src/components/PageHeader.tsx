import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`py-12 bg-gradient-to-r from-blue-50 to-indigo-50 ${className}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        {description && (
          <p className="text-xl text-gray-600 max-w-3xl">{description}</p>
        )}
      </div>
    </div>
  );
}; 