import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider, useCart } from './context/CartContext';
import { ShoppingBag } from 'lucide-react';

import Home from './pages/Home';
import Menu from './pages/Menu';
import FoodDetail from './pages/FoodDetail';
import About from './pages/About';
import Contact from './pages/Contact';

import CartDrawer from './components/Cart/CartDrawer';
import SearchModal from './components/SearchModal/SearchModal';
import ReservationModal from './components/ReservationModal/ReservationModal';
import IntroSplash from './components/IntroAnimation/IntroSplash';

// Scroll restoration component
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search]);

  return null;
}

// Toast listener component
function GlobalToast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <ShoppingBag size={18} color="var(--accent)" />
      <span>{toastMessage}</span>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <IntroSplash />
          <CartDrawer />
          <SearchModal />
          <ReservationModal />
          <GlobalToast />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<FoodDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;