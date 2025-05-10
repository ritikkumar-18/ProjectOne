// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Header from './components/Header';
// import Products from './pages/Product';
// import Services from './pages/Services';
// import Blog from './pages/Blog';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import NotFound from './pages/NotFound';
// import Subscriptions from './pages/Subscriptions';
// import Footer from './components/Footer';
// import Login from './pages/Login';
// import Profile from './pages/Profile';
// import Cards from './pages/Cards';

// const App = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
//       <Navbar />
//       <Routes>
//         <Route path="/"element={<><Header /> <Cards/></>}/>
//         <Route path="/home" element={<Header/>} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/products/software" element={<Products section="software" />} />
//         <Route path="/products/hardware" element={<Products section="hardware" />} />
//         <Route path="/products/cloud" element={<Products section="cloud" />} />
//         <Route path="/services" element={<Services />} />
//         <Route path='subscriptions' element={<Subscriptions/>} />
//         <Route path="/blog" element={<Blog />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="*" element={<NotFound />} />
//         <Route path="/login" element={<Login />} />
//         <Route path='/profile' element={<Profile/>} />
//       </Routes>
//       {/* <Cards/> */}
//       <Footer/>
//     </div>
//   );
// };

// export default App;
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Cards from "./pages/Cards"
import Products from "./pages/Product"
import Services from "./pages/Services"
import Blog from "./pages/Blog"
import About from "./pages/About"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"
import Subscriptions from "./pages/Subscriptions"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Navbar from "./components/Navbar"
import TechCard from "./pages/TechCard"
import TermsAndConditions from "./pages/TermsandConditions"
import SupportChat from "./pages/SupportChat"
import Faq from "./pages/Faq"
import PrivacyPolicy from "./pages/Privacy"
import OurServices from "./pages/OurServices"




function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/"element={<><Header /><Cards /> <TechCard/><OurServices/></>}/>
        <Route path="/home"element={<><Header /><Cards /> <TechCard/><OurServices/></>}/>
        <Route path="/products" element={<Products/>} />
        <Route path="/products/software" element={<Products section="software" />} />
        <Route path="/products/hardware" element={<Products section="hardware" />} />
        <Route path="/products/cloud" element={<Products section="cloud" />} />
        <Route path="/services" element={<Services />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/terms'element={<TermsAndConditions/>} />
        <Route path='/support' element={<SupportChat/>} />
        <Route path='/faq'element={<Faq/>} />
        <Route path="/login" element={<Login />} />
        <Route path='/privacy'element={<PrivacyPolicy/>}/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
