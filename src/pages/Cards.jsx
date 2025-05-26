import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"
import {Book,Code,Wrench,Rocket,X,Bookmark,Share,Download,Clock,Star,Play,CheckCircle,Heart,Eye,Users,Calendar,Tag,Lightbulb,ChevronLeft,ChevronRight,TrendingUp,Award,Target,Zap,BookOpen,Video,FileText,Globe,BarChart3,Trophy,} from "lucide-react"

// Generate enhanced resources with more variety
const categories = ["Guide", "Tutorial", "Tools", "Project", "Workshop", "Course", "Article", "Video"]
const icons = [Book, Code, Wrench, Rocket, BookOpen, Video, FileText, Globe]
const colors = [
  "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
  "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
  "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800",
  "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
  "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800",
  "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800",
  "bg-pink-50 dark:bg-pink-950 border-pink-200 dark:border-pink-800",
  "bg-teal-50 dark:bg-teal-950 border-teal-200 dark:border-teal-800",
]
const difficulties = ["Beginner", "Intermediate", "Advanced", "Expert"]
const authors = [
  "Sarah Johnson",
  "Alex Chen",
  "Mike Rodriguez",
  "Emma Wilson",
  "Liam Brown",
  "Sophia Davis",
  "James Taylor",
  "Olivia Martinez",
]
const topics = ["JavaScript", "React", "Node.js", "Python", "TypeScript", "CSS", "HTML", "Vue.js", "Angular", "Next.js"]

const generateResources = () => {
  const resources = []
  for (let i = 1; i <= 120; i++) {
    const categoryIndex = i % categories.length
    const category = categories[categoryIndex]
    const IconComponent = icons[i % icons.length]
    const color = colors[i % colors.length]
    const difficulty = difficulties[i % difficulties.length]
    const author = authors[i % authors.length]
    const duration = `${2 + (i % 8)} hours`
    const rating = 3.5 + (i % 15) / 10
    const reviews = 50 + ((i * 13) % 2000)
    const views = 1000 + ((i * 127) % 25000)
    const enrolled = 100 + ((i * 41) % 5000)
    const completionRate = 40 + (i % 50)
    const downloadable = i % 3 === 0
    const hasVideo = i % 2 !== 0
    const hasQuiz = i % 3 === 0
    const topic = topics[i % topics.length]

    resources.push({
      id: i,
      title: `${category === "Guide" ? "Complete Guide to" : category === "Tutorial" ? "Learn" : category === "Tools" ? "Essential Tools for" : category === "Project" ? "Build a" : category === "Workshop" ? "Hands-on" : category === "Course" ? "Master" : category === "Article" ? "Understanding" : "Watch:"} ${topic} ${category === "Project" ? "Application" : category === "Workshop" ? "Workshop" : "Development"}`,
      description: `A comprehensive ${category.toLowerCase()} covering ${topic} fundamentals, advanced concepts, and real-world applications. Perfect for developers looking to enhance their skills.`,
      detailedDescription: `This ${category.toLowerCase()} provides an in-depth exploration of ${topic}, designed to empower developers with practical knowledge and hands-on experience. Learn through real-world examples, step-by-step instructions, and expert insights from industry professionals.`,
      icon: IconComponent,
      category,
      color,
      difficulty,
      duration,
      rating: Math.round(rating * 10) / 10,
      reviews,
      views,
      likes: 50 + ((i * 7) % 1000),
      prerequisites: ["Basic Programming", ...(i % 2 === 0 ? [topic] : ["HTML/CSS"])],
      topics: [
        "Core Concepts",
        "Advanced Techniques",
        "Best Practices",
        "Real-World Applications",
        "Performance Optimization",
      ],
      tags: [topic, category, difficulty, `Skill${i % 10}`],
      author,
      lastUpdated: `2024-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
      completionRate,
      enrolled,
      downloadable,
      hasVideo,
      hasQuiz,
      trending: i % 7 === 0,
      featured: i % 11 === 0,
      chapters: Array.from({ length: 3 + (i % 5) }, (_, idx) => ({
        id: `${i}-chapter-${idx}`,
        title: `Chapter ${idx + 1}: ${topic} ${["Fundamentals", "Advanced Topics", "Practical Applications", "Best Practices", "Real Projects", "Performance", "Testing"][idx] || "Deep Dive"}`,
        duration: `${20 + idx * 10} min`,
        completed: false,
      })),
    })
  }
  return resources
}

const resources = generateResources()

const Cards = () => {
  const [selectedResource, setSelectedResource] = useState(null)
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set())
  const [likedItems, setLikedItems] = useState(new Set())
  const [userProgress, setUserProgress] = useState({})
  const [currentPage, setCurrentPage] = useState(0)
  const [isLearningStarted, setIsLearningStarted] = useState(false)
  const [isBrowsingCatalog, setIsBrowsingCatalog] = useState(false)

  // Responsive state
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setWindowWidth(width)
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Enhanced responsive cards per page calculation
  const getCardsPerPage = () => {
    if (isMobile) return 2
    if (isTablet) return 6
    if (windowWidth < 1280) return 6
    if (windowWidth < 1536) return 6
    return 8
  }

  const cardsPerPage = getCardsPerPage()

  // Enhanced toast notifications
  const showToast = (message, type = "success") => {
    switch (type) {
      case "success":
        toast.success(message, {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#10B981",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: "500",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#10B981",
          },
        })
        break
      case "error":
        toast.error(message, {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#EF4444",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: "500",
          },
        })
        break
      case "info":
        toast(message, {
          duration: 3000,
          position: "top-center",
          icon: "💡",
          style: {
            background: "#3B82F6",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: "500",
          },
        })
        break
      case "loading":
        return toast.loading(message, {
          position: "top-center",
          style: {
            background: "#6B7280",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: "500",
          },
        })
    }
  }

  // Load saved data from localStorage
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem("bookmarkedResources")
      const savedLikes = localStorage.getItem("likedResources")
      const savedProgress = localStorage.getItem("userProgress")
      const savedLearningStatus = localStorage.getItem("isLearningStarted")
      const savedBrowsingStatus = localStorage.getItem("isBrowsingCatalog")

      if (savedBookmarks) setBookmarkedItems(new Set(JSON.parse(savedBookmarks)))
      if (savedLikes) setLikedItems(new Set(JSON.parse(savedLikes)))
      if (savedProgress) setUserProgress(JSON.parse(savedProgress))
      if (savedLearningStatus) setIsLearningStarted(JSON.parse(savedLearningStatus))
      if (savedBrowsingStatus) setIsBrowsingCatalog(JSON.parse(savedBrowsingStatus))
    } catch (error) {
      console.error("Error loading saved data:", error)
    }
  }, [])

  // Save data to localStorage
  const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
      showToast("Failed to save data", "error")
    }
  }

  // Show all resources (no filtering)
  const paginatedResources = resources.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage)
  const totalPages = Math.ceil(resources.length / cardsPerPage)

  const toggleBookmark = (id) => {
    const newBookmarks = new Set(bookmarkedItems)
    if (newBookmarks.has(id)) {
      newBookmarks.delete(id)
      showToast("Removed from bookmarks", "info")
    } else {
      newBookmarks.add(id)
      showToast("Added to bookmarks! 📚", "success")
    }
    setBookmarkedItems(newBookmarks)
    saveToLocalStorage("bookmarkedResources", Array.from(newBookmarks))
  }

  const toggleLike = (id) => {
    const newLikes = new Set(likedItems)
    if (newLikes.has(id)) {
      newLikes.delete(id)
      showToast("Like removed", "info")
    } else {
      newLikes.add(id)
      showToast("Liked! ❤️", "success")
    }
    setLikedItems(newLikes)
    saveToLocalStorage("likedResources", Array.from(newLikes))
  }

  const shareResource = async (resource) => {
    const loadingToast = showToast("Preparing to share...", "loading")

    try {
      if (navigator.share) {
        await navigator.share({
          title: resource.title,
          text: resource.description,
          url: window.location.href,
        })
        toast.dismiss(loadingToast)
        showToast("Shared successfully! 🚀", "success")
      } else {
        await navigator.clipboard.writeText(`${resource.title} - ${window.location.href}`)
        toast.dismiss(loadingToast)
        showToast("Link copied to clipboard! 📋", "success")
      }
    } catch (error) {
      toast.dismiss(loadingToast)
      if (error.name !== "AbortError") {
        showToast("Failed to share resource", "error")
      }
    }
  }

  const downloadResource = async (resource) => {
    if (!resource.downloadable) {
      showToast("This resource is not downloadable", "error")
      return
    }

    const loadingToast = showToast(`Downloading ${resource.title}...`, "loading")

    try {
      // Simulate download process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create a fake download
      const element = document.createElement("a")
      const file = new Blob(
        [`Course: ${resource.title}\nAuthor: ${resource.author}\nDescription: ${resource.description}`],
        {
          type: "text/plain",
        },
      )
      element.href = URL.createObjectURL(file)
      element.download = `${resource.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)

      toast.dismiss(loadingToast)
      showToast("Download completed! 📁", "success")
    } catch (error) {
      toast.dismiss(loadingToast)
      showToast("Download failed", "error")
    }
  }

  const startChapter = (resourceId, chapterIndex) => {
    const newProgress = { ...userProgress }
    if (!newProgress[resourceId]) newProgress[resourceId] = { chapters: [] }
    if (!newProgress[resourceId].chapters[chapterIndex]) {
      newProgress[resourceId].chapters[chapterIndex] = { started: true, completed: false }
    }
    setUserProgress(newProgress)
    saveToLocalStorage("userProgress", newProgress)
    showToast("Chapter started! 🚀", "success")
  }

  const completeChapter = (resourceId, chapterIndex) => {
    const newProgress = { ...userProgress }
    if (!newProgress[resourceId]) newProgress[resourceId] = { chapters: [] }
    newProgress[resourceId].chapters[chapterIndex] = { started: true, completed: true }
    setUserProgress(newProgress)
    saveToLocalStorage("userProgress", newProgress)
    showToast("Chapter completed! 🎉", "success")
  }

  const startLearning = () => {
    if (!isLearningStarted) {
      setIsLearningStarted(true)
      saveToLocalStorage("isLearningStarted", true)
      showToast("Welcome to your learning journey! 🎓", "success")
    } else {
      showToast("Continue your amazing progress! 💪", "info")
    }
  }

  const browseCatalog = () => {
    if (!isBrowsingCatalog) {
      setIsBrowsingCatalog(true)
      saveToLocalStorage("isBrowsingCatalog", true)
      showToast("Exploring our amazing catalog! 📚", "success")
    } else {
      showToast("Keep discovering new courses! 🔍", "info")
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800"
      case "Intermediate":
        return "text-yellow-700 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
      case "Advanced":
        return "text-orange-700 bg-orange-100 dark:bg-orange-900 dark:text-orange-300 border-orange-200 dark:border-orange-800"
      case "Expert":
        return "text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800"
      default:
        return "text-gray-700 bg-gray-100 dark:bg-gray-900 dark:text-gray-300 border-gray-200 dark:border-gray-800"
    }
  }

  const getProgressPercentage = (resourceId) => {
    const progress = userProgress[resourceId]
    if (!progress || !progress.chapters) return 0
    const completedChapters = progress.chapters.filter((chapter) => chapter?.completed).length
    const totalChapters = resources.find((r) => r.id === resourceId)?.chapters.length || 0
    return totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0
  }

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      const newPage = direction === "next" ? prev + 1 : prev - 1
      return Math.max(0, Math.min(newPage, totalPages - 1))
    })
  }

  return (
    <section className="min-h-screen py-4 sm:py-8 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* React Hot Toast Container */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "#4aed88",
            },
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="mb-4 sm:mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 px-3 sm:px-4 py-2 rounded-full mb-4"
            >
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">
                Premium Learning Platform
              </span>
            </motion.div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
            Developer Learning Academy
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
            Master cutting-edge technologies with our comprehensive collection of expert-crafted courses, tutorials, and
            hands-on projects. Build real-world skills that matter in today's tech industry.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8 px-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startLearning}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{isLearningStarted ? "Continue Learning" : "Start Learning"}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={browseCatalog}
              className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{isBrowsingCatalog ? "Continue Browsing" : "Browse Catalog"}</span>
            </motion.button>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto px-4">
            {[
              { value: resources.length, label: "Expert Courses", color: "blue", icon: BookOpen },
              { value: "50K+", label: "Active Learners", color: "green", icon: Users },
              { value: categories.length, label: "Specializations", color: "purple", icon: Target },
              { value: "95%", label: "Success Rate", color: "orange", icon: Trophy },
            ].map((stat, index) => (
              <motion.div
                key={`stat-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div
                  className={`text-2xl sm:text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-1 sm:mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-blue-200 dark:border-blue-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-500" />
                  Featured This Week
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Hand-picked courses by our expert instructors
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => showToast("Viewing all featured courses! ⭐", "info")}
                className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                View All
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {resources
                .filter((r) => r.featured)
                .slice(0, 3)
                .map((resource, index) => {
                  const IconComponent = resource.icon
                  return (
                    <motion.div
                      key={`featured-${resource.id}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedResource(resource)}
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
                        <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-lg truncate">
                            {resource.title.slice(0, isMobile ? 25 : 30)}...
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{resource.author}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-1 fill-current" />
                            {resource.rating}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {(resource.enrolled / 1000).toFixed(1)}k
                          </span>
                        </div>
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}
                        >
                          {resource.difficulty}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Resource Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5"
            >
              {paginatedResources.map((resource, index) => {
                const IconComponent = resource.icon
                const progressPercentage = getProgressPercentage(resource.id)

                return (
                  <motion.div
                    key={`resource-${resource.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`relative rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 ${resource.color} overflow-hidden`}
                  >
                    {/* Recently Added Badge */}
                    {resource.id <= 10 && (
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
                        <div className="px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                          <Zap className="w-3 h-3" />
                          <span className="hidden sm:inline">New</span>
                        </div>
                      </div>
                    )}

                    {/* Trending/Featured Badge */}
                    {(resource.trending || resource.featured) && (
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                            resource.trending
                              ? "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300"
                              : "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                          }`}
                        >
                          {resource.trending ? <TrendingUp className="w-3 h-3" /> : <Award className="w-3 h-3" />}
                          <span className="hidden sm:inline">{resource.trending ? "Trending" : "Featured"}</span>
                        </div>
                      </div>
                    )}

                    {/* Progress Bar */}
                    {progressPercentage > 0 && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                      </div>
                    )}

                    <div className="p-4 sm:p-6">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-3 sm:mb-4">
                        <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex space-x-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleBookmark(resource.id)
                            }}
                            className="p-2 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                          >
                            <Bookmark
                              className={`w-4 h-4 ${
                                bookmarkedItems.has(resource.id) ? "text-yellow-500 fill-current" : "text-gray-400"
                              }`}
                            />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleLike(resource.id)
                            }}
                            className="p-2 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                likedItems.has(resource.id) ? "text-red-500 fill-current" : "text-gray-400"
                              }`}
                            />
                          </motion.button>
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 sm:mb-4 line-clamp-3">
                        {resource.description}
                      </p>

                      {/* Metadata */}
                      <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(resource.difficulty)}`}
                          >
                            {resource.difficulty}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 text-xs flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {resource.duration}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <span className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                              {resource.rating}
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {isMobile ? `${Math.round(resource.views / 1000)}k` : resource.views.toLocaleString()}
                            </span>
                          </div>
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {isMobile ? `${Math.round(resource.enrolled / 1000)}k` : resource.enrolled.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                        {resource.tags.slice(0, isMobile ? 2 : 3).map((tag, tagIndex) => (
                          <span
                            key={`tag-${resource.id}-${tagIndex}`}
                            className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Enhanced Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedResource(resource)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-2 sm:py-3 px-4 font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                      >
                        <span className="text-sm sm:text-base">Explore Resource</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>

                    {/* Hover Overlay */}
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center items-center mt-8 sm:mt-12 space-y-4 sm:space-y-0 sm:space-x-3"
            >
              {/* Previous Arrow */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 0}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 3) {
                    pageNum = i
                  } else if (currentPage === 0) {
                    pageNum = i
                  } else if (currentPage === totalPages - 1) {
                    pageNum = totalPages - 3 + i
                  } else {
                    pageNum = currentPage - 1 + i
                  }

                  return (
                    <motion.button
                      key={`page-${pageNum}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full font-bold text-sm sm:text-lg transition-all duration-300 shadow-lg ${
                        currentPage === pageNum
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-110"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-xl"
                      }`}
                    >
                      {pageNum + 1}
                    </motion.button>
                  )
                })}
              </div>

              {/* Next Arrow */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages - 1}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              {/* Page Info */}
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 sm:px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                {currentPage + 1} of {totalPages}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Enhanced Responsive Modal */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setSelectedResource(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Modal Header */}
              <div
                className={`${selectedResource.color} p-4 sm:p-6 lg:p-8 border-b border-gray-200 dark:border-gray-700`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex items-start space-x-3 sm:space-x-6 flex-1 min-w-0">
                    <div className="p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex-shrink-0">
                      <selectedResource.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                        {selectedResource.title}
                      </h2>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        <span>by {selectedResource.author}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(selectedResource.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => shareResource(selectedResource)}
                      className="p-2 sm:p-3 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-xl transition-colors"
                    >
                      <Share className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => downloadResource(selectedResource)}
                      className="p-2 sm:p-3 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-xl transition-colors"
                      disabled={!selectedResource.downloadable}
                    >
                      <Download
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedResource.downloadable ? "text-gray-600 dark:text-gray-300" : "text-gray-400"}`}
                      />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedResource(null)}
                      className="p-2 sm:p-3 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-xl transition-colors"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Enhanced Modal Content */}
              <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(95vh-200px)]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 dark:text-blue-400" />
                        About This Resource
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                        {selectedResource.detailedDescription}
                      </p>
                    </div>

                    {/* Prerequisites */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 dark:text-blue-400" />
                        Prerequisites
                      </h3>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {selectedResource.prerequisites.map((prereq, index) => (
                          <span
                            key={`prereq-${index}`}
                            className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border border-blue-200 dark:border-blue-800"
                          >
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Topics Covered */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
                        <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 dark:text-blue-400" />
                        What You'll Learn
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {selectedResource.topics.map((topic, index) => (
                          <motion.div
                            key={`topic-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
                              {topic}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Chapters */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
                        <Video className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 dark:text-blue-400" />
                        Course Content
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        {selectedResource.chapters.map((chapter, index) => {
                          const chapterProgress = userProgress[selectedResource.id]?.chapters?.[index]
                          return (
                            <motion.div
                              key={chapter.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200 gap-3 sm:gap-4"
                            >
                              <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                                <div
                                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-200 flex-shrink-0 ${
                                    chapterProgress?.completed
                                      ? "bg-green-500 text-white shadow-lg"
                                      : chapterProgress?.started
                                        ? "bg-blue-500 text-white shadow-lg"
                                        : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                                  }`}
                                >
                                  {chapterProgress?.completed ? (
                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                  ) : (
                                    index + 1
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base leading-tight">
                                    {chapter.title}
                                  </h4>
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    <span className="flex items-center">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {chapter.duration}
                                    </span>
                                    {chapterProgress?.completed && (
                                      <span className="flex items-center text-green-600 dark:text-green-400">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Completed
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2 w-full sm:w-auto">
                                {!chapterProgress?.started && (
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => startChapter(selectedResource.id, index)}
                                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                                  >
                                    <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>Start</span>
                                  </motion.button>
                                )}
                                {chapterProgress?.started && !chapterProgress?.completed && (
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => completeChapter(selectedResource.id, index)}
                                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                                  >
                                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>Complete</span>
                                  </motion.button>
                                )}
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Responsive Sidebar */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Enhanced Stats */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-600">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center text-sm sm:text-base">
                        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 dark:text-blue-400" />
                        Resource Stats
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Difficulty</span>
                          <span
                            className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(selectedResource.difficulty)}`}
                          >
                            {selectedResource.difficulty}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Duration</span>
                          <span className="text-gray-900 dark:text-white font-semibold text-xs sm:text-sm">
                            {selectedResource.duration}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Rating</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-1 fill-current" />
                            <span className="text-gray-900 dark:text-white font-semibold text-xs sm:text-sm">
                              {selectedResource.rating}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 ml-1 text-xs">
                              ({selectedResource.reviews})
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Enrolled</span>
                          <span className="text-gray-900 dark:text-white font-semibold text-xs sm:text-sm">
                            {isMobile
                              ? `${Math.round(selectedResource.enrolled / 1000)}k`
                              : selectedResource.enrolled.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Completion Rate</span>
                          <span className="text-gray-900 dark:text-white font-semibold text-xs sm:text-sm">
                            {selectedResource.completionRate}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Likes</span>
                          <span className="text-gray-900 dark:text-white font-semibold text-xs sm:text-sm">
                            {isMobile
                              ? `${Math.round(selectedResource.likes / 1000)}k`
                              : selectedResource.likes.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Progress */}
                    {getProgressPercentage(selectedResource.id) > 0 && (
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200 dark:border-blue-700">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                          <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 dark:text-blue-400" />
                          Your Progress
                        </h3>
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-600 dark:text-gray-300">Completed</span>
                            <span className="text-gray-900 dark:text-white font-bold">
                              {Math.round(getProgressPercentage(selectedResource.id))}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 sm:h-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${getProgressPercentage(selectedResource.id)}%` }}
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 sm:h-3 rounded-full"
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            Keep going! You're doing great! 🚀
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Enhanced Features */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-600">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 dark:text-blue-400" />
                        Features
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Video
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedResource.hasVideo ? "text-green-500" : "text-gray-400"}`}
                          />
                          <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Video Content</span>
                          {selectedResource.hasVideo && <span className="text-green-500 text-xs">✓</span>}
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Lightbulb
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedResource.hasQuiz ? "text-green-500" : "text-gray-400"}`}
                          />
                          <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                            Interactive Quizzes
                          </span>
                          {selectedResource.hasQuiz && <span className="text-green-500 text-xs">✓</span>}
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Download
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedResource.downloadable ? "text-green-500" : "text-gray-400"}`}
                          />
                          <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Downloadable</span>
                          {selectedResource.downloadable && <span className="text-green-500 text-xs">✓</span>}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Tags */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-600">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                        <Tag className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 dark:text-blue-400" />
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {selectedResource.tags.map((tag, index) => (
                          <motion.span
                            key={`modal-tag-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium border border-blue-200 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-xl p-3 sm:p-4">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Last updated: {new Date(selectedResource.lastUpdated).toLocaleDateString()}</span>
                      </div>
                      <div className="text-xs">
                        Created by{" "}
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {selectedResource.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Cards
