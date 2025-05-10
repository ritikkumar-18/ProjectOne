// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Toaster, toast } from 'react-hot-toast';
// import { ChevronDown, ChevronUp, Copy, Download } from 'lucide-react';

// const TermsAndConditions = () => {
//   const [expandedSections, setExpandedSections] = useState({});
//   const lastUpdated = 'May 7, 2025';
//  useEffect(() => {
    
//     window.scrollTo({
//         top:0,
//         behavior:'smooth'
//       });
      
//     }, []);

//   // Toggle section expansion
//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   // Copy section text to clipboard
//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text).then(
//       () => toast.success('Section copied to clipboard!', { icon: '📋' }),
//       () => toast.error('Failed to copy section'),
//     );
//   };

//   // Simulate PDF download
//   const downloadPDF = () => {
//     toast.success('Downloading Terms and Conditions PDF...', { icon: '📄' });
//     // In a real app, this would trigger a file download
//     setTimeout(() => {
//       toast.success('PDF downloaded successfully!');
//     }, 1500);
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8, ease: 'easeOut' },
//     },
//   };

//   const sectionVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.2, duration: 0.5, ease: 'easeOut' },
//     }),
//   };

//   const buttonVariants = {
//     initial: { scale: 1 },
//     hover: { scale: 1.05, rotate: 1 },
//     tap: { scale: 0.95 },
//   };

//   // Terms content
//   const termsSections = [
//     {
//       title: 'Introduction',
//       content:
//         'Welcome to our platform. These Terms and Conditions govern your use of our services, including our website and applications. By accessing or using our services, you agree to be bound by these terms. If you do not agree, please do not use our services.',
//     },
//     {
//       title: 'User Responsibilities',
//       content:
//         'You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to use our services in compliance with applicable laws and not to engage in any prohibited activities, such as unauthorized access or distribution of harmful content.',
//     },
//     {
//       title: 'Intellectual Property',
//       content:
//         'All content, trademarks, and other intellectual property on our platform are owned by or licensed to us. You may not reproduce, distribute, or create derivative works from our content without explicit permission, except as permitted by law.',
//     },
//     {
//       title: 'Limitation of Liability',
//       content:
//         'Our services are provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of our services, including but not limited to direct, indirect, incidental, or consequential damages, to the fullest extent permitted by law.',
//     },
//     {
//       title: 'Termination',
//       content:
//         'We reserve the right to suspend or terminate your access to our services at our discretion, with or without notice, for any violation of these terms or for any other reason. You may also terminate your account at any time by contacting us.',
//     },
//     {
//       title: 'Governing Law',
//       content:
//         'These terms are governed by the laws of the State of California, USA, without regard to its conflict of law principles. Any disputes arising under these terms shall be resolved in the state or federal courts located in San Francisco, California.',
//     },
//     {
//       title: 'Changes to Terms',
//       content:
//         'We may update these Terms and Conditions from time to time. We will notify you of any changes by posting the new terms on this page and updating the "Last Updated" date. Your continued use of our services after such changes constitutes your acceptance of the new terms.',
//     },
//   ];

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
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 relative">
//           <motion.h1
//             className="text-3xl sm:text-4xl font-bold text-center"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             Terms and Conditions
//           </motion.h1>
//           <p className="text-sm text-center mt-2 opacity-80">
//             Last Updated: {lastUpdated}
//           </p>
//           <motion.button
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//             onClick={downloadPDF}
//             className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             aria-label="Download PDF"
//           >
//             <Download className="h-5 w-5" />
//             <span className="hidden sm:inline">Download PDF</span>
//           </motion.button>
//         </div>

//         {/* Content */}
//         <div className="p-6 sm:p-10">
//           <motion.p
//             className="text-gray-600 mb-8 text-center max-w-2xl mx-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//           >
//             Please read these Terms and Conditions carefully before using our services. Your use of our platform indicates your agreement to these terms.
//           </motion.p>

//           <div className="space-y-6">
//             {termsSections.map((section, index) => (
//               <motion.div
//                 key={section.title}
//                 variants={sectionVariants}
//                 custom={index}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.3 }}
//                 className="border border-gray-200 rounded-lg overflow-hidden"
//               >
//                 <div
//                   className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
//                   onClick={() => toggleSection(section.title)}
//                   role="button"
//                   tabIndex={0}
//                   onKeyDown={(e) => e.key === 'Enter' && toggleSection(section.title)}
//                   aria-expanded={expandedSections[section.title]}
//                   aria-controls={`section-${index}`}
//                 >
//                   <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
//                   <motion.div
//                     animate={{ rotate: expandedSections[section.title] ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {expandedSections[section.title] ? (
//                       <ChevronUp className="h-5 w-5 text-indigo-600" />
//                     ) : (
//                       <ChevronDown className="h-5 w-5 text-indigo-600" />
//                     )}
//                   </motion.div>
//                 </div>
//                 <AnimatePresence>
//                   {expandedSections[section.title] && (
//                     <motion.div
//                       id={`section-${index}`}
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: 'auto', opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.4, ease: 'easeInOut' }}
//                       className="p-4 bg-white"
//                     >
//                       <p className="text-gray-600 leading-relaxed">{section.content}</p>
//                       <motion.button
//                         variants={buttonVariants}
//                         whileHover="hover"
//                         whileTap="tap"
//                         onClick={() => copyToClipboard(section.content)}
//                         className="mt-4 flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         aria-label={`Copy ${section.title} section`}
//                       >
//                         <Copy className="h-4 w-4" />
//                         Copy Section
//                       </motion.button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             ))}
//           </div>

//           {/* Accept Button */}
//           <motion.div
//             className="mt-10 text-center"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <motion.button
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//               onClick={() => toast.success('Terms accepted!', { icon: '✅' })}
//               className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               aria-label="Accept Terms and Conditions"
//             >
//               I Accept the Terms
//             </motion.button>
//           </motion.div>
//         </div>

//         {/* Footer */}
//         <div className="bg-gray-100 p-6 text-center text-sm text-gray-600">
//           <p>
//             If you have any questions about these Terms and Conditions, please{' '}
//             <a
//               href="/contact"
//               className="text-indigo-600 hover:text-indigo-800 underline"
//               aria-label="Contact us"
//             >
//               contact us
//             </a>.
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default TermsAndConditions;
"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  Share,
  Search,
  Moon,
  Sun,
  Check,
  X,
  Eye,
  EyeOff,
  Printer,
} from "lucide-react"

export default function TermsAndConditions() {
  // State management
  const [expandedSections, setExpandedSections] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [showHighlights, setShowHighlights] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [readProgress, setReadProgress] = useState(0)
  const [lastUpdated] = useState("May 7, 2025")
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState("success")
  const [highlightedText, setHighlightedText] = useState([])

  // Refs
  const contentRef = useRef(null)
  const toastTimeoutRef = useRef(null)
  const sectionRefs = useRef([])

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"],
  })

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Calculate reading progress
  useEffect(() => {
    const unsubscribe = smoothScrollYProgress.onChange((v) => {
      setReadProgress(Math.round(v * 100))
    })
    return () => unsubscribe()
  }, [smoothScrollYProgress])

  // Initial setup
  useEffect(() => {
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true)
    }

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    // Initialize section refs
    sectionRefs.current = sectionRefs.current.slice(0, termsSections.length)

    // Check for saved highlights
    const savedHighlights = localStorage.getItem("termsHighlights")
    if (savedHighlights) {
      setHighlightedText(JSON.parse(savedHighlights))
    }

    // Check if terms were previously accepted
    const termsAccepted = localStorage.getItem("termsAccepted")
    if (termsAccepted === "true") {
      setAcceptedTerms(true)
    }
  }, [])

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([])
      return
    }

    const results = termsSections.filter(
      (section) =>
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.content.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    setSearchResults(results)

    // Auto-expand sections with search results
    const newExpandedSections = { ...expandedSections }
    results.forEach((section) => {
      newExpandedSections[section.title] = true
    })
    setExpandedSections(newExpandedSections)
  }, [searchTerm])

  // Toast notification system
  const showNotification = (message, type = "success") => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
    }

    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Copy section text to clipboard
  const copyToClipboard = (text, sectionTitle) => {
    navigator.clipboard.writeText(text).then(
      () => showNotification(`"${sectionTitle}" copied to clipboard!`),
      () => showNotification("Failed to copy section", "error"),
    )
  }

  // Share functionality
  const shareContent = (sectionTitle) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Terms and Conditions",
          text: `Check out the "${sectionTitle}" section of our Terms and Conditions`,
          url: window.location.href,
        })
        .then(() => showNotification("Shared successfully!"))
        .catch(() => showNotification("Sharing failed", "error"))
    } else {
      copyToClipboard(window.location.href, "Page URL")
    }
  }

  // Print functionality
  const printTerms = () => {
    showNotification("Preparing document for printing...")
    setTimeout(() => {
      window.print()
    }, 500)
  }

  // Download PDF
  const downloadPDF = () => {
    showNotification("Generating PDF document...")

    // Simulate PDF generation delay
    setTimeout(() => {
      showNotification("PDF downloaded successfully!")

      // In a real app, this would trigger an actual file download
      const link = document.createElement("a")
      link.href = "#"
      link.download = "Terms_and_Conditions.pdf"
      link.click()
    }, 1500)
  }

  // Accept terms
  const acceptTerms = () => {
    setAcceptedTerms(true)
    localStorage.setItem("termsAccepted", "true")
    showNotification("Terms accepted! Thank you.")
  }

  // Highlight text functionality
  const handleTextSelection = () => {
    const selection = window.getSelection()
    const selectedText = selection.toString().trim()

    if (selectedText && selectedText.length > 5) {
      const newHighlights = [...highlightedText, selectedText]
      setHighlightedText(newHighlights)
      localStorage.setItem("termsHighlights", JSON.stringify(newHighlights))
      showNotification("Text highlighted and saved")
    }
  }

  // Remove highlight
  const removeHighlight = (index) => {
    const newHighlights = highlightedText.filter((_, i) => i !== index)
    setHighlightedText(newHighlights)
    localStorage.setItem("termsHighlights", JSON.stringify(newHighlights))
    showNotification("Highlight removed")
  }

  // Scroll to section
  const scrollToSection = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: "smooth" })

      // Highlight the section briefly
      setTimeout(() => {
        toggleSection(termsSections[index].title)
      }, 500)
    }
  }

  // Animation variants with higher framerates
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    }),
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const toastVariants = {
    hidden: { opacity: 0, y: 50, x: "-50%" },
    visible: {
      opacity: 1,
      y: 0,
      x: "-50%",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      x: "-50%",
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  // Terms content
  const termsSections = [
    {
      title: "Introduction",
      content:
        "Welcome to our platform. These Terms and Conditions govern your use of our services, including our website and applications. By accessing or using our services, you agree to be bound by these terms. If you do not agree, please do not use our services.",
    },
    {
      title: "User Responsibilities",
      content:
        "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to use our services in compliance with applicable laws and not to engage in any prohibited activities, such as unauthorized access or distribution of harmful content.",
    },
    {
      title: "Intellectual Property",
      content:
        "All content, trademarks, and other intellectual property on our platform are owned by or licensed to us. You may not reproduce, distribute, or create derivative works from our content without explicit permission, except as permitted by law.",
    },
    {
      title: "Limitation of Liability",
      content:
        'Our services are provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of our services, including but not limited to direct, indirect, incidental, or consequential damages, to the fullest extent permitted by law.',
    },
    {
      title: "Termination",
      content:
        "We reserve the right to suspend or terminate your access to our services at our discretion, with or without notice, for any violation of these terms or for any other reason. You may also terminate your account at any time by contacting us.",
    },
    {
      title: "Governing Law",
      content:
        "These terms are governed by the laws of the State of California, USA, without regard to its conflict of law principles. Any disputes arising under these terms shall be resolved in the state or federal courts located in San Francisco, California.",
    },
    {
      title: "Changes to Terms",
      content:
        'We may update these Terms and Conditions from time to time. We will notify you of any changes by posting the new terms on this page and updating the "Last Updated" date. Your continued use of our services after such changes constitutes your acceptance of the new terms.',
    },
    {
      title: "Privacy Policy",
      content:
        "Our Privacy Policy describes how we collect, use, and protect your personal information. By using our services, you consent to the data practices described in our Privacy Policy, which is incorporated by reference into these Terms and Conditions.",
    },
    {
      title: "Dispute Resolution",
      content:
        "Any dispute arising out of or relating to these terms shall first be attempted to be resolved through good faith negotiations. If such negotiations fail, you agree to resolve the dispute through binding arbitration in accordance with the rules of the American Arbitration Association.",
    },
  ]

  // Highlight matching text in search results
  const highlightMatch = (text, term) => {
    if (!term.trim() || !text) return text

    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    return text.replace(regex, "<mark>$1</mark>")
  }

  // Function to check if text contains any highlights
  const containsHighlight = (text) => {
    if (!showHighlights || highlightedText.length === 0) return false
    return highlightedText.some((highlight) => text.includes(highlight))
  }

  // Function to highlight saved text
  const applyHighlights = (text) => {
    if (!showHighlights || highlightedText.length === 0) return text

    let highlightedContent = text
    highlightedText.forEach((highlight) => {
      const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
      highlightedContent = highlightedContent.replace(regex, '<span class="bg-yellow-200 dark:bg-yellow-700">$1</span>')
    })

    return highlightedContent
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
      style={{ fontSize: `${fontSize}px` }}
    >
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50"
        style={{ scaleX: smoothScrollYProgress, transformOrigin: "0%" }}
      />

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed bottom-8 left-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
              toastType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              {toastType === "success" ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating controls */}
      <div className={`fixed bottom-4 right-4 z-40 flex flex-col gap-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full shadow-lg ${
            darkMode ? "bg-gray-800 text-yellow-400" : "bg-white text-gray-800"
          }`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </motion.button>

        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => setFontSize((prev) => Math.min(prev + 2, 24))}
          className={`p-3 rounded-full shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}
          aria-label="Increase font size"
          disabled={fontSize >= 24}
        >
          <span className="font-bold text-lg">A+</span>
        </motion.button>

        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => setFontSize((prev) => Math.max(prev - 2, 12))}
          className={`p-3 rounded-full shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}
          aria-label="Decrease font size"
          disabled={fontSize <= 12}
        >
          <span className="font-bold text-lg">A-</span>
        </motion.button>

        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => setShowHighlights(!showHighlights)}
          className={`p-3 rounded-full shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } ${showHighlights ? "ring-2 ring-purple-500" : ""}`}
          aria-label={showHighlights ? "Hide highlights" : "Show highlights"}
        >
          {showHighlights ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </motion.button>

        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={printTerms}
          className={`p-3 rounded-full shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}
          aria-label="Print terms and conditions"
        >
          <Printer className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Reading progress indicator */}
      <div className="fixed top-4 left-4 z-40">
        <div className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>{readProgress}% read</div>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden ${
            darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}
          ref={contentRef}
        >
          {/* Header */}
          <div
            className={`
            bg-gradient-to-r 
            ${darkMode ? "from-purple-900 to-indigo-900" : "from-indigo-600 to-purple-600"} 
            text-white p-8 relative
          `}
          >
            <motion.h1
              className="text-3xl sm:text-4xl font-bold text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              Terms and Conditions
            </motion.h1>

            <div className="flex justify-center items-center mt-2">
              <p className="text-sm text-center opacity-80">Last Updated: {lastUpdated}</p>

              {acceptedTerms && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="ml-3 flex items-center gap-1 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs"
                >
                  <Check className="h-3 w-3" />
                  <span>Accepted</span>
                </motion.div>
              )}
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2">
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={downloadPDF}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-indigo-600 hover:bg-gray-100"
                }`}
                aria-label="Download PDF"
              >
                <Download className="h-5 w-5" />
                <span className="hidden sm:inline">Download</span>
              </motion.button>

              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => shareContent("Terms and Conditions")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-indigo-600 hover:bg-gray-100"
                }`}
                aria-label="Share"
              >
                <Share className="h-5 w-5" />
                <span className="hidden sm:inline">Share</span>
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className={`p-6 sm:p-10 ${darkMode ? "text-gray-200" : "text-gray-600"}`}>
            <motion.p
              className="mb-8 text-center max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Please read these Terms and Conditions carefully before using our services. Your use of our platform
              indicates your agreement to these terms.
            </motion.p>

            {/* Search bar */}
            <div className={`mb-8 relative ${darkMode ? "text-white" : "text-gray-800"}`}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search terms..."
                  className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 placeholder-gray-400 focus:border-purple-500"
                      : "bg-gray-100 border-gray-200 placeholder-gray-500 focus:border-indigo-500"
                  } border focus:ring-2 focus:ring-opacity-50 transition-colors`}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    aria-label="Clear search"
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* Search results */}
              {searchResults.length > 0 && (
                <div className={`mt-2 p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                  <p className="text-sm font-medium mb-2">
                    Found {searchResults.length} {searchResults.length === 1 ? "result" : "results"}:
                  </p>
                  <ul className="space-y-2">
                    {searchResults.map((result, index) => (
                      <li key={index}>
                        <button
                          onClick={() => scrollToSection(termsSections.findIndex((s) => s.title === result.title))}
                          className={`text-left w-full p-2 rounded hover:bg-opacity-80 transition-colors ${
                            darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
                          }`}
                        >
                          <p className={`font-medium ${darkMode ? "text-purple-300" : "text-indigo-600"}`}>
                            {result.title}
                          </p>
                          <p
                            className="text-sm truncate"
                            dangerouslySetInnerHTML={{
                              __html: highlightMatch(result.content.substring(0, 100) + "...", searchTerm),
                            }}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Saved highlights */}
            {showHighlights && highlightedText.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`mb-8 p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              >
                <h3 className="font-medium mb-2">Your Highlights:</h3>
                <ul className="space-y-2">
                  {highlightedText.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <p className={`text-sm flex-1 p-2 rounded ${darkMode ? "bg-gray-600" : "bg-yellow-100"}`}>
                        "{highlight}"
                      </p>
                      <button
                        onClick={() => removeHighlight(index)}
                        className={`p-1 rounded-full ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"}`}
                        aria-label="Remove highlight"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            <div className="space-y-6">
              {termsSections.map((section, index) => {
                const sectionHasHighlight = containsHighlight(section.content)
                const sectionRef = (el) => (sectionRefs.current[index] = el)

                return (
                  <motion.div
                    key={section.title}
                    ref={sectionRef}
                    variants={sectionVariants}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className={`border rounded-lg overflow-hidden transition-colors ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    } ${
                      sectionHasHighlight && showHighlights
                        ? darkMode
                          ? "ring-2 ring-yellow-500"
                          : "ring-2 ring-yellow-300"
                        : ""
                    }`}
                    onDoubleClick={handleTextSelection}
                  >
                    <div
                      className={`flex justify-between items-center p-4 cursor-pointer hover:bg-opacity-80 transition-colors ${
                        darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"
                      }`}
                      onClick={() => toggleSection(section.title)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && toggleSection(section.title)}
                      aria-expanded={expandedSections[section.title]}
                      aria-controls={`section-${index}`}
                    >
                      <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                        {section.title}

                        {/* Indicator if section has highlights */}
                        {sectionHasHighlight && showHighlights && (
                          <span
                            className={`ml-2 inline-block w-2 h-2 rounded-full ${
                              darkMode ? "bg-yellow-500" : "bg-yellow-400"
                            }`}
                          />
                        )}
                      </h2>
                      <motion.div
                        animate={{
                          rotate: expandedSections[section.title] ? 180 : 0,
                          transition: {
                            duration: 0.3,
                            ease: [0.25, 0.1, 0.25, 1],
                          },
                        }}
                      >
                        {expandedSections[section.title] ? (
                          <ChevronUp className={`h-5 w-5 ${darkMode ? "text-purple-400" : "text-indigo-600"}`} />
                        ) : (
                          <ChevronDown className={`h-5 w-5 ${darkMode ? "text-purple-400" : "text-indigo-600"}`} />
                        )}
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {expandedSections[section.title] && (
                        <motion.div
                          id={`section-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                              height: {
                                duration: 0.4,
                                ease: [0.25, 0.1, 0.25, 1],
                              },
                              opacity: {
                                duration: 0.3,
                                delay: 0.1,
                              },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: {
                                duration: 0.3,
                                ease: [0.25, 0.1, 0.25, 1],
                              },
                              opacity: {
                                duration: 0.2,
                              },
                            },
                          }}
                          className={`p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}
                        >
                          <p
                            className={`leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                            dangerouslySetInnerHTML={{
                              __html: searchTerm
                                ? highlightMatch(section.content, searchTerm)
                                : showHighlights
                                  ? applyHighlights(section.content)
                                  : section.content,
                            }}
                          />

                          <div className="mt-4 flex flex-wrap gap-2">
                            <motion.button
                              variants={buttonVariants}
                              initial="initial"
                              whileHover="hover"
                              whileTap="tap"
                              onClick={() => copyToClipboard(section.content, section.title)}
                              className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg ${
                                darkMode
                                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                                  : "bg-gray-100 text-indigo-600 hover:bg-gray-200"
                              }`}
                              aria-label={`Copy ${section.title} section`}
                            >
                              <Copy className="h-4 w-4" />
                              Copy
                            </motion.button>

                            <motion.button
                              variants={buttonVariants}
                              initial="initial"
                              whileHover="hover"
                              whileTap="tap"
                              onClick={() => shareContent(section.title)}
                              className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg ${
                                darkMode
                                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                                  : "bg-gray-100 text-indigo-600 hover:bg-gray-200"
                              }`}
                              aria-label={`Share ${section.title} section`}
                            >
                              <Share className="h-4 w-4" />
                              Share
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>

            {/* Accept Button */}
            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={acceptTerms}
                disabled={acceptedTerms}
                className={`px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  acceptedTerms
                    ? darkMode
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : darkMode
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white focus:ring-purple-500"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white focus:ring-indigo-500"
                }`}
                aria-label="Accept Terms and Conditions"
              >
                {acceptedTerms ? "Terms Accepted" : "I Accept the Terms"}
              </motion.button>

              {acceptedTerms && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-gray-500">
                  You've already accepted these terms on {new Date().toLocaleDateString()}
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* Footer */}
          <div
            className={`p-6 text-center text-sm ${
              darkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-600"
            }`}
          >
            <p>
              If you have any questions about these Terms and Conditions, please{" "}
              <a
                href="/contact"
                className={`hover:underline ${
                  darkMode ? "text-purple-400 hover:text-purple-300" : "text-indigo-600 hover:text-indigo-800"
                }`}
                aria-label="Contact us"
              >
                contact us
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
