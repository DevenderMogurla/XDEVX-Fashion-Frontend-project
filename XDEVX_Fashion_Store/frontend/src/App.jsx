import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import Kids from './pages/Kids.jsx';
import Login from './pages/Login.jsx';
import Men from './pages/Men.jsx';
import Reg from './pages/Reg.jsx';
import Women from './pages/Women.jsx';
import Createproduct from './pages/Createproduct.jsx';

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  return (
    <>
      <div className="announcement">New season, new essentials — enjoy free shipping over ₹1,999</div>
      <Nav cartCount={cartCount} />
      <main>
        <Routes>
          <Route path="/" element={<Home onAddToCart={() => setCartCount((count) => count + 1)} />} />
          <Route path="/kids" element={<Kids onAddToCart={() => setCartCount((count) => count + 1)} />} />
          <Route path="/men" element={<Men onAddToCart={() => setCartCount((count) => count + 1)} />} />
          <Route path="/women" element={<Women onAddToCart={() => setCartCount((count) => count + 1)} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<Reg />} />
          <Route path="/createproduct" element={<Createproduct />} />
          <Route path="*" element={<div className="empty-state"><h2>Page not found</h2><a className="button button-dark" href="/">Back to home</a></div>} />
        </Routes>
      </main>
      <footer className="site-footer"><span className="footer-brand">XDEVX</span><span>Everyday style, thoughtfully selected.</span><span>© {new Date().getFullYear()} XDEVX Store</span></footer>
    </>
  );
}
