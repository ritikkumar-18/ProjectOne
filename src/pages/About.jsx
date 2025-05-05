import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// Team member data with Google-sourced images (royalty-free from Unsplash via Google Images)
const teamMembers = [
  {
    name: 'Ritik Kumar',
    role: 'Founder & CEO',
    bio: 'Visionary leader with over 15 years in tech innovation.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Pulkit Gautam',
    role: 'CTO',
    bio: 'Expert in software architecture and AI solutions.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Alex Johnson',
    role: 'Lead Designer',
    bio: 'Creative mind behind our intuitive user experiences.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const About = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800">
      {/* Hero Section with Parallax Background */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b2ZmaWNlfGVufDB8fDB8fHww')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-blue-800/80"></div>
        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        >
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            About Techiee
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
          >
            Innovating the future with cutting-edge technology and a passion for excellence.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Since our founding in 2015, Techiee has been at the forefront of technological innovation. What started as a
              small team with big dreams has grown into a global leader in software, hardware, and cloud solutions.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our mission is to empower businesses with tools that drive success. We combine creativity, expertise, and a
              customer-first approach to deliver unparalleled value.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="order-1 md:order-2 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1535957998253-26ae1ef29506?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Techiee Office"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-200/50 to-blue-200/50 rounded-xl opacity-30"></div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-white dark:bg-slate-900 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900 dark:to-blue-900 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Our Mission</h3>
              <p className="text-gray-700 dark:text-gray-300">
                To deliver transformative technology that empowers businesses to thrive in a digital world.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900 dark:to-teal-900 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Our Vision</h3>
              <p className="text-gray-700 dark:text-gray-300">
                To create a connected future where technology unlocks endless possibilities for all.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Team Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700"
            >
              <div className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mt-6 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-600/20 to-transparent"></div>
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{member.name}</h4>
                <p className="text-teal-600 dark:text-teal-400 mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gradient-to-r from-teal-600 to-blue-800 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Shape the Future with Us
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-white/90 max-w-2xl mx-auto mb-8"
          >
            Partner with Techiee to unlock innovative solutions that drive your business forward.
          </motion.p>
          <motion.div variants={itemVariants}>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-coral-500 text-white rounded-lg font-semibold hover:bg-coral-600 dark:hover:bg-coral-400 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;