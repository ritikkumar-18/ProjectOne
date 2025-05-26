// import { useState, useEffect, useRef } from "react"
// import { useParams } from "react-router-dom"
// import { Search, Filter, ChevronDown, Star, ShoppingCart, Heart, BarChart2, CheckCircle, RefreshCw, X, Plus, Minus, ArrowRight, Check, ShoppingBag } from 'lucide-react'
// import { motion, AnimatePresence } from "framer-motion"

// const Products = ({ section }) => {
//   const { section: urlSection } = useParams()
//   const activeSection = section || urlSection || "all"

//   // State
//   const [searchQuery, setSearchQuery] = useState("")
//   const [filters, setFilters] = useState({
//     category: activeSection !== "all" ? activeSection : "",
//     priceRange: "",
//     rating: "",
//     availability: "",
//   })
//   const [sortBy, setSortBy] = useState("featured")
//   const [showFilters, setShowFilters] = useState(false)
//   const [viewMode, setViewMode] = useState("grid")
//   const [wishlistedItems, setWishlistedItems] = useState({})
//   const [cart, setCart] = useState([])
//   const [showCart, setShowCart] = useState(false)
//   const [showCheckout, setShowCheckout] = useState(false)
//   const cartRef = useRef(null)
//   const checkoutRef = useRef(null)

//   // Update category filter when section changes
//   useEffect(() => {
//     setFilters((prev) => ({
//       ...prev,
//       category: activeSection !== "all" ? activeSection : "",
//     }))
//   }, [activeSection])

//   useEffect(() => {
//     // Ensure the scroll happens after the component mounts
//     const scrollToTop = () => {
//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth',
//       })
//     }
//     const timer = setTimeout(scrollToTop, 0)
//     return () => clearTimeout(timer)
//   }, [])

//   // Close modals when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (cartRef.current && !cartRef.current.contains(event.target) && showCart) {
//         setShowCart(false)
//       }
//       if (checkoutRef.current && !checkoutRef.current.contains(event.target) && showCheckout) {
//         setShowCheckout(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [showCart, showCheckout])

//   // Cart functions
//   const addToCart = (product) => {
//     const existingItem = cart.find(item => item.id === product.id)
    
//     if (existingItem) {
//       setCart(cart.map(item => 
//         item.id === product.id 
//           ? { ...item, quantity: item.quantity + 1 } 
//           : item
//       ))
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }])
//     }
    
//     // Show cart after adding item
//     setShowCart(true)
    
//     // Animation for cart icon
//     const cartIcon = document.getElementById("cart-icon")
//     if (cartIcon) {
//       cartIcon.classList.add("animate-bounce")
//       setTimeout(() => {
//         cartIcon.classList.remove("animate-bounce")
//       }, 1000)
//     }
//   }

//   const removeFromCart = (productId) => {
//     setCart(cart.filter(item => item.id !== productId))
//   }

//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity < 1) return
    
//     setCart(cart.map(item => 
//       item.id === productId 
//         ? { ...item, quantity: newQuantity } 
//         : item
//     ))
//   }

//   const getCartTotal = () => {
//     return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
//   }

//   const getCartCount = () => {
//     return cart.reduce((count, item) => count + item.quantity, 0)
//   }

//   const proceedToCheckout = () => {
//     setShowCart(false)
//     setShowCheckout(true)
//   }

//   const toggleWishlist = (productId) => {
//     setWishlistedItems((prev) => ({
//       ...prev,
//       [productId]: !prev[productId],
//     }))
//   }

//   // Product categories
//   const categories = [
//     { id: "all", name: "All Products" },
//     { id: "software", name: "Software Solutions" },
//     { id: "hardware", name: "Hardware Products" },
//     { id: "cloud", name: "Cloud Services" },
//     { id: "security", name: "Security Products" },
//     { id: "accessories", name: "Accessories" },
//   ]

//   // Price ranges
//   const priceRanges = [
//     { id: "", name: "All Prices" },
//     { id: "under100", name: "Under $100" },
//     { id: "100to500", name: "$100 to $500" },
//     { id: "500to1000", name: "$500 to $1000" },
//     { id: "over1000", name: "Over $1000" },
//   ]

//   // Ratings
//   const ratings = [
//     { id: "", name: "Any Rating" },
//     { id: "4plus", name: "4★ & Above" },
//     { id: "3plus", name: "3★ & Above" },
//     { id: "2plus", name: "2★ & Above" },
//   ]

//   // Sort options
//   const sortOptions = [
//     { id: "featured", name: "Featured" },
//     { id: "newest", name: "Newest" },
//     { id: "priceAsc", name: "Price: Low to High" },
//     { id: "priceDesc", name: "Price: High to Low" },
//     { id: "rating", name: "Highest Rated" },
//   ]

//   // Product data with real images
//   const allProducts = [
//     // Software Solutions
//     {
//       id: 1,
//       name: "Enterprise Resource Planning Suite",
//       category: "software",
//       price: 2999,
//       rating: 4.7,
//       reviewCount: 128,
//       description: "Comprehensive ERP solution for large businesses with modules for finance, HR, inventory, and CRM.",
//       features: ["Cloud-based deployment", "Mobile access", "Real-time analytics", "Customizable dashboards"],
//       image: "https://imgs.search.brave.com/smxjpfIOsyQl6w5xaNWUs1btYLWHGm3skDzupxE31Hs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vWk9FM0ZE/a2RDUFhhSkZ0aFho/Qkk1TUp0VDUtRnJP/Nm1KamVwQi01Vl9H/by9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlq/Wkc0dS9ZM0psWVhS/bExuWnBjM1JoL0xt/TnZiUzloY0drdmJX/VmsvYVdFdmMyMWhi/R3d2TmpVMy9NekF5/TXpNeUwzTjBiMk5y/L0xYQm9iM1J2TFdW/eWNDMWwvYm5SbGNu/QnlhWE5sTFhKbC9j/MjkxY21ObExYQnNZ/VzV1L2FXNW5MWE52/Wm5SM1lYSmwvTFcx/dlpHbHphQzFpZFhO/cC9ibVZ6Y3kxd2JH/RnVMVzFoL2NtdGxk/R2x1WnkxemRISmgv/ZEdWbmVR.jpeg",
//       inStock: true,
//       new: true,
//     },
//     {
//       id: 2,
//       name: "Small Business Management Software",
//       category: "software",
//       price: 499,
//       rating: 4.5,
//       reviewCount: 94,
//       description: "All-in-one business management solution tailored for small to medium enterprises.",
//       features: ["Invoicing & accounting", "Inventory tracking", "Customer management", "Online appointment booking"],
//       image: "https://imgs.search.brave.com/lal9O9zwVfHzNs5tjiGRX5l33WJ2ZaphBmB5i75eD5o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20veHpNdi12/VGJjNzd0aFZKaXlE/UU8wU2Naa3lFMkIw/cWtBWGttYUtnbE9q/VS9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTl0/WldScC9ZUzVwYzNS/dlkydHdhRzkwL2J5/NWpiMjB2YVdRdk1U/TTQvTmpZM01qUTNN/eTl3YUc5MC9ieTlp/ZFhOcGJtVnpjMjFo/L2JpMTFjMmx1Wnkx/aExXTnYvYlhCMWRH/VnlMWFJ2TFdSdi9Z/M1Z0Wlc1MExXMWhi/bUZuL1pXMWxiblF0/WTI5dVkyVncvZEMx/dmJteHBibVV0Wkc5/ai9kVzFsYm5SaGRH/bHZiaTFrL1lYUmhZ/bUZ6WlMxaGJtUXUv/YW5CblAzTTlOakV5/ZURZeC9NaVozUFRB/bWF6MHlNQ1pqL1BX/TXpTVVJyYkRKRVJF/cHIvVlV0eVNERjZO/MlpRY1hjMC9XRmh2/U1c0M1EyWmhVekUw/L1JFczRlRWR4U2xF/OQ.jpeg",
//       inStock: true,
//       new: false,
//     },
//     {
//       id: 3,
//       name: "Advanced Analytics Platform",
//       category: "software",
//       price: 1299,
//       rating: 4.8,
//       reviewCount: 76,
//       description: "Turn your data into actionable insights with our powerful analytics platform.",
//       features: ["Predictive analytics", "Data visualization", "Machine learning integration", "Automated reporting"],
//       image: "https://imgs.search.brave.com/cXtNZkftEWtnOB93DsdkcEer7v4CkBm3SdCJ_vPGXck/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vQ1FDYk5n/SElJVTFldkJ6b2Zx/cjB6bGhzZ3FXVGRp/bVlJeEpJclNFQUdF/VS9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTl0/WldScC9ZUzVwYzNS/dlkydHdhRzkwL2J5/NWpiMjB2YVdRdk1U/UTQvT0RJNU5EQTBO/Qzl3YUc5MC9ieTlp/ZFhOcGJtVnpjMjFo/L2JpMTNiM0pyY3kx/dmJpMXMvWVhCMGIz/QXRjMmh2ZDJsdS9a/eTFpZFhOcGJtVnpj/eTFoL2JtRnNlWFJw/WTNNdFpHRnovYUdK/dllYSmtMWGRwZEdn/dC9ZMmhoY25SekxX/MWxkSEpwL1kzTXRZ/VzVrTFd0d2FTNXEv/Y0djX2N6MDJNVEo0/TmpFeS9KbmM5TUNa/clBUSXdKbU05L1FX/TjRlbEZCWlRGTVdU/UnMvUjNBd1F6WkZV/VFp5WlVrMy9XbXRH/UXpKbWRGTXdPWGwz/L1h6TkNWbXR3YXow.jpeg",
//       inStock: true,
//       new: true,
//     },
//     {
//       id: 4,
//       name: "Project Management Solution",
//       category: "software",
//       price: 399,
//       rating: 4.3,
//       reviewCount: 152,
//       description: "Streamline project workflows, enhance team collaboration, and deliver projects on time.",
//       features: ["Gantt charts", "Task management", "Resource allocation", "Time tracking"],
//       image: "https://imgs.search.brave.com/ELXPa-UXWfmLvhlMh7UmurFI0QlZFbk1I5OcIPi3MZI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vZEFOMTYz/bHVJN0ZpRHBVWXJR/X0d1Vlp3YTV4bm9k/Z2llT0VHSFRGeHV2/OC9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTl0/WldScC9ZUzVwYzNS/dlkydHdhRzkwL2J5/NWpiMjB2YVdRdk9E/UTAvTlRNMU5qUTJM/M0JvYjNSdi9MM0J5/WlhObGJuUmhkR2x2/L2JpMXZaaTF3Y205/cVpXTjAvTFcxaGJt/Rm5aVzFsYm5RdC9j/SEp2WTJWemMyVnpM/VzFoL2JtRm5aWEl0/ZEc5MVkyaHAvYm1j/dGMyTnlaV1Z1TG1w/dy9aejl6UFRZeE1u/ZzJNVEltL2R6MHdK/bXM5TWpBbVl6MUMv/T1hoeFpWcHdaVFJK/VGxreC9UbWxMY1dS/eFV6TXhSRkY2L1Ex/cEZjazh3YmpVdGIw/cEgvVWxWb1NrVnZQ/UQ.jpeg",
//       inStock: true,
//       new: false,
//     },

//     // Hardware Products
//     {
//       id: 5,
//       name: "Enterprise Server X9000",
//       category: "hardware",
//       price: 7999,
//       rating: 4.9,
//       reviewCount: 42,
//       description: "High-performance server for mission-critical enterprise applications and databases.",
//       features: ["128-core processor", "1TB ECC RAM", "Redundant power supplies", "Advanced cooling system"],
//       image: "https://imgs.search.brave.com/Ni69A33rR9wXbWc-3QdU-S4Bsldmz0GUiSEVWAg7lyw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vRFdERGpS/dldrbTYwVml0SHoz/SkdIUlc3c1ZGVUw4/YTFpYmdKNm9jMjcw/by9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTl6/ZEc5eS9aUzV6ZFhC/bGNtMXBZM0p2L0xt/TnZiUzkxYzE5bGJp/OXcvZFdJdmJXVmth/V0V2WTJGMC9ZV3h2/Wnk5d2NtOWtkV04w/L0wyTmhZMmhsTDJJ/NVl6VXcvWldVMk9H/RXlaR0k1TldOai9Z/VGt3TUdSbFkySTJO/bUUxL056azBMM012/Y3k5emMyY3QvTmpR/d2MzQXRaVEZqY2pZ/dy9YMjFoYVc0dWFu/Qm4.jpeg",
//       inStock: true,
//       new: true,
//     },
//     {
//       id: 6,
//       name: "Business Workstation Pro",
//       category: "hardware",
//       price: 2499,
//       rating: 4.6,
//       reviewCount: 88,
//       description: "Professional-grade workstation for design, engineering, and data analysis tasks.",
//       features: ["16-core processor", "64GB RAM", "Dedicated graphics", "1TB SSD storage"],
//       image: "https://imgs.search.brave.com/tEd0D6vT1xVPOGQ_m6D9DBVy4dB9cDHJdUhT-VRxdQw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vc0NEWUtH/bklPM2dTYUVGS0Jj/OGIzY3BIUjVCWFdZ/M3Z2cF9yb05NSUN4/OC9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTl6/ZEdGMC9hV011ZG1W/amRHVmxlbmt1L1ky/OXRMM041YzNSbGJT/OXkvWlhOdmRYSmpa/WE12ZEdoMS9iV0p1/WVdsc2N5OHdNemN2/L09UazRMemd4Tmk5/emJXRnMvYkM5aGFT/MW5aVzVsY21GMC9a/V1F0ZDI5eWEzTndZ/V05sL0xYUmxZMmh1/YjJ4dloza3QvYUds/bmFHeHBaMmgwTFhS/by9aUzFwYm5SbFoz/SmhkR2x2L2JpMXZa/aTEwWldOb2JtOXMv/YjJkNUxXbHVMWFJv/WlMxdi9abVpwWTJV/dFltRmphMmR5L2Iz/VnVaQzFwYldGblpT/MW4vWlc1bGNtRjBh/WFpsTFdGcC9MWEJv/YjNSdkxtcHdadw.jpeg",
//       inStock: false,
//       new: false,
//     },
//     {
//       id: 7,
//       name: "Network Security Appliance",
//       category: "hardware",
//       price: 1899,
//       rating: 4.7,
//       reviewCount: 63,
//       description: "Hardware firewall and security appliance for comprehensive network protection.",
//       features: ["10Gbps throughput", "Intrusion prevention", "VPN support", "Content filtering"],
//       image: "https://imgs.search.brave.com/hXlkiqBVYec6Fxzx-4-pk38kJhquL-bp5oONXPir_5Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vODh0eXNx/RU1SdlJtYW5KeVNY/TlBKc2ptSVkwOGs3/aThuNGs0bE5MaE9y/ay9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlw/YldjdS9abkpsWlhC/cGF5NWpiMjB2L2NI/SmxiV2wxYlMxd2FH/OTAvYnk5amVXSmxj/aTF6WldOMS9jbWww/ZVMxc2IyTnJMWE5q/L2NtVmxibDg1TmpR/Mk1TMHkvTXpFNU15/NXFjR2NfYzJWdC9k/RDFoYVhOZmFIbGlj/bWxrL0puYzlOelF3.jpeg",
//       inStock: true,
//       new: false,
//     },

//     // Cloud Services
//     {
//       id: 8,
//       name: "Cloud Storage Enterprise Plan",
//       category: "cloud",
//       price: 199,
//       perType: "month",
//       rating: 4.8,
//       reviewCount: 127,
//       description: "Scalable cloud storage solution with enterprise-grade security and collaboration features.",
//       features: ["Unlimited storage", "Advanced encryption", "Team collaboration tools", "Automated backups"],
//       image: "https://imgs.search.brave.com/_5EnxcXDwszrDwWBLcPIr9j41TXIr_BPwQih2rSNZlM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vTjVMblU0/QmMxczZmUEZtZ0JF/ejRtczJSUmxReHdF/S1hoZkNMY2FSbWNQ/RS9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlq/Wkc0dS9iVzl6TG1O/dGN5NW1kWFIxL2Nt/VmpaRzR1Ym1WMEwx/VjIvTlVvNVJuZFRh/RlJXYVVFNC9kMVZ5/V2tKTGQyNHVhbkJu.jpeg",
//       inStock: true,
//       new: false,
//     },
//     {
//       id: 9,
//       name: "Virtual Desktop Infrastructure",
//       category: "cloud",
//       price: 79,
//       perType: "user/month",
//       rating: 4.4,
//       reviewCount: 91,
//       description: "Secure virtual desktops accessible from anywhere on any device.",
//       features: ["Windows/Linux options", "Application virtualization", "Centralized management", "Usage analytics"],
//       image: "https://imgs.search.brave.com/7c0m36lkxAd3O_Te3w93IOYB9_R0XatMajtrfvhnZTs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vT0JTQnNZ/eC1BMDlldGJKMERu/MVNBSUdxYmJaMnNx/RmNTLWFxZ3EwV3Bi/cy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlq/Wkc0dC9aSGx1YldW/a2FXRXRNUzV0L2FX/TnliM052Wm5RdVky/OXQvTDJsekwybHRZ/V2RsTDIxcC9ZM0p2/YzI5bWRHTnZjbkF2/L1pHbGhaM0poYlQ5/eVpYTk4vYjJSbFBY/Tm9ZWEp3TWladi9j/RjkxYzIwOU1TNDFM/REF1L05qVXNNVFVz/TUNaM2FXUTkvT1RB/ekpuRnNkRDB4TURB/bS9abTEwUFhCdVp5/MWhiSEJvL1lTWm1h/WFE5WTI5dWMzUnkv/WVdsdQ.jpeg",
//       inStock: true,
//       new: true,
//     },
//     {
//       id: 10,
//       name: "Managed Kubernetes Service",
//       category: "cloud",
//       price: 349,
//       perType: "month",
//       rating: 4.9,
//       reviewCount: 48,
//       description: "Fully managed container orchestration platform for deploying and scaling applications.",
//       features: ["Automated scaling", "Load balancing", "Self-healing", "Monitoring & logging"],
//       image: "https://imgs.search.brave.com/hGukxEn84T_w9BUzjOsv1Fg7Kpo7GsMslwkR_HY6exM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vcU53ZFJr/bGpNRGxFXzZDV3FT/Nnc5em1FSmRLLVY3/WE1IQjR1UllXdWhx/MC9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlo/TG5OMC9iM0o1WW14/dmF5NWpiMjB2L1pp/OHhPRGswTURFdk1U/QTQvTUhnMk1EZ3ZN/bVJsTm1Zdy9Zekk0/Tmk5M2FHRjBYMmx6/L1gyczRjMTl0WVc1/aFoyVnQvWlc1MExu/QnVadw.jpeg",
//       inStock: true,
//       new: true,
//     },

//     // Security Products
//     {
//       id: 11,
//       name: "Enterprise Security Suite",
//       category: "security",
//       price: 1299,
//       perType: "year",
//       rating: 4.7,
//       reviewCount: 106,
//       description: "Comprehensive security solution protecting endpoints, networks, and cloud resources.",
//       features: ["Threat intelligence", "Behavioral analysis", "Zero-day protection", "Compliance reporting"],
//       image: "https://imgs.search.brave.com/PpqpEQ9t1OAtXHLZB1YxXvnfkKlNteTShvG0lY94jZQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vbE1tekEz/SVluUFhMQUo4NllZ/Y20zUlRJWXdiQUwx/QWtyUXRUWWxKbmdf/Yy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlq/Wkc0dS9ZM0psWVhS/bExuWnBjM1JoL0xt/TnZiUzloY0drdmJX/VmsvYVdFdmMyMWhi/R3d2TXpNMC9OREEx/TkRFNEwzTjBiMk5y/L0xYQm9iM1J2TFds/dWRHVnkvYm1WMExX/NWxkSGR2Y21zdC9j/MlZqZFhKcGRIa3RZ/Mjl1L1kyVndkQzEz/YVhSb0xYUmgvWW14/bGRDMWpiMjF3ZFhS/bC9jZw.jpeg",
//       inStock: true,
//       new: false,
//     },
//     {
//       id: 12,
//       name: "Data Loss Prevention System",
//       category: "security",
//       price: 899,
//       perType: "year",
//       rating: 4.5,
//       reviewCount: 74,
//       description: "Prevent unauthorized data transfer and leakage with advanced DLP technologies.",
//       features: ["Content inspection", "User activity monitoring", "Policy enforcement", "Incident response"],
//       image: "https://imgs.search.brave.com/0aHRA7Hs6LrKpuHuN7q4EOCKiXDJDQUNIrvnzq8_8IE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vU2pELXVj/Wl9Kb1dkX09wNDlv/dDJLMWsyMnROOGJ4/bzJvZFFYdzRLWkls/Zy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlq/ZVdKbC9jbVZoWkhr/dVkyOXRMM2R3L0xX/TnZiblJsYm5RdmRY/QnMvYjJGa2N5OTFi/bTVoYldWay9MVFEw/TG5CdVp3.jpeg",
//       inStock: true,
//       new: false,
//     },

//     // Accessories
//     {
//       id: 13,
//       name: "Enterprise Networking Bundle",
//       category: "accessories",
//       price: 899,
//       rating: 4.6,
//       reviewCount: 57,
//       description: "Complete networking solution for small to medium offices.",
//       features: ["Managed switch", "Wireless access points", "Network cables", "Installation guide"],
//       image: "https://imgs.search.brave.com/ybcwcHL4mb_d2PmQ4stWM3EfAMCorIaLuLhrU_j08w8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vVFdlWnFY/bnpQWDBycGhPYWYw/Q3UwSmE4ejl0U2hq/SmNFeWxGMTVTVEl3/Zy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTl6/ZEM1ay9aWEJ2YzJs/MGNHaHZkRzl6L0xt/TnZiUzh4TlRjeE9E/ZzUvTHpFME1EUXZh/UzgwTlRBdi9aR1Z3/YjNOcGRIQm9iM1J2/L2MxOHhOREEwT0RN/NU1pMXovZEc5amF5/MXdhRzkwYnkxdS9a/WFIzYjNKckxXaDFZ/aTVxL2NHYw.jpeg",
//       inStock: true,
//       new: false,
//     },
//     {
//       id: 14,
//       name: "Smart Conference System",
//       category: "accessories",
//       price: 1299,
//       rating: 4.7,
//       reviewCount: 38,
//       description: "All-in-one conference room solution with audio, video, and collaboration features.",
//       features: ["4K camera", "360° speakerphone", "Wireless presentation", "Meeting scheduler"],
//       image: "https://imgs.search.brave.com/dcf20Mf2TR5LuVS5Cj77XJW-ommOjP01GulHcD-j2is/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vbklUdjRS/ZTR2b21CenZEX1RU/SUxVNHVmamRqTGRa/ZENhNTkxVk9qbHEz/NC9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkz/ZDNjdS9lV1ZoYkds/dWF5NWpiMjB2L2Qy/VmljMmwwWlMxelpY/SjIvYVdObEwyRjBk/R0ZqYUcxbC9iblF2/Y0hKdlpIVmpkQzl2/L2RHaGxjaTh5TURJ/MU1ERXgvTlM4eU1E/STFNREV4TlRBMy9N/emd5T0RrNU16TXhN/MlF1L2QyVmljQQ.jpeg",
//       inStock: false,
//       new: true,
//     },
//     {
//       id: 15,
//       name: "Business Backup Power System",
//       category: "accessories",
//       price: 599,
//       rating: 4.8,
//       reviewCount: 64,
//       description: "Reliable UPS system designed for business environments to protect critical equipment.",
//       features: ["Pure sine wave output", "LCD status display", "Surge protection", "Battery management"],
//       image: "https://imgs.search.brave.com/REDTfa-929QB5tmgHj4GcjdLfY1Wxgu9yWMLDbasFXc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vdFVPVlhi/ckMzSFV2cnBUSWtw/YldDX3FSZVY3dG1o/TTBlSnFSRmdLeTk2/Zy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkw/YUhWdC9Zbk11WkhK/bFlXMXpkR2x0L1pT/NWpiMjB2WWk5cGJt/UjEvYzNSeWFXRnNM/V0poWTJ0MS9jQzF3/YjNkbGNpMXplWE4w/L1pXMHRZMjl1YzJs/emRHbHUvWnkxdFlX/NTVMV0poZEhSbC9j/bWxsY3kwek1EazRN/emt5L01TNXFjR2M.jpeg",
//       inStock: true,
//       new: false,
//     },
//   ]

//   const applyFilters = () => {
//     let filteredProducts = [...allProducts]
//     if (filters.category) {
//       filteredProducts = filteredProducts.filter((product) => product.category === filters.category)
//     }


//     if (searchQuery) {
//       const query = searchQuery.toLowerCase()
//       filteredProducts = filteredProducts.filter(
//         (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
//       )
//     }

//     // Filter by price range
//     if (filters.priceRange) {
//       switch (filters.priceRange) {
//         case "under100":
//           filteredProducts = filteredProducts.filter((product) => product.price < 100)
//           break
//         case "100to500":
//           filteredProducts = filteredProducts.filter((product) => product.price >= 100 && product.price <= 500)
//           break
//         case "500to1000":
//           filteredProducts = filteredProducts.filter((product) => product.price > 500 && product.price <= 1000)
//           break
//         case "over1000":
//           filteredProducts = filteredProducts.filter((product) => product.price > 1000)
//           break
//         default:
//           break
//       }
//     }

//     // Filter by rating
//     if (filters.rating) {
//       switch (filters.rating) {
//         case "4plus":
//           filteredProducts = filteredProducts.filter((product) => product.rating >= 4)
//           break
//         case "3plus":
//           filteredProducts = filteredProducts.filter((product) => product.rating >= 3)
//           break
//         case "2plus":
//           filteredProducts = filteredProducts.filter((product) => product.rating >= 2)
//           break
//         default:
//           break
//       }
//     }

//     // Filter by availability
//     if (filters.availability === "inStock") {
//       filteredProducts = filteredProducts.filter((product) => product.inStock)
//     }

//     // Sort products
//     switch (sortBy) {
//       case "priceAsc":
//         filteredProducts.sort((a, b) => a.price - b.price)
//         break
//       case "priceDesc":
//         filteredProducts.sort((a, b) => b.price - a.price)
//         break
//       case "rating":
//         filteredProducts.sort((a, b) => b.rating - a.rating)
//         break
//       case "newest":
//         filteredProducts.sort((a, b) => b.new - a.new)
//         break
//       default:
//         // 'featured' or default - no specific sort
//         break
//     }

//     return filteredProducts
//   }

//   const filteredProducts = applyFilters()

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }))
//   }

//   // Get content based on active section
//   const sectionContent = {
//     all: {
//       title: "All Products",
//       description: "Explore our comprehensive range of technology products and services.",
//     },
//     software: {
//       title: "Software Solutions",
//       description: "Innovative software for productivity, automation, and business intelligence.",
//     },
//     hardware: {
//       title: "Hardware Solutions",
//       description: "High-performance hardware for enterprise needs and professional workloads.",
//     },
//     cloud: {
//       title: "Cloud Solutions",
//       description: "Scalable and secure cloud services for modern business requirements.",
//     },
//     security: {
//       title: "Security Products",
//       description: "Comprehensive security solutions to protect your business assets.",
//     },
//     accessories: {
//       title: "Tech Accessories",
//       description: "Essential accessories to complement your technology infrastructure.",
//     },
//   }

//   const content = sectionContent[activeSection] || sectionContent.all

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
//       {/* Header Section */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-900 dark:to-indigo-900">
//         <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm"></div>
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
//           <div className="text-center md:text-left">
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
//               {content.title}
//             </h1>
//             <p className="text-lg md:text-xl text-white/80 max-w-3xl">{content.description}</p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Cart Icon */}
//         <div className="fixed top-4 right-4 z-50">
//           <button 
//             id="cart-icon"
//             onClick={() => setShowCart(true)} 
//             className="relative p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
//           >
//             <ShoppingBag className="h-6 w-6" />
//             {getCartCount() > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                 {getCartCount()}
//               </span>
//             )}
//           </button>
//         </div>

//         {/* Search and Filter Bar */}
//         <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl shadow-lg p-4 mb-8 border border-slate-200 dark:border-slate-700">
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* Search Bar */}
//             <div className="relative flex-grow">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white/70 dark:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
//               />
//             </div>

//             {/* Sort By */}
//             <div className="flex-shrink-0 w-full md:w-auto">
//               <div className="relative">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="appearance-none w-full bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   {sortOptions.map((option) => (
//                     <option key={option.id} value={option.id}>
//                       {option.name}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-slate-300">
//                   <ChevronDown className="h-4 w-4" />
//                 </div>
//               </div>
//             </div>

//             {/* Filter Toggle Button */}
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center justify-center md:justify-start gap-2 py-2 px-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
//             >
//               <Filter className="h-5 w-5" />
//               <span>Filters</span>
//               <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`} />
//             </button>

//             {/* View Mode Toggle */}
//             <div className="flex-shrink-0 flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
//               <button
//                 onClick={() => setViewMode("grid")}
//                 className={`px-3 py-2 ${
//                   viewMode === "grid"
//                     ? "bg-indigo-500 text-white"
//                     : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200"
//                 }`}
//               >
//                 Grid
//               </button>
//               <button
//                 onClick={() => setViewMode("list")}
//                 className={`px-3 py-2 ${
//                   viewMode === "list"
//                     ? "bg-indigo-500 text-white"
//                     : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200"
//                 }`}
//               >
//                 List
//               </button>
//             </div>
//           </div>

//           {/* Expanded Filters */}
//           <AnimatePresence>
//             {showFilters && (
//               <motion.div 
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="overflow-hidden"
//               >
//                 <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
//                   {/* Category Filter */}
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
//                     <select
//                       value={filters.category}
//                       onChange={(e) => handleFilterChange("category", e.target.value)}
//                       className="w-full bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
//                     >
//                       {categories.map((category) => (
//                         <option key={category.id} value={category.id === "all" ? "" : category.id}>
//                           {category.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Price Range Filter */}
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price Range</label>
//                     <select
//                       value={filters.priceRange}
//                       onChange={(e) => handleFilterChange("priceRange", e.target.value)}
//                       className="w-full bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
//                     >
//                       {priceRanges.map((range) => (
//                         <option key={range.id} value={range.id}>
//                           {range.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Rating Filter */}
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rating</label>
//                     <select
//                       value={filters.rating}
//                       onChange={(e) => handleFilterChange("rating", e.target.value)}
//                       className="w-full bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
//                     >
//                       {ratings.map((rating) => (
//                         <option key={rating.id} value={rating.id}>
//                           {rating.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Availability Filter */}
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Availability</label>
//                     <select
//                       value={filters.availability}
//                       onChange={(e) => handleFilterChange("availability", e.target.value)}
//                       className="w-full bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200"
//                     >
//                       <option value="">All Items</option>
//                       <option value="inStock">In Stock Only</option>
//                     </select>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Product Count & Active Filters */}
//         <div className="flex flex-wrap justify-between items-center mb-6">
//           <p className="text-slate-700 dark:text-slate-300">
//             Showing <span className="font-semibold">{filteredProducts.length}</span> products
//           </p>

//           {/* Active Filters Display */}
//           <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
//             {filters.category && (
//               <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
//                 {categories.find((c) => c.id === filters.category)?.name}
//                 <button
//                   onClick={() => handleFilterChange("category", "")}
//                   className="ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}
//             {filters.priceRange && (
//               <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
//                 {priceRanges.find((p) => p.id === filters.priceRange)?.name}
//                 <button
//                   onClick={() => handleFilterChange("priceRange", "")}
//                   className="ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}
//             {filters.rating && (
//               <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
//                 {ratings.find((r) => r.id === filters.rating)?.name}
//                 <button
//                   onClick={() => handleFilterChange("rating", "")}
//                   className="ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}
//             {filters.availability && (
//               <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
//                 In Stock Only
//                 <button
//                   onClick={() => handleFilterChange("availability", "")}
//                   className="ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}
//             {(filters.category || filters.priceRange || filters.rating || filters.availability) && (
//               <button
//                 onClick={() => setFilters({ category: "", priceRange: "", rating: "", availability: "" })}
//                 className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
//               >
//                 Clear all
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Products Display */}
//         {filteredProducts.length === 0 ? (
//           <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl p-12 text-center border border-slate-100 dark:border-slate-700 shadow-lg">
//             <div className="flex justify-center mb-4">
//               <Search className="h-12 w-12 text-slate-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No products found</h3>
//             <p className="text-slate-600 dark:text-slate-300 mb-6">
//               Try adjusting your search or filter criteria to find what you're looking for.
//             </p>
//             <button
//               onClick={() => {
//                 setFilters({ category: "", priceRange: "", rating: "", availability: "" })
//                 setSearchQuery("")
//               }}
//               className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
//             >
//               Reset All Filters
//             </button>
//           </div>
//         ) : viewMode === "grid" ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProducts.map((product) => (
//               <motion.div
//                 key={product.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
//               >
//                 {/* Glassmorphism overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-violet-50/30 dark:from-indigo-900/10 dark:to-violet-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                 {/* New tag */}
//                 {product.new && (
//                   <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
//                     NEW
//                   </div>
//                 )}

//                 {/* Wishlist button */}
//                 <button
//                   onClick={() => toggleWishlist(product.id)}
//                   className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors"
//                 >
//                   <Heart
//                     className={`w-4 h-4 ${wishlistedItems[product.id] ? "text-red-500 fill-red-500" : "text-slate-400 dark:text-slate-300"}`}
//                   />
//                 </button>

//                 {/* Product Image */}
//                 <div className="relative pt-[75%] bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 overflow-hidden">
//                   <img
//                     src={product.image || "/placeholder.svg"}
//                     alt={product.name}
//                     className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>

//                 {/* Product Info */}
//                 <div className="relative p-6">
//                   {/* Category */}
//                   <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-2">
//                     {categories.find((c) => c.id === product.category)?.name}
//                   </div>

//                   {/* Title */}
//                   <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
//                     {product.name}
//                   </h3>

//                   {/* Rating */}
//                   <div className="flex items-center mb-2">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">({product.reviewCount})</span>
//                   </div>

//                   {/* Price */}
//                   <div className="flex items-baseline mb-4">
//                     <span className="text-xl font-bold text-slate-900 dark:text-white">
//                       ${product.price.toLocaleString()}
//                     </span>
//                     {product.perType && (
//                       <span className="ml-1 text-sm text-slate-500 dark:text-slate-400">/{product.perType}</span>
//                     )}
//                   </div>

//                   {/* Availability */}
//                   <div className="mb-4">
//                     {product.inStock ? (
//                       <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm">
//                         <CheckCircle className="w-4 h-4 mr-1" /> In stock
//                       </div>
//                     ) : (
//                       <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm">
//                         <RefreshCw className="w-4 h-4 mr-1" /> Pre-order
//                       </div>
//                     )}
//                   </div>

//                   {/* Action Button */}
//                   <button 
//                     onClick={() => addToCart(product)}
//                     className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
//                   >
//                     <ShoppingCart className="w-4 h-4" /> Add to Cart
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {filteredProducts.map((product) => (
//               <motion.div
//                 key={product.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
//               >
//                 {/* Glassmorphism overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-violet-50/30 dark:from-indigo-900/10 dark:to-violet-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                 <div className="flex flex-col md:flex-row">
//                   {/* Product Image */}
//                   <div className="relative md:w-1/4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700">
//                     {product.new && (
//                       <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
//                         NEW
//                       </div>
//                     )}

//                     <button
//                       onClick={() => toggleWishlist(product.id)}
//                       className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors"
//                     >
//                       <Heart
//                         className={`w-4 h-4 ${wishlistedItems[product.id] ? "text-red-500 fill-red-500" : "text-slate-400 dark:text-slate-300"}`}
//                       />
//                     </button>

//                     <img
//                       src={product.image || "/placeholder.svg"}
//                       alt={product.name}
//                       className="w-full h-60 md:h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
//                     />
//                   </div>

//                   {/* Product Info */}
//                   <div className="relative p-6 md:w-3/4 flex flex-col">
//                     <div className="flex-grow">
//                       {/* Category */}
//                       <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-2">
//                         {categories.find((c) => c.id === product.category)?.name}
//                       </div>

//                       {/* Title */}
//                       <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
//                         {product.name}
//                       </h3>

//                       {/* Rating */}
//                       <div className="flex items-center mb-3">
//                         <div className="flex">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
//                             />
//                           ))}
//                         </div>
//                         <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">({product.reviewCount})</span>
//                       </div>

//                       {/* Description */}
//                       <p className="text-slate-600 dark:text-slate-300 mb-4">{product.description}</p>

//                       {/* Features */}
//                       <div className="mb-4">
//                         <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Key Features:</div>
//                         <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
//                           {product.features.map((feature, i) => (
//                             <li key={i} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
//                               <span className="text-emerald-500 mr-1">✓</span> {feature}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>

//                     <div className="flex flex-wrap items-end justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
//                       {/* Price and Availability */}
//                       <div>
//                         <div className="flex items-baseline mb-2">
//                           <span className="text-2xl font-bold text-slate-900 dark:text-white">
//                             ${product.price.toLocaleString()}
//                           </span>
//                           {product.perType && (
//                             <span className="ml-1 text-sm text-slate-500 dark:text-slate-400">/{product.perType}</span>
//                           )}
//                         </div>

//                         {product.inStock ? (
//                           <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm">
//                             <CheckCircle className="w-4 h-4 mr-1" /> In stock
//                           </div>
//                         ) : (
//                           <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm">
//                             <RefreshCw className="w-4 h-4 mr-1" /> Pre-order
//                           </div>
//                         )}
//                       </div>

//                       {/* Action Buttons */}
//                       <div className="flex gap-3 mt-4 sm:mt-0">
//                         <button className="px-4 py-2 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
//                           Learn More
//                         </button>
//                         <button 
//                           onClick={() => addToCart(product)}
//                           className="flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
//                         >
//                           <ShoppingCart className="w-4 h-4" /> Add to Cart
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Featured Products Section */}
//         {filteredProducts.length > 0 && (
//           <div className="mt-16">
//             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Featured Solutions</h2>
//             <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl overflow-hidden shadow-2xl">
//               <div className="bg-white/10 backdrop-blur-sm p-8 md:p-12">
//                 <div className="grid md:grid-cols-2 gap-8 items-center">
//                   <div>
//                     <div className="inline-block bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 text-sm text-white mb-4">
//                       Enterprise Solution
//                     </div>
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
//                       Complete Business Technology Suite
//                     </h3>
//                     <p className="text-white/90 mb-6">
//                       An all-in-one solution combining our premium software, hardware, and services at an exclusive
//                       package price.
//                     </p>
//                     <ul className="space-y-2 mb-6">
//                       <li className="flex items-center text-white/90">
//                         <CheckCircle className="w-5 h-5 mr-2 text-emerald-300" />
//                         Enterprise resource planning software
//                       </li>
//                       <li className="flex items-center text-white/90">
//                         <CheckCircle className="w-5 h-5 mr-2 text-emerald-300" />
//                         High-performance server infrastructure
//                       </li>
//                       <li className="flex items-center text-white/90">
//                         <CheckCircle className="w-5 h-5 mr-2 text-emerald-300" />
//                         Premium cybersecurity protection
//                       </li>
//                       <li className="flex items-center text-white/90">
//                         <CheckCircle className="w-5 h-5 mr-2 text-emerald-300" />
//                         Dedicated support and maintenance
//                       </li>
//                     </ul>
//                     <div className="flex flex-wrap gap-3">
//                       <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition duration-300 shadow-lg transform hover:scale-[1.02]">
//                         Request Custom Quote
//                       </button>
//                       <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition duration-300">
//                         Learn More
//                       </button>
//                     </div>
//                   </div>
//                   <div className="hidden md:block">
//                     <img
//                       src="https://imgs.search.brave.com/oe9SA-69p35sbTQgqYgoRJxfYWlQokL0-3pf2nbP-78/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vNlFNcC01/REs2bXVEYXZBQ3FH/bmg2dVU2eVFUYlhM/TnF2cHBBX1BTWThf/NC9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlw/YldjdS9abkpsWlhC/cGF5NWpiMjB2L2NI/SmxiV2wxYlMxd2FH/OTAvYnk5bGJuUmxj/bkJ5YVhObC9MWEps/YzI5MWNtTmxMVzFo/L2JtRm5aVzFsYm5R/dFpYSncvTFhOdlpu/UjNZWEpsTFhONS9j/M1JsYlMxaWRYTnBi/bVZ6L2N5MXlaWE52/ZFhKalpYTXQvY0d4/aGJsOHpNVGsyTlMw/Mi9PRGcyTG1wd1p6/OXpaVzEwL1BXRnBj/MTlvZVdKeWFXUW0v/ZHowM05EQQ.jpeg"
//                       alt="Enterprise Solution"
//                       className="w-full h-auto object-cover rounded-lg shadow-lg"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Newsletter Section */}
//       <div className="bg-slate-50 dark:bg-slate-900 py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700">
//             <div className="p-8 md:p-12">
//               <div className="grid md:grid-cols-2 gap-8 items-center">
//                 <div>
//                   <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
//                     Stay Updated with Our Latest Products
//                   </h2>
//                   <p className="text-slate-600 dark:text-slate-300 mb-6">
//                     Subscribe to our newsletter for exclusive deals, product updates, and technology insights.
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <input
//                       type="email"
//                       placeholder="Enter your email"
//                       className="flex-grow px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white/70 dark:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
//                     />
//                     <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg font-semibold transition duration-300 shadow-md transform hover:scale-[1.02]">
//                       Subscribe
//                     </button>
//                   </div>
//                 </div>
//                 <div className="hidden md:flex justify-center">
//                   <BarChart2 className="w-48 h-48 text-indigo-100 dark:text-indigo-900" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Shopping Cart Sidebar */}
//       <AnimatePresence>
//         {showCart && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
//               onClick={() => setShowCart(false)}
//             />
//             <motion.div
//               ref={cartRef}
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col"
//             >
//               <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
//                 <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
//                   <ShoppingBag className="mr-2 h-5 w-5" /> Shopping Cart ({getCartCount()})
//                 </h2>
//                 <button 
//                   onClick={() => setShowCart(false)}
//                   className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
//                 >
//                   <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
//                 </button>
//               </div>

//               {cart.length === 0 ? (
//                 <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
//                   <ShoppingBag className="h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
//                   <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Your cart is empty</h3>
//                   <p className="text-slate-500 dark:text-slate-400 mb-6">Looks like you haven't added any products to your cart yet.</p>
//                   <button 
//                     onClick={() => setShowCart(false)}
//                     className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//                   >
//                     Continue Shopping
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <div className="flex-1 overflow-y-auto p-4">
//                     <div className="space-y-4">
//                       {cart.map((item) => (
//                         <div key={item.id} className="flex gap-4 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
//                           <img 
//                             src={item.image || "/placeholder.svg"} 
//                             alt={item.name} 
//                             className="w-20 h-20 object-cover rounded-md"
//                           />
//                           <div className="flex-1 min-w-0">
//                             <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">{item.name}</h4>
//                             <p className="text-sm text-slate-500 dark:text-slate-400">
//                               ${item.price.toLocaleString()}{item.perType && `/${item.perType}`}
//                             </p>
//                             <div className="flex items-center mt-2">
//                               <button 
//                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                 className="p-1 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
//                               >
//                                 <Minus className="h-3 w-3" />
//                               </button>
//                               <span className="mx-2 text-sm font-medium text-slate-900 dark:text-white">{item.quantity}</span>
//                               <button 
//                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                 className="p-1 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
//                               >
//                                 <Plus className="h-3 w-3" />
//                               </button>
//                             </div>
//                           </div>
//                           <div className="flex flex-col justify-between items-end">
//                             <span className="font-medium text-slate-900 dark:text-white">
//                               ${(item.price * item.quantity).toLocaleString()}
//                             </span>
//                             <button 
//                               onClick={() => removeFromCart(item.id)}
//                               className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="p-4 border-t border-slate-200 dark:border-slate-700">
//                     <div className="flex justify-between mb-2">
//                       <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
//                       <span className="font-medium text-slate-900 dark:text-white">${getCartTotal().toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between mb-4">
//                       <span className="text-slate-600 dark:text-slate-400">Shipping</span>
//                       <span className="font-medium text-slate-900 dark:text-white">Free</span>
//                     </div>
//                     <div className="flex justify-between mb-6 text-lg font-bold">
//                       <span className="text-slate-900 dark:text-white">Total</span>
//                       <span className="text-slate-900 dark:text-white">${getCartTotal().toLocaleString()}</span>
//                     </div>
//                     <button 
//                       onClick={proceedToCheckout}
//                       className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2"
//                     >
//                       Proceed to Checkout <ArrowRight className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </>
//               )}
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

      
//     </div>
//   )
// }

// export default Products


import { useState, useEffect, useRef } from "react"
import {
  Search,
  Filter,
  ChevronDown,
  Star,
  ShoppingCart,
  Heart,
  CheckCircle,
  RefreshCw,
  X,
  Plus,
  Minus,
  ArrowRight,
  Check,
  ShoppingBag,
  CreditCard,
  Wallet,
  Building,
  DollarSign,
  Smartphone,
  Lock,
  ChevronRight,
  Eye,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Users,
  Zap,
  Award,
  Globe,
} from "lucide-react"

const Products = ({ section }) => {
  const activeSection = section || "all"

  // State
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    category: activeSection !== "all" ? activeSection : "",
    priceRange: "",
    rating: "",
    availability: "",
    brand: "",
  })
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState("grid")
  const [wishlistedItems, setWishlistedItems] = useState({})
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showProductModal, setShowProductModal] = useState(false)
  const [comparisonList, setComparisonList] = useState([])
  const [showComparison, setShowComparison] = useState(false)
  const cartRef = useRef(null)
  const paymentRef = useRef(null)

  // Payment modal state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("UPI")
  const [selectedUpiApp, setSelectedUpiApp] = useState("")
  const [upiId, setUpiId] = useState("")
  const [showUpiPin, setShowUpiPin] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: activeSection !== "all" ? activeSection : "",
    }))
  }, [activeSection])

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
    const timer = setTimeout(scrollToTop, 0)
    return () => clearTimeout(timer)
  }, [])

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target) && showCart) {
        setShowCart(false)
      }
      if (paymentRef.current && !paymentRef.current.contains(event.target) && showPaymentModal) {
        setShowPaymentModal(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showCart, showPaymentModal])

  // Cart functions
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }

    setShowCart(true)

    const cartIcon = document.getElementById("cart-icon")
    if (cartIcon) {
      cartIcon.classList.add("animate-bounce")
      setTimeout(() => {
        cartIcon.classList.remove("animate-bounce")
      }, 1000)
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return

    setCart(cart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const proceedToCheckout = () => {
    setShowCart(false)
    setShowPaymentModal(true)
  }

  const toggleWishlist = (productId) => {
    setWishlistedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }))
  }

  const toggleComparison = (product) => {
    const isInComparison = comparisonList.find((item) => item.id === product.id)

    if (isInComparison) {
      setComparisonList(comparisonList.filter((item) => item.id !== product.id))
    } else if (comparisonList.length < 3) {
      setComparisonList([...comparisonList, product])
    } else {
      alert("You can compare up to 3 products only")
    }
  }

  const handleProductView = (product) => {
    setSelectedProduct(product)
    setShowProductModal(true)
  }

  // Payment functions
  const calculateDiscountedTotal = () => {
    const total = getCartTotal()
    if (!appliedCoupon) return total

    if (appliedCoupon.type === "percent") {
      return Math.round(total * (1 - appliedCoupon.discount / 100))
    } else {
      return Math.max(0, total - appliedCoupon.discount)
    }
  }

  const handleApplyCoupon = () => {
    if (!couponCode) return

    if (couponCode.toUpperCase() === "WELCOME10") {
      setAppliedCoupon({
        code: "WELCOME10",
        discount: 10,
        type: "percent",
      })
      alert("Coupon applied successfully!")
    } else if (couponCode.toUpperCase() === "FLAT100") {
      setAppliedCoupon({
        code: "FLAT100",
        discount: 100,
        type: "fixed",
      })
      alert("Coupon applied successfully!")
    } else {
      alert("Invalid coupon code")
    }
  }

  const handlePaymentComplete = () => {
    setPaymentComplete(true)
    setCart([])
    alert("Payment successful! Thank you for your purchase.")

    setTimeout(() => {
      setShowPaymentModal(false)
      setPaymentComplete(false)
      setSelectedPaymentMethod("UPI")
      setAppliedCoupon(null)
      setCouponCode("")
    }, 2000)
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

  // Brands
  const brands = [
    { id: "", name: "All Brands" },
    { id: "techcorp", name: "TechCorp" },
    { id: "innovate", name: "Innovate" },
    { id: "securex", name: "SecureX" },
    { id: "cloudtech", name: "CloudTech" },
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
    { id: "popular", name: "Most Popular" },
  ]

  // Product data with enhanced details
  const allProducts = [
    // Software Solutions
    {
      id: 1,
      name: "Enterprise Resource Planning Suite",
      category: "software",
      brand: "techcorp",
      price: 2999,
      originalPrice: 3499,
      rating: 4.7,
      reviewCount: 128,
      description: "Comprehensive ERP solution for large businesses with modules for finance, HR, inventory, and CRM.",
      longDescription:
        "Our Enterprise Resource Planning Suite is a comprehensive business management solution designed for large organizations. It integrates all aspects of your business operations into a single, unified system. With advanced analytics, real-time reporting, and seamless integration capabilities, this ERP solution helps streamline your business processes and improve overall efficiency.",
      features: [
        "Cloud-based deployment",
        "Mobile access",
        "Real-time analytics",
        "Customizable dashboards",
        "API Integration",
        "Multi-language support",
      ],
      specifications: {
        Deployment: "Cloud/On-premise",
        Users: "Unlimited",
        Storage: "1TB included",
        Support: "24/7 Priority",
        Integrations: "500+",
        Security: "Enterprise-grade",
      },
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=400&fit=crop",
      ],
      inStock: true,
      new: true,
      discount: 14,
      tags: ["Enterprise", "ERP", "Cloud", "Analytics"],
      warranty: "3 years",
      shipping: "Free worldwide",
      returns: "30-day return policy",
    },
    {
      id: 2,
      name: "Small Business Management Software",
      category: "software",
      brand: "innovate",
      price: 499,
      originalPrice: 599,
      rating: 4.5,
      reviewCount: 94,
      description: "All-in-one business management solution tailored for small to medium enterprises.",
      longDescription:
        "Perfect for small and medium businesses looking to streamline their operations. This comprehensive solution includes everything you need to manage your business efficiently, from invoicing and accounting to customer relationship management and inventory tracking.",
      features: [
        "Invoicing & accounting",
        "Inventory tracking",
        "Customer management",
        "Online appointment booking",
        "Email marketing",
        "Mobile app",
      ],
      specifications: {
        Deployment: "Cloud-based",
        Users: "Up to 50",
        Storage: "100GB",
        Support: "Business hours",
        Integrations: "100+",
        Security: "Standard",
      },
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop",
      ],
      inStock: true,
      new: false,
      discount: 17,
      tags: ["SMB", "Management", "Invoicing", "CRM"],
      warranty: "1 year",
      shipping: "Free",
      returns: "14-day return policy",
    },
    {
      id: 3,
      name: "Advanced Analytics Platform",
      category: "software",
      brand: "techcorp",
      price: 1299,
      originalPrice: 1599,
      rating: 4.8,
      reviewCount: 76,
      description: "Turn your data into actionable insights with our powerful analytics platform.",
      longDescription:
        "Harness the power of your data with our advanced analytics platform. Built for businesses that need deep insights and predictive capabilities, this platform combines machine learning algorithms with intuitive visualization tools to help you make data-driven decisions.",
      features: [
        "Predictive analytics",
        "Data visualization",
        "Machine learning integration",
        "Automated reporting",
        "Real-time dashboards",
        "Custom algorithms",
      ],
      specifications: {
        Deployment: "Cloud/Hybrid",
        "Data Sources": "Unlimited",
        Storage: "5TB",
        Support: "24/7",
        "ML Models": "Pre-built & Custom",
        API: "RESTful API",
      },
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop",
      ],
      inStock: true,
      new: true,
      discount: 19,
      tags: ["Analytics", "AI", "ML", "Insights"],
      warranty: "2 years",
      shipping: "Free",
      returns: "30-day return policy",
    },
    {
      id: 4,
      name: "Project Management Solution",
      category: "software",
      brand: "innovate",
      price: 399,
      originalPrice: 499,
      rating: 4.3,
      reviewCount: 152,
      description: "Streamline project workflows, enhance team collaboration, and deliver projects on time.",
      longDescription:
        "Complete project management solution designed for teams of all sizes. Features advanced project planning tools, team collaboration features, and comprehensive reporting to help you deliver projects on time and within budget.",
      features: [
        "Gantt charts",
        "Task management",
        "Resource allocation",
        "Time tracking",
        "Team collaboration",
        "Budget management",
      ],
      specifications: {
        Users: "Unlimited",
        Projects: "Unlimited",
        Storage: "50GB",
        Support: "Email & Chat",
        "Mobile Apps": "iOS & Android",
        Integrations: "50+",
      },
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=400&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=400&fit=crop"],
      inStock: true,
      new: false,
      discount: 20,
      tags: ["Project", "Management", "Teams", "Gantt"],
      warranty: "1 year",
      shipping: "Digital delivery",
      returns: "7-day return policy",
    },

    // Hardware Products
    {
      id: 5,
      name: "Enterprise Server X9000",
      category: "hardware",
      brand: "techcorp",
      price: 7999,
      originalPrice: 9999,
      rating: 4.9,
      reviewCount: 42,
      description: "High-performance server for mission-critical enterprise applications and databases.",
      longDescription:
        "The Enterprise Server X9000 is built for demanding enterprise workloads. With cutting-edge hardware and redundant systems, it ensures maximum uptime and performance for your critical applications.",
      features: [
        "128-core processor",
        "1TB ECC RAM",
        "Redundant power supplies",
        "Advanced cooling system",
        "Hot-swappable drives",
        "Remote management",
      ],
      specifications: {
        CPU: "128-core Xeon",
        RAM: "1TB ECC",
        Storage: "20TB NVMe",
        Network: "10Gb Ethernet",
        Power: "Redundant PSU",
        Warranty: "5 years",
      },
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=400&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=400&fit=crop"],
      inStock: true,
      new: true,
      discount: 20,
      tags: ["Server", "Enterprise", "High-performance", "Mission-critical"],
      warranty: "5 years",
      shipping: "Free installation",
      returns: "14-day return policy",
    },
    {
      id: 6,
      name: "Business Workstation Pro",
      category: "hardware",
      brand: "innovate",
      price: 2499,
      originalPrice: 2999,
      rating: 4.6,
      reviewCount: 88,
      description: "Professional-grade workstation for design, engineering, and data analysis tasks.",
      longDescription:
        "Designed for professionals who demand the best performance for CAD, video editing, and data analysis. This workstation delivers exceptional computing power with professional-grade components.",
      features: [
        "16-core processor",
        "64GB RAM",
        "Dedicated graphics",
        "1TB SSD storage",
        "Multiple displays",
        "Professional software",
      ],
      specifications: {
        CPU: "16-core Intel i9",
        RAM: "64GB DDR4",
        GPU: "RTX 4080",
        Storage: "1TB NVMe SSD",
        Ports: "USB-C, TB4",
        OS: "Windows 11 Pro",
      },
      image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&h=400&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&h=400&fit=crop"],
      inStock: false,
      new: false,
      discount: 17,
      tags: ["Workstation", "Professional", "Design", "Engineering"],
      warranty: "3 years",
      shipping: "Free",
      returns: "30-day return policy",
    },
    {
      id: 7,
      name: "Network Security Appliance",
      category: "hardware",
      brand: "securex",
      price: 1899,
      originalPrice: 2299,
      rating: 4.7,
      reviewCount: 63,
      description: "Hardware firewall and security appliance for comprehensive network protection.",
      longDescription:
        "Advanced network security appliance that provides comprehensive protection against cyber threats. Features next-generation firewall technology, intrusion prevention, and advanced threat detection.",
      features: [
        "10Gbps throughput",
        "Intrusion prevention",
        "VPN support",
        "Content filtering",
        "Threat intelligence",
        "Centralized management",
      ],
      specifications: {
        Throughput: "10 Gbps",
        "VPN Tunnels": "1000",
        Users: "Unlimited",
        Ports: "8x Gigabit",
        HA: "Active/Passive",
        Management: "Web/CLI",
      },
      image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=500&h=400&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1551808525-51a94da548ce?w=500&h=400&fit=crop"],
      inStock: true,
      new: false,
      discount: 17,
      tags: ["Security", "Firewall", "Network", "Protection"],
      warranty: "3 years",
      shipping: "Free",
      returns: "30-day return policy",
    },

    // Cloud Services
    {
      id: 8,
      name: "Cloud Storage Enterprise Plan",
      category: "cloud",
      brand: "cloudtech",
      price: 199,
      originalPrice: 249,
      perType: "month",
      rating: 4.8,
      reviewCount: 127,
      description: "Scalable cloud storage solution with enterprise-grade security and collaboration features.",
      longDescription:
        "Enterprise-class cloud storage solution that grows with your business. Features advanced security, collaboration tools, and seamless integration with your existing workflow.",
      features: [
        "Unlimited storage",
        "Advanced encryption",
        "Team collaboration tools",
        "Automated backups",
        "Version control",
        "API access",
      ],
      specifications: {
        Storage: "Unlimited",
        Users: "Unlimited",
        Encryption: "AES-256",
        Backup: "Automated",
        API: "RESTful",
        Compliance: "SOC 2, GDPR",
      },
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=400&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=400&fit=crop"],
      inStock: true,
      new: false,
      discount: 20,
      tags: ["Cloud", "Storage", "Enterprise", "Collaboration"],
      warranty: "SLA guaranteed",
      shipping: "Instant activation",
      returns: "30-day money back",
    },
    {
      id: 9,
      name: "Virtual Desktop Infrastructure",
      category: "cloud",
      brand: "cloudtech",
      price: 79,
      originalPrice: 99,
      perType: "user/month",
      rating: 4.4,
      reviewCount: 91,
      description: "Secure virtual desktops accessible from anywhere on any device.",
      longDescription:
        "Complete virtual desktop solution that allows your team to work from anywhere with full access to their desktop environment. Features enterprise-grade security and performance.",
      features: [
        "Windows/Linux options",
        "Application virtualization",
        "Centralized management",
        "Usage analytics",
        "Multi-device access",
        "24/7 support",
      ],
      specifications: {
        "OS Options": "Windows, Linux",
        Applications: "Virtualized",
        Devices: "Any device",
        Performance: "High-performance",
        Security: "End-to-end",
        Management: "Centralized",
      },
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=400&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=400&fit=crop"],
      inStock: true,
      new: true,
      discount: 20,
      tags: ["VDI", "Virtual", "Desktop", "Remote"],
      warranty: "SLA guaranteed",
      shipping: "Instant setup",
      returns: "14-day trial",
    },
    {
      id: 10,
      name: "Managed Kubernetes Service",
      category: "cloud",
      brand: "cloudtech",
      price: 349,
      originalPrice: 449,
      perType: "month",
      rating: 4.9,
      reviewCount: 48,
      description: "Fully managed container orchestration platform for deploying and scaling applications.",
      longDescription:
        "Enterprise-grade Kubernetes service that takes the complexity out of container orchestration. Perfect for modern application deployment and scaling with full management and monitoring included.",
      features: [
        "Automated scaling",
        "Load balancing",
        "Self-healing",
        "Monitoring & logging",
        "Security scanning",
        "Multi-region deployment",
      ],
      specifications: {
        Clusters: "Unlimited",
        Nodes: "Auto-scaling",
        Regions: "Global",
        Monitoring: "Built-in",
        Security: "Pod security",
        Support: "24/7 expert",
      },
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=500&h=400&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=500&h=400&fit=crop"],
      inStock: true,
      new: true,
      discount: 22,
      tags: ["Kubernetes", "Containers", "Orchestration", "DevOps"],
      warranty: "SLA guaranteed",
      shipping: "Instant deployment",
      returns: "30-day money back",
    },

    // Security Products
    {
      id: 11,
      name: "Enterprise Security Suite",
      category: "security",
      brand: "securex",
      price: 1299,
      originalPrice: 1599,
      perType: "year",
      rating: 4.7,
      reviewCount: 106,
      description: "Comprehensive security solution protecting endpoints, networks, and cloud resources.",
      longDescription:
        "Complete enterprise security solution that provides comprehensive protection across all your IT infrastructure. Features advanced threat detection, incident response, and compliance management.",
      features: [
        "Threat intelligence",
        "Behavioral analysis",
        "Zero-day protection",
        "Compliance reporting",
        "Incident response",
        "Security orchestration",
      ],
      specifications: {
        Endpoints: "Unlimited",
        "Threat Intel": "Real-time",
        Detection: "AI-powered",
        Response: "Automated",
        Compliance: "Multi-framework",
        Integration: "SIEM/SOAR",
      },
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=400&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=400&fit=crop"],
      inStock: true,
      new: false,
      discount: 19,
      tags: ["Security", "Enterprise", "Threat", "Protection"],
      warranty: "1 year included",
      shipping: "Digital delivery",
      returns: "30-day money back",
    },
    {
      id: 12,
      name: "Data Loss Prevention System",
      category: "security",
      brand: "securex",
      price: 899,
      originalPrice: 1199,
      perType: "year",
      rating: 4.5,
      reviewCount: 74,
      description: "Prevent unauthorized data transfer and leakage with advanced DLP technologies.",
      longDescription:
        "Advanced data loss prevention system that monitors, detects, and prevents unauthorized data transfers. Protects sensitive information across all communication channels and storage systems.",
      features: [
        "Content inspection",
        "User activity monitoring",
        "Policy enforcement",
        "Incident response",
        "Compliance reporting",
        "Machine learning detection",
      ],
      specifications: {
        Channels: "All communication",
        Detection: "ML-powered",
        Policies: "Customizable",
        Reporting: "Real-time",
        Integration: "Native APIs",
        Support: "24/7",
      },
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=400&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=400&fit=crop"],
      inStock: true,
      new: false,
      discount: 25,
      tags: ["DLP", "Data Protection", "Security", "Compliance"],
      warranty: "1 year included",
      shipping: "Digital delivery",
      returns: "30-day money back",
    },

    // Accessories
    {
      id: 13,
      name: "Enterprise Networking Bundle",
      category: "accessories",
      brand: "techcorp",
      price: 899,
      originalPrice: 1199,
      rating: 4.6,
      reviewCount: 57,
      description: "Complete networking solution for small to medium offices.",
      longDescription:
        "Everything you need for a complete office network setup. This bundle includes enterprise-grade networking equipment with professional installation support and configuration.",
      features: [
        "Managed switch",
        "Wireless access points",
        "Network cables",
        "Installation guide",
        "Configuration service",
        "1-year support",
      ],
      specifications: {
        Switch: "24-port managed",
        WiFi: "WiFi 6 APs",
        Coverage: "5000 sq ft",
        Speed: "Gigabit",
        Management: "Cloud-based",
        Installation: "Professional",
      },
      image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500&h=400&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500&h=400&fit=crop"],
      inStock: true,
      new: false,
      discount: 25,
      tags: ["Networking", "WiFi", "Enterprise", "Bundle"],
      warranty: "2 years",
      shipping: "Free installation",
      returns: "30-day return policy",
    },
    {
      id: 14,
      name: "Smart Conference System",
      category: "accessories",
      brand: "innovate",
      price: 1299,
      originalPrice: 1599,
      rating: 4.7,
      reviewCount: 38,
      description: "All-in-one conference room solution with audio, video, and collaboration features.",
      longDescription:
        "Transform any conference room into a modern collaboration space. Features 4K video, crystal-clear audio, and seamless integration with popular meeting platforms.",
      features: [
        "4K camera",
        "360° speakerphone",
        "Wireless presentation",
        "Meeting scheduler",
        "Platform integration",
        "Remote management",
      ],
      specifications: {
        Video: "4K Ultra HD",
        Audio: "360° pickup",
        Connectivity: "Wireless",
        Platforms: "Zoom, Teams, etc",
        Setup: "Plug & play",
        Control: "Mobile app",
      },
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=500&h=400&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=500&h=400&fit=crop"],
      inStock: false,
      new: true,
      discount: 19,
      tags: ["Conference", "Video", "Audio", "Collaboration"],
      warranty: "2 years",
      shipping: "Free setup",
      returns: "30-day return policy",
    },
    {
      id: 15,
      name: "Business Backup Power System",
      category: "accessories",
      brand: "techcorp",
      price: 599,
      originalPrice: 799,
      rating: 4.8,
      reviewCount: 64,
      description: "Reliable UPS system designed for business environments to protect critical equipment.",
      longDescription:
        "Enterprise-grade uninterruptible power supply that protects your critical business equipment from power outages and fluctuations. Features intelligent battery management and remote monitoring.",
      features: [
        "Pure sine wave output",
        "LCD status display",
        "Surge protection",
        "Battery management",
        "Remote monitoring",
        "Automatic voltage regulation",
      ],
      specifications: {
        Capacity: "1500VA/900W",
        Runtime: "15+ minutes",
        Outlets: "8 outlets",
        Display: "LCD",
        Communication: "USB/Network",
        "Form Factor": "Tower",
      },
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=400&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=400&fit=crop"],
      inStock: true,
      new: false,
      discount: 25,
      tags: ["UPS", "Power", "Backup", "Protection"],
      warranty: "3 years",
      shipping: "Free",
      returns: "30-day return policy",
    },
  ]

  const applyFilters = () => {
    let filteredProducts = [...allProducts]

    if (filters.category) {
      filteredProducts = filteredProducts.filter((product) => product.category === filters.category)
    }

    if (filters.brand) {
      filteredProducts = filteredProducts.filter((product) => product.brand === filters.brand)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query)),
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
      case "popular":
        filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
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

  // UPI Apps for payment
  const upiApps = [
    { id: "phonepe", name: "PhonePe", color: "#5F259F" },
    { id: "gpay", name: "Google Pay", color: "#4285F4" },
    { id: "paytm", name: "Paytm", color: "#00BAF2" },
    { id: "bhim", name: "BHIM", color: "#F47920" },
  ]

  // Payment methods
  const paymentMethods = [
    { id: "UPI", name: "UPI / QR", icon: <Smartphone className="h-5 w-5" /> },
    { id: "CARD", name: "Credit / Debit Card", icon: <CreditCard className="h-5 w-5" /> },
    { id: "NETBANKING", name: "Net Banking", icon: <Building className="h-5 w-5" /> },
    { id: "WALLET", name: "Wallets", icon: <Wallet className="h-5 w-5" /> },
    { id: "EMI", name: "EMI", icon: <DollarSign className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-900 dark:via-purple-900 dark:to-indigo-900">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              {content.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8">{content.description}</p>
            <div className="flex flex-wrap justify-center gap-4 text-white/80">
              <div className="flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Free Shipping
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Secure Payment
              </div>
              <div className="flex items-center">
                <RotateCcw className="h-5 w-5 mr-2" />
                Easy Returns
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Warranty Included
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Fixed Action Bar */}
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
          {/* Cart Icon */}
          <button
            id="cart-icon"
            onClick={() => setShowCart(true)}
            className="relative p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingBag className="h-6 w-6" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>

          {/* Comparison Icon */}
          {comparisonList.length > 0 && (
            <button
              onClick={() => setShowComparison(true)}
              className="relative p-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Eye className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {comparisonList.length}
              </span>
            </button>
          )}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/70 dark:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/70 dark:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                <Filter className="h-5 w-5" />
                <span className="hidden sm:inline">Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>

              <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                  className="w-full bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id === "all" ? "" : category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Brand</label>
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange("brand", e.target.value)}
                  className="w-full bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200"
                >
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                  className="w-full bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200"
                >
                  {priceRanges.map((range) => (
                    <option key={range.id} value={range.id}>
                      {range.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Rating</label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange("rating", e.target.value)}
                  className="w-full bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200"
                >
                  {ratings.map((rating) => (
                    <option key={rating.id} value={rating.id}>
                      {rating.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Availability
                </label>
                <select
                  value={filters.availability}
                  onChange={(e) => handleFilterChange("availability", e.target.value)}
                  className="w-full bg-white/70 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200"
                >
                  <option value="">All Items</option>
                  <option value="inStock">In Stock Only</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Product Count & Active Filters */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <p className="text-slate-700 dark:text-slate-300 font-medium">
              Showing <span className="font-bold text-blue-600 dark:text-blue-400">{filteredProducts.length}</span>{" "}
              products
            </p>
            {filteredProducts.length > 0 && (
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Price range: ${Math.min(...filteredProducts.map((p) => p.price))} - $
                {Math.max(...filteredProducts.map((p) => p.price))}
              </div>
            )}
          </div>

          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null

              const getFilterLabel = () => {
                switch (key) {
                  case "category":
                    return categories.find((c) => c.id === value)?.name
                  case "brand":
                    return brands.find((b) => b.id === value)?.name
                  case "priceRange":
                    return priceRanges.find((p) => p.id === value)?.name
                  case "rating":
                    return ratings.find((r) => r.id === value)?.name
                  case "availability":
                    return "In Stock Only"
                  default:
                    return value
                }
              }

              return (
                <div
                  key={key}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                >
                  {getFilterLabel()}
                  <button
                    onClick={() => handleFilterChange(key, "")}
                    className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    ×
                  </button>
                </div>
              )
            })}
            {Object.values(filters).some((value) => value) && (
              <button
                onClick={() => setFilters({ category: "", priceRange: "", rating: "", availability: "", brand: "" })}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Products Display */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl p-16 text-center border border-slate-100 dark:border-slate-700 shadow-xl">
            <div className="flex justify-center mb-6">
              <Search className="h-16 w-16 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">No products found</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
              We couldn't find any products matching your criteria. Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setFilters({ category: "", priceRange: "", rating: "", availability: "", brand: "" })
                setSearchQuery("")
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 overflow-hidden">
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    {product.new && (
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        NEW
                      </span>
                    )}
                    {product.discount > 0 && (
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 rounded-full bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${wishlistedItems[product.id] ? "text-red-500 fill-red-500" : "text-slate-400 dark:text-slate-300"}`}
                      />
                    </button>
                    <button
                      onClick={() => handleProductView(product)}
                      className="p-2 rounded-full bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    </button>
                    <button
                      onClick={() => toggleComparison(product)}
                      className={`p-2 rounded-full backdrop-blur-sm shadow-md transition-colors ${
                        comparisonList.find((item) => item.id === product.id)
                          ? "bg-blue-500 text-white"
                          : "bg-white/90 dark:bg-slate-700/90 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        navigator.share && navigator.share({ title: product.name, url: window.location.href })
                      }
                      className="p-2 rounded-full bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    </button>
                  </div>

                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Brand & Category */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                      {brands.find((b) => b.id === product.brand)?.name || "TechCorp"}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {categories.find((c) => c.id === product.category)?.name}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-slate-500 dark:text-slate-400 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    {product.perType && (
                      <span className="text-sm text-slate-500 dark:text-slate-400">/{product.perType}</span>
                    )}
                  </div>

                  {/* Quick Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Availability & Shipping */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center">
                      {product.inStock ? (
                        <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                          <CheckCircle className="w-4 h-4 mr-1" /> In stock
                        </div>
                      ) : (
                        <div className="flex items-center text-amber-600 dark:text-amber-400">
                          <RefreshCw className="w-4 h-4 mr-1" /> Pre-order
                        </div>
                      )}
                    </div>
                    <div className="flex items-center text-slate-500 dark:text-slate-400">
                      <Truck className="w-4 h-4 mr-1" />
                      {product.shipping}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.inStock ? "Add to Cart" : "Notify When Available"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Product Image */}
                  <div className="relative lg:w-1/3 aspect-square lg:aspect-auto bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700">
                    {/* Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                      {product.new && (
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                          NEW
                        </span>
                      )}
                      {product.discount > 0 && (
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                          -{product.discount}%
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-2 rounded-full bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${wishlistedItems[product.id] ? "text-red-500 fill-red-500" : "text-slate-400 dark:text-slate-300"}`}
                        />
                      </button>
                      <button
                        onClick={() => handleProductView(product)}
                        className="p-2 rounded-full bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors"
                      >
                        <Eye className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      </button>
                      <button
                        onClick={() => toggleComparison(product)}
                        className={`p-2 rounded-full backdrop-blur-sm shadow-md transition-colors ${
                          comparisonList.find((item) => item.id === product.id)
                            ? "bg-blue-500 text-white"
                            : "bg-white/90 dark:bg-slate-700/90 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    </div>

                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="relative p-6 lg:w-2/3 flex flex-col">
                    <div className="flex-grow">
                      {/* Brand & Category */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                          {brands.find((b) => b.id === product.brand)?.name || "TechCorp"}
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {categories.find((c) => c.id === product.category)?.name}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                          {product.rating} ({product.reviewCount} reviews)
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{product.description}</p>

                      {/* Key Features */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Key Features:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                          {product.features.slice(0, 4).map((feature, i) => (
                            <div key={i} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                              <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-end justify-between mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                      {/* Price and Availability */}
                      <div className="mb-4 lg:mb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl font-bold text-slate-900 dark:text-white">
                            ${product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-lg text-slate-500 dark:text-slate-400 line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                          {product.perType && (
                            <span className="text-sm text-slate-500 dark:text-slate-400">/{product.perType}</span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          {product.inStock ? (
                            <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                              <CheckCircle className="w-4 h-4 mr-1" /> In stock
                            </div>
                          ) : (
                            <div className="flex items-center text-amber-600 dark:text-amber-400">
                              <RefreshCw className="w-4 h-4 mr-1" /> Pre-order
                            </div>
                          )}
                          <div className="flex items-center text-slate-500 dark:text-slate-400">
                            <Truck className="w-4 h-4 mr-1" />
                            {product.shipping}
                          </div>
                          <div className="flex items-center text-slate-500 dark:text-slate-400">
                            <Shield className="w-4 h-4 mr-1" />
                            {product.warranty}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleProductView(product)}
                          className="px-6 py-3 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          className="flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg font-medium disabled:cursor-not-allowed"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {product.inStock ? "Add to Cart" : "Notify Me"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Featured Products Section */}
        {filteredProducts.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Why Choose Our Products?
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Industry-leading technology solutions backed by world-class support
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Lightning Fast</h3>
                <p className="text-slate-600 dark:text-slate-400">Optimized for performance and speed</p>
              </div>

              <div className="text-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Enterprise Security</h3>
                <p className="text-slate-600 dark:text-slate-400">Military-grade encryption and protection</p>
              </div>

              <div className="text-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">24/7 Support</h3>
                <p className="text-slate-600 dark:text-slate-400">Expert assistance whenever you need it</p>
              </div>

              <div className="text-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Global Scale</h3>
                <p className="text-slate-600 dark:text-slate-400">Trusted by millions worldwide</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-white/10 backdrop-blur-sm p-8 md:p-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-block bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-sm text-white mb-6">
                      🎉 Limited Time Offer
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Get 25% Off Your First Purchase</h3>
                    <p className="text-white/90 mb-8 text-lg leading-relaxed">
                      Join thousands of satisfied customers and experience the difference our premium technology
                      solutions can make for your business.
                    </p>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center text-white/90">
                        <CheckCircle className="w-5 h-5 mr-3 text-emerald-300" />
                        Free shipping on orders over $500
                      </div>
                      <div className="flex items-center text-white/90">
                        <CheckCircle className="w-5 h-5 mr-3 text-emerald-300" />
                        30-day money-back guarantee
                      </div>
                      <div className="flex items-center text-white/90">
                        <CheckCircle className="w-5 h-5 mr-3 text-emerald-300" />
                        Premium customer support
                      </div>
                      <div className="flex items-center text-white/90">
                        <CheckCircle className="w-5 h-5 mr-3 text-emerald-300" />
                        Exclusive access to new products
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => setShowCart(true)}
                        className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition duration-300 shadow-lg transform hover:scale-[1.02]"
                      >
                        View Cart ({getCartCount()})
                      </button>
                      <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                        alt="Enterprise Solutions"
                        className="w-full h-auto object-cover rounded-2xl shadow-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setShowCart(false)} />
          <div
            ref={cartRef}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col transform transition-transform duration-300"
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <ShoppingBag className="mr-3 h-6 w-6" /> Shopping Cart ({getCartCount()})
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <ShoppingBag className="h-20 w-20 text-slate-300 dark:text-slate-600 mb-6" />
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-3">Your cart is empty</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                  Discover amazing products and add them to your cart.
                </p>
                <button
                  onClick={() => setShowCart(false)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-1 line-clamp-2">
                            {item.name}
                          </h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                            ${item.price.toLocaleString()}
                            {item.perType && `/${item.perType}`}
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="mx-3 text-sm font-medium text-slate-900 dark:text-white min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-medium text-slate-900 dark:text-white">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Subtotal ({getCartCount()} items)</span>
                      <span>${getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Shipping</span>
                      <span className="text-emerald-600 dark:text-emerald-400">Free</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Tax</span>
                      <span>${Math.round(getCartTotal() * 0.08).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                      <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white">
                        <span>Total</span>
                        <span>${Math.round(getCartTotal() * 1.08).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={proceedToCheckout}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">
                    <Lock className="h-3 w-3 inline mr-1" />
                    Secure checkout with 256-bit encryption
                  </p>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* Product Detail Modal */}
      {showProductModal && selectedProduct && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setShowProductModal(false)} />
          <div className="fixed inset-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-w-4xl mx-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Product Details</h2>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Product Images */}
                <div className="space-y-4">
                  <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
                    <img
                      src={selectedProduct.image || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
                    <div className="grid grid-cols-3 gap-2">
                      {selectedProduct.gallery.slice(1).map((img, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden"
                        >
                          <img
                            src={img || "/placeholder.svg"}
                            alt={`${selectedProduct.name} ${index + 2}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                        {brands.find((b) => b.id === selectedProduct.brand)?.name || "TechCorp"}
                      </span>
                      {selectedProduct.new && (
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full">
                          NEW
                        </span>
                      )}
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                      {selectedProduct.name}
                    </h1>

                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-slate-600 dark:text-slate-400">
                        {selectedProduct.rating} ({selectedProduct.reviewCount} reviews)
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-3xl font-bold text-slate-900 dark:text-white">
                        ${selectedProduct.price.toLocaleString()}
                      </span>
                      {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                        <>
                          <span className="text-xl text-slate-500 dark:text-slate-400 line-through">
                            ${selectedProduct.originalPrice.toLocaleString()}
                          </span>
                          <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-sm font-bold px-2 py-1 rounded-full">
                            Save {selectedProduct.discount}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Description</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedProduct.longDescription || selectedProduct.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Key Features</h3>
                    <div className="grid gap-2">
                      {selectedProduct.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedProduct.specifications && (
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Specifications</h3>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-3">
                        {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">{key}</span>
                            <span className="font-medium text-slate-900 dark:text-white">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center text-slate-600 dark:text-slate-400">
                        <Truck className="w-4 h-4 mr-2" />
                        {selectedProduct.shipping}
                      </div>
                      <div className="flex items-center text-slate-600 dark:text-slate-400">
                        <Shield className="w-4 h-4 mr-2" />
                        {selectedProduct.warranty}
                      </div>
                      <div className="flex items-center text-slate-600 dark:text-slate-400">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        {selectedProduct.returns}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          addToCart(selectedProduct)
                          setShowProductModal(false)
                        }}
                        disabled={!selectedProduct.inStock}
                        className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        {selectedProduct.inStock ? "Add to Cart" : "Out of Stock"}
                      </button>
                      <button
                        onClick={() => toggleWishlist(selectedProduct.id)}
                        className="p-4 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${wishlistedItems[selectedProduct.id] ? "text-red-500 fill-red-500" : "text-slate-400 dark:text-slate-300"}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setShowPaymentModal(false)} />
          <div
            ref={paymentRef}
            className="fixed inset-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-w-md mx-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Complete Payment</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!paymentComplete ? (
                <div className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Items ({getCartCount()})</span>
                        <span className="text-slate-900 dark:text-white">${getCartTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Shipping</span>
                        <span className="text-emerald-600 dark:text-emerald-400">Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Tax</span>
                        <span className="text-slate-900 dark:text-white">
                          ${Math.round(getCartTotal() * 0.08).toLocaleString()}
                        </span>
                      </div>
                      {appliedCoupon && (
                        <div className="flex justify-between text-green-600 dark:text-green-400">
                          <span>Coupon ({appliedCoupon.code})</span>
                          <span>
                            -$
                            {appliedCoupon.type === "percent"
                              ? Math.round((getCartTotal() * appliedCoupon.discount) / 100)
                              : appliedCoupon.discount}
                          </span>
                        </div>
                      )}
                      <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                        <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                          <span>Total</span>
                          <span>${calculateDiscountedTotal().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Code */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Have a coupon?</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Try "WELCOME10" for 10% off or "FLAT100" for $100 off
                    </p>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Payment Method</h3>
                    <div className="space-y-2">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                            selectedPaymentMethod === method.id
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {method.icon}
                            <span className="font-medium text-slate-900 dark:text-white">{method.name}</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Method Content */}
                  <div className="space-y-4">
                    {selectedPaymentMethod === "UPI" && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-slate-900 dark:text-white">Pay using UPI</h4>

                        {/* UPI Apps */}
                        <div className="grid grid-cols-4 gap-3">
                          {upiApps.map((app) => (
                            <button
                              key={app.id}
                              onClick={() => setSelectedUpiApp(app.id)}
                              className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${
                                selectedUpiApp === app.id
                                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                  : "border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                              }`}
                            >
                              <div className="w-8 h-8 rounded-lg mb-1" style={{ backgroundColor: app.color }}></div>
                              <span className="text-xs text-slate-600 dark:text-slate-300">{app.name}</span>
                            </button>
                          ))}
                        </div>

                        <div className="text-center text-slate-500 dark:text-slate-400">OR</div>

                        <div>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="Enter UPI ID (name@upi)"
                            className="w-full px-3 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <button
                          onClick={() => setShowUpiPin(true)}
                          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                          Continue with UPI
                        </button>
                      </div>
                    )}

                    {selectedPaymentMethod === "CARD" && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-slate-900 dark:text-white">Card Details</h4>

                        <div>
                          <input
                            type="text"
                            value={cardDetails.number}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/\s/g, "")
                                .replace(/(\d{4})/g, "$1 ")
                                .trim()
                                .slice(0, 19)
                              setCardDetails({ ...cardDetails, number: value })
                            }}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-3 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                            placeholder="Cardholder Name"
                            className="w-full px-3 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={cardDetails.expiry}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/\D/g, "")
                                .replace(/^(\d{2})(\d)/, "$1/$2")
                                .slice(0, 5)
                              setCardDetails({ ...cardDetails, expiry: value })
                            }}
                            placeholder="MM/YY"
                            className="px-3 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="password"
                            value={cardDetails.cvv}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "").slice(0, 3)
                              setCardDetails({ ...cardDetails, cvv: value })
                            }}
                            placeholder="CVV"
                            className="px-3 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <button
                          onClick={handlePaymentComplete}
                          disabled={!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv}
                          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                        >
                          Pay ${calculateDiscountedTotal().toLocaleString()}
                        </button>
                      </div>
                    )}

                    {selectedPaymentMethod === "NETBANKING" && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-slate-900 dark:text-white">Select Your Bank</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank"].map((bank) => (
                            <button
                              key={bank}
                              onClick={handlePaymentComplete}
                              className="p-3 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                            >
                              <span className="text-slate-900 dark:text-white">{bank}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === "WALLET" && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-slate-900 dark:text-white">Select Wallet</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {["Paytm", "PhonePe", "Google Pay", "Amazon Pay"].map((wallet) => (
                            <button
                              key={wallet}
                              onClick={handlePaymentComplete}
                              className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-center"
                            >
                              <span className="text-slate-900 dark:text-white">{wallet}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === "EMI" && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-slate-900 dark:text-white">EMI Options</h4>
                        <div className="space-y-2">
                          {[
                            { months: 3, amount: Math.round(calculateDiscountedTotal() / 3) },
                            { months: 6, amount: Math.round(calculateDiscountedTotal() / 6) },
                            { months: 12, amount: Math.round(calculateDiscountedTotal() / 12) },
                          ].map((emi) => (
                            <button
                              key={emi.months}
                              onClick={handlePaymentComplete}
                              className="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                            >
                              <div className="flex justify-between">
                                <span className="text-slate-900 dark:text-white">{emi.months} Months</span>
                                <span className="font-medium text-slate-900 dark:text-white">${emi.amount}/month</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Payment Successful!</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Thank you for your purchase. Your order has been confirmed and will be processed shortly.
                  </p>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {!paymentComplete && (
              <div className="p-6 border-t border-slate-200 dark:border-slate-700 text-center">
                <div className="flex items-center justify-center text-xs text-slate-500 dark:text-slate-400">
                  <Lock className="h-3 w-3 mr-1" />
                  Secured by 256-bit encryption
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Comparison Modal */}
      {showComparison && comparisonList.length > 0 && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setShowComparison(false)} />
          <div className="fixed inset-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Compare Products</h2>
              <button
                onClick={() => setShowComparison(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comparisonList.map((product) => (
                  <div key={product.id} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 space-y-4">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <button
                        onClick={() => setComparisonList(comparisonList.filter((item) => item.id !== product.id))}
                        className="absolute top-2 right-2 p-1 bg-white dark:bg-slate-700 rounded-full shadow-md"
                      >
                        <X className="h-4 w-4 text-slate-500" />
                      </button>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">{product.name}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">Price</span>
                          <span className="font-medium text-slate-900 dark:text-white">${product.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">Rating</span>
                          <span className="font-medium text-slate-900 dark:text-white">{product.rating}★</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">Brand</span>
                          <span className="font-medium text-slate-900 dark:text-white">
                            {brands.find((b) => b.id === product.brand)?.name || "TechCorp"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">Availability</span>
                          <span className={`font-medium ${product.inStock ? "text-green-600" : "text-amber-600"}`}>
                            {product.inStock ? "In Stock" : "Pre-order"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-slate-900 dark:text-white">Features</h4>
                      <div className="space-y-1">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-center text-xs text-slate-600 dark:text-slate-300">
                            <Check className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product)
                        setShowComparison(false)
                      }}
                      disabled={!product.inStock}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                    >
                      {product.inStock ? "Add to Cart" : "Notify Me"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Products
