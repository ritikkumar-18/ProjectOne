import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// FAQ data
const faqs = [
  {
    question: 'How can I get support for Techiee products?',
    answer: 'You can reach our support team via email at support@techiee.com or by calling +1-800-555-1234. We’re available 24/7 to assist you.',
  },
  {
    question: 'What are your business hours?',
    answer: 'Our offices are open Monday to Friday, 9 AM to 6 PM (EST). However, our support team is available round-the-clock.',
  },
  {
    question: 'Can I schedule a demo of your solutions?',
    answer: 'Absolutely! Fill out the contact form above, and select "Demo Request" in the inquiry type dropdown to schedule a personalized demo.',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'general',
    message: '',
  });
  const [formStatus, setFormStatus] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
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

  const handleSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setTimeout(() => setFormStatus(null), 3000);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormStatus('error');
      setTimeout(() => setFormStatus(null), 3000);
      return;
    }

    // Simulate form submission
    setFormStatus('success');
    setFormData({ name: '', email: '', inquiryType: 'general', message: '' });
    setTimeout(() => setFormStatus(null), 3000);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29udGFjdHxlbnwwfHwwfHx8MA%3D%3D')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-blue-800/80"></div>
        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        >
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Contact Techiee
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
          >
            We’re here to help. Reach out for support, inquiries, or to explore our solutions.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Contact Form & Details Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Get in Touch</h2>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white/70 dark:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white/70 dark:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white/70 dark:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Support</option>
                    <option value="demo">Demo Request</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white/70 dark:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="w-full py-3 bg-coral-500 text-black rounded-lg font-semibold hover:bg-coral-600 dark:hover:bg-coral-400 transition-all duration-300 shadow-md"
                >
                  Send Message
                </motion.button>
                <AnimatePresence>
                  {formStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-center text-teal-600 dark:text-teal-400"
                    >
                      Message sent successfully!
                    </motion.div>
                  )}
                  {formStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-center text-red-500 dark:text-red-400"
                    >
                      Please fill out all fields correctly.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Company Details & Map */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Our Details</h2>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Address</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  123 Techiee Way, Innovation Hub<br />
                  Noida Sector 62, India<br />
                  Zip Code: 201301
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Contact</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Email: <a href="mailto:support@techiee.com" className="text-teal-600 dark:text-teal-400 hover:underline">support@techiee.com</a><br />
                  Phone: <a href="tel:+911234567890" className="text-teal-600 dark:text-teal-400 hover:underline">+91 1234567890</a>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://twitter.com" className="text-teal-600 dark:text-teal-400 hover:text-coral-500 dark:hover:text-coral-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com" className="text-teal-600 dark:text-teal-400 hover:text-coral-500 dark:hover:text-coral-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="https://facebook.com" className="text-teal-600 dark:text-teal-400 hover:text-coral-500 dark:hover:text-coral-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <img
                src="https://images.unsplash.com/photo-1576153192396-180ecef2a715?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Techiee Office Map"
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center"
              >
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-teal-600 dark:text-teal-400 transform transition-transform duration-300 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-gray-600 dark:text-gray-400"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gradient-to-r from-teal-600 to-blue-800 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-white/90 max-w-2xl mx-auto mb-8"
          >
            Explore our innovative solutions and see how Techiee can drive your success.
          </motion.p>
          <motion.div variants={itemVariants}>
            <a
              href="/products"
              className="inline-block px-8 py-3 bg-coral-500 text-white rounded-lg font-semibold hover:bg-coral-600 dark:hover:bg-coral-400 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              View Our Solutions
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;