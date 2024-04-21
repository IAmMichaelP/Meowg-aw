import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/css/main.css';
import './assets/css/gallery.css';
import './assets/css/shop.css';
import './assets/css/about.css';
import './assets/css/blog.css';
import './assets/css/donate.css';
import './assets/css/profile.css';

import { useEffect, useState } from 'react';

// Favicons
import faviconPng from './assets/img/favicon.png';
import appleTouchIconPng from './assets/img/apple-touch-icon.png';

// Font Awesome
import 'font-awesome/css/font-awesome.min.css';

// Additional Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

// Icons dependencies
import 'boxicons/css/boxicons.min.css';
import 'remixicon/fonts/remixicon.css';
import 'font-awesome/css/font-awesome.min.css';
import WebFont from 'webfontloader';

// pages & components
import Home from './pages/About';
import AddItem from './pages/Add-item';
import Blog from './pages/Blog';
import Donate from './pages/Donate';
import Faqs from './pages/Faqs';
import ShopItem from './pages/Shop-item';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddItem from "./pages/Add-item";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="pages"></div>
      <Routes>
        <Route 
          path="/" 
          element={<Home />}
        />
        <Route 
          path="/shop" 
          element={<Shop />}
        />
        <Route 
          path="/gallery" 
          element={<Gallery />}
        />
        <Route 
          path="/about" 
          element={<About />}
        />
        <Route 
          path="/Add-item" 
          element={<AddItem />}
        />
        <Route 
          path="/blog" 
          element={<Blog />}
        />
        <Route 
          path="/donate" 
          element={<Donate />}
        />
        <Route 
          path="/faqs" 
          element={<Faqs />}
        />
        <Route 
          path="/shop-item" 
          element={<ShopItem />}
        />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
