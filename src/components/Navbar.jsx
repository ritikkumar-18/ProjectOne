import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import { toast, Toaster } from "react-hot-toast"
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Github,
  Twitter,
  Facebook,
  ArrowRight,
  User,
  UserPlus,
  LogIn,
  LogOut,
  X,
  ChevronDown,
  Phone,
} from "lucide-react"

// Company Logo SVG Component
const CompanyLogo = ({ className = "" }) => (
  <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z"
      fill="#3B82F6"
    />
    <path
      d="M23 11L16 7L9 11V21L16 25L23 21V11Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M16 25V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23 11L16 16L9 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 21L16 16L23 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"))
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState("login") 
  const location = useLocation()
  const navigate = useNavigate()
  const modalRef = useRef(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    setIsDropdownOpen(false)
    setIsSearchOpen(false)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const query = e.target.search.value
    if (query.trim()) {
      alert(`Searching for: ${query}`)
      e.target.reset()
      setIsSearchOpen(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    toast.success("Logged out successfully")
    navigate("/home")
  }

  const openAuthModal = (mode = "login") => {
    setAuthMode(mode)
    setShowAuthModal(true)
    document.body.style.overflow = "hidden"
  }

  const closeAuthModal = () => {
    setShowAuthModal(false)
    // Re-enable scrolling
    document.body.style.overflow = "auto"
  }

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeAuthModal()
      }
    }

    if (showAuthModal) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showAuthModal])

  // Close modal on escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        closeAuthModal()
      }
    }

    if (showAuthModal) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [showAuthModal])

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Subscriptions", path: "/subscriptions" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  const dropdownItems = [
    { name: "Software", path: "/products/software" },
    { name: "Hardware", path: "/products/hardware" },
    { name: "Cloud Solutions", path: "/products/cloud" },
  ]

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-40 transition-colors duration-300">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <CompanyLogo className="h-8 w-8 mr-2" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Techiee
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path ? "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                Products
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700"
                  >
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 ${
                          location.pathname === item.path
                            ? "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                            : ""
                        }`}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

           
            {/* Login/Profile Button */}
            <div className="relative">
              {isLoggedIn ? (
                <div className="flex items-center">
                  <Link
                    to="/profile"
                    className="text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                  >
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal("login")}
                  className="bg-teal-300 hover:bg-teal-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </button>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center space-x-3">
            

            {/* Menu Toggle - Mobile */}
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-md"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                      : ""
                  }`}
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              ))}
              <div>
                <button
                  onClick={toggleDropdown}
                  className="w-full text-left text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
                >
                  <span>Products</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 space-y-1 overflow-hidden"
                    >
                      {dropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`block text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base ${
                            location.pathname === item.path
                              ? "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                              : ""
                          }`}
                          onClick={toggleMenu}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Login/Profile Button in Mobile Menu */}
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="block text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium items-center"
                    onClick={toggleMenu}
                  >
                    <User className="mr-2 h-5 w-5" /> Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      toggleMenu()
                    }}
                    className="w-full text-left text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium flex items-center"
                  >
                    <LogOut className="mr-2 h-5 w-5" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      toggleMenu()
                      openAuthModal("login")
                    }}
                    className="w-full text-left text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium flex items-center"
                  >
                    <LogIn className="mr-2 h-5 w-5" /> Login
                  </button>
                  <button
                    onClick={() => {
                      toggleMenu()
                      openAuthModal("signup")
                    }}
                    className="w-full text-left text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium flex items-center"
                  >
                    <UserPlus className="mr-2 h-5 w-5" /> Sign Up
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-auto overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={closeAuthModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors z-10"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Auth Content */}
              {authMode === "login" ? (
                <LoginForm setAuthMode={setAuthMode} closeModal={closeAuthModal} setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <SignupForm setAuthMode={setAuthMode} closeModal={closeAuthModal} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// Login Form Component
const LoginForm = ({ setAuthMode, closeModal, setIsLoggedIn }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const navigate = useNavigate()

  const validatePassword = (password) => {
    return password.length >= 6
  }


  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    // Validate inputs
    if (!email) {
      setError("Email is required")
      toast.error("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      toast.error("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Password is required")
      toast.error("Password is required")
      return
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters")
      toast.error("Password must be at least 6 characters")
      return
    }

    try {
      setIsLoading(true)

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful login
      const user = {
        email,
        name: "John Doe",
        phone: "123-456-7890",
        address: "123 Tech Street, Tech City",
        profilePicture:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      }

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(user))

      // Show success message
      setLoginSuccess(true)
      toast.success("Login successful!")

      // Update login state and close modal after showing success message
      setTimeout(() => {
        setIsLoggedIn(true)
        closeModal()
        navigate("/home")
      }, 1000)
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred during login. Please try again.")
      toast.error("Login failed. Please try again.")
      setIsLoading(false)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  // Animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
          },
        },
      }}
      className="p-6"
    >
      <motion.div variants={itemVariants} className="text-center mb-6">
        <div className="inline-flex justify-center items-center mb-6">
          <CompanyLogo className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to your account to continue</p>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start"
          >
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {loginSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start"
          >
            <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-600 dark:text-green-300">Login successful! Redirecting you...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Field */}
        <motion.div variants={itemVariants}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="you@example.com"
            />
          </div>
        </motion.div>

        {/* Password Field */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </motion.div>

        {/* Remember Me */}
        <motion.div variants={itemVariants} className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Remember me
          </label>
        </motion.div>

        {/* Login Button */}
        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={isLoading || loginSuccess}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
              (isLoading || loginSuccess) && "opacity-70 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Signing in...
              </>
            ) : loginSuccess ? (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Success!
              </>
            ) : (
              <>
                Sign in <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </motion.div>
      </form>

      {/* Divider */}
      <motion.div variants={itemVariants} className="mt-6 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
        </div>
      </motion.div>

      {/* Social Login Buttons */}
      <motion.div variants={itemVariants} className="mt-6 grid grid-cols-3 gap-3">
        <button
          type="button"
          className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <Github className="h-5 w-5" />
          <span className="sr-only">Sign in with GitHub</span>
        </button>
        <button
          type="button"
          className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <Twitter className="h-5 w-5 text-[#1DA1F2]" />
          <span className="sr-only">Sign in with Twitter</span>
        </button>
        <button
          type="button"
          className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <Facebook className="h-5 w-5 text-[#4267B2]" />
          <span className="sr-only">Sign in with Facebook</span>
        </button>
      </motion.div>

      {/* Sign Up Link */}
      <motion.div variants={itemVariants} className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={() => setAuthMode("signup")}
            className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
          >
            Sign up
          </button>
        </p>
      </motion.div>
    </motion.div>
  )
}

// Signup Form Component
const SignupForm = ({ setAuthMode, closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 8
  }

  const validatePhone = (phone) => {
    const re = /^\d{10}$|^\d{3}-\d{3}-\d{4}$/
    return re.test(phone)
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError("")

    // Validate inputs
    if (!formData.name.trim()) {
      setError("Name is required")
      toast.error("Name is required")
      return
    }

    if (!formData.email) {
      setError("Email is required")
      toast.error("Email is required")
      return
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address")
      toast.error("Please enter a valid email address")
      return
    }

    if (!formData.password) {
      setError("Password is required")
      toast.error("Password is required")
      return
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 8 characters")
      toast.error("Password must be at least 8 characters")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      toast.error("Passwords do not match")
      return
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      setError("Please enter a valid phone number")
      toast.error("Please enter a valid phone number")
      return
    }

    if (!agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy")
      toast.error("You must agree to the Terms of Service and Privacy Policy")
      return
    }

    try {
      setIsLoading(true)

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setSignupSuccess(true)
      toast.success("Account created successfully!")

      // Redirect after showing success message
      setTimeout(() => {
        closeModal()
        navigate("/home")
      }, 1500)
    } catch (error) {
      console.error("Signup error:", error)
      setError("An error occurred during signup. Please try again.")
      toast.error("Signup failed. Please try again.")
      setIsLoading(false)
    }
  }

  // Animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
          },
        },
      }}
      className="p-6  overflow-y-auto h-[94vh]"
    >
      <motion.div variants={itemVariants} className="text-center mb-6 ">
        <div className="inline-flex justify-center items-center mb-6">
          <CompanyLogo className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create an account</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Join us today and start your journey</p>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start"
          >
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {signupSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start"
          >
            <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-600 dark:text-green-300">
              Account created successfully! Redirecting you...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSignup} className="space-y-4">
        {/* Name Field */}
        <motion.div variants={itemVariants}>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="John Doe"
            />
          </div>
        </motion.div>

        {/* Email Field */}
        <motion.div variants={itemVariants}>
          <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="you@example.com"
            />
          </div>
        </motion.div>

        {/* Phone Field */}
        <motion.div variants={itemVariants}>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number <span className="text-gray-500 dark:text-gray-400">(Optional)</span>
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="123-456-7890"
            />
          </div>
        </motion.div>

        {/* Password Field */}
        <motion.div variants={itemVariants}>
          <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Password must be at least 8 characters</p>
        </motion.div>

        {/* Confirm Password Field */}
        <motion.div variants={itemVariants}>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </motion.div>

        {/* Terms and Conditions */}
        <motion.div variants={itemVariants} className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-700 dark:text-gray-300">
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
        </motion.div>

        {/* Signup Button */}
        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={isLoading || signupSuccess}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
              (isLoading || signupSuccess) && "opacity-70 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Creating account...
              </>
            ) : signupSuccess ? (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Success!
              </>
            ) : (
              <>
                Create Account <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </motion.div>
      </form>

      {/* Divider */}
      <motion.div variants={itemVariants} className="mt-6 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
        </div>
      </motion.div>

      {/* Social Signup Buttons */}
      <motion.div variants={itemVariants} className="mt-6 grid grid-cols-3 gap-3">
        <button
          type="button"
          className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <Github className="h-5 w-5" />
          <span className="sr-only">Sign up with GitHub</span>
        </button>
        <button
          type="button"
          className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <Twitter className="h-5 w-5 text-[#1DA1F2]" />
          <span className="sr-only">Sign up with Twitter</span>
        </button>
        <button
          type="button"
          className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <Facebook className="h-5 w-5 text-[#4267B2]" />
          <span className="sr-only">Sign up with Facebook</span>
        </button>
      </motion.div>

      {/* Login Link */}
      <motion.div variants={itemVariants} className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => setAuthMode("login")}
            className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
          >
            Sign in
          </button>
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Navbar
