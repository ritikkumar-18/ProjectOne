
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { Search, Tag, Share2, Copy, ChevronDown, MessageCircle, User, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [expandedComments, setExpandedComments] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [scrollProgress, setScrollProgress] = useState({});
  const postRefs = useRef({});

  // Blog post data
  const posts = [
    {
      id: 1,
      title: 'The Rise of AI in Web Development',
      excerpt: 'Explore how AI is transforming web development with automated design systems, intelligent UX, and code generation tools.',
      content: 'Artificial Intelligence is revolutionizing web development by automating repetitive tasks, enhancing user experiences, and generating code efficiently. From AI-powered design tools like Figma’s plugins to frameworks that optimize performance, the future is bright. This post dives into practical applications, challenges, and emerging trends in AI-driven web development.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e175b?auto=format&fit=crop&w=800&h=400',
      category: 'AI',
      tags: ['AI', 'Web Development', 'Automation'],
      author: { name: 'Alex Johnson', avatar: null },
      date: 'May 7, 2025',
      readTime: 5,
      comments: [
        { id: 1, author: 'Jane Doe', content: 'Great insights!', date: 'May 8, 2025' },
      ],
    },
    {
      id: 2,
      title: 'React 19: What’s New and Exciting',
      excerpt: 'A deep dive into React 19’s new features, including concurrent rendering, new hooks, and the React Compiler.',
      content: 'React 19 introduces groundbreaking features that enhance performance and developer experience. Concurrent rendering improves app responsiveness, while new hooks simplify state management. The React Compiler automates memoization, reducing boilerplate code. This post explores these features with examples and best practices.',
      image: 'https://images.unsplash.com/photo-1633356122544-f1348c115a53?auto=format&fit=crop&w=800&h=400',
      category: 'Web Development',
      tags: ['React', 'JavaScript', 'Frontend'],
      author: { name: 'Sarah Chen', avatar: null },
      date: 'April 28, 2025',
      readTime: 8,
      comments: [
        { id: 1, author: 'John Smith', content: 'Can’t wait to try the new hooks!', date: 'April 29, 2025' },
      ],
    },
    {
      id: 3,
      title: 'Building Scalable Microservices',
      excerpt: 'Learn best practices for designing, deploying, and monitoring scalable microservices architectures.',
      content: 'Microservices architectures enable scalability and flexibility but come with challenges like service coordination and monitoring. This post covers architectural patterns, deployment strategies using Docker and Kubernetes, and monitoring tools like Prometheus. Case studies from top tech companies illustrate real-world applications.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&h=400',
      category: 'Backend',
      tags: ['Microservices', 'DevOps', 'Backend'],
      author: { name: 'Michael Rodriguez', avatar: null },
      date: 'April 15, 2025',
      readTime: 12,
      comments: [],
    },
    {
      id: 4,
      title: 'Quantum Computing: The Next Frontier',
      excerpt: 'Discover the latest breakthroughs in quantum computing and their potential to reshape industries.',
      content: 'Quantum computing promises to solve complex problems beyond the reach of classical computers. From quantum algorithms to hardware advancements, this post explores the state of the field, its applications in cryptography and AI, and the challenges ahead. Experts share insights on the road to practical quantum systems.',
      image: 'https://images.unsplash.com/photo-1624969862644-5f1f6b08729d?auto=format&fit=crop&w=800&h=400',
      category: 'Quantum Computing',
      tags: ['Quantum', 'Computing', 'Innovation'],
      author: { name: 'Dr. Emily Patel', avatar: null },
      date: 'March 20, 2025',
      readTime: 10,
      comments: [
        { id: 1, author: 'Alice Brown', content: 'Fascinating read!', date: 'March 21, 2025' },
      ],
    },
    {
      id: 5,
      title: 'Cybersecurity in the AI Era',
      excerpt: 'How AI is reshaping cybersecurity with advanced threat detection and automated defenses.',
      content: 'AI is transforming cybersecurity by enabling real-time threat detection and automated response systems. However, it also introduces new vulnerabilities. This post examines AI-driven security tools, their benefits, and the risks of adversarial AI. Practical tips for securing systems are included.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&h=400',
      category: 'Cybersecurity',
      tags: ['Cybersecurity', 'AI', 'Security'],
      author: { name: 'Lisa Wong', avatar: null },
      date: 'March 10, 2025',
      readTime: 7,
      comments: [],
    },
    {
      id: 6,
      title: 'Web3: The Future of the Internet',
      excerpt: 'An introduction to Web3 technologies, including blockchain and decentralized applications.',
      content: 'Web3 represents the next evolution of the internet, powered by blockchain and decentralized systems. This post explores key technologies like Ethereum, IPFS, and dApps, their benefits for users, and challenges like scalability. Real-world examples highlight Web3’s potential to transform industries.',
      image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&h=400',
      category: 'Web3',
      tags: ['Web3', 'Blockchain', 'Decentralized'],
      author: { name: 'David Kim', avatar: null },
      date: 'February 25, 2025',
      readTime: 9,
      comments: [
        { id: 1, author: 'Tom Lee', content: 'Excited for Web3’s potential!', date: 'February 26, 2025' },
      ],
    },
    {
      id: 7,
      title: 'Mastering TypeScript in 2025',
      excerpt: 'A guide to leveraging TypeScript’s advanced features for robust web applications.',
      content: 'TypeScript has become essential for building scalable web applications. This post covers advanced features like conditional types, mapped types, and utility types. Practical examples demonstrate how to integrate TypeScript with React and Node.js for type-safe development.',
      image: 'https://images.unsplash.com/photo-1593720213427-2f1e06b508d2?auto=format&fit=crop&w=800&h=400',
      category: 'Web Development',
      tags: ['TypeScript', 'JavaScript', 'Frontend'],
      author: { name: 'Rachel Lee', avatar: null },
      date: 'February 10, 2025',
      readTime: 6,
      comments: [],
    },
    {
      id: 8,
      title: 'DevOps Automation with GitHub Actions',
      excerpt: 'Streamline your CI/CD pipelines using GitHub Actions for automated workflows.',
      content: 'GitHub Actions simplifies DevOps by enabling automated workflows for building, testing, and deploying applications. This post walks through setting up CI/CD pipelines, integrating with Docker, and optimizing for performance. Real-world examples show how to scale workflows.',
      image: 'https://images.unsplash.com/photo-1618401471353-b98c559e93b7?auto=format&fit=crop&w=800&h=400',
      category: 'DevOps',
      tags: ['DevOps', 'CI/CD', 'Automation'],
      author: { name: 'Chris Patel', avatar: null },
      date: 'January 30, 2025',
      readTime: 11,
      comments: [],
    },
    {
      id: 9,
      title: 'The Impact of 5G on IoT',
      excerpt: 'How 5G is accelerating IoT innovation with faster, more reliable connectivity.',
      content: '5G technology is unlocking new possibilities for the Internet of Things (IoT) by providing high-speed, low-latency connectivity. This post explores 5G’s impact on smart cities, healthcare, and industrial IoT, along with challenges like security and infrastructure.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&h=400',
      category: 'IoT',
      tags: ['5G', 'IoT', 'Connectivity'],
      author: { name: 'Sophie Turner', avatar: null },
      date: 'January 15, 2025',
      readTime: 8,
      comments: [],
    },
    {
      id: 10,
      title: 'Ethical AI: Principles and Practices',
      excerpt: 'A guide to developing AI systems that prioritize fairness, transparency, and accountability.',
      content: 'As AI becomes ubiquitous, ensuring ethical development is critical. This post outlines principles like fairness, transparency, and accountability, with practical steps for implementing them. Case studies highlight successes and pitfalls in ethical AI development.',
      image: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?auto=format&fit=crop&w=800&h=400',
      category: 'AI',
      tags: ['AI', 'Ethics', 'Development'],
      author: { name: 'Dr. Maria Gonzalez', avatar: null },
      date: 'January 5, 2025',
      readTime: 10,
      comments: [],
    },
  ];

  // Categories and tags
  const categories = ['All', ...new Set(posts.map((post) => post.category))];
  const allTags = [...new Set(posts.flatMap((post) => post.tags))];

  // Filter posts
  useEffect(() => {
    let results = posts;
    if (searchTerm) {
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      results = results.filter((post) => post.category === selectedCategory);
    }
    if (selectedTag) {
      results = results.filter((post) => post.tags.includes(selectedTag));
    }
    setFilteredPosts(results);
  }, [searchTerm, selectedCategory, selectedTag]);

  // Scroll to top on mount
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const timer = setTimeout(scrollToTop, 0);
    return () => clearTimeout(timer);
  }, []);

  // Track scroll progress for each post
  useEffect(() => {
    const handleScroll = () => {
      const newProgress = {};
      Object.keys(postRefs.current).forEach((postId) => {
        const element = postRefs.current[postId];
        if (element) {
          const { top, height } = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (top < windowHeight && top + height > 0) {
            const progress = Math.min(100, Math.max(0, ((windowHeight - top) / (height + windowHeight)) * 100));
            newProgress[postId] = progress;
          }
        }
      });
      setScrollProgress(newProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load more posts
  const loadMore = useCallback(() => {
    setVisiblePosts((prev) => prev + 6);
    toast.success('Loaded more posts!', { icon: '📄' });
  }, []);

  // Copy post link
  const copyLink = useCallback((postId) => {
    const url = `${window.location.href}#post-${postId}`;
    navigator.clipboard.writeText(url).then(
      () => toast.success('Link copied to clipboard!', { icon: '📋' }),
      () => toast.error('Failed to copy link')
    );
  }, []);

  // Share post
  const sharePost = useCallback((post, platform) => {
    const url = `${window.location.href}#post-${post.id}`;
    const text = post.title;
    let shareUrl;
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`${text}\n${url}`)}`;
        window.location.href = shareUrl;
        toast.success('Email draft opened!');
        return;
      default:
        return;
    }
    window.open(shareUrl, '_blank');
    toast.success(`Shared on ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`);
  }, []);

  // Handle comment submission
  const handleCommentSubmit = useCallback((postId) => {
    const input = commentInput[postId] || '';
    if (!input.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    const newComment = {
      id: Date.now(),
      author: 'Guest User',
      content: input,
      date: new Date().toLocaleDateString(),
    };
    const post = posts.find((p) => p.id === postId);
    post.comments.push(newComment);
    setCommentInput((prev) => ({ ...prev, [postId]: '' }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
    toast.success('Comment added!', { icon: '💬' });
  }, [commentInput, posts]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const postVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, rotate: 2, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  const commentVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
        opacity: { duration: 0.3, delay: 0.1 },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            background: '#ffffff',
            color: '#1e293b',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={postVariants}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Tech Blog
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Stay updated with the latest tech trends, insights, and tutorials from industry experts.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8"
          variants={postVariants}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Search blog posts"
            />
          </div>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
              aria-label="Filter by category"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Tag Cloud */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          variants={postVariants}
        >
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedTag === tag
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Tag className="h-4 w-4 inline mr-1" />
              {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length === 0 ? (
            <motion.p
              className="col-span-full text-center text-gray-500"
              variants={postVariants}
            >
              No posts found. Try adjusting your search or filters.
            </motion.p>
          ) : (
            filteredPosts.slice(0, visiblePosts).map((post) => (
              <motion.div
                key={post.id}
                variants={postVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                ref={(el) => (postRefs.current[post.id] = el)}
                id={`post-${post.id}`}
              >
                {/* Progress Bar */}
                <div className="h-1 bg-gray-200">
                  <motion.div
                    className="h-full bg-indigo-600"
                    style={{ width: `${scrollProgress[post.id] || 0}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                {/* Image */}
                <div className="relative h-48">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/800x400?text=Blog+Post')}
                  />
                  <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm">
                      {post.author.avatar ? (
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        post.author.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.date} • {post.readTime} min read
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.a
                    href={`#post-${post.id}`}
                    className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:text-indigo-800"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Read More <ArrowRight className="h-4 w-4" />
                  </motion.a>
                </div>

                {/* Actions */}
                <div className="flex justify-between p-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex gap-2">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => copyLink(post.id)}
                      className="text-gray-600 hover:text-indigo-600"
                      aria-label="Copy post link"
                    >
                      <Copy className="h-5 w-5" />
                    </motion.button>
                    <div className="relative group">
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="text-gray-600 hover:text-indigo-600"
                        aria-label="Share post"
                      >
                        <Share2 className="h-5 w-5" />
                      </motion.button>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 hidden group-hover:block z-10">
                        <motion.button
                          whileHover={{ backgroundColor: '#f1f5f9' }}
                          onClick={() => sharePost(post, 'twitter')}
                          className="w-full px-4 py-2 text-sm text-gray-700 text-left flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                          </svg>
                          Twitter
                        </motion.button>
                        <motion.button
                          whileHover={{ backgroundColor: '#f1f5f9' }}
                          onClick={() => sharePost(post, 'linkedin')}
                          className="w-full px-4 py-2 text-sm text-gray-700 text-left flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.047-3.052-1.854-3.052-1.859 0-2.145 1.452-2.145 2.953v5.703h-3v-11h2.882v1.504h.041c.401-.757 1.379-1.554 2.834-1.554 3.03 0 3.592 1.993 3.592 4.583v6.467z" />
                          </svg>
                          LinkedIn
                        </motion.button>
                        <motion.button
                          whileHover={{ backgroundColor: '#f1f5f9' }}
                          onClick={() => sharePost(post, 'email')}
                          className="w-full px-4 py-2 text-sm text-gray-700 text-left flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          Email
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setExpandedComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}
                    className="text-gray- MONTHS 600 hover:text-indigo-600"
                    aria-label="Toggle comments"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="ml-1 text-sm">{post.comments.length}</span>
                  </motion.button>
                </div>

                {/* Comments */}
                <AnimatePresence>
                  {expandedComments[post.id] && (
                    <motion.div
                      variants={commentVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="p-4 bg-gray-50"
                    >
                      <div className="mb-4">
                        <textarea
                          value={commentInput[post.id] || ''}
                          onChange={(e) =>
                            setCommentInput((prev) => ({ ...prev, [post.id]: e.target.value }))
                          }
                          placeholder="Add a comment..."
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          rows={3}
                          aria-label="Comment input"
                        />
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={() => handleCommentSubmit(post.id)}
                          className="mt-2 px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
                        >
                          Post Comment
                        </motion.button>
                      </div>
                      {post.comments.length === 0 ? (
                        <p className="text-sm text-gray-500">No comments yet.</p>
                      ) : (
                        <div className="space-y-4">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm">
                                <User className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{comment.author}</p>
                                <p className="text-sm text-gray-600">{comment.content}</p>
                                <p className="text-xs text-gray-500">{comment.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* Load More */}
        {visiblePosts < filteredPosts.length && (
          <motion.div
            className="mt-8 text-center"
            variants={postVariants}
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={loadMore}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Load More
            </motion.button>
          </motion.div>
        )}

        {/* Related Posts */}
        {filteredPosts.length > 0 && (
          <motion.div
            className="mt-12"
            variants={postVariants}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts
                .filter((post) => post.category === selectedCategory || selectedCategory === 'All')
                .slice(0, 3)
                .map((post) => (
                  <motion.div
                    key={post.id}
                    variants={postVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="relative h-40">
                      <motion.img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                      <motion.a
                        href={`#post-${post.id}`}
                        className="text-indigo-600 text-sm flex items-center gap-1 mt-2"
                        whileHover={{ x: 5 }}
                      >
                        Read More <ArrowRight className="h-4 w-4" />
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Blog;