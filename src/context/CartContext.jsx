import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'foodly_cart_items';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart items from localStorage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (foodItem, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === foodItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === foodItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...foodItem, quantity }];
    });

    showToast(`Added "${foodItem.name}" to cart!`);
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find((i) => i.id === id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    if (itemToRemove) {
      showToast(`Removed "${itemToRemove.name}" from cart`);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Financial calculations
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeDeliveryThreshold = 40.0;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : 3.50;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCartCount,
        subtotal,
        deliveryFee,
        tax,
        total,
        freeDeliveryThreshold,
        isFreeDelivery,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
