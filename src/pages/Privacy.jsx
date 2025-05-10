import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
import {
  Search,
  ChevronDown,
  ChevronUp,
  Copy,
  Share2,
  Download,
  Globe,
  Filter,
  Bookmark,
  BookmarkX,
  Printer,
  Twitter,
  Linkedin,
  Mail,
  Calendar,
  Eye,
  EyeOff,
  MessageSquare,
  X,
  HelpCircle,
  FileText,
  Settings,
  Bell,
} from "lucide-react"

const PrivacyPolicy = () => {
  const [expandedSections, setExpandedSections] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredSections, setFilteredSections] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("English")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [bookmarkedSections, setBookmarkedSections] = useState(() => {
    const saved = localStorage.getItem("bookmarkedSections")
    return saved ? JSON.parse(saved) : []
  })
  const [lastReadSection, setLastReadSection] = useState(null)
  const [showTOC, setShowTOC] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem("fontSize")
    return saved || "medium"
  })
  const [showHighlights, setShowHighlights] = useState(true)
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Privacy Policy updated on May 7, 2025", read: false },
    { id: 2, text: "New data protection regulations in effect", read: false },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [readingTime, setReadingTime] = useState(0)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const containerRef = useRef(null)
  const sectionRefs = useRef({})
  const notificationsRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Privacy policy sections
  const policySections = [
    {
      category: "Introduction",
      title: "Introduction",
      content:
        "At TechCorp, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, services, and applications. Please read this policy carefully to understand our practices.",
    },
    {
      category: "Data Collection",
      title: "Information We Collect",
      content:
        "We collect personal information you provide, such as your name, email address, and payment details when you register or make a purchase. We also collect usage data, including IP addresses, browser types, and interactions with our services, to improve user experience.",
    },
    {
      category: "Data Collection",
      title: "Cookies and Tracking Technologies",
      content:
        "We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can manage cookie preferences through your browser settings or our consent management tool.",
    },
    {
      category: "Data Usage",
      title: "How We Use Your Information",
      content:
        "Your information is used to provide and improve our services, process transactions, send communications (e.g., newsletters), and comply with legal obligations. We may also use anonymized data for analytics and research purposes.",
    },
    {
      category: "Data Sharing",
      title: "Sharing Your Information",
      content:
        "We may share your information with trusted third parties, such as payment processors, analytics providers, or legal authorities when required. We do not sell your personal information to third parties for marketing purposes.",
    },
    {
      category: "Data Protection",
      title: "Data Security",
      content:
        "We implement industry-standard security measures, including AES-256 encryption, secure socket layer (SSL) technology, and regular security audits, to protect your data. However, no system is completely secure, and we cannot guarantee absolute security.",
    },
    {
      category: "User Rights",
      title: "Your Privacy Rights",
      content:
        "Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict the processing of your personal data. You can also object to certain uses of your data or request data portability. Contact us to exercise these rights.",
    },
    {
      category: "User Rights",
      title: "Opting Out of Communications",
      content:
        'You can opt out of marketing communications by clicking the "unsubscribe" link in our emails or updating your preferences in your account settings. You may still receive transactional emails related to your account.',
    },
    {
      category: "Third Parties",
      title: "Third-Party Links",
      content:
        "Our services may contain links to third-party websites. We are not responsible for the privacy practices or content of these sites. We encourage you to review their privacy policies before providing personal information.",
    },
    {
      category: "Updates",
      title: "Changes to This Privacy Policy",
      content:
        'We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on our website and updating the "Last Updated" date.',
    },
  ]

  // Categories and languages
  const categories = ["All", ...Array.from(new Set(policySections.map((section) => section.category)))]
  const languages = ["English", "Spanish", "French", "German", "Japanese", "Chinese"]

  // Font size options
  const fontSizeOptions = {
    small: {
      base: "text-sm",
      heading: "text-xl sm:text-2xl",
      subheading: "text-base",
    },
    medium: {
      base: "text-base",
      heading: "text-2xl sm:text-3xl",
      subheading: "text-lg",
    },
    large: {
      base: "text-lg",
      heading: "text-3xl sm:text-4xl",
      subheading: "text-xl",
    },
  }

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(mediaQuery.matches)

    const handler = (e) => setReduceMotion(e.matches)
    mediaQuery.addEventListener("change", handler)

    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  // Save bookmarked sections
  useEffect(() => {
    localStorage.setItem("bookmarkedSections", JSON.stringify(bookmarkedSections))
  }, [bookmarkedSections])

  // Save font size preference
  useEffect(() => {
    localStorage.setItem("fontSize", fontSize)
  }, [fontSize])

  // Calculate reading time
  useEffect(() => {
    const totalWords = policySections.reduce((acc, section) => {
      return acc + section.content.split(/\s+/).length
    }, 0)
    // Average reading speed: 200 words per minute
    setReadingTime(Math.ceil(totalWords / 200))
  }, [policySections])

  // Filter sections
  useEffect(() => {
    let results = policySections
    if (searchTerm) {
      results = results.filter(
        (section) =>
          section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          section.content.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    if (selectedCategory !== "All") {
      results = results.filter((section) => section.category === selectedCategory)
    }
    setFilteredSections(results)
  }, [searchTerm, selectedCategory])

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  // Track scroll progress and last read section
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top, height } = containerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const progress = Math.min(100, Math.max(0, ((windowHeight - top) / (height + windowHeight)) * 100))
        setScrollProgress(progress)

        // Show back to top button when scrolled down
        setShowBackToTop(window.scrollY > 300)

        // Find last read section
        let lastVisible = null
        Object.keys(sectionRefs.current).forEach((title) => {
          const el = sectionRefs.current[title]
          if (el) {
            const { top: sectionTop } = el.getBoundingClientRect()
            if (sectionTop < windowHeight / 2) {
              lastVisible = title
            }
          }
        })

        if (lastVisible) {
          setLastReadSection(lastVisible)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Parse URL hash for direct section navigation
  useEffect(() => {
    if (location.hash) {
      const sectionTitle = decodeURIComponent(location.hash.substring(1))
      const section = policySections.find((s) => s.title === sectionTitle)
      if (section) {
        setTimeout(() => {
          navigateToSection(section.title)
        }, 500)
      }
    }
  }, [location])

  // Toggle section expansion
  const toggleSection = (title) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  // Navigate to section with improved smooth scrolling
  const navigateToSection = useCallback((title) => {
    const element = sectionRefs.current[title]
    if (element) {
      // Use a more precise scrolling with offset for header
      const headerOffset = 100 // Increased offset for better visibility

      // Get the current scroll position
      const startPosition = window.pageYOffset

      // Calculate target position
      const targetPosition = element.getBoundingClientRect().top + startPosition - headerOffset

      // Smooth scroll with animation
      const duration = 800 // ms
      const start = performance.now()

      const animateScroll = (timestamp) => {
        const elapsed = timestamp - start
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for smoother animation
        const easeInOutCubic = (progress) =>
          progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2

        const easedProgress = easeInOutCubic(progress)

        window.scrollTo(0, startPosition + (targetPosition - startPosition) * easedProgress)

        if (progress < 1) {
          window.requestAnimationFrame(animateScroll)
        } else {
          // After scrolling is complete
          // Expand the section
          setExpandedSections((prev) => ({ ...prev, [title]: true }))

          // Close the TOC on mobile after navigation
          setShowTOC(false)

          // Update URL hash without triggering navigation
          window.history.replaceState(null, null, `#${encodeURIComponent(title)}`)
        }
      }

      window.requestAnimationFrame(animateScroll)
    }
  }, [])

  // Copy section to clipboard
  const copyToClipboard = useCallback((title, content) => {
    const text = `${title}\n${content}`
    navigator.clipboard.writeText(text).then(
      () => toast.success("Section copied to clipboard!", { icon: "📋" }),
      () => toast.error("Failed to copy section"),
    )
  }, [])

  // Share section
  const shareSection = useCallback((title, platform) => {
    const url = `${window.location.origin}${window.location.pathname}#${encodeURIComponent(title)}`
    const text = `Privacy Policy: ${title}`
    let shareUrl

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(
          "Privacy Policy",
        )}&body=${encodeURIComponent(`${text}\n${url}`)}`
        window.location.href = shareUrl
        toast.success("Email draft opened!", { icon: "📧" })
        return
      default:
        return
    }

    window.open(shareUrl, "_blank")
    toast.success(`Shared on ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`, {
      icon: "🌐",
    })
  }, [])

  // Download PDF (simulated)
  const downloadPDF = useCallback(() => {
    toast.success("Downloading Privacy Policy PDF...", { icon: "📄" })
    setTimeout(() => {
      toast.success("PDF downloaded successfully!")
    }, 1500)
  }, [])

  // Print preview
  const printPreview = useCallback(() => {
    toast.success("Opening print preview...", { icon: "🖨️" })
    setTimeout(() => {
      window.print()
    }, 500)
  }, [])
   // Change language (simulated)
  const changeLanguage = useCallback((lang) => {
    setLanguage(lang)
    toast.success(`Language switched to ${lang}!`, { icon: "🌍" })
  }, [])

  // Toggle bookmark section
  const toggleBookmark = useCallback((title) => {
    setBookmarkedSections((prev) => {
      if (prev.includes(title)) {
        toast.success("Section removed from bookmarks", { icon: "🔖" })
        return prev.filter((t) => t !== title)
      } else {
        toast.success("Section bookmarked!", { icon: "🔖" })
        return [...prev, title]
      }
    })
  }, [])

 
  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
    toast.success("All notifications marked as read", { icon: "✓" })
  }

  // Submit feedback
  const submitFeedback = useCallback(() => {
    if (!feedback.trim()) {
      toast.error("Feedback cannot be empty")
      return
    }
    toast.success("Feedback submitted! Thank you!", { icon: "📝" })
    setFeedback("")
    setShowFeedbackForm(false)
  }, [feedback])

  // Highlight search terms in content
  const highlightSearchTerms = (content) => {
    if (!searchTerm || !showHighlights) return content

    const regex = new RegExp(`(${searchTerm})`, "gi")
    const parts = content.split(regex)

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-700">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  // Animation variants with improved performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.4,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: reduceMotion ? 0 : 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: reduceMotion ? 1 : 1.03,
      transition: { duration: 0.15, ease: "easeOut" },
    },
    tap: { scale: reduceMotion ? 1 : 0.97, transition: { duration: 0.1 } },
  }

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: reduceMotion ? 0 : 0.3, ease: [0.25, 0.1, 0.25, 1] },
        opacity: { duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : 0.05 },
      },
    },
  }

  const progressVariants = {
    initial: { width: 0 },
    animate: {
      width: `${scrollProgress}%`,
      transition: { duration: 0.1, ease: "linear" },
    },
  }

  const tocVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.3,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: reduceMotion ? 0 : 0.03,
      },
    },
  }

  const tocItemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reduceMotion ? 0 : 0.2, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: reduceMotion ? 0 : 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: reduceMotion ? 0 : 0.1 },
    },
  }

  return (
    <div
      className={`min-h-screen py-6 md:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 text-gray-900 ${fontSizeOptions[fontSize].base}`}>
      <Toaster/>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Table of Contents (Sticky Sidebar) */}
        <motion.div className="lg:w-1/4 order-2 lg:order-1" variants={tocVariants} initial="hidden" animate="visible">
          <div className="lg:sticky lg:top-6 bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4 lg:mb-6">
              <h2 className={`${fontSizeOptions[fontSize].subheading} font-semibold text-gray-800`}>
                Table of Contents
              </h2>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setShowTOC(!showTOC)}
                className="lg:hidden text-indigo-600"
                aria-label={showTOC ? "Hide Table of Contents" : "Show Table of Contents"}
              >
                {showTOC ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </motion.button>
            </div>

            <div className="flex items-center gap-2 mb-4 text-sm">
              <Calendar className="h-4 w-4 text-indigo-600" />
              <span className="text-gray-600">Est. reading time: {readingTime} min</span>
            </div>

            <motion.ul
              className="space-y-2 hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
            >
              {policySections.map((section) => (
                <motion.li key={section.title} variants={tocItemVariants} className="text-sm">
                  <button
                    onClick={() => navigateToSection(section.title)}
                    className={`w-full text-left py-1.5 px-2 rounded hover:bg-indigo-50 transition-colors flex items-center justify-between ${
                      lastReadSection === section.title ? "text-indigo-600 font-medium" : "text-gray-600"
                    }`}
                    aria-label={`Navigate to ${section.title}`}
                  >
                    <span>{section.title}</span>
                    {bookmarkedSections.includes(section.title) && <Bookmark className="h-3 w-3 text-yellow-500" />}
                  </button>
                </motion.li>
              ))}
            </motion.ul>

            <AnimatePresence>
              {showTOC && (
                <motion.ul
                  className="space-y-2 lg:hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3 }}
                >
                  {policySections.map((section) => (
                    <motion.li key={section.title} variants={tocItemVariants} className="text-sm">
                      <button
                        onClick={() => navigateToSection(section.title)}
                        className={`w-full text-left py-1.5 px-2 rounded hover:bg-indigo-50 transition-colors flex items-center justify-between ${
                          lastReadSection === section.title ? "text-indigo-600 font-medium" : "text-gray-600"
                        }`}
                        aria-label={`Navigate to ${section.title}`}
                      >
                        <span>{section.title}</span>
                        {bookmarkedSections.includes(section.title) && <Bookmark className="h-3 w-3 text-yellow-500" />}
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`lg:w-3/4 max-w-4xl rounded-2xl shadow-xl overflow-hidden bg-white order-1 lg:order-2`}
          ref={containerRef}
        >
          {/* Progress Bar */}
          <motion.div className={`h-1 bg-gray-200`} variants={progressVariants} initial="initial" animate="animate">
            <motion.div className="h-full bg-indigo-600" />
          </motion.div>

          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 md:p-8 relative">
            <motion.h1 className={`${fontSizeOptions[fontSize].heading} font-bold text-center`} variants={itemVariants}>
              Privacy Policy
            </motion.h1>
            <motion.p className="text-sm text-center mt-2 opacity-80" variants={itemVariants}>
              Last Updated: May 8, 2025
            </motion.p>

            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={downloadPDF}
                className="p-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100"
                aria-label="Download PDF"
              >
                <Download className="h-5 w-5" />
              </motion.button>
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

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 relative"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {notifications.some((n) => !n.read) && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1 -translate-y-1"></span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                    >
                      <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-medium text-gray-800">Notifications</h3>
                        <button
                          onClick={markAllNotificationsAsRead}
                          className="text-xs text-indigo-600 hover:text-indigo-800"
                        >
                          Mark all as read
                        </button>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="p-4 text-center text-gray-500">No notifications</p>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 border-b border-gray-100 last:border-0 ${
                                notification.read ? "opacity-70" : ""
                              }`}
                            >
                              <p className="text-sm text-gray-800">{notification.text}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Search, Filter, and Language */}
          <div className="p-6 sm:p-10">
            <motion.div className="flex flex-col sm:flex-row gap-4 mb-8" variants={itemVariants}>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <motion.input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Privacy Policy..."
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white border-gray-300 text-gray-900`}
                  aria-label="Search Privacy Policy"
                  whileFocus={{ scale: reduceMotion ? 1 : 1.01, transition: { duration: 0.2 } }}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <motion.select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white border-gray-300 text-gray-900`}
                  aria-label="Filter by category"
                  whileFocus={{ scale: reduceMotion ? 1 : 1.01, transition: { duration: 0.2 } }}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </motion.select>
              </div>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <motion.select
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white border-gray-300 text-gray-900`}
                  aria-label="Select language"
                  whileFocus={{ scale: reduceMotion ? 1 : 1.01, transition: { duration: 0.2 } }}
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </motion.select>
              </div>
            </motion.div>

            {/* Policy Sections */}
            <div className="space-y-4">
              {filteredSections.length === 0 ? (
                <motion.p className={`text-center text-gray-500`} variants={itemVariants}>
                  No sections found. Try adjusting your search or category.
                </motion.p>
              ) : (
                filteredSections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className={`border rounded-lg overflow-hidden border-gray-200`}
                    ref={(el) => {
                      if (el) sectionRefs.current[section.title] = el
                    }}
                    id={encodeURIComponent(section.title)}
                  >
                    <div
                      className={`flex justify-between items-center p-4 cursor-pointer hover:bg-opacity-80 transition-colors bg-gray-50`}
                      onClick={() => toggleSection(section.title)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && toggleSection(section.title)}
                      aria-expanded={expandedSections[section.title]}
                      aria-controls={`section-${index}`}
                    >
                      <div className="flex-1">
                        <motion.h3
                          className={`text-lg font-semibold text-gray-800`}
                          whileHover={{ x: reduceMotion ? 0 : 3, transition: { duration: 0.2 } }}
                        >
                          {section.title}
                        </motion.h3>
                        <span className={`text-xs text-gray-500`}>{section.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleBookmark(section.title)
                          }}
                          className={`text-gray-400 hover:text-yellow-500 focus:outline-none`}
                          aria-label={bookmarkedSections.includes(section.title) ? "Remove bookmark" : "Add bookmark"}
                        >
                          {bookmarkedSections.includes(section.title) ? (
                            <BookmarkX className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </motion.button>
                        <motion.div
                          animate={{
                            rotate: expandedSections[section.title] ? 180 : 0,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.2,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                        >
                          {expandedSections[section.title] ? (
                            <ChevronUp className="h-5 w-5 text-indigo-600" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-indigo-600" />
                          )}
                        </motion.div>
                      </div>
                    </div>
                    <AnimatePresence initial={false}>
                      {expandedSections[section.title] && (
                        <motion.div
                          id={`section-${index}`}
                          variants={expandVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          className={`p-4 bg-white`}
                        >
                          <p className={`leading-relaxed text-gray-600`}>{highlightSearchTerms(section.content)}</p>
                          <div className="flex flex-wrap gap-4 mt-4">
                            <motion.button
                              variants={buttonVariants}
                              whileHover="hover"
                              whileTap="tap"
                              onClick={() => copyToClipboard(section.title, section.content)}
                              className={`flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1`}
                              aria-label={`Copy ${section.title}`}
                            >
                              <Copy className="h-4 w-4" />
                              Copy
                            </motion.button>
                            <motion.button
                              variants={buttonVariants}
                              whileHover="hover"
                              whileTap="tap"
                              onClick={() => toggleBookmark(section.title)}
                              className={`flex items-center gap-2 text-sm ${
                                bookmarkedSections.includes(section.title)
                                  ? "text-yellow-600 hover:text-yellow-700"
                                  : "text-indigo-600 hover:text-indigo-800"
                              } focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1`}
                              aria-label={`${
                                bookmarkedSections.includes(section.title) ? "Remove" : "Add"
                              } bookmark for ${section.title}`}
                            >
                              {bookmarkedSections.includes(section.title) ? (
                                <>
                                  <BookmarkX className="h-4 w-4" />
                                  Unbookmark
                                </>
                              ) : (
                                <>
                                  <Bookmark className="h-4 w-4" />
                                  Bookmark
                                </>
                              )}
                            </motion.button>
                            <div className="relative group">
                              <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className={`flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1`}
                                aria-label={`Share ${section.title}`}
                              >
                                <Share2 className="h-4 w-4" />
                                Share
                              </motion.button>
                              <div
                                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border hidden group-hover:block z-10 bg-white border-gray-100`}
                              >
                                <motion.button
                                  whileHover={{ backgroundColor: "#f1f5f9" }}
                                  onClick={() => shareSection(section.title, "twitter")}
                                  className={`w-full px-4 py-2 text-sm text-left flex items-center gap-2 text-gray-700`}
                                >
                                  <Twitter className="w-4 h-4" />
                                  Twitter
                                </motion.button>
                                <motion.button
                                  whileHover={{ backgroundColor: "#f1f5f9" }}
                                  onClick={() => shareSection(section.title, "linkedin")}
                                  className={`w-full px-4 py-2 text-sm text-left flex items-center gap-2 text-gray-700`}
                                >
                                  <Linkedin className="w-4 h-4" />
                                  LinkedIn
                                </motion.button>
                                <motion.button
                                  whileHover={{ backgroundColor: "#f1f5f9" }}
                                  onClick={() => shareSection(section.title, "email")}
                                  className={`w-full px-4 py-2 text-sm text-left flex items-center gap-2 text-gray-700`}
                                >
                                  <Mail className="w-4 h-4" />
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

            {/* Feedback Section */}
            <motion.div
              className="mt-10"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className={`${fontSizeOptions[fontSize].subheading} font-semibold text-gray-800`}>Feedback</h3>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setShowFeedbackForm(!showFeedbackForm)}
                  className={`text-sm text-indigo-600 flex items-center gap-1`}
                >
                  {showFeedbackForm ? "Hide Form" : "Show Form"}
                  {showFeedbackForm ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </motion.button>
              </div>

              <AnimatePresence>
                {showFeedbackForm && (
                  <motion.div initial="hidden" animate="visible" exit="exit" variants={fadeInVariants}>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Share your thoughts on our Privacy Policy..."
                      className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white border-gray-300 text-gray-900`}
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
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              className="mt-10 text-center"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className={`mb-4 text-gray-600`}>
                Have questions about our Privacy Policy?{" "}
                <Link
                  to="/contact"
                  className={`text-indigo-600 hover:text-indigo-800 underline`}
                  aria-label="Contact support"
                >
                  Contact our support team
                </Link>
                .
              </p>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => {
                  toast.success("Redirecting to support...", { icon: "📞" })
                  navigate("/contact")
                }}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Contact Support"
              >
                Get Support
              </motion.button>
            </motion.div>

            {/* Help Section */}
            <motion.div
              className={`mt-10 p-4 rounded-lg bg-gray-50`}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-3">
                <HelpCircle className={`h-5 w-5 mt-0.5 text-indigo-600`} />
                <div>
                  <h3 className={`${fontSizeOptions[fontSize].subheading} font-semibold text-gray-800 mb-2`}>
                    Need Help?
                  </h3>
                  <p className={`text-gray-600 mb-3`}>
                    If you need assistance understanding our privacy policy or have concerns about your data, we're here
                    to help.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/faq"
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-white text-gray-800 hover:bg-gray-100 transition-colors`}
                    >
                      <FileText className="h-4 w-4" />
                      Privacy FAQs
                    </Link>
                    <Link
                      to="/chat"
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors`}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Chat with Support
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className={`p-6 text-center text-sm bg-gray-100 text-gray-600`}>
            <p>
              TechCorp © 2025. All rights reserved.{" "}
              <Link
                to="/terms"
                className={`text-indigo-600 hover:text-indigo-800 underline`}
                aria-label="View Terms and Conditions"
              >
                Terms and Conditions
              </Link>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
