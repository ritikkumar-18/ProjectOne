import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaGithub, FaDiscord, FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Subscriptions', path: '/subscriptions' },
  ];

  // Resource links
  const resourceLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Support', path: '/support' },
  ];

  // Social media links
  const socialLinks = [
    { name: 'Twitter', icon: <FaTwitter />, url: '#' },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: '#' },
    { name: 'GitHub', icon: <FaGithub />, url: '#' },
    { name: 'Discord', icon: <FaDiscord />, url: '#' },
  ];

  // Contact info
  const contactInfo = {
    email: 'support@techiee.com',
    phone: '+91 123 456 7890',
    address: ' Noida Sector 62, India',
  };

  // Handle newsletter signup
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    // Mock API call
    setTimeout(() => {
      setFormStatus({ type: 'success', message: 'Thank you for subscribing!' });
      setEmail('');
    }, 1000);
  };

  // Toggle collapsible sections on mobile
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Show/hide back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
            <svg
                className="w-10 h-10 text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 2V22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 7L12 12L22 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-2xl font-bold text-blue-400">Techiee</span>
            </Link>
            <p className="text-sm text-gray-400">
              Empowering the future with innovative technology solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-transform duration-200 hover:scale-110"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <button
              className="lg:hidden w-full flex justify-between items-center text-lg font-semibold text-gray-100 mb-2"
              onClick={() => toggleSection('nav')}
              aria-expanded={openSection === 'nav'}
              aria-controls="nav-links"
            >
              Navigation
              {openSection === 'nav' ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            <div
              id="nav-links"
              className={`space-y-2 ${openSection === 'nav' || window.innerWidth >= 1024 ? 'block' : 'hidden'}`}
            >
              <h3 className="text-lg font-semibold text-gray-100 hidden lg:block">Navigation</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resources */}
          <div>
            <button
              className="lg:hidden w-full flex justify-between items-center text-lg font-semibold text-gray-100 mb-2"
              onClick={() => toggleSection('resources')}
              aria-expanded={openSection === 'resources'}
              aria-controls="resource-links"
            >
              Resources
              {openSection === 'resources' ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            <div
              id="resource-links"
              className={`space-y-2 ${openSection === 'resources' || window.innerWidth >= 1024 ? 'block' : 'hidden'}`}
            >
              <h3 className="text-lg font-semibold text-gray-100 hidden lg:block">Resources</h3>
              <ul className="space-y-2">
                {resourceLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact and Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-100">Stay Connected</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center">
                <FaEnvelope className="mr-2" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-blue-400">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-2" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-blue-400">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <address className="not-italic">{contactInfo.address}</address>
              </div>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address for newsletter
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormStatus(null);
                }}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Subscribe
              </button>
              {formStatus && (
                <p
                  className={`text-sm ${
                    formStatus.type === 'success' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {formStatus.message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Techiee. All rights reserved.</p>
        </div>
      </div>

      {/* Back-to-Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-200 hover:scale-110"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
