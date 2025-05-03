// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaCheck, FaChevronDown, FaChevronUp, FaQuoteLeft, FaLock, FaSearch } from 'react-icons/fa';
// import { Helmet } from 'react-helmet';
// import { Link } from 'react-router-dom';

// const Subscriptions = () => {
//   const [isYearly, setIsYearly] = useState(localStorage.getItem('billingCycle') === 'yearly');
//   const [currency, setCurrency] = useState('USD');
//   const [openFaq, setOpenFaq] = useState(null);
//   const [faqSearch, setFaqSearch] = useState('');
//   const [currentPlan, setCurrentPlan] = useState(localStorage.getItem('currentPlan') || null);
//   const [showComparison, setShowComparison] = useState(false);
//   const [testimonialIndex, setTestimonialIndex] = useState(0);

//   // Exchange rates (mock, replace with API in production)
//   const exchangeRates = { USD: 1, EUR: 0.92, GBP: 0.79 };

//   // Subscription plans data
//   const plans = [
//     {
//       name: 'Starter',
//       monthlyPrice: { USD: 0, EUR: 0, GBP: 0 },
//       yearlyPrice: { USD: 0, EUR: 0, GBP: 0 },
//       description: 'For individuals and small projects.',
//       features: [
//         '5GB Storage',
//         'Community Support',
//         '100 API Calls/Day',
//         'Basic Analytics',
//       ],
//       cta: 'Get Started',
//       ctaLink: '/signup',
//       badge: null,
//       featureMetrics: { storage: 5, api: 100 },
//     },
//     {
//       name: 'Pro',
//       monthlyPrice: { USD: 15, EUR: 14, GBP: 12 },
//       yearlyPrice: { USD: 144, EUR: 132, GBP: 114 }, // ~20% discount
//       description: 'For growing businesses.',
//       features: [
//         '50GB Storage',
//         'Priority Email Support',
//         '10,000 API Calls/Day',
//         'Advanced Analytics',
//         'Team Collaboration',
//       ],
//       cta: 'Get Started',
//       ctaLink: '/signup',
//       badge: 'Best Value',
//       featureMetrics: { storage: 50, api: 10000 },
//     },
//     {
//       name: 'Team',
//       monthlyPrice: { USD: 49, EUR: 45, GBP: 39 },
//       yearlyPrice: { USD: 470, EUR: 432, GBP: 372 },
//       description: 'For mid-sized teams.',
//       features: [
//         '200GB Storage',
//         '24/7 Email & Chat Support',
//         '50,000 API Calls/Day',
//         'Custom Analytics',
//         'SSO Integration',
//       ],
//       cta: 'Get Started',
//       ctaLink: '/signup',
//       badge: 'Best for Teams',
//       featureMetrics: { storage: 200, api: 50000 },
//     },
//     {
//       name: 'Enterprise',
//       monthlyPrice: null,
//       yearlyPrice: null,
//       description: 'For large organizations.',
//       features: [
//         'Unlimited Storage',
//         '24/7 Dedicated Support',
//         'Unlimited API Calls',
//         'Advanced Security',
//         'Custom Integrations',
//         '99.9% Uptime SLA',
//       ],
//       cta: 'Contact Sales',
//       ctaLink: '/contact',
//       badge: 'Custom',
//       featureMetrics: { storage: 1000, api: 1000000 },
//     },
//   ];

//   // FAQ data
//   const faqs = [
//     {
//       question: 'Can I upgrade or downgrade my plan?',
//       answer: 'Yes, you can change your plan anytime from your account dashboard. Changes take effect immediately.',
//     },
//     {
//       question: 'What is the free trial policy?',
//       answer: 'Pro and Team plans include a 14-day free trial. No credit card required during the trial.',
//     },
//     {
//       question: 'Which payment methods are accepted?',
//       answer: 'We accept credit cards, PayPal, and bank transfers for Enterprise plans.',
//     },
//     {
//       question: 'Are there refunds for cancellations?',
//       answer: 'Monthly plans include a 30-day money-back guarantee. Yearly plans are non-refundable after 30 days.',
//     },
//     {
//       question: 'Does Enterprise include custom integrations?',
//       answer: 'Yes, Enterprise plans offer tailored integrations with your existing systems.',
//     },
//   ];

//   // Testimonials data
//   const testimonials = [
//     {
//       quote: 'TechTrend’s Pro plan streamlined our development with its robust API and analytics.',
//       author: 'Jane Doe, CTO at InnovateCorp',
//       logo: 'https://via.placeholder.com/100x40?text=InnovateCorp',
//     },
//     {
//       quote: 'The Team plan’s SSO and support saved us countless hours.',
//       author: 'John Smith, CEO at ScaleTech',
//       logo: 'https://via.placeholder.com/100x40?text=ScaleTech',
//     },
//     {
//       quote: 'Enterprise support is top-notch, with custom solutions for our needs.',
//       author: 'Emily Chen, VP at GlobalSys',
//       logo: 'https://via.placeholder.com/100x40?text=GlobalSys',
//     },
//   ];

//   // Persist billing cycle and plan selection
//   useEffect(() => {
//     localStorage.setItem('billingCycle', isYearly ? 'yearly' : 'monthly');
//     localStorage.setItem('currentPlan', currentPlan || '');
//   }, [isYearly, currentPlan]);

//   // Auto-rotate testimonials
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
//     }, 5000); // Rotate every 5 seconds
//     return () => clearInterval(interval);
//   }, []);

//   // Filter FAQs
//   const filteredFaqs = faqs.filter(
//     (faq) =>
//       faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
//       faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
//   );

//   // Toggle FAQ
//   const toggleFaq = (index) => {
//     setOpenFaq(openFaq === index ? null : index);
//   };

//   // Animation variants
//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.2, duration: 0.5 },
//     }),
//   };

//   const testimonialVariants = {
//     enter: { opacity: 0, x: 100 },
//     center: { opacity: 1, x: 0 },
//     exit: { opacity: 0, x: -100 },
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <Helmet>
//         <title>Subscriptions - TechTrend</title>
//         <meta
//           name="description"
//           content="Choose a TechTrend subscription plan to unlock powerful tech solutions for individuals, teams, and enterprises."
//         />
//         <meta property="og:title" content="TechTrend Subscriptions" />
//         <meta
//           property="og:description"
//           content="Explore our flexible plans with advanced features, from free to enterprise-grade solutions."
//         />
//       </Helmet>

//       {/* Header Section */}
//       <div className="text-center mb-12">
//         <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
//           Find the Perfect Plan
//         </h1>
//         <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//           Power your projects with TechTrend’s flexible subscription plans, designed for startups to
//           enterprises.
//         </p>
//       </div>

//       {/* Pricing and Currency Controls */}
//       <div className="flex flex-col sm:flex-row justify-center items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
//         <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex items-center">
//           <button
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//               !isYearly
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-transparent text-gray-700 dark:text-gray-300'
//             }`}
//             onClick={() => setIsYearly(false)}
//             aria-label="Monthly billing"
//           >
//             Monthly
//           </button>
//           <button
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//               isYearly
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-transparent text-gray-700 dark:text-gray-300'
//             }`}
//             onClick={() => setIsYearly(true)}
//             aria-label="Yearly billing"
//           >
//             Yearly <span className="text-xs ml-1">(Save up to 20%)</span>
//           </button>
//         </div>
//         <select
//           value={currency}
//           onChange={(e) => setCurrency(e.target.value)}
//           className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 text-sm"
//           aria-label="Select currency"
//         >
//           <option value="USD">USD</option>
//           <option value="EUR">EUR</option>
//           <option value="GBP">GBP</option>
//         </select>
//       </div>

//       {/* Plans Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {plans.map((plan, index) => (
//           <motion.div
//             key={plan.name}
//             custom={index}
//             initial="hidden"
//             animate="visible"
//             variants={cardVariants}
//             className={`relative bg-white dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105 ${
//               plan.badge ? 'ring-2 ring-blue-600 dark:ring-blue-500' : ''
//             } ${currentPlan === plan.name ? 'ring-2 ring-green-500' : ''}`}
//           >
//             {/* Badge */}
//             {plan.badge && (
//               <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
//                 {plan.badge}
//               </div>
//             )}
//             {/* Plan Name */}
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
//               {plan.name}
//             </h2>
//             {/* Price */}
//             <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
//               {plan.monthlyPrice === null ? (
//                 'Custom'
//               ) : (
//                 <>
//                   {currency}{' '}
//                   {Math.round(
//                     (isYearly ? plan.yearlyPrice[currency] : plan.monthlyPrice[currency]) *
//                       exchangeRates[currency]
//                   )}
//                   <span className="text-base font-normal text-gray-600 dark:text-gray-400">
//                     /{isYearly ? 'year' : 'month'}
//                   </span>
//                   {isYearly && (
//                     <span className="text-xs text-green-600 ml-2">
//                       Save{' '}
//                       {Math.round(
//                         (plan.monthlyPrice[currency] * 12 - plan.yearlyPrice[currency]) /
//                           (plan.monthlyPrice[currency] * 12) *
//                           100
//                       )}
//                       %
//                     </span>
//                   )}
//                 </>
//               )}
//             </div>
//             {/* Description */}
//             <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
//             {/* Feature Metrics */}
//             <div className="mb-6">
//               <div className="mb-4">
//                 <span className="text-sm text-gray-700 dark:text-gray-300">Storage</span>
//                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                   <motion.div
//                     className="bg-blue-600 h-2 rounded-full"
//                     initial={{ width: 0 }}
//                     animate={{ width: `${(plan.featureMetrics.storage / 1000) * 100}%` }}
//                     transition={{ duration: 1 }}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <span className="text-sm text-gray-700 dark:text-gray-300">API Calls</span>
//                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                   <motion.div
//                     className="bg-blue-600 h-2 rounded-full"
//                     initial={{ width: 0 }}
//                     animate={{ width: `${(plan.featureMetrics.api / 1000000) * 100}%` }}
//                     transition={{ duration: 1 }}
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* Features */}
//             <ul className="space-y-3 mb-6">
//               {plan.features.map((feature) => (
//                 <li key={feature} className="flex items-center text-gray-700 dark:text-gray-300">
//                   <FaCheck className="text-green-500 mr-2" />
//                   {feature}
//                 </li>
//               ))}
//             </ul>
//             {/* CTA Button */}
//             <Link
//               to={plan.ctaLink}
//               className={`block w-full text-center py-3 rounded-md font-medium transition-colors ${
//                 currentPlan === plan.name
//                   ? 'bg-green-500 text-white hover:bg-green-600'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
//               }`}
//               aria-label={`Get started with ${plan.name} plan`}
//               onClick={() => setCurrentPlan(plan.name)}
//             >
//               {currentPlan === plan.name ? 'Your Plan' : plan.cta}
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       {/* Sticky CTA for Mobile */}
//       <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 sm:hidden z-50">
//         <Link
//           to="/signup"
//           className="block text-center font-medium py-2 rounded-md bg-white text-blue-600 hover:bg-gray-100"
//         >
//           Choose a Plan
//         </Link>
//       </div>

//       {/* Comparison Table */}
//       <div className="mt-16">
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
//           Compare Plans
//         </h2>
//         <button
//           className="sm:hidden bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
//           onClick={() => setShowComparison(!showComparison)}
//           aria-expanded={showComparison}
//         >
//           {showComparison ? 'Hide Comparison' : 'Show Comparison'}
//         </button>
//         <div className={`${showComparison ? 'block' : 'hidden'} sm:block overflow-x-auto`}>
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-gray-100 dark:bg-gray-800">
//                 <th className="p-4 text-gray-900 dark:text-gray-100">Feature</th>
//                 {plans.map((plan) => (
//                   <th key={plan.name} className="p-4 text-gray-900 dark:text-gray-100">
//                     {plan.name}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {[
//                 'Storage',
//                 'Support',
//                 'API Calls/Day',
//                 'Analytics',
//                 'Collaboration',
//                 'Security',
//                 'Integrations',
//                 'Uptime SLA',
//               ].map((feature) => (
//                 <tr key={feature} className="border-b dark:border-gray-700">
//                   <td className="p-4 text-gray-700 dark:text-gray-300">{feature}</td>
//                   {plans.map((plan) => (
//                     <td key={plan.name} className="p-4 text-gray-700 dark:text-gray-300">
//                       {plan.features.some((f) => f.toLowerCase().includes(feature.toLowerCase()))
//                         ? plan.features.find((f) => f.toLowerCase().includes(feature.toLowerCase()))
//                         : '–'}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <div className="mt-16">
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
//           Frequently Asked Questions
//         </h2>
//         <div className="max-w-3xl mx-auto mb-6">
//           <div className="relative">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search FAQs..."
//               value={faqSearch}
//               onChange={(e) => setFaqSearch(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               aria-label="Search FAQs"
//             />
//           </div>
//         </div>
//         <div className="space-y-4 max-w-3xl mx-auto">
//           {filteredFaqs.length > 0 ? (
//             filteredFaqs.map((faq, index) => (
//               <div
//                 key={index}
//                 className="bg-white dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-md p-4"
//               >
//                 <button
//                   className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-900 dark:text-gray-100"
//                   onClick={() => toggleFaq(index)}
//                   aria-expanded={openFaq === index}
//                   aria-controls={`faq-${index}`}
//                 >
//                   {faq.question}
//                   {openFaq === index ? (
//                     <FaChevronUp className="text-blue-600" />
//                   ) : (
//                     <FaChevronDown className="text-blue-600" />
//                   )}
//                 </button>
//                 {openFaq === index && (
//                   <div
//                     id={`faq-${index}`}
//                     className="mt-2 text-gray-600 dark:text-gray-400"
//                   >
//                     {faq.answer}
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-600 dark:text-gray-400">
//               No FAQs match your search.
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Testimonials Section */}
//       <div className="mt-16">
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
//           Trusted by Industry Leaders
//         </h2>
//         <div className="relative max-w-4xl mx-auto overflow-hidden">
//           <AnimatePresence>
//             <motion.div
//               key={testimonialIndex}
//               variants={testimonialVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{ duration: 0.5 }}
//               className="bg-white dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-md p-6 text-center"
//             >
//               <img
//                 src={testimonials[testimonialIndex].logo}
//                 alt={`${testimonials[testimonialIndex].author} logo`}
//                 className="h-10 mx-auto mb-4"
//               />
//               <FaQuoteLeft className="text-blue-600 mb-4 mx-auto" size={24} />
//               <p className="text-gray-600 dark:text-gray-300 mb-4">
//                 {testimonials[testimonialIndex].quote}
//               </p>
//               <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
//                 {testimonials[testimonialIndex].author}
//               </p>
//             </motion.div>
//           </AnimatePresence>
//           <div className="flex justify-center mt-4">
//             {testimonials.map((_, i) => (
//               <button
//                 key={i}
//                 className={`w-3 h-3 rounded-full mx-1 ${
//                   i === testimonialIndex ? 'bg-blue-600' : 'bg-gray-300'
//                 }`}
//                 onClick={() => setTestimonialIndex(i)}
//                 aria-label={`Go to testimonial ${i + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Trust Signals */}
//       <div className="mt-16 text-center">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
//           Secure and Compliant
//         </h2>
//         <p className="text-gray-600 dark:text-gray-300 mb-6">
//           Trusted by over 10,000 businesses worldwide.
//         </p>
//         <div className="flex flex-wrap justify-center gap-6">
//           <div className="flex items-center text-gray-700 dark:text-gray-300">
//             <FaLock className="mr-2 text-blue-600" />
//             GDPR Compliant
//           </div>
//           <div className="flex items-center text-gray-700 dark:text-gray-300">
//             <FaLock className="mr-2 text-blue-600" />
//             ISO 27001 Certified
//           </div>
//           <div className="flex items-center text-gray-700 dark:text-gray-300">
//             <FaLock className="mr-2 text-blue-600" />
//             SOC 2 Type II
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Subscriptions;
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Quote,
  Lock,
  Search,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Zap,
  Users,
  Database,
  BarChart,
  Headphones,
  Layers,
  Clock,
} from "lucide-react"

const Subscriptions = () => {
  // State management
  const [isYearly, setIsYearly] = useState(true)
  const [currency, setCurrency] = useState("USD")
  const [openFaq, setOpenFaq] = useState(null)
  const [faqSearch, setFaqSearch] = useState("")
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [showComparison, setShowComparison] = useState(false)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentStep, setPaymentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  })
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    zip: "",
    country: "US",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [currentPlan, setCurrentPlan] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  const modalRef = useRef(null)

  // Check if mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Exchange rates (mock, replace with API in production)
  const exchangeRates = { USD: 1, EUR: 0.92, GBP: 0.79 }

  // Currency symbols
  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" }

  // Subscription plans data
  const plans = [
    {
      id: "starter",
      name: "Starter",
      monthlyPrice: { USD: 0, EUR: 0, GBP: 0 },
      yearlyPrice: { USD: 0, EUR: 0, GBP: 0 },
      description: "For individuals and small projects.",
      features: ["5GB Storage", "Community Support", "100 API Calls/Day", "Basic Analytics"],
      notIncluded: [
        "Priority Support",
        "Team Collaboration",
        "Custom Analytics",
        "SSO Integration",
        "Advanced Security",
        "Custom Integrations",
      ],
      cta: "Get Started",
      badge: null,
      featureMetrics: { storage: 5, api: 100 },
      icon: <Database className="w-6 h-6 text-gray-500" />,
    },
    {
      id: "pro",
      name: "Pro",
      monthlyPrice: { USD: 15, EUR: 14, GBP: 12 },
      yearlyPrice: { USD: 144, EUR: 132, GBP: 114 }, // ~20% discount
      description: "For growing businesses.",
      features: [
        "50GB Storage",
        "Priority Email Support",
        "10,000 API Calls/Day",
        "Advanced Analytics",
        "Team Collaboration",
      ],
      notIncluded: ["SSO Integration", "Advanced Security", "Custom Integrations"],
      cta: "Get Started",
      badge: "Most Popular",
      featureMetrics: { storage: 50, api: 10000 },
      icon: <Zap className="w-6 h-6 text-cyan-500" />,
    },
    {
      id: "team",
      name: "Team",
      monthlyPrice: { USD: 49, EUR: 45, GBP: 39 },
      yearlyPrice: { USD: 470, EUR: 432, GBP: 372 },
      description: "For mid-sized teams.",
      features: [
        "200GB Storage",
        "24/7 Email & Chat Support",
        "50,000 API Calls/Day",
        "Custom Analytics",
        "Team Collaboration",
        "SSO Integration",
      ],
      notIncluded: ["Advanced Security", "Custom Integrations"],
      cta: "Get Started",
      badge: "Best for Teams",
      featureMetrics: { storage: 200, api: 50000 },
      icon: <Users className="w-6 h-6 text-blue-500" />,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      monthlyPrice: null,
      yearlyPrice: null,
      description: "For large organizations.",
      features: [
        "Unlimited Storage",
        "24/7 Dedicated Support",
        "Unlimited API Calls",
        "Advanced Security",
        "Custom Integrations",
        "99.9% Uptime SLA",
      ],
      notIncluded: [],
      cta: "Contact Sales",
      badge: "Custom",
      featureMetrics: { storage: 1000, api: 1000000 },
      icon: <Layers className="w-6 h-6 text-purple-500" />,
    },
  ]

  // FAQ data
  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan?",
      answer:
        "Yes, you can change your plan anytime from your account dashboard. When upgrading, you'll be charged the prorated difference for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle.",
    },
    {
      question: "What is the free trial policy?",
      answer:
        "Pro and Team plans include a 14-day free trial. No credit card is required during the trial period. You'll receive a reminder 3 days before your trial ends with the option to subscribe or cancel.",
    },
    {
      question: "Which payment methods are accepted?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and bank transfers for Enterprise plans. All payments are processed securely through our PCI-compliant payment gateway.",
    },
    {
      question: "Are there refunds for cancellations?",
      answer:
        "Monthly plans include a 30-day money-back guarantee. Yearly plans are non-refundable after 30 days, but you can continue using the service until the end of your billing period. Special circumstances may be considered on a case-by-case basis.",
    },
    {
      question: "Does Enterprise include custom integrations?",
      answer:
        "Yes, Enterprise plans offer tailored integrations with your existing systems. Our solutions architects will work with your team to design and implement custom workflows that meet your specific business requirements.",
    },
    {
      question: "How does billing work for team accounts?",
      answer:
        "Team accounts are billed based on the plan you select, not per user. This means you can add team members without increasing your subscription cost, up to the limits specified in your plan.",
    },
    {
      question: "What kind of support is included?",
      answer:
        "Support varies by plan. Starter includes community forum access, Pro offers priority email support with 24-hour response time, Team includes 24/7 email and chat support, and Enterprise provides 24/7 dedicated support with a named account manager and phone support.",
    },
    {
      question: "Is there a limit to API usage?",
      answer:
        "Yes, each plan has specific API call limits as outlined in the plan details. If you consistently exceed your limit, we'll notify you and suggest upgrading to a more suitable plan. Enterprise plans can be customized with higher limits based on your needs.",
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      quote:
        "The Pro plan streamlined our development with its robust API and analytics. We've seen a 40% increase in productivity since switching.",
      author: "Jane Doe",
      title: "CTO at InnovateCorp",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    },
    {
      quote:
        "The Team plan's SSO and support saved us countless hours. The custom analytics have been invaluable for our decision-making process.",
      author: "John Smith",
      title: "CEO at ScaleTech",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    },
    {
      quote:
        "Enterprise support is top-notch, with custom solutions for our complex needs. The dedicated account manager understands our business and provides strategic guidance.",
      author: "Emily Chen",
      title: "VP at GlobalSys",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&auto=format&fit=crop",
    },
  ]

  // Payment methods
  const paymentMethods = [
    { id: "card", name: "Credit Card", icon: <CreditCard className="w-5 h-5" /> },
    { id: "paypal", name: "PayPal", icon: <div className="text-blue-600 font-bold">PayPal</div> },
    { id: "bank", name: "Bank Transfer", icon: <div className="text-green-600 font-bold">Bank</div> },
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Rotate every 5 seconds
    return () => clearInterval(interval)
  }, [])

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (!isProcessing && !paymentComplete) {
          setShowPaymentModal(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isProcessing, paymentComplete])

  // Filter FAQs
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase()),
  )

  // Toggle FAQ
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Handle plan selection
  const handleSelectPlan = (plan) => {
    if (plan.id === "enterprise") {
      // For enterprise, we'd typically redirect to a contact form
      window.alert("For Enterprise plans, our sales team will contact you shortly.")
      return
    }

    setSelectedPlan(plan)
    setShowPaymentModal(true)
    setPaymentStep(1)
    setPaymentComplete(false)
  }

  // Handle payment form submission
  const handlePaymentSubmit = (e) => {
    e.preventDefault()

    if (paymentStep === 1) {
      setPaymentStep(2)
    } else {
      setIsProcessing(true)

      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false)
        setPaymentComplete(true)
        setCurrentPlan(selectedPlan.id)
      }, 2000)
    }
  }

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format card expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  }

  const testimonialVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  // Get current plan details
  const getCurrentPlanPrice = () => {
    if (!selectedPlan) return null

    const price = isYearly ? selectedPlan.yearlyPrice?.[currency] : selectedPlan.monthlyPrice?.[currency]

    if (price === null) return "Custom"

    return `${currencySymbols[currency]}${price}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-900 dark:to-blue-900">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Choose the Perfect Plan for Your Business
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Flexible subscription options designed to scale with your needs. No hidden fees, cancel anytime.
          </p>

          {/* Pricing and Currency Controls */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-1 flex items-center">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !isYearly ? "bg-white text-cyan-600" : "bg-transparent text-white hover:bg-white/10"
                }`}
                onClick={() => setIsYearly(false)}
                aria-label="Monthly billing"
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isYearly ? "bg-white text-cyan-600" : "bg-transparent text-white hover:bg-white/10"
                }`}
                onClick={() => setIsYearly(true)}
                aria-label="Yearly billing"
              >
                Yearly <span className="text-xs ml-1 text-emerald-500 font-bold">(Save 20%)</span>
              </button>
            </div>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-white/10 backdrop-blur-md text-white rounded-md px-3 py-2 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Select currency"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className={`relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.badge === "Most Popular" ? "md:scale-105 md:-mt-4 md:mb-4 z-10" : ""
              } ${currentPlan === plan.id ? "ring-2 ring-green-500" : ""}`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold py-1.5 text-center">
                  {plan.badge}
                </div>
              )}

              <div className={`p-6 ${plan.badge ? "pt-10" : ""}`}>
                {/* Plan Icon and Name */}
                <div className="flex items-center mb-4">
                  <div className="mr-3 p-2 rounded-full bg-slate-100 dark:bg-slate-700">{plan.icon}</div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{plan.name}</h2>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 mb-4">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {plan.monthlyPrice === null ? (
                      "Custom"
                    ) : (
                      <>
                        {currencySymbols[currency]}
                        {Math.round(
                          (isYearly ? plan.yearlyPrice[currency] : plan.monthlyPrice[currency]) *
                            exchangeRates[currency],
                        )}
                        <span className="text-base font-normal text-slate-500 dark:text-slate-400">
                          /{isYearly ? "year" : "month"}
                        </span>
                      </>
                    )}
                  </div>
                  {isYearly && plan.monthlyPrice !== null && (
                    <div className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                      Save{" "}
                      {Math.round(
                        ((plan.monthlyPrice[currency] * 12 - plan.yearlyPrice[currency]) /
                          (plan.monthlyPrice[currency] * 12)) *
                          100,
                      )}
                      % compared to monthly
                    </div>
                  )}
                </div>

                {/* Feature Metrics */}
                <div className="space-y-3 mb-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700 dark:text-slate-300">Storage</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {plan.featureMetrics.storage >= 1000 ? "Unlimited" : `${plan.featureMetrics.storage}GB`}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="bg-cyan-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((plan.featureMetrics.storage / 1000) * 100, 100)}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700 dark:text-slate-300">API Calls</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {plan.featureMetrics.api >= 1000000
                          ? "Unlimited"
                          : `${plan.featureMetrics.api.toLocaleString()}/day`}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="bg-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((plan.featureMetrics.api / 1000000) * 100, 100)}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    currentPlan === plan.id
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : plan.badge === "Most Popular"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                        : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white"
                  }`}
                >
                  {currentPlan === plan.id ? "Current Plan" : plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Compare Plan Features</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Find the perfect plan for your business needs with our detailed feature comparison
          </p>
        </div>

        <button
          className="md:hidden w-full py-3 mb-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          onClick={() => setShowComparison(!showComparison)}
        >
          {showComparison ? "Hide Comparison Table" : "Show Comparison Table"}
        </button>

        <div className={`${showComparison ? "block" : "hidden"} md:block overflow-x-auto`}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-4 text-left text-slate-900 dark:text-white font-semibold">Feature</th>
                {plans.map((plan) => (
                  <th key={plan.id} className="p-4 text-center text-slate-900 dark:text-white font-semibold">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                  <div className="flex items-center">
                    <Database className="w-5 h-5 mr-2 text-slate-400" />
                    Storage
                  </div>
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">5GB</td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">50GB</td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">200GB</td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">Unlimited</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                  <div className="flex items-center">
                    <Headphones className="w-5 h-5 mr-2 text-slate-400" />
                    Support
                  </div>
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">Community</td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">Priority Email</td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">24/7 Email & Chat</td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">24/7 Dedicated</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-slate-400" />
                    API Calls/Day
                  </div>
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">100</td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">10,000</td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">50,000</td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">Unlimited</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                  <div className="flex items-center">
                    <BarChart className="w-5 h-5 mr-2 text-slate-400" />
                    Analytics
                  </div>
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">Basic</td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">Advanced</td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">Custom</td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">Custom</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-slate-400" />
                    Team Collaboration
                  </div>
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">
                  <X className="w-5 h-5 text-slate-400 mx-auto" />
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-slate-400" />
                    Advanced Security
                  </div>
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">
                  <X className="w-5 h-5 text-slate-400 mx-auto" />
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">
                  <X className="w-5 h-5 text-slate-400 mx-auto" />
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">
                  <X className="w-5 h-5 text-slate-400 mx-auto" />
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                  <div className="flex items-center">
                    <Layers className="w-5 h-5 mr-2 text-slate-400" />
                    Custom Integrations
                  </div>
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">
                  <X className="w-5 h-5 text-slate-400 mx-auto" />
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">
                  <X className="w-5 h-5 text-slate-400 mx-auto" />
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">
                  <X className="w-5 h-5 text-slate-400 mx-auto" />
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-slate-400" />
                    Uptime SLA
                  </div>
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">
                  <X className="w-5 h-5 text-slate-400 mx-auto" />
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">
                  <X className="w-5 h-5 text-slate-400 mx-auto" />
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">
                  <X className="w-5 h-5 text-slate-400 mx-auto" />
                </td>
                <td className="p-4 text-center text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-slate-800/50 dark:to-slate-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Trusted by Industry Leaders</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              See what our customers have to say about our subscription plans
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                variants={testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-cyan-100 dark:border-cyan-900">
                    <img
                      src={testimonials[testimonialIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[testimonialIndex].author}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <Quote className="w-8 h-8 text-cyan-500 mx-auto mb-4 opacity-50" />
                <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 italic">
                  "{testimonials[testimonialIndex].quote}"
                </p>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {testimonials[testimonialIndex].author}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonials[testimonialIndex].title}</p>
                </div>
                <div className="flex justify-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full mx-1 transition-colors ${
                    i === testimonialIndex ? "bg-cyan-600" : "bg-slate-300 dark:bg-slate-600"
                  }`}
                  onClick={() => setTestimonialIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Find answers to common questions about our subscription plans
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label="Search FAQs"
            />
          </div>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700"
              >
                <button
                  className="w-full flex justify-between items-center text-left p-6 focus:outline-none"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="text-lg font-medium text-slate-900 dark:text-white">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-600 dark:text-slate-400">No FAQs match your search.</p>
              <button
                onClick={() => setFaqSearch("")}
                className="mt-4 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Trust Signals */}
      <div className="bg-white dark:bg-slate-800 py-12 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Secure and Compliant</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Trusted by over 10,000 businesses worldwide.</p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center text-slate-700 dark:text-slate-300">
              <Lock className="w-5 h-5 mr-2 text-cyan-600" />
              GDPR Compliant
            </div>
            <div className="flex items-center text-slate-700 dark:text-slate-300">
              <Lock className="w-5 h-5 mr-2 text-cyan-600" />
              ISO 27001 Certified
            </div>
            <div className="flex items-center text-slate-700 dark:text-slate-300">
              <Lock className="w-5 h-5 mr-2 text-cyan-600" />
              SOC 2 Type II
            </div>
            <div className="flex items-center text-slate-700 dark:text-slate-300">
              <Shield className="w-5 h-5 mr-2 text-cyan-600" />
              99.9% Uptime SLA
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-900 dark:to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Choose the plan that works for your business and start your 14-day free trial today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleSelectPlan(plans[1])} // Pro plan
              className="px-6 py-3 bg-white text-cyan-600 rounded-lg font-semibold hover:bg-cyan-50 transition duration-300 shadow-lg transform hover:scale-[1.02]"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => handleSelectPlan(plans[3])} // Enterprise plan
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition duration-300"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => !isProcessing && !paymentComplete && setShowPaymentModal(false)}
            />
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-white dark:bg-slate-800 p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {paymentComplete
                      ? "Payment Successful"
                      : paymentStep === 1
                        ? "Subscription Details"
                        : "Payment Information"}
                  </h3>
                  {!isProcessing && !paymentComplete && (
                    <button
                      onClick={() => setShowPaymentModal(false)}
                      className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {paymentComplete ? (
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Thank you for your subscription!
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      Your {selectedPlan.name} plan is now active. You'll receive a confirmation email shortly.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-6 text-left">
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-600 dark:text-slate-400">Plan</span>
                        <span className="font-medium text-slate-900 dark:text-white">{selectedPlan.name}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-600 dark:text-slate-400">Billing</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {isYearly ? "Yearly" : "Monthly"}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-600 dark:text-slate-400">Amount</span>
                        <span className="font-medium text-slate-900 dark:text-white">{getCurrentPlanPrice()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-600">
                        <span className="font-medium text-slate-900 dark:text-white">Order ID</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          #{Math.random().toString(36).substring(2, 10).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPaymentModal(false)}
                      className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300"
                    >
                      Continue to Dashboard
                    </button>
                  </div>
                ) : isProcessing ? (
                  <div className="text-center py-8">
                    <div className="flex justify-center mb-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-600 rounded-full"
                      />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Processing Payment</h4>
                    <p className="text-slate-600 dark:text-slate-400">Please wait while we process your payment...</p>
                  </div>
                ) : paymentStep === 1 ? (
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-6">
                      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-6">
                        <div className="flex items-center mb-4">
                          <div className="p-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 mr-3">
                            {selectedPlan.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white">{selectedPlan.name} Plan</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Billed {isYearly ? "yearly" : "monthly"}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-slate-600 dark:text-slate-400">Subscription</span>
                          <span className="font-medium text-slate-900 dark:text-white">{getCurrentPlanPrice()}</span>
                        </div>
                        {isYearly && (
                          <div className="flex justify-between mb-2 text-emerald-600 dark:text-emerald-400 text-sm">
                            <span>Yearly discount</span>
                            <span>-20%</span>
                          </div>
                        )}
                        <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-600 font-semibold">
                          <span className="text-slate-900 dark:text-white">Total</span>
                          <span className="text-slate-900 dark:text-white">{getCurrentPlanPrice()}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            value={billingDetails.email}
                            onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="your@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={billingDetails.name}
                            onChange={(e) => setBillingDetails({ ...billingDetails, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="w-4 h-4 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500"
                      />
                      <label htmlFor="terms" className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                        I agree to the{" "}
                        <a href="#" className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400">
                          Privacy Policy
                        </a>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
                    >
                      Continue to Payment <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-6">
                      <h4 className="font-medium text-slate-900 dark:text-white mb-4">Payment Method</h4>
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setPaymentMethod(method.id)}
                            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                              paymentMethod === method.id
                                ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20"
                                : "border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700"
                            }`}
                          >
                            <div className="mb-2">{method.icon}</div>
                            <span className="text-sm font-medium text-slate-900 dark:text-white">{method.name}</span>
                          </button>
                        ))}
                      </div>

                      {paymentMethod === "card" && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              required
                              value={cardDetails.number}
                              onChange={(e) =>
                                setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                              placeholder="4242 4242 4242 4242"
                              maxLength={19}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              required
                              value={cardDetails.name}
                              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                              placeholder="John Doe"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                required
                                value={cardDetails.expiry}
                                onChange={(e) =>
                                  setCardDetails({ ...cardDetails, expiry: formatExpiryDate(e.target.value) })
                                }
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="MM/YY"
                                maxLength={5}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                CVC
                              </label>
                              <input
                                type="text"
                                required
                                value={cardDetails.cvc}
                                onChange={(e) =>
                                  setCardDetails({
                                    ...cardDetails,
                                    cvc: e.target.value.replace(/\D/g, "").substring(0, 3),
                                  })
                                }
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="123"
                                maxLength={3}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "paypal" && (
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 text-center">
                          <p className="text-slate-600 dark:text-slate-400 mb-2">
                            You'll be redirected to PayPal to complete your payment.
                          </p>
                        </div>
                      )}

                      {paymentMethod === "bank" && (
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                          <p className="text-slate-600 dark:text-slate-400 mb-2">
                            Please use the following details for bank transfer:
                          </p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-500 dark:text-slate-400">Account Name:</span>
                              <span className="font-medium text-slate-900 dark:text-white">Tech Company Inc.</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 dark:text-slate-400">Account Number:</span>
                              <span className="font-medium text-slate-900 dark:text-white">1234567890</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 dark:text-slate-400">Routing Number:</span>
                              <span className="font-medium text-slate-900 dark:text-white">987654321</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 dark:text-slate-400">Bank Name:</span>
                              <span className="font-medium text-slate-900 dark:text-white">Global Bank</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 dark:text-slate-400">Reference:</span>
                              <span className="font-medium text-slate-900 dark:text-white">
                                SUB-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-600 dark:text-slate-400">Subscription</span>
                        <span className="font-medium text-slate-900 dark:text-white">{getCurrentPlanPrice()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-600 font-semibold">
                        <span className="text-slate-900 dark:text-white">Total</span>
                        <span className="text-slate-900 dark:text-white">{getCurrentPlanPrice()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center mb-6">
                      <Lock className="w-4 h-4 text-slate-400 mr-2" />
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        Secure payment processed with 256-bit encryption
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentStep(1)}
                        className="flex-1 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300"
                      >
                        Complete Payment
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Subscriptions
