import React, { useState } from 'react';
import { ArrowRight, Check, ChevronDown, Code, Database, Globe, Lock, MessageSquare, Server, Settings, Smartphone, Zap } from 'lucide-react';

const Services = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const services = [
    {
      id: 'software',
      icon: <Code className="w-10 h-10 text-purple-500" />,
      title: 'Custom Software Development',
      description: 'Tailored software solutions designed to meet your specific business needs and challenges.',
      features: [
        'Enterprise Applications',
        'Web Applications',
        'Mobile App Development',
        'API Development & Integration',
        'Legacy System Modernization'
      ]
    },
    {
      id: 'cloud',
      icon: <Server className="w-10 h-10 text-blue-500" />,
      title: 'Cloud Services',
      description: 'Scalable and secure cloud infrastructure to power your business applications.',
      features: [
        'Cloud Migration',
        'Cloud Architecture Design',
        'Serverless Applications',
        'DevOps Automation',
        'Managed Cloud Services'
      ]
    },
    {
      id: 'data',
      icon: <Database className="w-10 h-10 text-green-500" />,
      title: 'Data Analytics & AI',
      description: 'Transform your data into actionable insights with our advanced analytics and AI solutions.',
      features: [
        'Business Intelligence',
        'Machine Learning Models',
        'Predictive Analytics',
        'Data Visualization',
        'Big Data Processing'
      ]
    },
    {
      id: 'security',
      icon: <Lock className="w-10 h-10 text-red-500" />,
      title: 'Cybersecurity',
      description: 'Protect your digital assets with our comprehensive security solutions and services.',
      features: [
        'Security Assessments',
        'Penetration Testing',
        'Compliance Solutions',
        'Security Monitoring',
        'Incident Response'
      ]
    },
    {
      id: 'web',
      icon: <Globe className="w-10 h-10 text-indigo-500" />,
      title: 'Web Development',
      description: 'Create stunning, responsive websites that engage your audience and drive conversions.',
      features: [
        'Responsive Web Design',
        'E-commerce Solutions',
        'Content Management Systems',
        'Progressive Web Apps',
        'SEO Optimization'
      ]
    },
    {
      id: 'mobile',
      icon: <Smartphone className="w-10 h-10 text-yellow-500" />,
      title: 'Mobile App Development',
      description: 'Build native and cross-platform mobile applications that deliver exceptional user experiences.',
      features: [
        'iOS Development',
        'Android Development',
        'Cross-platform Solutions',
        'Mobile UI/UX Design',
        'App Store Optimization'
      ]
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'Innovate Solutions',
      quote: 'Their team delivered our enterprise software on time and under budget. The solution has transformed our business operations.',
      role: 'CTO'
    },
    {
      name: 'Michael Chen',
      company: 'Global Retail Inc.',
      quote: 'The mobile app they developed for us has received outstanding feedback from our customers and significantly increased our engagement metrics.',
      role: 'Director of Digital'
    },
    {
      name: 'Emily Rodriguez',
      company: 'FinTech Innovations',
      quote: 'Their cybersecurity services identified critical vulnerabilities that other vendors missed. Highly recommended for security-conscious organizations.',
      role: 'CISO'
    }
  ];

  const faqs = [
    {
      question: 'What industries do you specialize in?',
      answer: 'We have extensive experience across multiple industries including finance, healthcare, retail, manufacturing, and education. Our diverse expertise allows us to bring best practices from various sectors to solve your unique challenges.'
    },
    {
      question: 'How do you ensure the quality of your services?',
      answer: 'We maintain rigorous quality standards through our comprehensive QA processes, code reviews, automated testing, and continuous integration practices. Our team follows industry best practices and stays updated with the latest technologies.'
    },
    {
      question: 'What is your typical project timeline?',
      answer: 'Project timelines vary based on scope and complexity. We provide detailed project plans during our initial consultation. For most mid-sized projects, you can expect a timeline of 3-6 months from requirements gathering to deployment.'
    },
    {
      question: 'Do you provide ongoing support after project completion?',
      answer: 'Yes, we offer flexible support and maintenance packages to ensure your solutions continue to perform optimally. Our support includes bug fixes, security updates, performance optimization, and feature enhancements.'
    },
    {
      question: 'How do you handle data security and privacy?',
      answer: 'We implement industry-standard security protocols and comply with relevant regulations like GDPR, HIPAA, and CCPA. Our security practices include encryption, secure coding, regular security audits, and comprehensive data protection measures.'
    }
  ];

  const filteredServices = activeTab === 'all' ? services : services.filter(service => service.id === activeTab);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-6">
              Transforming Businesses Through Technology
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              We deliver cutting-edge technology solutions that drive innovation, efficiency, and growth for businesses of all sizes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-300/50 dark:hover:shadow-purple-900/50">
                Get Started
              </button>
              <button className="px-8 py-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-24 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-white dark:to-gray-900 z-10"></div>
      </div>

      {/* Service Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'all' 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-300/50 dark:shadow-purple-900/50' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            All Services
          </button>
          {services.map(service => (
            <button 
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === service.id 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-300/50 dark:shadow-purple-900/50' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <div 
              key={service.id}
              className="relative group rounded-xl overflow-hidden backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-8">
                <div className="mb-5 p-3 inline-block rounded-lg bg-gray-100 dark:bg-gray-700">
                  {service.icon}
                </div>
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
                <button className="flex items-center text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Approach</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We follow a proven methodology to deliver successful outcomes for every project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <MessageSquare className="w-8 h-8" />, title: "Discovery", description: "We start by understanding your business goals, challenges, and requirements." },
            { icon: <Settings className="w-8 h-8" />, title: "Planning", description: "Our team creates a detailed roadmap and architecture for your solution." },
            { icon: <Code className="w-8 h-8" />, title: "Development", description: "We build your solution using agile methodologies and best practices." },
            { icon: <Zap className="w-8 h-8" />, title: "Deployment", description: "We launch your solution and provide ongoing support and optimization." }
          ].map((step, index) => (
            <div key={index} className="relative backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="absolute -top-5 -left-5 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {index + 1}
              </div>
              <div className="pt-6">
                <div className="mb-4 text-purple-600 dark:text-purple-400">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Don't just take our word for it — hear from some of our satisfied clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
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
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedFaq === index ? 'transform rotate-180' : ''}`} />
              </button>
              <div className={`px-6 pb-4 ${expandedFaq === index ? 'block' : 'hidden'}`}>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Contact us today to discuss how our services can help you achieve your technology goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 rounded-full bg-white text-purple-600 font-medium hover:bg-gray-100 transition-all shadow-lg">
              Schedule a Consultation
            </button>
            <button className="px-8 py-3 rounded-full bg-transparent text-white font-medium border border-white hover:bg-white/10 transition-all">
              View Case Studies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
