import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Products from './pages/Product';
import Services from './pages/Services';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Subscriptions from './pages/Subscriptions';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <><Header /></>}/>
        <Route path="/home" element={<Header/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/software" element={<Products section="software" />} />
        <Route path="/products/hardware" element={<Products section="hardware" />} />
        <Route path="/products/cloud" element={<Products section="cloud" />} />
        <Route path="/services" element={<Services />} />
        <Route path='subscriptions' element={<Subscriptions/>} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
