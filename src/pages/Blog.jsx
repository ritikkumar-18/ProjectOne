import React, { useEffect } from 'react';

const Blog = () => {
  useEffect(() => {
      // Ensure the scroll happens after the component mounts
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
      const timer = setTimeout(scrollToTop, 0);
      return () => clearTimeout(timer);
    }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Blog</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Stay updated with the latest tech trends and insights.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p className="text-gray-600 dark:text-gray-400">
          This is a placeholder for the Blog page. Add your blog posts here.
        </p>
      </div>
    </div>
  );
};

export default Blog;
