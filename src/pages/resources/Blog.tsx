import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import Navbar from '../../components/Navbar';
import HeroSection2 from '../../components/HeroSection2';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Real Estate Investment: AI and Machine Learning',
      excerpt: 'How artificial intelligence is transforming property valuation and investment decisions.',
      author: 'John Smith',
      date: 'March 20, 2024',
      category: 'Technology',
      readTime: '5 min read',
      image: '/blog/ai-real-estate.jpg'
    },
    {
      id: 2,
      title: 'Understanding Real Estate Tokenization',
      excerpt: 'A comprehensive guide to how blockchain technology is revolutionizing property ownership.',
      author: 'Sarah Johnson',
      date: 'March 15, 2024',
      category: 'Investment',
      readTime: '7 min read',
      image: '/blog/tokenization.jpg'
    },
    {
      id: 3,
      title: 'Top 5 Commercial Real Estate Trends in 2024',
      excerpt: 'Key trends shaping the commercial real estate market this year.',
      author: 'Michael Chen',
      date: 'March 10, 2024',
      category: 'Market Analysis',
      readTime: '4 min read',
      image: '/blog/trends-2024.jpg'
    }
  ];

  const categories = [
    'All',
    'Investment',
    'Market Analysis',
    'Technology',
    'Property Management',
    'Legal'
  ];

  return (
    <>
      <Navbar transparent={true} />
      <HeroSection2
        title="Blog"
        description="Insights and analysis from our real estate experts"
        imageUrl="/dubai/dubai-palm-jumeirah-aerial.jpg"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="mt-8">
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 whitespace-nowrap
                           border border-gray-200 rounded-full hover:border-blue-600 transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/800x450?text=Blog+Image';
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  <a href={`/blog/${post.id}`} className="hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </a>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    By {post.author} • {post.date}
                  </div>
                  <a
                    href={`/blog/${post.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
            Load More Posts
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogPage; 