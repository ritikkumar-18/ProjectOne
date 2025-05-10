// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Toaster, toast } from 'react-hot-toast';
// import { Search, ChevronDown, ChevronUp, Copy, Share2, Filter } from 'lucide-react';

// const Faq = () => {
//   const [expandedQuestions, setExpandedQuestions] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [filteredFAQs, setFilteredFAQs] = useState([]);

//   useEffect(() => {
      
//       window.scrollTo({
//           top:0,
//           behavior:'smooth'
//         });
        
//       }, []);
//   const faqs = [
//     {
//       category: 'General',
//       question: 'What is your platform about?',
//       answer:
//         'Our platform provides innovative solutions for seamless collaboration, productivity, and communication. It integrates tools for project management, real-time chat, and data analytics to empower teams.',
//     },
//     {
//       category: 'General',
//       question: 'How do I get started?',
//       answer:
//         'Sign up for a free account on our website, verify your email, and follow the onboarding guide. You can start exploring features immediately or upgrade to a premium plan for advanced tools.',
//     },
//     {
//       category: 'Billing',
//       question: 'What are the pricing plans?',
//       answer:
//         'We offer a free plan with basic features, a Pro plan at $10/month with advanced tools, and an Enterprise plan with custom pricing. All plans include a 14-day trial.',
//     },
//     {
//       category: 'Billing',
//       question: 'Can I cancel my subscription?',
//       answer:
//         'Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of the billing cycle, and no further charges will apply.',
//     },
//     {
//       category: 'Technical',
//       question: 'Is my data secure?',
//       answer:
//         'We use industry-standard encryption (AES-256) and comply with GDPR and CCPA regulations. Regular security audits and two-factor authentication ensure your data remains protected.',
//     },
//     {
//       category: 'Technical',
//       question: 'What browsers are supported?',
//       answer:
//         'Our platform supports the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, ensure your browser is up to date.',
//     },
//   ];

//   // Categories for filtering
//   const categories = ['All', ...new Set(faqs.map((faq) => faq.category))];

//   // Filter FAQs based on search term and category
//   useEffect(() => {
//     let results = faqs;
//     if (searchTerm) {
//       results = results.filter(
//         (faq) =>
//           faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (selectedCategory !== 'All') {
//       results = results.filter((faq) => faq.category === selectedCategory);
//     }
//     setFilteredFAQs(results);
//   }, [searchTerm, selectedCategory]);

//   // Toggle question expansion
//   const toggleQuestion = (question) => {
//     setExpandedQuestions((prev) => ({
//       ...prev,
//       [question]: !prev[question],
//     }));
//   };

//   // Copy Faq to clipboard
//   const copyToClipboard = useCallback((question, answer) => {
//     const text = `${question}\n${answer}`;
//     navigator.clipboard.writeText(text).then(
//       () => toast.success('Faq copied to clipboard!', { icon: '📋' }),
//       () => toast.error('Failed to copy Faq')
//     );
//   }, []);

//   // Share Faq
//   const shareFAQ = useCallback((question, platform) => {
//     const url = window.location.href;
//     const text = `Faq: ${question}`;
//     let shareUrl;
//     switch (platform) {
//       case 'twitter':
//         shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
//         break;
//       case 'linkedin':
//         shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
//         break;
//       case 'email':
//         shareUrl = `mailto:?subject=${encodeURIComponent('Faq')}&body=${encodeURIComponent(`${text}\n${url}`)}`;
//         window.location.href = shareUrl;
//         toast.success('Email draft opened!');
//         return;
//       default:
//         return;
//     }
//     window.open(shareUrl, '_blank');
//     toast.success(`Shared on ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`);
//   }, []);

//   // Animation variants for smooth 120fps-like performance
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         ease: [0.23, 1, 0.32, 1], // Custom cubic-bezier for smooth easing
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: [0.23, 1, 0.32, 1],
//       },
//     },
//   };

//   const buttonVariants = {
//     initial: { scale: 1 },
//     hover: { scale: 1.05, rotate: 2, transition: { duration: 0.2, ease: 'easeOut' } },
//     tap: { scale: 0.95, transition: { duration: 0.1 } },
//   };

//   const expandVariants = {
//     collapsed: { height: 0, opacity: 0 },
//     expanded: {
//       height: 'auto',
//       opacity: 1,
//       transition: {
//         height: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
//         opacity: { duration: 0.3, delay: 0.1 },
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <Toaster
//         toastOptions={{
//           duration: 3000,
//           style: {
//             background: '#ffffff',
//             color: '#1e293b',
//             border: '1px solid #e5e7eb',
//             borderRadius: '8px',
//             padding: '12px',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//           },
//         }}
//       />

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
//       >
//         {/* Header */}
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
//           <motion.h1
//             className="text-3xl sm:text-4xl font-bold text-center"
//             variants={itemVariants}
//           >
//             Frequently Asked Questions
//           </motion.h1>
//           <motion.p
//             className="text-sm text-center mt-2 opacity-80"
//             variants={itemVariants}
//           >
//             Find answers to common questions about our platform. Last Updated: May 7, 2025
//           </motion.p>
//         </div>

//         {/* Search and Filter */}
//         <div className="p-6 sm:p-10">
//           <motion.div
//             className="flex flex-col sm:flex-row gap-4 mb-8"
//             variants={itemVariants}
//           >
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search FAQs..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 aria-label="Search FAQs"
//               />
//             </div>
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
//                 aria-label="Filter by category"
//               >
//                 {categories.map((category) => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </motion.div>

//           {/* Faq List */}
//           <div className="space-y-4">
//             {filteredFAQs.length === 0 ? (
//               <motion.p
//                 className="text-center text-gray-500"
//                 variants={itemVariants}
//               >
//                 No FAQs found. Try adjusting your search or category.
//               </motion.p>
//             ) : (
//               filteredFAQs.map((faq, index) => (
//                 <motion.div
//                   key={faq.question}
//                   variants={itemVariants}
//                   initial="hidden"
//                   whileInView="visible"
//                   viewport={{ once: true, amount: 0.3 }}
//                   className="border border-gray-200 rounded-lg overflow-hidden"
//                 >
//                   <div
//                     className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
//                     onClick={() => toggleQuestion(faq.question)}
//                     role="button"
//                     tabIndex={0}
//                     onKeyDown={(e) => e.key === 'Enter' && toggleQuestion(faq.question)}
//                     aria-expanded={expandedQuestions[faq.question]}
//                     aria-controls={`faq-${index}`}
//                   >
//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
//                       <span className="text-xs text-gray-500">{faq.category}</span>
//                     </div>
//                     <motion.div
//                       animate={{ rotate: expandedQuestions[faq.question] ? 180 : 0 }}
//                       transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
//                     >
//                       {expandedQuestions[faq.question] ? (
//                         <ChevronUp className="h-5 w-5 text-indigo-600" />
//                       ) : (
//                         <ChevronDown className="h-5 w-5 text-indigo-600" />
//                       )}
//                     </motion.div>
//                   </div>
//                   <AnimatePresence>
//                     {expandedQuestions[faq.question] && (
//                       <motion.div
//                         id={`faq-${index}`}
//                         variants={expandVariants}
//                         initial="collapsed"
//                         animate="expanded"
//                         exit="collapsed"
//                         className="p-4 bg-white"
//                       >
//                         <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
//                         <div className="flex gap-4 mt-4">
//                           <motion.button
//                             variants={buttonVariants}
//                             whileHover="hover"
//                             whileTap="tap"
//                             onClick={() => copyToClipboard(faq.question, faq.answer)}
//                             className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                             aria-label={`Copy ${faq.question}`}
//                           >
//                             <Copy className="h-4 w-4" />
//                             Copy Faq
//                           </motion.button>
//                           <div className="relative group">
//                             <motion.button
//                               variants={buttonVariants}
//                               whileHover="hover"
//                               whileTap="tap"
//                               className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                               aria-label={`Share ${faq.question}`}
//                             >
//                               <Share2 className="h-4 w-4" />
//                               Share
//                             </motion.button>
//                             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 hidden group-hover:block z-10">
//                               <motion.button
//                                 whileHover={{ backgroundColor: '#f1f5f9' }}
//                                 onClick={() => shareFAQ(faq.question, 'twitter')}
//                                 className="w-full px-4 py-2 text-sm text-gray-700 text-left flex items-center gap-2"
//                               >
//                                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                                   <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
//                                 </svg>
//                                 Twitter
//                               </motion.button>
//                               <motion.button
//                                 whileHover={{ backgroundColor: '#f1f5f9' }}
//                                 onClick={() => shareFAQ(faq.question, 'linkedin')}
//                                 className="w-full px-4 py-2 text-sm text-gray-700 text-left flex items-center gap-2"
//                               >
//                                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                                   <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.047-3.052-1.854-3.052-1.859 0-2.145 1.452-2.145 2.953v5.703h-3v-11h2.882v1.504h.041c.401-.757 1.379-1.554 2.834-1.554 3.03 0 3.592 1.993 3.592 4.583v6.467z" />
//                                 </svg>
//                                 LinkedIn
//                               </motion.button>
//                               <motion.button
//                                 whileHover={{ backgroundColor: '#f1f5f9' }}
//                                 onClick={() => shareFAQ(faq.question, 'email')}
//                                 className="w-full px-4 py-2 text-sm text-gray-700 text-left flex items-center gap-2"
//                               >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                                   />
//                                 </svg>
//                                 Email
//                               </motion.button>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               ))
//             )}
//           </div>

//           {/* Contact Section */}
//           <motion.div
//             className="mt-10 text-center"
//             variants={itemVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             <p className="text-gray-600 mb-4">
//               Can’t find what you’re looking for?{' '}
//               <a
//                 href="/contact"
//                 className="text-indigo-600 hover:text-indigo-800 underline"
//                 aria-label="Contact support"
//               >
//                 Contact our support team
//               </a>.
//             </p>
//             <motion.button
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//               onClick={() => toast.success('Redirecting to support...', { icon: '📞' })}
//               className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               aria-label="Contact Support"
//             >
//               Get Support
//             </motion.button>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Faq;
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Search, ChevronDown, ChevronUp, Copy, Share2, Filter, Bookmark, Printer, MessageSquare, X } from 'lucide-react';

const Faq = () => {
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredFAQs, setFilteredFAQs] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bookmarkedFAQs, setBookmarkedFAQs] = useState([]);
  const [lastReadFAQ, setLastReadFAQ] = useState(null);
  const [showTOC, setShowTOC] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [reduceMotion, setReduceMotion] = useState(false);
  const containerRef = useRef(null);
  const faqRefs = useRef({});
  const navigate = useNavigate();

  const faqs = [
    {
      category: 'General',
      question: 'What is your platform about?',
      answer:
        'Our platform provides innovative solutions for seamless collaboration, productivity, and communication. It integrates tools for project management, real-time chat, and data analytics to empower teams.',
    },
    {
      category: 'General',
      question: 'How do I get started?',
      answer:
        'Sign up for a free account on our website, verify your email, and follow the onboarding guide. You can start exploring features immediately or upgrade to a premium plan for advanced tools.',
    },
    {
      category: 'Billing',
      question: 'What are the pricing plans?',
      answer:
        'We offer a free plan with basic features, a Pro plan at $10/month with advanced tools, and an Enterprise plan with custom pricing. All plans include a 14-day trial.',
    },
    {
      category: 'Billing',
      question: 'Can I cancel my subscription?',
      answer:
        'Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of the billing cycle, and no further charges will apply.',
    },
    {
      category: 'Technical',
      question: 'Is my data secure?',
      answer:
        'We use industry-standard encryption (AES-256) and comply with GDPR and CCPA regulations. Regular security audits and two-factor authentication ensure your data remains protected.',
    },
    {
      category: 'Technical',
      question: 'What browsers are supported?',
      answer:
        'Our platform supports the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, ensure your browser is up to date.',
    },
  ];

  // Categories for filtering
  const categories = ['All', ...new Set(faqs.map((faq) => faq.category))];

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Filter FAQs
  useEffect(() => {
    let results = faqs;
    if (searchTerm) {
      results = results.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      results = results.filter((faq) => faq.category === selectedCategory);
    }
    setFilteredFAQs(results);
  }, [searchTerm, selectedCategory]);

  // Scroll to top on mount
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

  // Track scroll progress and last read FAQ
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top, height } = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.min(
          100,
          Math.max(0, ((windowHeight - top) / (height + windowHeight)) * 100)
        );
        setScrollProgress(progress);

        // Find last read FAQ
        let lastVisible = null;
        Object.keys(faqRefs.current).forEach((question) => {
          const el = faqRefs.current[question];
          const { top: faqTop } = el.getBoundingClientRect();
          if (faqTop < windowHeight / 2) {
            lastVisible = question;
          }
        });
        if (lastVisible) {
          setLastReadFAQ(lastVisible);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle question expansion
  const toggleQuestion = useCallback((question) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [question]: !prev[question],
    }));
  }, []);

  // Navigate to FAQ
  const navigateToFAQ = useCallback((question) => {
    const element = faqRefs.current[question];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setExpandedQuestions((prev) => ({ ...prev, [question]: true }));
      setShowTOC(false);
    }
  }, []);

  // Copy FAQ to clipboard
  const copyToClipboard = useCallback((question, answer) => {
    const text = `${question}\n${answer}`;
    navigator.clipboard.writeText(text).then(
      () => toast.success('FAQ copied to clipboard!', { icon: '📋' }),
      () => toast.error('Failed to copy FAQ')
    );
  }, []);

  // Share FAQ
  const shareFAQ = useCallback((question, platform) => {
    const url = window.location.href;
    const text = `FAQ: ${question}`;
    let shareUrl;
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(
          'FAQ'
        )}&body=${encodeURIComponent(`${text}\n${url}`)}`;
        window.location.href = shareUrl;
        toast.success('Email draft opened!', { icon: '📧' });
        return;
      default:
        return;
    }
    window.open(shareUrl, '_blank');
    toast.success(`Shared on ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`, {
      icon: '🌐',
    });
  }, []);

  // Print preview (simulated)
  const printPreview = useCallback(() => {
    toast.success('Opening print preview...', { icon: '🖨️' });
    setTimeout(() => {
      toast.success('Print preview ready!');
    }, 1000);
  }, []);

  // Bookmark FAQ
  const toggleBookmark = useCallback((question) => {
    setBookmarkedFAQs((prev) => {
      if (prev.includes(question)) {
        toast.success('FAQ removed from bookmarks', { icon: '🔖' });
        return prev.filter((q) => q !== question);
      } else {
        toast.success('FAQ bookmarked!', { icon: '🔖' });
        return [...prev, question];
      }
    });
  }, []);

  // Submit feedback (simulated)
  const submitFeedback = useCallback(() => {
    if (!feedback.trim()) {
      toast.error('Feedback cannot be empty');
      return;
    }
    toast.success('Feedback submitted! Thank you!', { icon: '📝' });
    setFeedback('');
  }, [feedback]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.6,
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: reduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.5,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: reduceMotion ? 1 : 1.05,
      rotate: reduceMotion ? 0 : 2,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    tap: { scale: reduceMotion ? 1 : 0.95, transition: { duration: 0.1 } },
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0, scale: 0.95 },
    expanded: {
      height: 'auto',
      opacity: 1,
      scale: 1,
      transition: {
        height: { duration: reduceMotion ? 0 : 0.4, ease: [0.23, 1, 0.32, 1] },
        opacity: { duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : 0.1 },
        scale: { duration: reduceMotion ? 0 : 0.3 },
      },
    },
  };

  const progressVariants = {
    initial: { width: 0 },
    animate: {
      width: `${scrollProgress}%`,
      transition: { duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' },
    },
  };

  const tocVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.5,
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  const tocItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reduceMotion ? 0 : 0.3, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 text-gray-900">
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            background: '#ffffff',
            color: '#1e293b',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Table of Contents */}
        <motion.div
          className="lg:w-1/4"
          variants={tocVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="lg:sticky lg:top-12 bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4 lg:mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Table of Contents</h2>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setShowTOC(!showTOC)}
                className="lg:hidden text-indigo-600"
                aria-label={showTOC ? 'Hide Table of Contents' : 'Show Table of Contents'}
              >
                {showTOC ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </motion.button>
            </div>
            <AnimatePresence>
              {(showTOC || window.innerWidth >= 1024) && (
                <motion.ul
                  className="space-y-2"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3 }}
                >
                  {faqs.map((faq) => (
                    <motion.li
                      key={faq.question}
                      variants={tocItemVariants}
                      className="text-sm"
                    >
                      <button
                        onClick={() => navigateToFAQ(faq.question)}
                        className={`w-full text-left py-1 px-2 rounded hover:bg-indigo-50 transition-colors ${
                          lastReadFAQ === faq.question ? 'text-indigo-600 font-medium' : 'text-gray-600'
                        }`}
                        aria-label={`Navigate to ${faq.question}`}
                      >
                        {faq.question}
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Bookmarked FAQs */}
          {bookmarkedFAQs.length > 0 && (
            <div className="mt-4 bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Bookmarked FAQs</h3>
              <ul className="space-y-2">
                {bookmarkedFAQs.map((question) => (
                  <li key={question} className="flex justify-between items-center text-sm">
                    <button
                      onClick={() => navigateToFAQ(question)}
                      className="text-indigo-600 hover:text-indigo-800"
                      aria-label={`Navigate to bookmarked ${question}`}
                    >
                      {question}
                    </button>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => toggleBookmark(question)}
                      className="text-gray-500 hover:text-red-600"
                      aria-label={`Remove bookmark for ${question}`}
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:w-3/4 max-w-4xl rounded-2xl shadow-xl overflow-hidden bg-white"
          ref={containerRef}
        >
          {/* Progress Bar */}
          <motion.div
            className="h-1 bg-gray-200"
            variants={progressVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div className="h-full bg-indigo-600" />
          </motion.div>

          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 relative">
            <motion.h1
              className="text-3xl sm:text-4xl font-bold text-center"
              variants={itemVariants}
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              className="text-sm text-center mt-2 opacity-80"
              variants={itemVariants}
            >
              Find answers to common questions about our platform. Last Updated: May 7, 2025
            </motion.p>
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={printPreview}
                className="p-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100"
                aria-label="Print Preview"
              >
                <Printer className="h-5 w-5" />
              </motion.button>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setReduceMotion(!reduceMotion)}
                className="p-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100"
                aria-label={reduceMotion ? 'Enable Animations' : 'Reduce Animations'}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="p-6 sm:p-10">
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              variants={itemVariants}
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <motion.input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search FAQs..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white border-gray-300 text-gray-900"
                  aria-label="Search FAQs"
                  whileFocus={{ scale: reduceMotion ? 1 : 1.02, transition: { duration: 0.2 } }}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <motion.select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white border-gray-300 text-gray-900"
                  aria-label="Filter by category"
                  whileFocus={{ scale: reduceMotion ? 1 : 1.02, transition: { duration: 0.2 } }}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </motion.select>
              </div>
            </motion.div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQs.length === 0 ? (
                <motion.p
                  className="text-center text-gray-500"
                  variants={itemVariants}
                >
                  No FAQs found. Try adjusting your search or category.
                </motion.p>
              ) : (
                filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.question}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="border rounded-lg overflow-hidden border-gray-200"
                    ref={(el) => (faqRefs.current[faq.question] = el)}
                  >
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-opacity-80 transition-colors bg-gray-50"
                      onClick={() => toggleQuestion(faq.question)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && toggleQuestion(faq.question)}
                      aria-expanded={expandedQuestions[faq.question]}
                      aria-controls={`faq-${index}`}
                    >
                      <div className="flex-1">
                        <motion.h3
                          className="text-lg font-semibold text-gray-800"
                          whileHover={{ x: reduceMotion ? 0 : 5, transition: { duration: 0.2 } }}
                        >
                          {faq.question}
                        </motion.h3>
                        <span className="text-xs text-gray-500">{faq.category}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedQuestions[faq.question] ? 180 : 0, scale: reduceMotion ? 1 : 1.1 }}
                        transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.23, 1, 0.32, 1] }}
                      >
                        {expandedQuestions[faq.question] ? (
                          <ChevronUp className="h-5 w-5 text-indigo-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-indigo-600" />
                        )}
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {expandedQuestions[faq.question] && (
                        <motion.div
                          id={`faq-${index}`}
                          variants={expandVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          className="p-4 bg-white"
                        >
                          <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                          <div className="flex gap-4 mt-4">
                            <motion.button
                              variants={buttonVariants}
                              whileHover="hover"
                              whileTap="tap"
                              onClick={() => copyToClipboard(faq.question, faq.answer)}
                              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              aria-label={`Copy ${faq.question}`}
                            >
                              <Copy className="h-4 w-4" />
                              Copy FAQ
                            </motion.button>
                            <motion.button
                              variants={buttonVariants}
                              whileHover="hover"
                              whileTap="tap"
                              onClick={() => toggleBookmark(faq.question)}
                              className={`flex items-center gap-2 text-sm ${
                                bookmarkedFAQs.includes(faq.question)
                                  ? 'text-yellow-600 hover:text-yellow-700'
                                  : 'text-indigo-600 hover:text-indigo-800'
                              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                              aria-label={`${
                                bookmarkedFAQs.includes(faq.question) ? 'Remove' : 'Add'
                              } bookmark for ${faq.question}`}
                            >
                              <Bookmark className="h-4 w-4" />
                              {bookmarkedFAQs.includes(faq.question) ? 'Unbookmark' : 'Bookmark'}
                            </motion.button>
                            <div className="relative group">
                              <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                aria-label={`Share ${faq.question}`}
                              >
                                <Share2 className="h-4 w-4" />
                                Share
                              </motion.button>
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 hidden group-hover:block z-10">
                                <motion.button
                                  whileHover={{ backgroundColor: '#f1f5f9' }}
                                  onClick={() => shareFAQ(faq.question, 'twitter')}
                                  className="w-full px-4 py-2 text-sm text-gray-700 text-left flex items-center gap-2"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                                  </svg>
                                  Twitter
                                </motion.button>
                                <motion.button
                                  whileHover={{ backgroundColor: '#f1f5f9' }}
                                  onClick={() => shareFAQ(faq.question, 'linkedin')}
                                  className="w-full px-4 py-2 text-sm text-gray-700 text-left flex items-center gap-2"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.047-3.052-1.854-3.052-1.859 0-2.145 1.452-2.145 2.953v5.703h-3v-11h2.882v1.504h.041c.401-.757 1.379-1.554 2.834-1.554 3.03 0 3.592 1.993 3.592 4.583v6.467z" />
                                  </svg>
                                  LinkedIn
                                </motion.button>
                                <motion.button
                                  whileHover={{ backgroundColor: '#f1f5f9' }}
                                  onClick={() => shareFAQ(faq.question, 'email')}
                                  className="w-full px-4 py-2 text-sm text-gray-700 text-left flex items-center gap-2"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                  </svg>
                                  Email
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              )}
            </div>

            {/* Feedback Form */}
            <motion.div
              className="mt-10"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Feedback</h3>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts on our FAQs..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                aria-label="Feedback input"
              />
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={submitFeedback}
                className="mt-2 px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
                aria-label="Submit feedback"
              >
                Submit Feedback
              </motion.button>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              className="mt-10 text-center"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="mb-4 text-gray-600">
                Can’t find what you’re looking for?{' '}
                <button
                  onClick={() => navigate('/contact')}
                  className="text-indigo-600 hover:text-indigo-800 underline"
                  aria-label="Contact support"
                >
                  Contact our support team
                </button>.
              </p>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => {
                  toast.success('Redirecting to support...', { icon: '📞' });
                  navigate('/contact');
                }}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Contact Support"
              >
                Get Support
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Faq;