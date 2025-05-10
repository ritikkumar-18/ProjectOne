import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Database, Network, Cpu, Glasses, Bot, ChevronRight, Star, X, Heart, Send } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"

const OurServices = () => {
  // State for innovations data
  const [innovations, setInnovations] = useState([
    {
      id: 1,
      category: "AI",
      icon: <Brain className="w-12 h-12 text-purple-500" />,
      title: "Artificial Intelligence",
      description:
        "Harness the power of AI to automate processes, enhance decision-making, and personalize user experiences.",
      color: "from-purple-500 to-indigo-600",
      details:
        "Our AI solutions leverage machine learning, natural language processing, and computer vision to create intelligent systems that adapt and learn, driving efficiency and innovation across industries.",
      impact:
        "Transforming industries like healthcare, finance, and education with predictive analytics and automation.",
      progress: 85, // Progress percentage for visual indicator
      ratings: [],
      averageRating: 0,
    },
    {
      id: 2,
      category: "Blockchain",
      icon: <Database className="w-12 h-12 text-blue-500" />,
      title: "Blockchain Technology",
      description: "Secure your transactions and data with decentralized, tamper-proof blockchain solutions.",
      color: "from-blue-500 to-cyan-600",
      details:
        "We implement blockchain for secure, transparent transactions, smart contracts, and supply chain management, ensuring trust and efficiency in digital ecosystems.",
      impact: "Revolutionizing finance, logistics, and digital identity with decentralized trust.",
      progress: 78,
      ratings: [],
      averageRating: 0,
    },
    {
      id: 3,
      category: "IoT",
      icon: <Network className="w-12 h-12 text-green-500" />,
      title: "Internet of Things (IoT)",
      description: "Connect and manage devices seamlessly with IoT solutions for smarter operations.",
      color: "from-green-500 to-teal-600",
      details:
        "Our IoT platforms enable real-time monitoring, predictive maintenance, and smart automation for industries like manufacturing, agriculture, and smart cities.",
      impact: "Enabling smart homes, cities, and industries with interconnected devices.",
      progress: 92,
      ratings: [],
      averageRating: 0,
    },
    {
      id: 4,
      category: "Quantum",
      icon: <Cpu className="w-12 h-12 text-orange-500" />,
      title: "Quantum Computing",
      description: "Unlock unprecedented computational power with quantum computing advancements.",
      color: "from-orange-500 to-red-600",
      details:
        "We're pioneering quantum computing applications for cryptography, material science, and complex simulations, pushing the boundaries of what's possible.",
      impact: "Solving complex problems in cryptography, drug discovery, and optimization.",
      progress: 65,
      ratings: [],
      averageRating: 0,
    },
    {
      id: 5,
      category: "AR/VR",
      icon: <Glasses className="w-12 h-12 text-pink-500" />,
      title: "Augmented & Virtual Reality",
      description: "Immerse your users in interactive AR/VR experiences for training, gaming, and more.",
      color: "from-pink-500 to-rose-600",
      details:
        "Our AR/VR solutions create immersive environments for education, entertainment, and remote collaboration, enhancing engagement and learning outcomes.",
      impact: "Enhancing education, gaming, and remote work with immersive experiences.",
      progress: 88,
      ratings: [],
      averageRating: 0,
    },
    {
      id: 6,
      category: "Robotics",
      icon: <Bot className="w-12 h-12 text-yellow-500" />,
      title: "Robotics & Automation",
      description: "Automate tasks and improve efficiency with advanced robotics and AI integration.",
      color: "from-yellow-500 to-amber-600",
      details:
        "We develop robotic systems for manufacturing, healthcare, and logistics, integrating AI for autonomous decision-making and precision.",
      impact: "Streamlining operations in manufacturing, healthcare, and logistics.",
      progress: 80,
      ratings: [],
      averageRating: 0,
    },
  ])

  // State for modal, filters, favorites, and ratings
  const [selectedInnovation, setSelectedInnovation] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterCategory, setFilterCategory] = useState("All")
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [rating, setRating] = useState(0)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  // Categories for filtering
  const categories = ["All", "AI", "Blockchain", "IoT", "Quantum", "AR/VR", "Robotics"]

  // Filter innovations
  const filteredInnovations = innovations.filter((innovation) => {
    const matchesCategory = filterCategory === "All" || innovation.category === filterCategory
    return matchesCategory
  })

  const displayedInnovations = showFavorites
    ? filteredInnovations.filter((innovation) => favorites.includes(innovation.id))
    : filteredInnovations

  // Handle opening and closing modal
  const handleOpenModal = (innovation) => {
    setSelectedInnovation(innovation)
    setIsModalOpen(true)
    setRating(0)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedInnovation(null)
    setContactForm({ name: "", email: "", message: "" })
  }

  // Handle favoriting an innovation
  const toggleFavorite = (innovationId, event) => {
    event.stopPropagation()
    if (favorites.includes(innovationId)) {
      setFavorites(favorites.filter((id) => id !== innovationId))
      toast.success("Removed from favorites!")
    } else {
      setFavorites([...favorites, innovationId])
      toast.success("Added to favorites!")
    }
  }

  // Handle rating submission
  const handleRating = (innovationId, ratingValue) => {
    const updatedInnovations = innovations.map((innovation) => {
      if (innovation.id === innovationId) {
        const newRatings = [...innovation.ratings, ratingValue]
        const averageRating = newRatings.reduce((a, b) => a + b, 0) / newRatings.length
        return { ...innovation, ratings: newRatings, averageRating }
      }
      return innovation
    })
    setInnovations(updatedInnovations)
    toast.success(`Rated ${ratingValue} stars!`)
  }

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault()
    if (contactForm.name && contactForm.email && contactForm.message) {
      toast.success(`Inquiry sent for ${selectedInnovation.title}!`)
      handleCloseModal()
    } else {
      toast.error("Please fill in all fields!")
    }
  }

  // Handle explore all innovations button
  const handleExploreAll = () => {
    setFilterCategory("All")
    setShowFavorites(false)
    toast.success("Showing all innovations!")

    const innovationsSection = document.getElementById("innovations-grid")
    if (innovationsSection) {
      innovationsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      y: -10,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  }

  const filterButtonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  }

  const starVariants = {
    filled: { scale: 1.2, color: "#FFD700" },
    empty: { scale: 1, color: "#D1D5DB" },
  }

  const progressVariants = {
    initial: { width: 0 },
    animate: (progress) => ({
      width: `${progress}%`,
      transition: { duration: 1.5, ease: "easeOut" },
    }),
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* React Hot Toast Container */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#363636",
              padding: "16px",
              borderRadius: "10px",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
            },
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "#FFFFFF",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#FFFFFF",
              },
            },
          }}
        />

        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Tech Innovations
          </h2>
          <p className="text-xl text-gray-600">
            Explore the future with our groundbreaking technologies shaping industries and transforming lives.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                filterCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              variants={filterButtonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {category}
            </motion.button>
          ))}
          <motion.button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`flex items-center px-4 py-2 rounded-full font-medium text-sm transition-all ${
              showFavorites ? "bg-red-500 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            variants={filterButtonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Heart className="w-5 h-5 mr-2" />
            {showFavorites ? "Show All" : "Show Favorites"}
          </motion.button>
        </div>

        {/* Innovations Grid */}
        <motion.div
          id="innovations-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {displayedInnovations.length > 0 ? (
            displayedInnovations.map((innovation) => (
              <motion.div
                key={innovation.id}
                className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 overflow-hidden cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                onClick={() => handleOpenModal(innovation)}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${innovation.color} opacity-5`}></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-gray-50 rounded-2xl shadow-sm">{innovation.icon}</div>
                    <motion.button
                      onClick={(e) => toggleFavorite(innovation.id, e)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          favorites.includes(innovation.id) ? "text-red-500 fill-red-500" : "text-gray-400"
                        }`}
                      />
                    </motion.button>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{innovation.title}</h3>
                  <p className="text-gray-600 mb-4 min-h-[80px]">{innovation.description}</p>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-1">Development Progress</div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div
                        className={`h-2.5 rounded-full bg-gradient-to-r ${innovation.color}`}
                        variants={progressVariants}
                        initial="initial"
                        animate="animate"
                        custom={innovation.progress}
                      />
                    </div>
                    <div className="text-sm text-gray-700 mt-1">{innovation.progress}% Complete</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= innovation.averageRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">({innovation.ratings.length})</span>
                    </div>
                    <motion.div className="flex items-center text-purple-600 font-medium" whileHover={{ x: 5 }}>
                      Discover More
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-xl">
                {showFavorites ? (
                  <div>
                    <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>No favorite innovations yet.</p>
                    <button onClick={() => setShowFavorites(false)} className="text-purple-600 underline mt-2">
                      View all innovations
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>No innovations found in this category.</p>
                    <button onClick={() => setFilterCategory("All")} className="text-purple-600 underline mt-2">
                      View all innovations
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExploreAll}
          >
            Explore All Innovations
          </motion.button>
        </motion.div>

        {/* Modal for Innovation Details */}
        <AnimatePresence>
          {isModalOpen && selectedInnovation && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            >
              <motion.div
                className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedInnovation.title}</h3>
                  <motion.button
                    onClick={handleCloseModal}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </motion.button>
                </div>

                {/* Innovation Details */}
                <div className="mb-8">
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${selectedInnovation.color} text-white`}>
                      {selectedInnovation.icon}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 text-lg leading-relaxed">{selectedInnovation.details}</p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Industry Impact</h4>
                    <p className="text-gray-600">{selectedInnovation.impact}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Development Progress</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <motion.div
                        className={`h-2.5 rounded-full bg-gradient-to-r ${selectedInnovation.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedInnovation.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <p className="text-gray-600">{selectedInnovation.progress}% Complete</p>
                  </div>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-gray-700">
                      {selectedInnovation.averageRating.toFixed(1)} ({selectedInnovation.ratings.length} reviews)
                    </span>
                  </div>
                </div>

                {/* Rate Innovation */}
                <div className="mb-8 bg-gray-50 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Rate This Innovation</h4>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        onClick={() => {
                          setRating(star)
                          handleRating(selectedInnovation.id, star)
                        }}
                        variants={starVariants}
                        animate={rating >= star ? "filled" : "empty"}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1"
                      >
                        <Star className="w-8 h-8" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Learn More About This Innovation</h4>
                  <form onSubmit={handleContactSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Your email"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        rows={4}
                        placeholder="Your inquiry..."
                      ></textarea>
                    </div>
                    <motion.button
                      type="submit"
                      className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Inquiry
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default OurServices
