// import { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { ArrowRight, X, Mail, ChevronLeft, ChevronRight } from "lucide-react"

// const Header = () => {
//   // State management
//   const [currentImage, setCurrentImage] = useState(0)
//   const [isPaused, setIsPaused] = useState(false)
//   const [showSubscribeModal, setShowSubscribeModal] = useState(false)
//   const [showExplorePage, setShowExplorePage] = useState(false)
//   const [email, setEmail] = useState("")
//   const [isSubscribed, setIsSubscribed] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [touchStart, setTouchStart] = useState(0)
//   const [touchEnd, setTouchEnd] = useState(0)
//   const sliderRef = useRef(null)

//   const images = [
//     {
//       url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       title: "Innovative Tech Solutions",
//       description: "Discover cutting-edge technology that transforms the way we live and work.",
//     },
//     {
//       url: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       title: "Next-Gen Hardware",
//       description: "Explore the latest advancements in hardware technology and devices.",
//     },
//     {
//       url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80",
//       title: "Cloud Computing Excellence",
//       description: "Leverage the power of cloud technology for your business and personal needs.",
//     },
//     {
//       url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       title: "AI & Machine Learning",
//       description: "Harness the potential of artificial intelligence to solve complex problems.",
//     },
//   ]

  
//   const fallbackImage =
//     "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"


//   const techInnovations = [
//     {
//       id: 1,
//       title: "Quantum Computing",
//       description:
//         "Explore the revolutionary world of quantum computing and its potential to solve complex problems exponentially faster than classical computers.",
//       image:
//         "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       category: "Computing",
//     },
//     {
//       id: 2,
//       title: "Augmented Reality",
//       description:
//         "Discover how augmented reality is transforming industries from gaming and entertainment to healthcare and education.",
//       image:
//         "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       category: "Immersive Tech",
//     },
//     {
//       id: 3,
//       title: "Sustainable Energy",
//       description:
//         "Learn about cutting-edge sustainable energy technologies that are helping combat climate change and reduce our carbon footprint.",
//       image:
//         "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
//       category: "Green Tech",
//     },
//     {
//       id: 4,
//       title: "Biotechnology",
//       description:
//         "Explore the intersection of biology and technology that's revolutionizing healthcare, agriculture, and environmental conservation.",
//       image:
//         "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       category: "Healthcare",
//     },
//     {
//       id: 5,
//       title: "5G Technology",
//       description:
//         "Understand how 5G is enabling faster connectivity, powering IoT devices, and creating new possibilities for remote work and entertainment.",
//       image:
//         "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       category: "Connectivity",
//     },
//     {
//       id: 6,
//       title: "Robotics",
//       description:
//         "Discover the latest advancements in robotics that are automating industries and assisting humans in complex tasks.",
//       image:
//         "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       category: "Automation",
//     },
//   ]

//   // Check if user is subscribed (from localStorage)
//   useEffect(() => {
//     const subscriptionStatus = localStorage.getItem("isSubscribed")
//     if (subscriptionStatus === "true") {
//       setIsSubscribed(true)
//     }
//   }, [])

//   // Automatic slideshow with proper timing (3 seconds)
//   useEffect(() => {
//     if (!isPaused) {
//       const interval = setInterval(() => {
//         setCurrentImage((prev) => (prev + 1) % images.length)
//       }, 3000) // Change every 3 seconds for better user experience
//       return () => clearInterval(interval)
//     }
//   }, [isPaused, images.length])

//   // Handle image load error
//   const handleImageError = (e) => {
//     e.target.src = fallbackImage
//   }

//   // Handle explore button click
//   const handleExploreClick = () => {
//     if (!isSubscribed) {
//       setShowSubscribeModal(true)
//     } else {
//       setShowExplorePage(true)
//       // Scroll to top with smooth behavior
//       window.scrollTo({ top: 0, behavior: "smooth" })
//     }
//   }

//   // Handle subscription form submission
//   const handleSubscribe = (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false)
//       setIsSubscribed(true)
//       localStorage.setItem("isSubscribed", "true")
//       setShowSubscribeModal(false)
//       setShowExplorePage(true)
//       // Scroll to top with smooth behavior
//       window.scrollTo({ top: 0, behavior: "smooth" })
//     }, 1500)
//   }

//   // Handle manual navigation
//   const goToSlide = (index) => {
//     setCurrentImage(index)
//     setIsPaused(true)
//     // Resume auto-play after 5 seconds of inactivity
//     setTimeout(() => setIsPaused(false), 5000)
//   }

//   const nextSlide = () => {
//     setCurrentImage((prev) => (prev + 1) % images.length)
//     setIsPaused(true)
//     setTimeout(() => setIsPaused(false), 5000)
//   }

//   const prevSlide = () => {
//     setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
//     setIsPaused(true)
//     setTimeout(() => setIsPaused(false), 5000)
//   }

//   // Touch handlers for mobile swipe
//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX)
//   }

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX)
//   }

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 50) {
//       // Swipe left
//       nextSlide()
//     }

//     if (touchStart - touchEnd < -50) {
//       // Swipe right
//       prevSlide()
//     }
//   }

//   // Animation variants
//   const textVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
//   }

//   const buttonVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.3 } },
//     hover: { scale: 1.05, transition: { duration: 0.2 } },
//   }

//   const imageVariants = {
//     enter: { opacity: 0 },
//     center: { opacity: 1, transition: { duration: 0.8 } },
//     exit: { opacity: 0, transition: { duration: 0.8 } },
//   }

//   const modalVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
//     exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
//   }

//   const pageTransition = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.5 } },
//     exit: { opacity: 0, transition: { duration: 0.5 } },
//   }

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.1,
//         duration: 0.5,
//       },
//     }),
//     hover: {
//       y: -10,
//       boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//       transition: { duration: 0.2 },
//     },
//   }

//   return (
//     <>
//       <AnimatePresence mode="wait">
//         {!showExplorePage ? (
//           <motion.header
//             key="header"
//             className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] bg-gray-900 dark:bg-gray-800 overflow-hidden"
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//             ref={sliderRef}
//             variants={pageTransition}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             {/* Image Slideshow */}
//             <AnimatePresence initial={false}>
//               <motion.div
//                 key={currentImage}
//                 className="absolute inset-0 w-full h-full"
//                 variants={imageVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//               >
//                 <img
//                   src={images[currentImage].url || "/placeholder.svg"}
//                   alt={`Tech background ${currentImage + 1}`}
//                   className="absolute inset-0 w-full h-full object-cover"
//                   onError={handleImageError}
//                   loading="lazy"
//                 />
//                 {/* Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 dark:from-black/60 dark:to-black/80"></div>
//               </motion.div>
//             </AnimatePresence>

//             {/* Content */}
//             <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
//               <motion.h1
//                 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
//                 variants={textVariants}
//                 initial="hidden"
//                 animate="visible"
//                 key={`title-${currentImage}`}
//               >
//                 {images[currentImage].title}
//               </motion.h1>
//               <motion.p
//                 className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mb-8"
//                 variants={textVariants}
//                 initial="hidden"
//                 animate="visible"
//                 key={`desc-${currentImage}`}
//               >
//                 {images[currentImage].description}
//               </motion.p>
//               <motion.button
//                 onClick={handleExploreClick}
//                 className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg font-medium transition-colors"
//                 variants={buttonVariants}
//                 initial="hidden"
//                 animate="visible"
//                 whileHover="hover"
//                 aria-label="Explore products"
//               >
//                 Explore Now <ArrowRight className="ml-2 h-5 w-5" />
//               </motion.button>
//             </div>

//             {/* Navigation Arrows */}
//             <button
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20 hidden sm:block"
//               onClick={prevSlide}
//               aria-label="Previous slide"
//             >
//               <ChevronLeft className="h-6 w-6" />
//             </button>
//             <button
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20 hidden sm:block"
//               onClick={nextSlide}
//               aria-label="Next slide"
//             >
//               <ChevronRight className="h-6 w-6" />
//             </button>

//             {/* Slideshow Indicators */}
//             <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
//               {images.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === currentImage ? "bg-white w-6" : "bg-white/50"
//                   }`}
//                   onClick={() => goToSlide(index)}
//                   aria-label={`Go to slide ${index + 1}`}
//                 ></button>
//               ))}
//             </div>
//           </motion.header>
//         ) : (
//           <motion.div
//             key="explore-page"
//             className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16"
//             variants={pageTransition}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             {/* Explore Page Header */}
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="text-center mb-16">
//                 <motion.h1
//                   className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   Cutting-Edge Tech Innovations
//                 </motion.h1>
//                 <motion.p
//                   className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                 >
//                   Discover the latest technological breakthroughs that are shaping our future and transforming
//                   industries worldwide.
//                 </motion.p>
//               </div>

//               {/* Filter Categories */}
//               <motion.div
//                 className="flex flex-wrap justify-center gap-3 mb-12"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//               >
//                 <button className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium">All</button>
//                 <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
//                   Computing
//                 </button>
//                 <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
//                   Immersive Tech
//                 </button>
//                 <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
//                   Green Tech
//                 </button>
//                 <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
//                   Healthcare
//                 </button>
//               </motion.div>

//               {/* Innovation Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {techInnovations.map((innovation, index) => (
//                   <motion.div
//                     key={innovation.id}
//                     className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
//                     variants={cardVariants}
//                     custom={index}
//                     initial="hidden"
//                     animate="visible"
//                     whileHover="hover"
//                   >
//                     <div className="h-48 overflow-hidden">
//                       <img
//                         src={innovation.image || "/placeholder.svg"}
//                         alt={innovation.title}
//                         className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                         onError={handleImageError}
//                       />
//                     </div>
//                     <div className="p-6">
//                       <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-semibold rounded-full mb-3">
//                         {innovation.category}
//                       </span>
//                       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{innovation.title}</h3>
//                       <p className="text-gray-600 dark:text-gray-300 mb-4">{innovation.description}</p>
//                       <button className="text-purple-600 dark:text-purple-400 font-medium inline-flex items-center hover:underline">
//                         Learn more <ArrowRight className="ml-1 h-4 w-4" />
//                       </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Back Button */}
//               <div className="mt-12 text-center">
//                 <motion.button
//                   onClick={() => setShowExplorePage(false)}
//                   className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors inline-flex items-center"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <ChevronLeft className="mr-2 h-5 w-5" /> Back to Home
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Subscribe Modal */}
//       <AnimatePresence>
//         {showSubscribeModal && (
//           <motion.div
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setShowSubscribeModal(false)}
//           >
//             <motion.div
//               className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full"
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
//                   <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
//                 </div>
//                 <button
//                   onClick={() => setShowSubscribeModal(false)}
//                   className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Join Our Tech Community</h3>
//               <p className="text-gray-600 dark:text-gray-300 mb-6">
//                 Subscribe to get exclusive access to our latest tech innovations, special offers, and insider content.
//               </p>
//               <form onSubmit={handleSubscribe} className="space-y-4">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="you@example.com"
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
//                     required
//                   />
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="consent"
//                     className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
//                     required
//                   />
//                   <label htmlFor="consent" className="ml-2 block text-sm text-gray-600 dark:text-gray-300">
//                     I agree to receive marketing emails and can unsubscribe at any time.
//                   </label>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <svg
//                       className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                   ) : null}
//                   {isLoading ? "Subscribing..." : "Subscribe & Continue"}
//                 </button>
//               </form>
//               <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
//                 Already subscribed?{" "}
//                 <button
//                   onClick={() => {
//                     setIsSubscribed(true)
//                     localStorage.setItem("isSubscribed", "true")
//                     setShowSubscribeModal(false)
//                     setShowExplorePage(true)
//                   }}
//                   className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
//                 >
//                   Continue to explore
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }

// export default Header
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  X,
  Mail,
  ChevronLeft,
  ChevronRight,
  Share2,
  Bookmark,
  BookmarkCheck,
  Heart,
  ExternalLink,
  Star,
  Clock,
  Download,
  Sparkles,
  Lightbulb,
  Cpu,
  Globe,
  Shield,
  Wifi,
  Search,
} from "lucide-react"

const Header = () => {
  // State management
  const [currentImage, setCurrentImage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showSubscribeModal, setShowSubscribeModal] = useState(false)
  const [showExplorePage, setShowExplorePage] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [activeFilter, setActiveFilter] = useState("All")
  const [expandedCard, setExpandedCard] = useState(null)
  const [savedItems, setSavedItems] = useState([])
  const [likedItems, setLikedItems] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  const sliderRef = useRef(null)
  const searchInputRef = useRef(null)

  // Hero slider images
  const images = [
    {
      url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Innovative Tech Solutions",
      description: "Discover cutting-edge technology that transforms the way we live and work.",
    },
    {
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Next-Gen Hardware",
      description: "Explore the latest advancements in hardware technology and devices.",
    },
    {
      url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80",
      title: "Cloud Computing Excellence",
      description: "Leverage the power of cloud technology for your business and personal needs.",
    },
    {
      url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "AI & Machine Learning",
      description: "Harness the potential of artificial intelligence to solve complex problems.",
    },
  ]

  // Fallback image
  const fallbackImage =
    "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"

  // Expanded tech innovations list with more cards
  const techInnovations = [
    {
      id: 1,
      title: "Quantum Computing",
      description:
        "Explore the revolutionary world of quantum computing and its potential to solve complex problems exponentially faster than classical computers.",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Computing",
      rating: 4.9,
      date: "2023-10-15",
      readTime: "8 min read",
      tags: ["quantum", "computing", "technology"],
      details:
        "Quantum computing leverages quantum mechanics principles to process information in ways that classical computers cannot. Using quantum bits or 'qubits', these systems can exist in multiple states simultaneously, enabling them to solve complex problems like factoring large numbers and simulating quantum systems with unprecedented efficiency. Major tech companies including IBM, Google, and Microsoft are racing to develop practical quantum computers that could revolutionize fields from cryptography to drug discovery.",
      features: ["Exponential processing power", "Quantum encryption", "Complex problem solving"],
    },
    {
      id: 2,
      title: "Augmented Reality",
      description:
        "Discover how augmented reality is transforming industries from gaming and entertainment to healthcare and education.",
      image:
        "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Immersive Tech",
      rating: 4.7,
      date: "2023-09-28",
      readTime: "6 min read",
      tags: ["AR", "immersive", "virtual"],
      details:
        "Augmented Reality (AR) overlays digital information onto the physical world, creating an interactive experience that enhances our perception of reality. Unlike Virtual Reality, AR doesn't replace the real environment but supplements it with computer-generated perceptual information. Applications range from entertainment (like Pokémon GO) to practical uses in medicine, where surgeons can visualize 3D anatomical data during operations, and in education, where complex concepts can be visualized in 3D space.",
      features: ["Real-time interaction", "Spatial mapping", "Object recognition"],
    },
    {
      id: 3,
      title: "Sustainable Energy",
      description:
        "Learn about cutting-edge sustainable energy technologies that are helping combat climate change and reduce our carbon footprint.",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      category: "Green Tech",
      rating: 4.8,
      date: "2023-11-05",
      readTime: "7 min read",
      tags: ["renewable", "sustainable", "green"],
      details:
        "Sustainable energy technologies are revolutionizing how we generate and consume power. Solar photovoltaics have become increasingly efficient and affordable, while wind turbines now generate more electricity at lower costs. Advanced battery storage solutions are addressing intermittency issues, making renewable energy more reliable. Emerging technologies like perovskite solar cells, which can be printed on flexible surfaces, and hydrogen fuel cells for transportation and grid storage, promise to further accelerate the transition to clean energy.",
      features: ["Zero emissions", "Renewable sources", "Energy storage solutions"],
    },
    {
      id: 4,
      title: "Biotechnology",
      description:
        "Explore the intersection of biology and technology that's revolutionizing healthcare, agriculture, and environmental conservation.",
      image:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Healthcare",
      rating: 4.6,
      date: "2023-08-12",
      readTime: "9 min read",
      tags: ["biotech", "medicine", "genetics"],
      details:
        "Biotechnology harnesses cellular and biomolecular processes to develop technologies and products that help improve our lives. Recent breakthroughs include CRISPR gene editing, which allows precise modification of DNA sequences and has potential applications in treating genetic disorders. Synthetic biology is enabling the design and construction of new biological parts and systems, while bioinformatics combines computer science with biology to analyze vast amounts of biological data, accelerating discoveries in personalized medicine and drug development.",
      features: ["Gene editing", "Synthetic biology", "Personalized medicine"],
    },
    {
      id: 5,
      title: "5G Technology",
      description:
        "Understand how 5G is enabling faster connectivity, powering IoT devices, and creating new possibilities for remote work and entertainment.",
      image:
        "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Connectivity",
      rating: 4.5,
      date: "2023-10-03",
      readTime: "5 min read",
      tags: ["5G", "wireless", "connectivity"],
      details:
        "5G technology represents a significant leap in wireless communication, offering speeds up to 100 times faster than 4G, with much lower latency and higher capacity. This enables real-time applications like autonomous vehicles, remote surgery, and immersive AR/VR experiences. The technology uses higher frequency radio waves and smaller cells to deliver more data faster. Beyond consumer applications, 5G is powering Industry 4.0, enabling smart factories with connected sensors and machines that communicate in real-time to optimize production processes.",
      features: ["Ultra-low latency", "Massive device connectivity", "Enhanced mobile broadband"],
    },
    {
      id: 6,
      title: "Robotics",
      description:
        "Discover the latest advancements in robotics that are automating industries and assisting humans in complex tasks.",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Automation",
      rating: 4.7,
      date: "2023-09-18",
      readTime: "6 min read",
      tags: ["robotics", "automation", "AI"],
      details:
        "Modern robotics combines mechanical engineering, electrical engineering, computer science, and artificial intelligence to create machines that can perform complex tasks autonomously or semi-autonomously. Recent advances include collaborative robots or 'cobots' that work alongside humans in manufacturing, autonomous mobile robots for logistics and warehousing, and increasingly sophisticated humanoid robots. Machine learning is enabling robots to adapt to new situations and learn from experience, while improvements in sensors and actuators are making robots more capable of precise manipulation and navigation in unstructured environments.",
      features: ["Autonomous navigation", "Machine learning integration", "Human-robot collaboration"],
    },
    {
      id: 7,
      title: "Blockchain Technology",
      description:
        "Explore how blockchain is revolutionizing finance, supply chain management, and digital identity verification.",
      image:
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
      category: "Computing",
      rating: 4.4,
      date: "2023-11-12",
      readTime: "7 min read",
      tags: ["blockchain", "cryptocurrency", "decentralized"],
      details:
        "Blockchain technology provides a decentralized, immutable ledger that records transactions across many computers. Beyond cryptocurrencies like Bitcoin, blockchain is being applied to supply chain management to track products from origin to consumer, in healthcare to secure patient records while maintaining privacy, and in voting systems to ensure transparency and prevent fraud. Smart contracts—self-executing contracts with the terms directly written into code—are automating complex business processes and eliminating the need for intermediaries in many transactions.",
      features: ["Decentralized architecture", "Smart contracts", "Immutable record-keeping"],
    },
    {
      id: 8,
      title: "Edge Computing",
      description:
        "Learn how edge computing is bringing computation closer to data sources, reducing latency and enabling real-time applications.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
      category: "Computing",
      rating: 4.6,
      date: "2023-10-25",
      readTime: "5 min read",
      tags: ["edge", "computing", "IoT"],
      details:
        "Edge computing processes data near the source of generation rather than sending it to centralized data centers, reducing latency and bandwidth use. This is crucial for applications requiring real-time processing like autonomous vehicles, industrial automation, and smart cities. By distributing computing resources closer to where data is generated, edge computing also enhances privacy and security by keeping sensitive data local. The technology complements cloud computing rather than replacing it, creating a continuum of computing resources from the device to the cloud.",
      features: ["Reduced latency", "Bandwidth optimization", "Enhanced privacy"],
    },
    {
      id: 9,
      title: "Virtual Reality",
      description:
        "Immerse yourself in the world of virtual reality and its applications in gaming, training, therapy, and remote collaboration.",
      image:
        "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Immersive Tech",
      rating: 4.8,
      date: "2023-08-30",
      readTime: "8 min read",
      tags: ["VR", "immersive", "virtual"],
      details:
        "Virtual Reality (VR) creates a completely immersive experience by replacing the real world with a simulated one. Modern VR systems use head-mounted displays with high-resolution screens, precise motion tracking, and sophisticated controllers to create convincing virtual environments. Beyond gaming and entertainment, VR is being used for medical training, allowing surgeons to practice procedures in a risk-free environment, for exposure therapy to treat phobias and PTSD, and for virtual collaboration, enabling teams to work together in shared virtual spaces regardless of physical location.",
      features: ["Full immersion", "Spatial audio", "6DoF tracking"],
    },
    {
      id: 10,
      title: "Artificial Intelligence",
      description:
        "Discover how AI is transforming industries through machine learning, natural language processing, and computer vision.",
      image:
        "https://images.unsplash.com/photo-1677442135136-760c813028c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
      category: "Computing",
      rating: 4.9,
      date: "2023-11-08",
      readTime: "10 min read",
      tags: ["AI", "machine learning", "neural networks"],
      details:
        "Artificial Intelligence (AI) is revolutionizing how we interact with technology and solve complex problems. Machine learning algorithms can now recognize patterns in vast datasets, enabling applications from fraud detection in financial services to personalized recommendations in e-commerce. Natural Language Processing (NLP) powers virtual assistants and real-time translation services, while computer vision enables everything from facial recognition to autonomous vehicles. Recent advances in generative AI, exemplified by models like GPT-4 and DALL-E, can create human-like text, images, and even code, opening new frontiers in creative and knowledge work.",
      features: ["Deep learning", "Natural language understanding", "Predictive analytics"],
    },
    {
      id: 11,
      title: "Internet of Things",
      description:
        "Explore the interconnected world of IoT devices and how they're creating smarter homes, cities, and industries.",
      image:
        "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Connectivity",
      rating: 4.5,
      date: "2023-09-05",
      readTime: "6 min read",
      tags: ["IoT", "smart devices", "connected"],
      details:
        "The Internet of Things (IoT) connects everyday objects to the internet, enabling them to send and receive data. This network of physical devices embedded with sensors, software, and connectivity is transforming how we interact with our environment. In smart homes, IoT devices control lighting, temperature, and security systems. In agriculture, sensors monitor soil moisture and crop health to optimize irrigation and fertilization. In healthcare, wearable devices track vital signs and medication adherence. The true power of IoT emerges when these devices work together, creating intelligent systems that can automate processes and provide valuable insights.",
      features: ["Sensor integration", "Remote monitoring", "Automated systems"],
    },
    {
      id: 12,
      title: "Cybersecurity",
      description:
        "Learn about advanced cybersecurity measures protecting digital assets from increasingly sophisticated threats.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Security",
      rating: 4.7,
      date: "2023-10-20",
      readTime: "7 min read",
      tags: ["security", "encryption", "protection"],
      details:
        "Modern cybersecurity goes far beyond traditional antivirus software, employing multiple layers of defense to protect systems and data. Zero-trust architecture assumes no user or system should be trusted by default, requiring verification from anyone trying to access resources. AI-powered security systems can detect anomalies and potential threats by analyzing patterns in network traffic. Quantum-resistant cryptography is being developed to protect against future quantum computers that could break current encryption methods. As threats evolve, cybersecurity continues to advance, with techniques like behavioral biometrics and continuous authentication providing more robust protection than traditional password-based systems.",
      features: ["Zero-trust architecture", "AI threat detection", "Quantum-resistant encryption"],
    },
  ]

  // Available filter categories
  const categories = [
    "All",
    "Computing",
    "Immersive Tech",
    "Green Tech",
    "Healthcare",
    "Connectivity",
    "Automation",
    "Security",
  ]

  // Check if user is subscribed (from localStorage)
  useEffect(() => {
    const subscriptionStatus = localStorage.getItem("isSubscribed")
    if (subscriptionStatus === "true") {
      setIsSubscribed(true)
    }

    // Load saved and liked items from localStorage
    const savedFromStorage = JSON.parse(localStorage.getItem("savedItems") || "[]")
    const likedFromStorage = JSON.parse(localStorage.getItem("likedItems") || "[]")
    setSavedItems(savedFromStorage)
    setLikedItems(likedFromStorage)
  }, [])

  // Automatic slideshow with proper timing (3 seconds)
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length)
      }, 3000) // Change every 3 seconds for better user experience
      return () => clearInterval(interval)
    }
  }, [isPaused, images.length])

  // Handle image load error
  const handleImageError = (e) => {
    e.target.src = fallbackImage
  }

  // Handle explore button click
  const handleExploreClick = () => {
    if (!isSubscribed) {
      setShowSubscribeModal(true)
    } else {
      setShowExplorePage(true)
      // Scroll to top with smooth behavior
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Handle subscription form submission
  const handleSubscribe = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubscribed(true)
      localStorage.setItem("isSubscribed", "true")
      setShowSubscribeModal(false)
      setShowExplorePage(true)
      // Scroll to top with smooth behavior
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 1500)
  }

  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentImage(index)
    setIsPaused(true)
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => setIsPaused(false), 5000)
  }

  const nextSlide = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 5000)
  }

  const prevSlide = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 5000)
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide()
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide()
    }
  }

  // Handle filter change
  const handleFilterChange = (category) => {
    setActiveFilter(category)
    // Reset expanded card when changing filters
    setExpandedCard(null)
  }

  // Handle card expansion
  const toggleCardExpansion = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null)
    } else {
      setExpandedCard(id)
    }
  }

  // Handle saving/bookmarking items
  const toggleSaveItem = (id) => {
    let newSavedItems
    if (savedItems.includes(id)) {
      newSavedItems = savedItems.filter((itemId) => itemId !== id)
    } else {
      newSavedItems = [...savedItems, id]
    }
    setSavedItems(newSavedItems)
    localStorage.setItem("savedItems", JSON.stringify(newSavedItems))
  }

  // Handle liking items
  const toggleLikeItem = (id) => {
    let newLikedItems
    if (likedItems.includes(id)) {
      newLikedItems = likedItems.filter((itemId) => itemId !== id)
    } else {
      newLikedItems = [...likedItems, id]
    }
    setLikedItems(newLikedItems)
    localStorage.setItem("likedItems", JSON.stringify(newLikedItems))
  }

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  // Filter and sort innovations
  const filteredInnovations = techInnovations
    .filter((item) => {
      // Filter by category
      const categoryMatch = activeFilter === "All" || item.category === activeFilter

      // Filter by search query
      const searchMatch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

      return categoryMatch && searchMatch
    })
    .sort((a, b) => {
      // Sort based on selected option
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date)
        case "oldest":
          return new Date(a.date) - new Date(b.date)
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  }

  const imageVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.8 } },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  }

  const pageTransition = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hover: {
      y: -10,
      transition: { duration: 0.2 },
    },
  }

  const expandVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  }

  const iconButtonVariants = {
    hover: { scale: 1.2, transition: { duration: 0.2 } },
    tap: { scale: 0.9 },
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!showExplorePage ? (
          <motion.header
            key="header"
            className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] bg-gray-900 dark:bg-gray-800 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={sliderRef}
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Image Slideshow */}
            <AnimatePresence initial={false}>
              <motion.div
                key={currentImage}
                className="absolute inset-0 w-full h-full"
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <img
                  src={images[currentImage].url || "/placeholder.svg"}
                  alt={`Tech background ${currentImage + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={handleImageError}
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 dark:from-black/60 dark:to-black/80"></div>
              </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                key={`title-${currentImage}`}
              >
                {images[currentImage].title}
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mb-8"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                key={`desc-${currentImage}`}
              >
                {images[currentImage].description}
              </motion.p>
              <motion.button
                onClick={handleExploreClick}
                className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg font-medium transition-colors"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                aria-label="Explore products"
              >
                Explore Now <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </div>

            {/* Navigation Arrows */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20 hidden sm:block"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20 hidden sm:block"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Slideshow Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImage ? "bg-white w-6" : "bg-white/50"
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </motion.header>
        ) : (
          <motion.div
            key="explore-page"
            className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16"
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Explore Page Header */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Cutting-Edge Tech Innovations
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Discover the latest technological breakthroughs that are shaping our future and transforming
                  industries worldwide.
                </motion.p>
              </div>

              {/* Search and Sort Controls */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="relative w-full md:w-96">
                    <input
                      type="text"
                      placeholder="Search innovations..."
                      value={searchQuery}
                      onChange={handleSearch}
                      ref={searchInputRef}
                      className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <label htmlFor="sort" className="text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      Sort by:
                    </label>
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={handleSortChange}
                      className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Filter Categories */}
              <motion.div
                className="flex flex-wrap justify-center gap-3 mb-12 overflow-x-auto pb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilterChange(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      activeFilter === category
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>

              {/* Results count */}
              <motion.div
                className="mb-6 text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Showing {filteredInnovations.length} {filteredInnovations.length === 1 ? "result" : "results"}
                {activeFilter !== "All" && ` in ${activeFilter}`}
                {searchQuery && ` for "${searchQuery}"`}
              </motion.div>

              {/* Innovation Cards */}
              {filteredInnovations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredInnovations.map((innovation, index) => (
                    <motion.div
                      key={innovation.id}
                      className="rounded-xl overflow-hidden backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all"
                      variants={cardVariants}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={innovation.image || "/placeholder.svg"}
                          alt={innovation.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          onError={handleImageError}
                        />
                        <div className="absolute top-0 right-0 p-2 flex gap-2">
                          <motion.button
                            className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700"
                            variants={iconButtonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleLikeItem(innovation.id)
                            }}
                            aria-label={likedItems.includes(innovation.id) ? "Unlike" : "Like"}
                          >
                            <Heart
                              className={`h-5 w-5 ${likedItems.includes(innovation.id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </motion.button>
                          <motion.button
                            className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700"
                            variants={iconButtonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleSaveItem(innovation.id)
                            }}
                            aria-label={savedItems.includes(innovation.id) ? "Unsave" : "Save"}
                          >
                            {savedItems.includes(innovation.id) ? (
                              <BookmarkCheck className="h-5 w-5 fill-purple-500 text-purple-500" />
                            ) : (
                              <Bookmark className="h-5 w-5" />
                            )}
                          </motion.button>
                        </div>
                        <div className="absolute bottom-0 left-0 p-2">
                          <span className="inline-block px-3 py-1 bg-purple-600/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                            {innovation.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{innovation.title}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">{innovation.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{innovation.readTime}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(innovation.date).toLocaleDateString()}</span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-4">{innovation.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {innovation.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => toggleCardExpansion(innovation.id)}
                          className="text-purple-600 dark:text-purple-400 font-medium inline-flex items-center hover:underline"
                        >
                          {expandedCard === innovation.id ? "Show less" : "Learn more"}
                          <ArrowRight
                            className={`ml-1 h-4 w-4 transition-transform ${expandedCard === innovation.id ? "rotate-90" : ""}`}
                          />
                        </button>
                      </div>

                      {/* Expandable content */}
                      <AnimatePresence>
                        {expandedCard === innovation.id && (
                          <motion.div
                            className="px-6 pb-6"
                            variants={expandVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Detailed Overview</h4>
                              <p className="text-gray-600 dark:text-gray-300 mb-4">{innovation.details}</p>

                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features</h4>
                              <ul className="space-y-2 mb-4">
                                {innovation.features.map((feature, i) => (
                                  <li key={i} className="flex items-start">
                                    <Sparkles className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
                                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                                  </li>
                                ))}
                              </ul>

                              <div className="flex flex-wrap gap-3 mt-4">
                                <motion.button
                                  className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-sm font-medium"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Read Full Article
                                </motion.button>
                                <motion.button
                                  className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-full text-sm font-medium"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Share
                                </motion.button>
                                <motion.button
                                  className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-full text-sm font-medium"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download PDF
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Lightbulb className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No results found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setActiveFilter("All")
                      setSearchQuery("")
                      if (searchInputRef.current) {
                        searchInputRef.current.value = ""
                      }
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Reset filters
                  </button>
                </motion.div>
              )}

              {/* Technology Highlights */}
              <motion.div
                className="mt-16 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Technology Highlights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md p-6 rounded-xl border border-white/20 dark:border-gray-700/30">
                    <Cpu className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quantum Processing</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Quantum computers are solving problems that classical computers can't handle efficiently.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/20 to-green-500/20 backdrop-blur-md p-6 rounded-xl border border-white/20 dark:border-gray-700/30">
                    <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Global Connectivity</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      5G and satellite internet are bringing high-speed connectivity to previously unreachable areas.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-yellow-500/20 backdrop-blur-md p-6 rounded-xl border border-white/20 dark:border-gray-700/30">
                    <Shield className="h-8 w-8 text-green-600 dark:text-green-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Enhanced Security</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Advanced encryption and AI-powered threat detection are creating safer digital environments.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-500/20 to-purple-500/20 backdrop-blur-md p-6 rounded-xl border border-white/20 dark:border-gray-700/30">
                    <Wifi className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Ecosystems</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      IoT devices are creating interconnected environments that adapt to human needs.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Back Button */}
              <div className="mt-12 text-center">
                <motion.button
                  onClick={() => setShowExplorePage(false)}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="mr-2 h-5 w-5" /> Back to Home
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subscribe Modal */}
      <AnimatePresence>
        {showSubscribeModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSubscribeModal(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <button
                  onClick={() => setShowSubscribeModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Join Our Tech Community</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Subscribe to get exclusive access to our latest tech innovations, special offers, and insider content.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="consent"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="consent" className="ml-2 block text-sm text-gray-600 dark:text-gray-300">
                    I agree to receive marketing emails and can unsubscribe at any time.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  {isLoading ? "Subscribing..." : "Subscribe & Continue"}
                </button>
              </form>
              <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                Already subscribed?{" "}
                <button
                  onClick={() => {
                    setIsSubscribed(true)
                    localStorage.setItem("isSubscribed", "true")
                    setShowSubscribeModal(false)
                    setShowExplorePage(true)
                  }}
                  className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
                >
                  Continue to explore
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
