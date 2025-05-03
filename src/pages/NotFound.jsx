import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">404 - Page Not Found</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
