import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {ArrowRight,Check,ChevronDown,Code,Database,Globe,Lock,MessageSquare,Server,Settings,Smartphone,Zap,Star,Users,ChevronRight,ChevronLeft} from "lucide-react"

const Services = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("all")
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  

  // Toggle dark mode
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  

  const services = [
    {
      id: "software",
      icon: <Code className="w-10 h-10 text-purple-500" />,
      title: "Custom Software Development",
      description: "Tailored software solutions designed to meet your specific business needs and challenges.",
      features: [
        "Enterprise Applications",
        "Web Applications",
        "Mobile App Development",
        "API Development & Integration",
        "Legacy System Modernization",
      ],
    },
    {
      id: "cloud",
      icon: <Server className="w-10 h-10 text-blue-500" />,
      title: "Cloud Services",
      description: "Scalable and secure cloud infrastructure to power your business applications.",
      features: [
        "Cloud Migration",
        "Cloud Architecture Design",
        "Serverless Applications",
        "DevOps Automation",
        "Managed Cloud Services",
      ],
    },
    {
      id: "data",
      icon: <Database className="w-10 h-10 text-green-500" />,
      title: "Data Analytics & AI",
      description: "Transform your data into actionable insights with our advanced analytics and AI solutions.",
      features: [
        "Business Intelligence",
        "Machine Learning Models",
        "Predictive Analytics",
        "Data Visualization",
        "Big Data Processing",
      ],
    },
    {
      id: "security",
      icon: <Lock className="w-10 h-10 text-red-500" />,
      title: "Cybersecurity",
      description: "Protect your digital assets with our comprehensive security solutions and services.",
      features: [
        "Security Assessments",
        "Penetration Testing",
        "Compliance Solutions",
        "Security Monitoring",
        "Incident Response",
      ],
    },
    {
      id: "web",
      icon: <Globe className="w-10 h-10 text-purple-500" />,
      title: "Web Development",
      description: "Create stunning, responsive websites that engage your audience and drive conversions.",
      features: [
        "Responsive Web Design",
        "E-commerce Solutions",
        "Content Management Systems",
        "Progressive Web Apps",
        "SEO Optimization",
      ],
    },
    {
      id: "mobile",
      icon: <Smartphone className="w-10 h-10 text-yellow-500" />,
      title: "Mobile App Development",
      description: "Build native and cross-platform mobile applications that deliver exceptional user experiences.",
      features: [
        "iOS Development",
        "Android Development",
        "Cross-platform Solutions",
        "Mobile UI/UX Design",
        "App Store Optimization",
      ],
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Innovate Solutions",
      quote:
        "Their team delivered our enterprise software on time and under budget. The solution has transformed our business operations.",
      role: "CTO",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      name: "Michael Chen",
      company: "Global Retail Inc.",
      quote:
        "The mobile app they developed for us has received outstanding feedback from our customers and significantly increased our engagement metrics.",
      role: "Director of Digital",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      company: "FinTech Innovations",
      quote:
        "Their cybersecurity services identified critical vulnerabilities that other vendors missed. Highly recommended for security-conscious organizations.",
      role: "CISO",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4,
    },
    {
      name: "David Wilson",
      company: "Healthcare Systems",
      quote:
        "The data analytics solution they implemented has given us unprecedented insights into our operations, helping us improve patient care significantly.",
      role: "Head of Innovation",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: "What industries do you specialize in?",
      answer:
        "We have extensive experience across multiple industries including finance, healthcare, retail, manufacturing, and education. Our diverse expertise allows us to bring best practices from various sectors to solve your unique challenges.",
    },
    {
      question: "How do you ensure the quality of your services?",
      answer:
        "We maintain rigorous quality standards through our comprehensive QA processes, code reviews, automated testing, and continuous integration practices. Our team follows industry best practices and stays updated with the latest technologies.",
    },
    {
      question: "What is your typical project timeline?",
      answer:
        "Project timelines vary based on scope and complexity. We provide detailed project plans during our initial consultation. For most mid-sized projects, you can expect a timeline of 3-6 months from requirements gathering to deployment.",
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer:
        "Yes, we offer flexible support and maintenance packages to ensure your solutions continue to perform optimally. Our support includes bug fixes, security updates, performance optimization, and feature enhancements.",
    },
    {
      question: "How do you handle data security and privacy?",
      answer:
        "We implement industry-standard security protocols and comply with relevant regulations like GDPR, HIPAA, and CCPA. Our security practices include encryption, secure coding, regular security audits, and comprehensive data protection measures.",
    },
    {
      question: "Can you work with our existing technology stack?",
      answer:
        "Absolutely. We have experience integrating with a wide range of technologies and platforms. Our team will assess your current infrastructure and recommend the best approach for seamless integration with your existing systems.",
    },
  ]

  const stats = [
    { value: "10+", label: "Years of Experience" },
    { value: "200+", label: "Completed Projects" },
    { value: "50+", label: "Expert Developers" },
    { value: "98%", label: "Client Satisfaction" },
  ]

  const filteredServices = activeTab === "all" ? services : services.filter((service) => service.id === activeTab)

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNavigateToContact = () => {
    navigate("/contact")
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium text-sm">
                Innovative Technology Solutions
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-6">
                Transforming Businesses Through Technology
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10">
                We deliver cutting-edge technology solutions that drive innovation, efficiency, and growth for
                businesses of all sizes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleNavigateToContact}
                  className="px-8 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-300/50 dark:hover:shadow-purple-900/50 flex items-center"
                >
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="px-8 py-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  Explore Services
                </button>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-24 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-white dark:to-gray-900 z-10"></div>
        </div>

        {/* Stats Section */}
        <div id="stats" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-700 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Tabs */}
        <div id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium text-sm">
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Technology Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We offer a wide range of services to help your business thrive in the digital age
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12 overflow-x-auto pb-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "all"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-300/50 dark:shadow-purple-900/50"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              All Services
            </button>
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === service.id
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-300/50 dark:shadow-purple-900/50"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="relative group rounded-xl overflow-hidden backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-8">
                <div className="mb-5 p-3 inline-block rounded-lg bg-gray-100 dark:bg-gray-700">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleNavigateToContact}
                  className="flex items-center text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                >
                  Request service <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div id="approach" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium text-sm">
            Our Methodology
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Approach</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We follow a proven methodology to deliver successful outcomes for every project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <MessageSquare className="w-8 h-8" />,
              title: "Discovery",
              description: "We start by understanding your business goals, challenges, and requirements.",
            },
            {
              icon: <Settings className="w-8 h-8" />,
              title: "Planning",
              description: "Our team creates a detailed roadmap and architecture for your solution.",
            },
            {
              icon: <Code className="w-8 h-8" />,
              title: "Development",
              description: "We build your solution using agile methodologies and best practices.",
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Deployment",
              description: "We launch your solution and provide ongoing support and optimization.",
            },
          ].map((step, index) => (
            <div
              key={index}
              className="relative backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute -top-5 -left-5 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {index + 1}
              </div>
              <div className="pt-6">
                <div className="mb-4 text-purple-600 dark:text-purple-400">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div
        id="testimonials"
        className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium text-sm">
              Client Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Don't just take our word for it — hear from some of our satisfied clients
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 rounded-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 shadow-xl">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].name}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white rounded-full p-1.5 shadow-lg">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < testimonials[currentTestimonial].rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic text-lg mb-6">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-md"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentTestimonial === index
                      ? "bg-purple-600 scale-125"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-md"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium text-sm">
            Got Questions?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about our services
          </p>
        </div>

        <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              <button
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center w-full px-6 py-4 text-left"
                aria-expanded={expandedFaq === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${expandedFaq === index ? "transform rotate-180" : ""}`}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`px-6 pb-4 transition-all duration-300 ease-in-out ${
                  expandedFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-700 dark:text-gray-300 mb-6">Still have questions? We're here to help!</p>
          <button
            onClick={handleNavigateToContact}
            className="px-8 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-300/50 dark:hover:shadow-purple-900/50 inline-flex items-center"
          >
            Contact Us <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your business?</h2>
              <p className="text-purple-100 text-lg">
                Let's discuss how our technology solutions can help you achieve your business goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleNavigateToContact}
                className="px-8 py-3 rounded-full bg-white text-purple-600 font-medium hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center"
              >
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="px-8 py-3 rounded-full bg-transparent text-white font-medium border border-white hover:bg-white/10 transition-all flex items-center justify-center"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  </div>
  )
}

export default Services