import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { Search, Filter, ChevronDown, Star, ShoppingCart, Heart, BarChart2, CheckCircle, RefreshCw, X, Plus, Minus, CreditCard, ArrowRight, Check, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

const Products = ({ section }) => {
  const { section: urlSection } = useParams()
  const activeSection = section || urlSection || "all"

  // State
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    category: activeSection !== "all" ? activeSection : "",
    priceRange: "",
    rating: "",
    availability: "",
  })
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState("grid")
  const [wishlistedItems, setWishlistedItems] = useState({})
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [pinInput, setPinInput] = useState("")
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const cartRef = useRef(null)
  const checkoutRef = useRef(null)
  const paymentRef = useRef(null)

  // Update category filter when section changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: activeSection !== "all" ? activeSection : "",
    }))
  }, [activeSection])
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

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target) && showCart) {
        setShowCart(false)
      }
      if (checkoutRef.current && !checkoutRef.current.contains(event.target) && showCheckout) {
        setShowCheckout(false)
      }
      if (paymentRef.current && !paymentRef.current.contains(event.target) && showPaymentConfirmation) {
        setShowPaymentConfirmation(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showCart, showCheckout, showPaymentConfirmation])

  // Cart functions
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    
    // Show cart after adding item
    setShowCart(true)
    
    // Animation for cart icon
    const cartIcon = document.getElementById("cart-icon")
    if (cartIcon) {
      cartIcon.classList.add("animate-bounce")
      setTimeout(() => {
        cartIcon.classList.remove("animate-bounce")
      }, 1000)
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ))
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const proceedToCheckout = () => {
    setShowCart(false)
    setShowCheckout(true)
  }

  const handlePayment = (method) => {
    setPaymentMethod(method)
    setShowPaymentConfirmation(true)
  }

  const processPayment = () => {
    if (pinInput.length < 4) return
    
    setIsProcessingPayment(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false)
      setPaymentSuccess(true)
      
      // Reset after successful payment
      setTimeout(() => {
        setShowPaymentConfirmation(false)
        setShowCheckout(false)
        setCart([])
        setPinInput("")
        setPaymentSuccess(false)
      }, 3000)
    }, 2000)
  }

  const toggleWishlist = (productId) => {
    setWishlistedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }))
  }

  // Product categories
  const categories = [
    { id: "all", name: "All Products" },
    { id: "software", name: "Software Solutions" },
    { id: "hardware", name: "Hardware Products" },
    { id: "cloud", name: "Cloud Services" },
    { id: "security", name: "Security Products" },
    { id: "accessories", name: "Accessories" },
  ]

  // Price ranges
  const priceRanges = [
    { id: "", name: "All Prices" },
    { id: "under100", name: "Under $100" },
    { id: "100to500", name: "$100 to $500" },
    { id: "500to1000", name: "$500 to $1000" },
    { id: "over1000", name: "Over $1000" },
  ]

  // Ratings
  const ratings = [
    { id: "", name: "Any Rating" },
    { id: "4plus", name: "4★ & Above" },
    { id: "3plus", name: "3★ & Above" },
    { id: "2plus", name: "2★ & Above" },
  ]

  // Sort options
  const sortOptions = [
    { id: "featured", name: "Featured" },
    { id: "newest", name: "Newest" },
    { id: "priceAsc", name: "Price: Low to High" },
    { id: "priceDesc", name: "Price: High to Low" },
    { id: "rating", name: "Highest Rated" },
  ]

  // Payment methods
  const paymentMethods = [
    { id: "gpay", name: "Google Pay", icon: "/images/gpay.png" },
    { id: "paytm", name: "Paytm", icon: "/images/paytm.png" },
    { id: "phonepe", name: "PhonePe", icon: "/images/phonepe.png" },
    { id: "upi", name: "Other UPI", icon: "/images/upi.png" },
    { id: "card", name: "Credit/Debit Card", icon: "/images/card.png" },
  ]

  // Product data with real images
  const allProducts = [
    // Software Solutions
    {
      id: 1,
      name: "Enterprise Resource Planning Suite",
      category: "software",
      price: 2999,
      rating: 4.7,
      reviewCount: 128,
      description: "Comprehensive ERP solution for large businesses with modules for finance, HR, inventory, and CRM.",
      features: ["Cloud-based deployment", "Mobile access", "Real-time analytics", "Customizable dashboards"],
      image: "/images/erp-software.jpg",
      inStock: true,
      new: true,
    },
    {
      id: 2,
      name: "Small Business Management Software",
      category: "software",
      price: 499,
      rating: 4.5,
      reviewCount: 94,
      description: "All-in-one business management solution tailored for small to medium enterprises.",
      features: ["Invoicing & accounting", "Inventory tracking", "Customer management", "Online appointment booking"],
      image: "/images/business-software.jpg",
      inStock: true,
      new: false,
    },
    {
      id: 3,
      name: "Advanced Analytics Platform",
      category: "software",
      price: 1299,
      rating: 4.8,
      reviewCount: 76,
      description: "Turn your data into actionable insights with our powerful analytics platform.",
      features: ["Predictive analytics", "Data visualization", "Machine learning integration", "Automated reporting"],
      image: "/images/analytics-platform.jpg",
      inStock: true,
      new: true,
    },
    {
      id: 4,
      name: "Project Management Solution",
      category: "software",
      price: 399,
      rating: 4.3,
      reviewCount: 152,
      description: "Streamline project workflows, enhance team collaboration, and deliver projects on time.",
      features: ["Gantt charts", "Task management", "Resource allocation", "Time tracking"],
      image: "/images/project-management.jpg",
      inStock: true,
      new: false,
    },

    // Hardware Products
    {
      id: 5,
      name: "Enterprise Server X9000",
      category: "hardware",
      price: 7999,
      rating: 4.9,
      reviewCount: 42,
      description: "High-performance server for mission-critical enterprise applications and databases.",
      features: ["128-core processor", "1TB ECC RAM", "Redundant power supplies", "Advanced cooling system"],
      image: "/images/server.jpg",
      inStock: true,
      new: true,
    },
    {
      id: 6,
      name: "Business Workstation Pro",
      category: "hardware",
      price: 2499,
      rating: 4.6,
      reviewCount: 88,
      description: "Professional-grade workstation for design, engineering, and data analysis tasks.",
      features: ["16-core processor", "64GB RAM", "Dedicated graphics", "1TB SSD storage"],
      image: "/images/workstation.jpg",
      inStock: false,
      new: false,
    },
    {
      id: 7,
      name: "Network Security Appliance",
      category: "hardware",
      price: 1899,
      rating: 4.7,
      reviewCount: 63,
      description: "Hardware firewall and security appliance for comprehensive network protection.",
      features: ["10Gbps throughput", "Intrusion prevention", "VPN support", "Content filtering"],
      image: "/images/security-appliance.jpg",
      inStock: true,
      new: false,
    },

    // Cloud Services
    {
      id: 8,
      name: "Cloud Storage Enterprise Plan",
      category: "cloud",
      price: 199,
      perType: "month",
      rating: 4.8,
      reviewCount: 127,
      description: "Scalable cloud storage solution with enterprise-grade security and collaboration features.",
      features: ["Unlimited storage", "Advanced encryption", "Team collaboration tools", "Automated backups"],
      image: "/images/cloud-storage.jpg",
      inStock: true,
      new: false,
    },
    {
      id: 9,
      name: "Virtual Desktop Infrastructure",
      category: "cloud",
      price: 79,
      perType: "user/month",
      rating: 4.4,
      reviewCount: 91,
      description: "Secure virtual desktops accessible from anywhere on any device.",
      features: ["Windows/Linux options", "Application virtualization", "Centralized management", "Usage analytics"],
      image: "/images/virtual-desktop.jpg",
      inStock: true,
      new: true,
    },
    {
      id: 10,
      name: "Managed Kubernetes Service",
      category: "cloud",
      price: 349,
      perType: "month",
      rating: 4.9,
      reviewCount: 48,
      description: "Fully managed container orchestration platform for deploying and scaling applications.",
      features: ["Automated scaling", "Load balancing", "Self-healing", "Monitoring & logging"],
      image: "/images/kubernetes.jpg",
      inStock: true,
      new: true,
    },

    // Security Products
    {
      id: 11,
      name: "Enterprise Security Suite",
      category: "security",
      price: 1299,
      perType: "year",
      rating: 4.7,
      reviewCount: 106,
      description: "Comprehensive security solution protecting endpoints, networks, and cloud resources.",
      features: ["Threat intelligence", "Behavioral analysis", "Zero-day protection", "Compliance reporting"],
      image: "/images/security-suite.jpg",
      inStock: true,
      new: false,
    },
    {
      id: 12,
      name: "Data Loss Prevention System",
      category: "security",
      price: 899,
      perType: "year",
      rating: 4.5,
      reviewCount: 74,
      description: "Prevent unauthorized data transfer and leakage with advanced DLP technologies.",
      features: ["Content inspection", "User activity monitoring", "Policy enforcement", "Incident response"],
      image: "/images/dlp-system.jpg",
      inStock: true,
      new: false,
    },

    // Accessories
    {
      id: 13,
      name: "Enterprise Networking Bundle",
      category: "accessories",
      price: 899,
      rating: 4.6,
      reviewCount: 57,
      description: "Complete networking solution for small to medium offices.",
      features: ["Managed switch", "Wireless access points", "Network cables", "Installation guide"],
      image: "/images/networking-bundle.jpg",
      inStock: true,
      new: false,
    },
    {
      id: 14,
      name: "Smart Conference System",
      category: "accessories",
      price: 1299,
      rating: 4.7,
      reviewCount: 38,
      description: "All-in-one conference room solution with audio, video, and collaboration features.",
      features: ["4K camera", "360° speakerphone", "Wireless presentation", "Meeting scheduler"],
      image: "/images/conference-system.jpg",
      inStock: false,
      new: true,
    },
    {
      id: 15,
      name: "Business Backup Power System",
      category: "accessories",
      price: 599,
      rating: 4.8,
      reviewCount: 64,
      description: "Reliable UPS system designed for business environments to protect critical equipment.",
      features: ["Pure sine wave output", "LCD status display", "Surge protection", "Battery management"],
      image: "/images/backup-power.jpg",
      inStock: true,
      new: false,
    },
  ]

  const applyFilters = () => {
    let filteredProducts = [...allProducts]

    // Filter by section/category
    if (filters.category) {
      filteredProducts = filteredProducts.filter((product) => product.category === filters.category)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
      )
    }

    // Filter by price range
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case "under100":
          filteredProducts = filteredProducts.filter((product) => product.price < 100)
          break
        case "100to500":
          filteredProducts = filteredProducts.filter((product) => product.price >= 100 && product.price <= 500)
          break
        case "500to1000":
          filteredProducts = filteredProducts.filter((product) => product.price > 500 && product.price <= 1000)
          break
        case "over1000":
          filteredProducts = filteredProducts.filter((product) => product.price > 1000)
          break
        default:
          break
      }
    }

    // Filter by rating
    if (filters.rating) {
      switch (filters.rating) {
        case "4plus":
          filteredProducts = filteredProducts.filter((product) => product.rating >= 4)
          break
        case "3plus":
          filteredProducts = filteredProducts.filter((product) => product.rating >= 3)
          break
        case "2plus":
          filteredProducts = filteredProducts.filter((product) => product.rating >= 2)
          break
        default:
          break
      }
    }

    // Filter by availability
    if (filters.availability === "inStock") {
      filteredProducts = filteredProducts.filter((product) => product.inStock)
    }

    // Sort products
    switch (sortBy) {
      case "priceAsc":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "priceDesc":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filteredProducts.sort((a, b) => b.new - a.new)
        break
      default:
        // 'featured' or default - no specific sort
        break
    }

    return filteredProducts
  }

  const filteredProducts = applyFilters()

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Get content based on active section
  const sectionContent = {
    all: {
      title: "All Products",
      description: "Explore our comprehensive range of technology products and services.",
    },
    software: {
      title: "Software Solutions",
      description: "Innovative software for productivity, automation, and business intelligence.",
    },
    hardware: {
      title: "Hardware Solutions",
      description: "High-performance hardware for enterprise needs and professional workloads.",
    },
    cloud: {
      title: "Cloud Solutions",
      description: "Scalable and secure cloud services for modern business requirements.",
    },
    security: {
      title: "Security Products",
      description: "Comprehensive security solutions to protect your business assets.",
    },
    accessories: {
      title: "Tech Accessories",
      description: "Essential accessories to complement your technology infrastructure.",
    },
  }

  const content = sectionContent[activeSection] || sectionContent.all

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-900 dark:to-indigo-900">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              {content.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">{content.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cart Icon */}
        <div className="fixed top-4 right-4 z-50">
          <button 
            id="cart-icon"
            onClick={() => setShowCart(true)} 
            className="relative p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingBag className="h-6 w-6" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl shadow-lg p-4 mb-8 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white/70 dark:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
              />
            </div>

            {/* Sort By */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-slate-300">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center md:justify-start gap-2 py-2 px-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`} />
            </button>

            {/* View Mode Toggle */}
            <div className="flex-shrink-0 flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 ${
                  viewMode === "grid"
                    ? "bg-indigo-500 text-white"
                    : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 ${
                  viewMode === "list"
                    ? "bg-indigo-500 text-white"
                    : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                }`}
              >
                List
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange("category", e.target.value)}
                      className="w-full bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id === "all" ? "" : category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price Range</label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                      className="w-full bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
                    >
                      {priceRanges.map((range) => (
                        <option key={range.id} value={range.id}>
                          {range.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rating</label>
                    <select
                      value={filters.rating}
                      onChange={(e) => handleFilterChange("rating", e.target.value)}
                      className="w-full bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
                    >
                      {ratings.map((rating) => (
                        <option key={rating.id} value={rating.id}>
                          {rating.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Availability Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Availability</label>
                    <select
                      value={filters.availability}
                      onChange={(e) => handleFilterChange("availability", e.target.value)}
                      className="w-full bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
                    >
                      <option value="">All Items</option>
                      <option value="inStock">In Stock Only</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Count & Active Filters */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <p className="text-slate-700 dark:text-slate-300">
            Showing <span className="font-semibold">{filteredProducts.length}</span> products
          </p>

          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            {filters.category && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                {categories.find((c) => c.id === filters.category)?.name}
                <button
                  onClick={() => handleFilterChange("category", "")}
                  className="ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  ×
                </button>
              </div>
            )}
            {filters.priceRange && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                {priceRanges.find((p) => p.id === filters.priceRange)?.name}
                <button
                  onClick={() => handleFilterChange("priceRange", "")}
                  className="ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  ×
                </button>
              </div>
            )}
            {filters.rating && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                {ratings.find((r) => r.id === filters.rating)?.name}
                <button
                  onClick={() => handleFilterChange("rating", "")}
                  className="ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  ×
                </button>
              </div>
            )}
            {filters.availability && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                In Stock Only
                <button
                  onClick={() => handleFilterChange("availability", "")}
                  className="ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  ×
                </button>
              </div>
            )}
            {(filters.category || filters.priceRange || filters.rating || filters.availability) && (
              <button
                onClick={() => setFilters({ category: "", priceRange: "", rating: "", availability: "" })}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Products Display */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl p-12 text-center border border-slate-100 dark:border-slate-700 shadow-lg">
            <div className="flex justify-center mb-4">
              <Search className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No products found</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setFilters({ category: "", priceRange: "", rating: "", availability: "" })
                setSearchQuery("")
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-violet-50/30 dark:from-indigo-900/10 dark:to-violet-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* New tag */}
                {product.new && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    NEW
                  </div>
                )}

                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${wishlistedItems[product.id] ? "text-red-500 fill-red-500" : "text-slate-400 dark:text-slate-300"}`}
                  />
                </button>

                {/* Product Image */}
                <div className="relative pt-[75%] bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="relative p-6">
                  {/* Category */}
                  <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                    {categories.find((c) => c.id === product.category)?.name}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">({product.reviewCount})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline mb-4">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.perType && (
                      <span className="ml-1 text-sm text-slate-500 dark:text-slate-400">/{product.perType}</span>
                    )}
                  </div>

                  {/* Availability */}
                  <div className="mb-4">
                    {product.inStock ? (
                      <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm">
                        <CheckCircle className="w-4 h-4 mr-1" /> In stock
                      </div>
                    ) : (
                      <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm">
                        <RefreshCw className="w-4 h-4 mr-1" /> Pre-order
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-violet-50/30 dark:from-indigo-900/10 dark:to-violet-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="flex flex-col md:flex-row">
                  {/* Product Image */}
                  <div className="relative md:w-1/4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700">
                    {product.new && (
                      <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        NEW
                      </div>
                    )}

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${wishlistedItems[product.id] ? "text-red-500 fill-red-500" : "text-slate-400 dark:text-slate-300"}`}
                      />
                    </button>

                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-60 md:h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="relative p-6 md:w-3/4 flex flex-col">
                    <div className="flex-grow">
                      {/* Category */}
                      <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                        {categories.find((c) => c.id === product.category)?.name}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">({product.reviewCount})</span>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-300 mb-4">{product.description}</p>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Key Features:</div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                          {product.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                              <span className="text-emerald-500 mr-1">✓</span> {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-end justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                      {/* Price and Availability */}
                      <div>
                        <div className="flex items-baseline mb-2">
                          <span className="text-2xl font-bold text-slate-900 dark:text-white">
                            ${product.price.toLocaleString()}
                          </span>
                          {product.perType && (
                            <span className="ml-1 text-sm text-slate-500 dark:text-slate-400">/{product.perType}</span>
                          )}
                        </div>

                        {product.inStock ? (
                          <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm">
                            <CheckCircle className="w-4 h-4 mr-1" /> In stock
                          </div>
                        ) : (
                          <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm">
                            <RefreshCw className="w-4 h-4 mr-1" /> Pre-order
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4 sm:mt-0">
                        <button className="px-4 py-2 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                          Learn More
                        </button>
                        <button 
                          onClick={() => addToCart(product)}
                          className="flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                        >
                          <ShoppingCart className="w-4 h-4" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Featured Products Section */}
        {filteredProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Featured Solutions</h2>
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-white/10 backdrop-blur-sm p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-block bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 text-sm text-white mb-4">
                      Enterprise Solution
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      Complete Business Technology Suite
                    </h3>
                    <p className="text-white/90 mb-6">
                      An all-in-one solution combining our premium software, hardware, and services at an exclusive
                      package price.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center text-white/90">
                        <CheckCircle className="w-5 h-5 mr-2 text-emerald-300" />
                        Enterprise resource planning software
                      </li>
                      <li className="flex items-center text-white/90">
                        <CheckCircle className="w-5 h-5 mr-2 text-emerald-300" />
                        High-performance server infrastructure
                      </li>
                      <li className="flex items-center text-white/90">
                        <CheckCircle className="w-5 h-5 mr-2 text-emerald-300" />
                        Premium cybersecurity protection
                      </li>
                      <li className="flex items-center text-white/90">
                        <CheckCircle className="w-5 h-5 mr-2 text-emerald-300" />
                        Dedicated support and maintenance
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition duration-300 shadow-lg transform hover:scale-[1.02]">
                        Request Custom Quote
                      </button>
                      <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <img
                      src="/images/enterprise-solution.jpg"
                      alt="Enterprise Solution"
                      className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-slate-50 dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    Stay Updated with Our Latest Products
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    Subscribe to our newsletter for exclusive deals, product updates, and technology insights.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-grow px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white/70 dark:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg font-semibold transition duration-300 shadow-md transform hover:scale-[1.02]">
                      Subscribe
                    </button>
                  </div>
                </div>
                <div className="hidden md:flex justify-center">
                  <BarChart2 className="w-48 h-48 text-indigo-100 dark:text-indigo-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowCart(false)}
            />
            <motion.div
              ref={cartRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5" /> Shopping Cart ({getCartCount()})
                </h2>
                <button 
                  onClick={() => setShowCart(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <ShoppingBag className="h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Your cart is empty</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">Looks like you haven't added any products to your cart yet.</p>
                  <button 
                    onClick={() => setShowCart(false)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                          <img 
                            src={item.image || "/placeholder.svg"} 
                            alt={item.name} 
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">{item.name}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              ${item.price.toLocaleString()}{item.perType && `/${item.perType}`}
                            </p>
                            <div className="flex items-center mt-2">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="mx-2 text-sm font-medium text-slate-900 dark:text-white">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between items-end">
                            <span className="font-medium text-slate-900 dark:text-white">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                      <span className="font-medium text-slate-900 dark:text-white">${getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-slate-600 dark:text-slate-400">Shipping</span>
                      <span className="font-medium text-slate-900 dark:text-white">Free</span>
                    </div>
                    <div className="flex justify-between mb-6 text-lg font-bold">
                      <span className="text-slate-900 dark:text-white">Total</span>
                      <span className="text-slate-900 dark:text-white">${getCartTotal().toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={proceedToCheckout}
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2"
                    >
                      Proceed to Checkout <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowCheckout(false)}
            />
            <motion.div
              ref={checkoutRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Checkout</h2>
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Order Summary</h3>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-4">
                    <div className="max-h-40 overflow-y-auto mb-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <img 
                              src={item.image || "/placeholder.svg"} 
                              alt={item.name} 
                              className="w-10 h-10 object-cover rounded-md mr-2"
                            />
                            <span className="text-sm text-slate-700 dark:text-slate-300">
                              {item.name} <span className="text-slate-500 dark:text-slate-400">x{item.quantity}</span>
                            </span>
                          </div>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                        <span className="font-medium text-slate-900 dark:text-white">${getCartTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-600 dark:text-slate-400">Shipping</span>
                        <span className="font-medium text-slate-900 dark:text-white">Free</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-slate-900 dark:text-white">Total</span>
                        <span className="text-slate-900 dark:text-white">${getCartTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Select Payment Method</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => handlePayment(method.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                          paymentMethod === method.id
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                            : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                        }`}
                      >
                        <img src={method.icon || "/placeholder.svg"} alt={method.name} className="h-10 w-10 object-contain mb-2" />
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => handlePayment("gpay")}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-5 w-5" /> Pay ${getCartTotal().toLocaleString()}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Payment Confirmation Modal */}
      <AnimatePresence>
        {showPaymentConfirmation && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => !isProcessingPayment && !paymentSuccess && setShowPaymentConfirmation(false)}
            />
            <motion.div
              ref={paymentRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white dark:bg-slate-900 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              {paymentSuccess ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 flex flex-col items-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                    className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4"
                  >
                    <Check className="h-8 w-8 text-emerald-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Payment Successful!</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Your order has been placed successfully. You will receive a confirmation email shortly.
                  </p>
                  <div className="w-full bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-600 dark:text-slate-400">Order ID</span>
                      <span className="font-medium text-slate-900 dark:text-white">#{Math.floor(Math.random() * 1000000)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-600 dark:text-slate-400">Amount Paid</span>
                      <span className="font-medium text-slate-900 dark:text-white">${getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Payment Method</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {paymentMethods.find(m => m.id === paymentMethod)?.name || "Card"}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setShowPaymentConfirmation(false)
                      setShowCheckout(false)
                      setCart([])
                      setPaymentSuccess(false)
                    }}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg font-semibold transition-all duration-300"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : isProcessingPayment ? (
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Processing Payment</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Please wait while we process your payment...
                  </p>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Confirm Payment</h3>
                    <button 
                      onClick={() => setShowPaymentConfirmation(false)}
                      className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-4">
                      <img 
                        src={paymentMethods.find(m => m.id === paymentMethod)?.icon || "/images/gpay.png"} 
                        alt="Payment Method" 
                        className="h-12 w-12 object-contain"
                      />
                    </div>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-4">
                      Enter your {paymentMethods.find(m => m.id === paymentMethod)?.name || "UPI"} PIN to complete the payment of <span className="font-bold text-slate-900 dark:text-white">${getCartTotal().toLocaleString()}</span>
                    </p>
                    
                    <div className="flex justify-center mb-6">
                      <div className="flex gap-2">
                        {[...Array(4)].map((_, i) => (
                          <div 
                            key={i} 
                            className="w-10 h-12 flex items-center justify-center border-2 border-slate-300 dark:border-slate-600 rounded-md"
                          >
                            {pinInput.length > i ? (
                              <div className="w-3 h-3 rounded-full bg-slate-900 dark:bg-white"></div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"].map((num, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if (num === "del") {
                              setPinInput(prev => prev.slice(0, -1))
                            } else if (num !== "" && pinInput.length < 4) {
                              setPinInput(prev => prev + num)
                            }
                          }}
                          className={`h-12 rounded-lg font-medium text-lg flex items-center justify-center transition-colors ${
                            num === "" 
                              ? "cursor-default" 
                              : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white"
                          }`}
                        >
                          {num === "del" ? "⌫" : num}
                        </button>
                      ))}
                    </div>
                    
                    <button 
                      onClick={processPayment}
                      disabled={pinInput.length < 4}
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                        pinInput.length < 4
                          ? "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white transform hover:scale-[1.02] shadow-md"
                      }`}
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Products
