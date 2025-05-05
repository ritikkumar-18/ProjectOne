import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBook, FaCode, FaTools, FaRocket } from "react-icons/fa";

// Resource data aligned with a tech-focused educational platform
const resources = [
  {
    id: 1,
    title: "React Mastery Guide",
    description: "A comprehensive guide to mastering React, covering hooks, state management, and more.",
    icon: <FaBook className="w-8 h-8 text-blue-500" />,
    category: "Guide",
    path: "/resources/react-guide",
    color: "bg-blue-100 dark:bg-blue-900",
  },
  {
    id: 2,
    title: "Tailwind CSS Tutorial",
    description: "Learn Tailwind CSS with hands-on examples and build responsive designs effortlessly.",
    icon: <FaCode className="w-8 h-8 text-green-500" />,
    category: "Tutorial",
    path: "/resources/tailwind-tutorial",
    color: "bg-green-100 dark:bg-green-900",
  },
  {
    id: 3,
    title: "Developer Tools",
    description: "Explore essential tools for developers, including Vercel, Git, and more.",
    icon: <FaTools className="w-8 h-8 text-purple-500" />,
    category: "Tools",
    path: "/resources/developer-tools",
    color: "bg-purple-100 dark:bg-purple-900",
  },
  {
    id: 4,
    title: "Launch Your Project",
    description: "Step-by-step guide to launching your tech project with Vercel and modern frameworks.",
    icon: <FaRocket className="w-8 h-8 text-red-500" />,
    category: "Guide",
    path: "/resources/launch-project",
    color: "bg-red-100 dark:bg-red-900",
  },
];

const Cards = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Explore Our Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: resource.id * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className={`relative rounded-lg shadow-lg overflow-hidden ${resource.color} transform transition-all duration-300 hover:shadow-xl hover:cursor-pointer`}
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="mb-4">{resource.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {resource.description}
                </p>
                <span className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-3 py-1 rounded-full mb-4">
                  {resource.category}
                </span>
                <Link
                  to={resource.path}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Learn More
                </Link>
              </div>
              {/* Decorative Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;