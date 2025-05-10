import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"
import {
  Bookmark,
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  Sparkles,
  Rewind,
  Play,
  FastForward,
  Download,
  Printer,
  Eye,
  ThumbsUp,
  Calendar,
  Clock,
  Tag,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react"

const TechCard = ({
  title,
  description,
  imageUrl,
  tags = [],
  date,
  readTime,
  readMoreUrl,
  initialComments = 0,
  category = "Technology",
  author = { name: "John Doe", avatar: null, role: "Tech Writer" },
  index = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [readProgress, setReadProgress] = useState(Math.floor(Math.random() * 100))
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50))
  const [hasLiked, setHasLiked] = useState(false)
  const [commentsCount, setCommentsCount] = useState(initialComments)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showAISummary, setShowAISummary] = useState(false)
  const [aiSummary, setAiSummary] = useState("")
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [commentInput, setCommentInput] = useState("")
  const [commentsList, setCommentsList] = useState([])
  const [audioProgress, setAudioProgress] = useState(0)
  const [audioSpeed, setAudioSpeed] = useState(1)
  const [showAudioControls, setShowAudioControls] = useState(false)
  const [readingTime, setReadingTime] = useState(readTime || calculateReadingTime(description))
  const [viewCount, setViewCount] = useState(Math.floor(Math.random() * 1000) + 100)
  const [showTagsDropdown, setShowTagsDropdown] = useState(false)
  const [relatedArticles, setRelatedArticles] = useState([])
  const [showRelatedArticles, setShowRelatedArticles] = useState(false)
  const [theme, setTheme] = useState("light")

  const cardRef = useRef(null)
  const descriptionRef = useRef(null)
  const shareRef = useRef(null)
  const tagsRef = useRef(null)

  function calculateReadingTime(text) {
    const wordsPerMinute = 200
    const wordCount = text?.split(/\s+/).length || 0
    return Math.ceil(wordCount / wordsPerMinute) || 1
  }

  const generateAISummary = useCallback(() => {
    setIsGeneratingSummary(true)
    setTimeout(() => {
      const summary = `${description.substring(0, 100)}... This article explores ${category.toLowerCase()} trends, covering ${tags.join(", ")} with practical insights.`
      setAiSummary(summary)
      setIsGeneratingSummary(false)
    }, 1000)
  }, [description, category, tags])

  const generateRelatedArticles = useCallback(() => {
    // Simulate generating related articles based on tags and category
    const articles = [
      {
        id: 1,
        title: `Latest Trends in ${category}`,
        tags: [tags[0] || "Tech"],
        readTime: Math.floor(Math.random() * 10) + 3,
      },
      {
        id: 2,
        title: `How ${tags[0] || "Technology"} is Changing the Industry`,
        tags: [tags[0] || "Tech", "Industry"],
        readTime: Math.floor(Math.random() * 10) + 3,
      },
      {
        id: 3,
        title: `The Future of ${tags[1] || "Innovation"}`,
        tags: [tags[1] || "Innovation"],
        readTime: Math.floor(Math.random() * 10) + 3,
      },
    ]
    setRelatedArticles(articles)
  }, [category, tags])

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
    }),
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, rotate: 2 },
    tap: { scale: 0.95 },
    active: { scale: 1.15, color: "#8b5cf6" },
  }

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: { height: { duration: 0.5 }, opacity: { duration: 0.4, delay: 0.1 } },
    },
  }

  const tagVariants = {
    initial: { opacity: 0, x: -10 },
    animate: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
    hover: {
      scale: 1.15,
      backgroundColor: "#8b5cf6",
      color: "#ffffff",
      transition: { duration: 0.2 },
    },
  }

  const shareMenuVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 10,
      transition: {
        duration: 0.2,
      },
    },
  }

  useEffect(() => {
    const img = new Image()
    img.src = imageUrl
    img.onload = () => setImageLoaded(true)

    setCommentsList([
      { id: 1, author: "Jane Doe", avatar: null, content: "Insightful read!", time: "2d ago", likes: 5 },
      { id: 2, author: "John Smith", avatar: null, content: "Can you expand on point 3?", time: "1d ago", likes: 2 },
    ])

    generateRelatedArticles()

    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setIsShareOpen(false)
      }
      if (tagsRef.current && !tagsRef.current.contains(event.target)) {
        setShowTagsDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [imageUrl, generateRelatedArticles])

  useEffect(() => {
    let interval
    if (isSpeaking) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          const newProgress = prev + 0.3 * audioSpeed
          if (newProgress >= 100) {
            setIsSpeaking(false)
            setShowAudioControls(false)
            return 0
          }
          return newProgress
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isSpeaking, audioSpeed])

  const handleSaveClick = useCallback(() => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? "Removed from saved!" : "Saved for later!", {
      icon: isSaved ? "🗑️" : "📌",
    })
  }, [isSaved])

  const handleLikeClick = useCallback(() => {
    setLikes((prev) => (hasLiked ? prev - 1 : prev + 1))
    setHasLiked(!hasLiked)
    toast.success(hasLiked ? "Like removed" : "Article liked!", { icon: "👍" })
  }, [hasLiked])

  const handleShareClick = useCallback(
    (platform) => {
      const url = readMoreUrl || window.location.href
      let shareUrl
      switch (platform) {
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
          window.open(shareUrl, "_blank")
          toast.success("Shared on Twitter!")
          break
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
          window.open(shareUrl, "_blank")
          toast.success("Shared on LinkedIn!")
          break
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
          window.open(shareUrl, "_blank")
          toast.success("Shared on Facebook!")
          break
        case "email":
          shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`
          window.location.href = shareUrl
          toast.success("Email created!")
          break
        case "copy":
          navigator.clipboard.writeText(url).then(
            () => toast.success("Link copied!"),
            () => toast.error("Failed to copy link"),
          )
          break
        case "download":
          toast.success("Article downloading...")
          setTimeout(() => toast.success("Download complete!"), 1500)
          break
        case "print":
          toast.success("Preparing for print...")
          setTimeout(() => toast.success("Print dialog opened"), 1000)
          break
        default:
          break
      }
      // Don't close the share menu automatically
      // This fixes the issue where share options are hidden when clicked
    },
    [title, readMoreUrl],
  )

  const handleReadMoreClick = useCallback(() => {
    setIsExpanded(!isExpanded)
    if (!isExpanded && !aiSummary && showAISummary) {
      generateAISummary()
    }
    if (!isExpanded && cardRef.current) {
      setTimeout(() => {
        cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [isExpanded, aiSummary, showAISummary, generateAISummary])

  const handleAISummaryToggle = useCallback(() => {
    setShowAISummary(!showAISummary)
    if (!showAISummary && !aiSummary) {
      generateAISummary()
    }
    toast.success(showAISummary ? "Showing original content" : "Showing AI summary")
  }, [showAISummary, aiSummary, generateAISummary])

  const getFullArticleContent = () => {
    if (!isExpanded) return description
    return `${description}\n\nExpanded Content:\nThis article provides in-depth insights into the topic, covering:\n- Core concepts and fundamentals\n- Practical applications and examples\n- Common challenges and solutions\n- Future trends and predictions\n- Expert tips for implementation\n\nBy the end, you'll have a comprehensive understanding to apply these concepts effectively.`
  }

  const handleTextToSpeech = useCallback(() => {
    if ("speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
        setShowAudioControls(false)
        toast.success("Stopped reading")
      } else {
        const content = showAISummary && aiSummary ? aiSummary : getFullArticleContent()
        const utterance = new SpeechSynthesisUtterance(content)
        utterance.lang = "en-US"
        utterance.rate = audioSpeed
        const voices = window.speechSynthesis.getVoices()
        const femaleVoice = voices.find(
          (voice) =>
            voice.name.includes("Female") || voice.name.includes("Samantha") || voice.name.includes("Victoria"),
        )
        utterance.voice = femaleVoice || voices[0]
        utterance.onend = () => {
          setIsSpeaking(false)
          setAudioProgress(0)
          setShowAudioControls(false)
        }
        window.speechSynthesis.speak(utterance)
        setIsSpeaking(true)
        setShowAudioControls(true)
        toast.success("Reading article...")
      }
    } else {
      toast.error("Text-to-speech not supported")
    }
  }, [isSpeaking, audioSpeed, showAISummary, aiSummary, description, isExpanded])

  const handleChangeAudioSpeed = useCallback(
    (speed) => {
      setAudioSpeed(speed)
      if (isSpeaking) {
        window.speechSynthesis.cancel()
        const content = showAISummary && aiSummary ? aiSummary : getFullArticleContent()
        const utterance = new SpeechSynthesisUtterance(content)
        utterance.lang = "en-US"
        utterance.rate = speed
        const voices = window.speechSynthesis.getVoices()
        const femaleVoice = voices.find(
          (voice) =>
            voice.name.includes("Female") || voice.name.includes("Samantha") || voice.name.includes("Victoria"),
        )
        utterance.voice = femaleVoice || voices[0]
        utterance.onend = () => {
          setIsSpeaking(false)
          setAudioProgress(0)
          setShowAudioControls(false)
        }
        window.speechSynthesis.speak(utterance)
      }
      toast.success(`Speed set to ${speed}x`)
    },
    [isSpeaking, showAISummary, aiSummary, description, isExpanded],
  )

  const handleAddComment = useCallback(() => {
    if (!commentInput.trim()) {
      toast.error("Please enter a comment")
      return
    }
    const newComment = {
      id: Date.now(),
      author: "You",
      avatar: null,
      content: commentInput,
      time: "Just now",
      likes: 0,
    }
    setCommentsList((prev) => [newComment, ...prev])
    setCommentInput("")
    setCommentsCount((prev) => prev + 1)
    toast.success("Comment added!")
  }, [commentInput])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
    toast.success(`${theme === "light" ? "Dark" : "Light"} mode activated`)
  }, [theme])

  if (!title || !description || !imageUrl) {
    return (
      <div className="w-full max-w-md mx-auto p-6 text-center text-slate-600 bg-white/90 rounded-xl border border-slate-100">
        Article data is incomplete.
      </div>
    )
  }

  const themeClasses =
    theme === "dark" ? "bg-slate-900 text-white border-slate-700" : "bg-white text-slate-900 border-slate-200/50"

  const themeMutedText = theme === "dark" ? "text-slate-400" : "text-slate-600"
  const themeMutedBg = theme === "dark" ? "bg-slate-800" : "bg-slate-100"
  const themeBorderColor = theme === "dark" ? "border-slate-700" : "border-slate-200"
  const themeHighlight = theme === "dark" ? "bg-violet-900/20" : "bg-violet-50/30"
  const themePrimaryColor = "text-violet-500"
  const themePrimaryBg = theme === "dark" ? "bg-violet-900" : "bg-violet-100"
  const themePrimaryText = theme === "dark" ? "text-violet-300" : "text-violet-800"

  return (
    <>
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        custom={index}
        initial="hidden"
        animate="visible"
        whileHover={!isExpanded ? "hover" : undefined}
        className={`relative w-full max-w-md mx-auto ${themeClasses} backdrop-blur-lg rounded-2xl overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 group ${
          isExpanded ? "ring-2 ring-violet-400/50" : "hover:ring-2 hover:ring-violet-400/50"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`absolute inset-0 ${themeHighlight} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        ></div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`absolute top-4 left-4 z-10 p-2 rounded-full ${themeMutedBg} ${themeMutedText} hover:bg-violet-200 transition-colors duration-200`}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
        </button>

        <div className="relative h-56 overflow-hidden">
          <motion.img
            className="w-full h-full object-cover object-center transition-transform duration-500"
            src={imageUrl}
            alt={title}
            animate={{
              scale: isHovered ? 1.06 : 1,
              filter: !imageLoaded ? "blur(10px)" : "blur(0px)",
            }}
            transition={{ duration: 0.6 }}
            onError={(e) => (e.target.src = "https://via.placeholder.com/600x400?text=Tech+Article")}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className={`absolute inset-0 flex items-center justify-center ${themeMutedBg}`}>
              <svg
                className="animate-spin h-8 w-8 text-violet-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
          <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
            {category}
          </div>
          <motion.button
            variants={buttonVariants}
            animate={isSaved ? "active" : "initial"}
            whileHover="hover"
            whileTap="tap"
            onClick={handleSaveClick}
            className={`absolute bottom-4 right-4 p-2 rounded-full shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
              isSaved ? "bg-violet-500 text-white hover:bg-violet-600" : "bg-white/90 text-gray-800 hover:bg-white"
            }`}
            aria-label={isSaved ? "Remove from saved" : "Save for later"}
          >
            <Bookmark className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
          </motion.button>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-200/50">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              initial={{ width: 0 }}
              animate={{ width: `${readProgress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="relative p-6">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="flex items-center gap-2" ref={tagsRef}>
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTagsDropdown(!showTagsDropdown)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full ${themePrimaryBg} ${themePrimaryText} text-xs font-semibold`}
                >
                  <Tag className="h-3 w-3" />
                  Tags
                  {showTagsDropdown ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
                </motion.button>
                <AnimatePresence>
                  {showTagsDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute left-0 mt-2 z-20 p-2 rounded-lg shadow-xl ${themeClasses} border ${themeBorderColor} min-w-[150px]`}
                    >
                      <div className="flex flex-col gap-1">
                        {tags?.map((tag, index) => (
                          <motion.span
                            key={index}
                            custom={index}
                            variants={tagVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            whileTap={{ scale: 0.95 }}
                            className={`text-xs px-3 py-1.5 rounded-md ${themePrimaryBg} ${themePrimaryText} font-semibold cursor-pointer`}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Display first tag always visible */}
              {tags.length > 0 && (
                <motion.span
                  custom={0}
                  variants={tagVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  className={`text-xs px-3 py-1 rounded-full ${themePrimaryBg} ${themePrimaryText} font-semibold cursor-pointer`}
                >
                  {tags[0]}
                </motion.span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${themeMutedText} font-medium flex items-center`}>
                <Clock className="h-3 w-3 mr-1" />
                {readingTime} min
              </span>
              <span className={`text-xs ${themeMutedText} font-medium flex items-center`}>
                <Eye className="h-3 w-3 mr-1" />
                {viewCount}
              </span>
            </div>
          </div>

          <motion.h3
            className="text-xl font-bold mb-3 line-clamp-2"
            whileHover={{ color: "#8b5cf6", x: 4 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center text-white font-medium text-sm">
              {author.avatar ? (
                <img
                  src={author.avatar || "/placeholder.svg"}
                  alt={author.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                author.name.charAt(0)
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{author.name}</span>
              <span className={`text-xs ${themeMutedText}`}>{author.role}</span>
            </div>
          </div>

          <div
            ref={descriptionRef}
            className={`text-sm ${themeMutedText} mb-5 leading-relaxed ${isExpanded ? "" : "line-clamp-3"}`}
          >
            {showAISummary && aiSummary ? (
              <div className="italic">
                <span className="text-violet-600 font-semibold">AI Summary: </span>
                {aiSummary}
              </div>
            ) : (
              description
            )}
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                variants={expandVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-4 text-slate-600">
                  <p className={themeMutedText}>
                    This expanded content dives deeper into the article's core concepts, providing actionable insights
                    and practical examples to enhance your understanding.
                  </p>
                  <p className={themeMutedText}>Key takeaways include:</p>
                  <ul className={`list-disc pl-5 space-y-2 ${themeMutedText}`}>
                    <li>Core concepts and their real-world applications</li>
                    <li>Step-by-step implementation strategies</li>
                    <li>Common pitfalls and how to avoid them</li>
                    <li>Emerging trends shaping the future</li>
                    <li>Expert recommendations for success</li>
                  </ul>
                  <p className={themeMutedText}>
                    By applying these insights, you'll be well-equipped to tackle challenges and leverage opportunities
                    in this field.
                  </p>

                  {/* Related Articles Section */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-semibold">Related Articles</h4>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowRelatedArticles(!showRelatedArticles)}
                        className="text-xs text-violet-600 hover:text-violet-800 font-medium"
                      >
                        {showRelatedArticles ? "Hide" : "Show"}
                      </motion.button>
                    </div>
                    <AnimatePresence>
                      {showRelatedArticles && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-3">
                            {relatedArticles.map((article) => (
                              <motion.div
                                key={article.id}
                                whileHover={{
                                  x: 4,
                                  backgroundColor:
                                    theme === "dark" ? "rgba(139, 92, 246, 0.1)" : "rgba(139, 92, 246, 0.05)",
                                }}
                                className={`p-3 rounded-lg ${themeBorderColor} border flex flex-col`}
                              >
                                <span className="text-sm font-medium hover:text-violet-600 transition-colors">
                                  {article.title}
                                </span>
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex gap-1">
                                    {article.tags.map((tag, idx) => (
                                      <span
                                        key={idx}
                                        className={`text-xs px-2 py-0.5 rounded-full ${themePrimaryBg} ${themePrimaryText}`}
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                  <span className={`text-xs ${themeMutedText} flex items-center`}>
                                    <Clock className="h-3 w-3 mr-1" />
                                    {article.readTime} min
                                  </span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {showAudioControls && (
                    <div className={`mt-6 p-4 rounded-lg ${themeMutedBg} border ${themeBorderColor}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold">Listen to Article</h4>
                        <button
                          onClick={() => setShowAudioControls(false)}
                          className={`p-1 rounded-md ${themeMutedText} hover:text-violet-500 hover:bg-violet-100 focus:outline-none`}
                          aria-label="Close audio controls"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-full h-1 bg-slate-200 rounded-full mb-4 overflow-hidden">
                          <motion.div
                            className="h-full bg-violet-500"
                            animate={{ width: `${audioProgress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <div className="flex items-center justify-between w-full mb-4">
                          <span className="text-xs text-slate-500">
                            {Math.floor((audioProgress / 100) * readingTime * 60)}s
                          </span>
                          <span className="text-xs text-slate-500">{readingTime}:00</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setAudioProgress(Math.max(0, audioProgress - 10))}
                            className={`p-2 rounded-full ${themeMutedBg} ${themeMutedText} hover:bg-violet-200 focus:outline-none`}
                            aria-label="Rewind 10 seconds"
                          >
                            <Rewind className="h-5 w-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleTextToSpeech}
                            className="p-3 rounded-full bg-violet-600 text-white hover:bg-violet-700 focus:outline-none"
                            aria-label={isSpeaking ? "Pause" : "Play"}
                          >
                            {isSpeaking ? (
                              <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            ) : (
                              <Play className="h-6 w-6" />
                            )}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setAudioProgress(Math.min(100, audioProgress + 10))}
                            className={`p-2 rounded-full ${themeMutedBg} ${themeMutedText} hover:bg-violet-200 focus:outline-none`}
                            aria-label="Forward 10 seconds"
                          >
                            <FastForward className="h-5 w-5" />
                          </motion.button>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <span className="text-xs text-slate-500">Speed:</span>
                          {[0.5, 1, 1.5, 2].map((speed) => (
                            <motion.button
                              key={speed}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleChangeAudioSpeed(speed)}
                              className={`px-2 py-1 text-xs rounded ${
                                audioSpeed === speed
                                  ? "bg-violet-600 text-white"
                                  : `${themeMutedBg} ${themeMutedText} hover:bg-violet-200`
                              } focus:outline-none`}
                            >
                              {speed}x
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-semibold">Comments ({commentsCount})</h4>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowComments(!showComments)}
                        className="text-xs text-violet-600 hover:text-violet-800 font-medium"
                      >
                        {showComments ? "Hide Comments" : "Show Comments"}
                      </motion.button>
                    </div>
                    <AnimatePresence>
                      {showComments && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden"
                        >
                          <div className="mb-4">
                            <textarea
                              value={commentInput}
                              onChange={(e) => setCommentInput(e.target.value)}
                              placeholder="Add a comment..."
                              className={`w-full px-3 py-2 text-sm rounded-lg border ${themeBorderColor} ${themeClasses} placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500`}
                              rows={3}
                            ></textarea>
                            <div className="flex justify-end mt-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddComment}
                                className="px-4 py-1.5 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 flex items-center gap-1"
                              >
                                <Send className="h-3.5 w-3.5" />
                                Post Comment
                              </motion.button>
                            </div>
                          </div>
                          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                            {commentsList.map((comment) => (
                              <div
                                key={comment.id}
                                className={`p-3 rounded-lg ${themeMutedBg} border ${themeBorderColor}`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                                    {comment.avatar ? (
                                      <img
                                        src={comment.avatar || "/placeholder.svg"}
                                        alt={comment.author}
                                        className="w-full h-full rounded-full object-cover"
                                      />
                                    ) : (
                                      comment.author.charAt(0)
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium">{comment.author}</span>
                                      <span className={`text-xs ${themeMutedText}`}>{comment.time}</span>
                                    </div>
                                    <p className={`text-sm mt-1 ${themeMutedText}`}>{comment.content}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        className={`text-xs flex items-center gap-1 ${themeMutedText} hover:text-violet-600`}
                                      >
                                        <ThumbsUp className="h-3.5 w-3.5" />
                                        {comment.likes}
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        className={`text-xs ${themeMutedText} hover:text-violet-600`}
                                      >
                                        Reply
                                      </motion.button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReadMoreClick}
            className="text-sm text-violet-600 hover:text-violet-800 font-medium mb-5 focus:outline-none"
          >
            {isExpanded ? "Show less" : "Read more..."}
          </motion.button>

          <div className="flex justify-between items-center">
            <span className={`text-xs ${themeMutedText} flex items-center`}>
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {date || "Unknown Date"}
            </span>
            <div className="flex space-x-2">
              <motion.button
                variants={buttonVariants}
                animate={hasLiked ? "active" : "initial"}
                whileHover="hover"
                whileTap="tap"
                onClick={handleLikeClick}
                className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                  hasLiked ? "bg-pink-100 text-pink-600" : `${themeMutedBg} ${themeMutedText} hover:bg-slate-200`
                }`}
                aria-label={hasLiked ? "Unlike article" : "Like article"}
              >
                <Heart className="h-4 w-4" fill={hasLiked ? "currentColor" : "none"} />
              </motion.button>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => {
                  if (isExpanded) {
                    setShowComments(!showComments)
                  } else {
                    setIsExpanded(true)
                    setTimeout(() => setShowComments(true), 300)
                  }
                }}
                className={`p-2 rounded-full ${themeMutedBg} ${themeMutedText} hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 relative`}
                aria-label="Show comments"
              >
                <MessageCircle className="h-4 w-4" />
                {commentsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-xs flex items-center justify-center bg-violet-600 text-white rounded-full">
                    {commentsCount > 99 ? "99+" : commentsCount}
                  </span>
                )}
              </motion.button>
              <div className="relative" ref={shareRef}>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setIsShareOpen(!isShareOpen)}
                  className={`p-2 rounded-full ${themeMutedBg} ${themeMutedText} hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500`}
                  aria-label="Share article"
                >
                  <Share2 className="h-4 w-4" />
                </motion.button>
                <AnimatePresence>
                  {isShareOpen && (
                    <motion.div
                      variants={shareMenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`absolute right-0 bottom-full mb-2 w-48 ${themeClasses} rounded-lg shadow-xl border ${themeBorderColor} z-20`}
                    >
                      <div className="p-1">
                        <motion.button
                          whileHover={{ backgroundColor: theme === "dark" ? "#2d3748" : "#f1f5f9" }}
                          onClick={() => handleShareClick("twitter")}
                          className="w-full px-3 py-2 text-sm flex items-center gap-2 rounded-md"
                        >
                          <svg className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                          </svg>
                          Twitter
                        </motion.button>
                        <motion.button
                          whileHover={{ backgroundColor: theme === "dark" ? "#2d3748" : "#f1f5f9" }}
                          onClick={() => handleShareClick("linkedin")}
                          className="w-full px-3 py-2 text-sm flex items-center gap-2 rounded-md"
                        >
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.047-3.052-1.854-3.052-1.859 0-2.145 1.452-2.145 2.953v5.703h-3v-11h2.882v1.504h.041c.401-.757 1.379-1.554 2.834-1.554 3.03 0 3.592 1.993 3.592 4.583v6.467z" />
                          </svg>
                          LinkedIn
                        </motion.button>
                        <motion.button
                          whileHover={{ backgroundColor: theme === "dark" ? "#2d3748" : "#f1f5f9" }}
                          onClick={() => handleShareClick("facebook")}
                          className="w-full px-3 py-2 text-sm flex items-center gap-2 rounded-md"
                        >
                          <svg className="w-4 h-4 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                          </svg>
                          Facebook
                        </motion.button>
                        <motion.button
                          whileHover={{ backgroundColor: theme === "dark" ? "#2d3748" : "#f1f5f9" }}
                          onClick={() => handleShareClick("email")}
                          className="w-full px-3 py-2 text-sm flex items-center gap-2 rounded-md"
                        >
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          Email
                        </motion.button>
                        <motion.button
                          whileHover={{ backgroundColor: theme === "dark" ? "#2d3748" : "#f1f5f9" }}
                          onClick={() => handleShareClick("copy")}
                          className="w-full px-3 py-2 text-sm flex items-center gap-2 rounded-md"
                        >
                          <svg
                            className="w-4 h-4 text-violet-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          Copy Link
                        </motion.button>
                        <motion.button
                          whileHover={{ backgroundColor: theme === "dark" ? "#2d3748" : "#f1f5f9" }}
                          onClick={() => handleShareClick("download")}
                          className="w-full px-3 py-2 text-sm flex items-center gap-2 rounded-md"
                        >
                          <Download className="w-4 h-4 text-green-500" />
                          Download
                        </motion.button>
                        <motion.button
                          whileHover={{ backgroundColor: theme === "dark" ? "#2d3748" : "#f1f5f9" }}
                          onClick={() => handleShareClick("print")}
                          className="w-full px-3 py-2 text-sm flex items-center gap-2 rounded-md"
                        >
                          <Printer className="w-4 h-4 text-orange-500" />
                          Print
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleTextToSpeech}
                className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                  isSpeaking ? "bg-violet-100 text-violet-600" : `${themeMutedBg} ${themeMutedText} hover:bg-slate-200`
                }`}
                aria-label={isSpeaking ? "Stop reading" : "Listen to article"}
              >
                <Volume2 className="h-4 w-4" />
              </motion.button>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleAISummaryToggle}
                className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  showAISummary
                    ? "bg-purple-100 text-purple-600"
                    : `${themeMutedBg} ${themeMutedText} hover:bg-slate-200`
                }`}
                aria-label={showAISummary ? "Show original" : "Show AI summary"}
              >
                <Sparkles className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <Toaster
        toastOptions={{
          duration: 2500,
          style: {
            background: theme === "dark" ? "#1e293b" : "#ffffff",
            color: theme === "dark" ? "#f8fafc" : "#1e293b",
            border: `1px solid ${theme === "dark" ? "#334155" : "#e5e7eb"}`,
            borderRadius: "8px",
            padding: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
    </>
  )
}

const TechCardExample = () => {
  return (
    <div className="min-h-screen py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-slate-900 text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Trending Tech Articles
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <TechCard
            title="The Future of AI in Web Development"
            description="Discover how AI is transforming web development with automated design systems, intelligent user experiences, and code generation tools. This article explores the latest AI-driven innovations reshaping the industry."
            imageUrl="https://imgs.search.brave.com/kGETNvsDHq526qFueeT6uMjsIXfciQP54QEa17qwVgc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wZXRh/cGl4ZWwuY29tL2Fz/c2V0cy91cGxvYWRz/LzIwMjMvMDIvYmV0/dGVyLWFydGlzdC1t/YW4tbWFjaGluZS1s/ZXQtNzkzMDAxMjU1/LTgwMHg4MDAuanBn"
            tags={["AI", "Web Dev", "Automation"]}
            category="Artificial Intelligence"
            date="May 7, 2025"
            readTime={5}
            readMoreUrl="https://example.com/ai-web-dev"
            initialComments={12}
            author={{ name: "Alex Johnson", avatar: null, role: "AI Researcher" }}
            index={0}
          />
          <TechCard
            title="React 19: New Features Unveiled"
            description="Get a sneak peek into React 19's upcoming features, including new hooks, concurrent rendering, and the React compiler. Learn how these changes will streamline your development workflow."
            imageUrl="https://imgs.search.brave.com/7dzYT7m8VNRkkOGamDhT5jTknK4TnC5v3CEAQkkkTkA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZWNvZGVjYW1w/Lm9yZy9uZXdzL2Nv/bnRlbnQvaW1hZ2Vz/L3NpemUvdzIwMDAv/MjAyNC8wMy9Hcm91/cC0yNy5wbmc"
            tags={["React", "JavaScript", "Frontend"]}
            category="Frontend Development"
            date="April 28, 2025"
            readTime={8}
            readMoreUrl="https://example.com/react-19"
            initialComments={25}
            author={{ name: "Sarah Chen", avatar: null, role: "Senior Frontend Developer" }}
            index={1}
          />
          <TechCard
            title="Scalable Microservices Architecture"
            description="Master the art of building scalable microservices with best practices for architecture, deployment, and monitoring. Includes case studies from top tech companies."
            imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&h=400"
            tags={["Backend", "Microservices", "DevOps"]}
            category="Backend Development"
            date="April 15, 2025"
            readTime={12}
            readMoreUrl="https://example.com/microservices"
            initialComments={18}
            author={{ name: "Michael Rodriguez", avatar: null, role: "Cloud Architect" }}
            index={2}
          />
          <TechCard
            title="Quantum Computing Breakthroughs"
            description="Explore the latest advancements in quantum computing and their potential to revolutionize industries. From quantum algorithms to hardware innovations, this article covers it all."
            imageUrl="https://imgs.search.brave.com/H-fMU5SC20tHPmn_C51PuxIjm__nu3wpHZotNCywaCo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnVpbHRpbi5jb20v/Y2RuLWNnaS9pbWFn/ZS9mPWF1dG8sZml0/PWNvdmVyLHc9MzIw/LGg9MjAwLHE9ODAv/aHR0cHM6Ly9idWls/dGluLmNvbS9zaXRl/cy93d3cuYnVpbHRp/bi5jb20vZmlsZXMv/cXVhbnR1bS1jb21w/dXRpbmctYXBwbGlj/YXRpb25zLWV4YW1w/bGVzLmpwZw"
            tags={["Quantum", "Computing", "Innovation"]}
            category="Quantum Technology"
            date="March 20, 2025"
            readTime={10}
            readMoreUrl="https://example.com/quantum-computing"
            initialComments={15}
            author={{ name: "Dr. Emily Patel", avatar: null, role: "Quantum Physicist" }}
            index={3}
          />
          <TechCard
            title="Cybersecurity in the Age of AI"
            description="Learn how AI is reshaping cybersecurity with advanced threat detection and automated defenses. This article examines the challenges and opportunities in securing digital systems."
            imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&h=400"
            tags={["Cybersecurity", "AI", "Security"]}
            category="Cybersecurity"
            date="March 10, 2025"
            readTime={7}
            readMoreUrl="https://example.com/cybersecurity-ai"
            initialComments={20}
            author={{ name: "Lisa Wong", avatar: null, role: "Security Analyst" }}
            index={4}
          />
          <TechCard
            title="The Rise of Web3 Technologies"
            description="Dive into the world of Web3, exploring decentralized applications, blockchain, and the future of the internet. Understand the technologies driving the next digital revolution."
            imageUrl="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&h=400"
            tags={["Web3", "Blockchain", "Decentralized"]}
            category="Web3"
            date="February 25, 2025"
            readTime={9}
            readMoreUrl="https://example.com/web3-tech"
            initialComments={22}
            author={{ name: "David Kim", avatar: null, role: "Blockchain Developer" }}
            index={5}
          />
        </div>
      </div>
    </div>
  )
}

export default TechCardExample
