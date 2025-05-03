import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsDropdownOpen(false);
    setIsSearchOpen(false);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query.trim()) {
      alert(`Searching for: ${query}`); // Replace with actual search logic
      e.target.reset();
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name:'Subscriptions', path:'/subscriptions'},
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const dropdownItems = [
    { name: "Software", path: "/products/software" },
    { name: "Hardware", path: "/products/hardware" },
    { name: "Cloud Solutions", path: "/products/cloud" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Techiee
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path ? "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                Products
                <svg
                  className={`ml-2 h-4 w-4 transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 ${
                        location.pathname === item.path ? "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400" : ""
                      }`}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-md"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        
      </div>
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path ? "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400" : ""
                }`}
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            <div>
              <button
                onClick={toggleDropdown}
                className="w-full text-left text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                Products
                <svg
                  className={`ml-2 h-4 w-4 transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="pl-4 space-y-1">
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base ${
                        location.pathname === item.path ? "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400" : ""
                      }`}
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
