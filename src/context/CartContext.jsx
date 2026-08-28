import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

// Primary storage key & legacy fallback key
export const PRIMARY_CART_STORAGE_KEY = 'foodly-cart';
export const LEGACY_CART_STORAGE_KEY = 'foodly_cart_items';

// Delivery fee configuration constants
export const DELIVERY_FEE = 2.00;
export const FREE_DELIVERY_THRESHOLD = 40.00;

/**
 * Format numeric currency amount consistently avoiding floating-point representation bugs.
 */
export const formatPrice = (amount) => {
  const num = Number(amount) || 0;
  return `$${num.toFixed(2)}`;
};

/**
 * Validate and sanitize individual cart item structure.
 * Ensures id is the source of truth, price and quantity are valid numbers.
 */
const sanitizeCartItem = (item) => {
  if (!item || typeof item !== 'object') return null;

  const rawId = item.foodId !== undefined && item.foodId !== null ? item.foodId : item.id;
  if (rawId === undefined || rawId === null || rawId === '') return null;

  const id = rawId;
  const foodId = rawId;
  const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
  const price = Math.max(0, parseFloat(item.price) || 0);
  const name = typeof item.name === 'string' && item.name.trim().length > 0 
    ? item.name.trim() 
    : 'Chef Special Dish';
  const image = typeof item.image === 'string' ? item.image : '/images/hero-food.png';
  const category = typeof item.category === 'string' ? item.category : 'Specialty';

  return {
    ...item,
    id,
    foodId,
    name,
    image,
    price,
    quantity,
    category,
  };
};

/**
 * Safely parse initial cart data from localStorage with full corrupted data protection.
 */
const loadInitialCart = () => {
  try {
    const raw = localStorage.getItem(PRIMARY_CART_STORAGE_KEY) || 
                localStorage.getItem(LEGACY_CART_STORAGE_KEY);
    
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn('Corrupted cart data found (not an array). Falling back to empty cart.');
      return [];
    }

    const sanitized = parsed
      .map(sanitizeCartItem)
      .filter((item) => item !== null);

    return sanitized;
  } catch (err) {
    console.warn('Failed to parse cart items from localStorage (corrupted JSON). Resetting cart to empty.', err);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem(PRIMARY_CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [cartItems]);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Add food to cart:
   * - Identifies food by food ID.
   * - If already in cart, increases its quantity.
   * - If new, appends to cart list.
   */
  const addToCart = useCallback((foodItem, quantity = 1) => {
    if (!foodItem) return;

    const addedQty = Math.max(1, parseInt(quantity, 10) || 1);
    const targetId = foodItem.foodId !== undefined && foodItem.foodId !== null 
      ? foodItem.foodId 
      : foodItem.id;

    if (targetId === undefined || targetId === null) return;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === targetId || item.foodId === targetId
      );

      if (existingIndex > -1) {
        // Update existing item quantity
        const updated = [...prev];
        const existing = updated[existingIndex];
        updated[existingIndex] = {
          ...existing,
          quantity: existing.quantity + addedQty,
        };
        return updated;
      }

      // Add new item
      const newItem = sanitizeCartItem({
        ...foodItem,
        id: targetId,
        foodId: targetId,
        quantity: addedQty,
      });

      return newItem ? [...prev, newItem] : prev;
    });

    showToast(`Added "${foodItem.name || 'Dish'}" to cart!`);
  }, [showToast]);

  /**
   * Update quantity directly or via delta.
   * Rule: Minimum quantity is 1. Does not allow 0 via quantity controls.
   */
  const updateQuantity = useCallback((id, newQtyOrDelta, isAbsolute = false) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id || item.foodId === id) {
          let calculatedQty;
          if (isAbsolute) {
            calculatedQty = parseInt(newQtyOrDelta, 10);
          } else if (typeof newQtyOrDelta === 'number') {
            calculatedQty = item.quantity + newQtyOrDelta;
          } else {
            calculatedQty = parseInt(newQtyOrDelta, 10);
          }

          // Rule 8: Minimum quantity 1. Keep quantity at 1 instead of decreasing to 0.
          const finalQty = Math.max(1, isNaN(calculatedQty) ? 1 : calculatedQty);
          return { ...item, quantity: finalQty };
        }
        return item;
      })
    );
  }, []);

  const increaseQuantity = useCallback((id) => {
    updateQuantity(id, 1, false);
  }, [updateQuantity]);

  const decreaseQuantity = useCallback((id) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id || item.foodId === id) {
          // Rule 8: Minimum quantity 1. Keep at 1.
          const newQty = Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  }, []);

  /**
   * Remove item completely from cart.
   */
  const removeFromCart = useCallback((id) => {
    let removedItemName = '';
    setCartItems((prev) => {
      const target = prev.find((item) => item.id === id || item.foodId === id);
      if (target) {
        removedItemName = target.name;
      }
      return prev.filter((item) => item.id !== id && item.foodId !== id);
    });

    if (removedItemName) {
      showToast(`Removed "${removedItemName}" from cart`);
    }
  }, [showToast]);

  /**
   * Clear all items from cart.
   */
  const clearCart = useCallback(() => {
    setCartItems([]);
    try {
      localStorage.removeItem(PRIMARY_CART_STORAGE_KEY);
      localStorage.removeItem(LEGACY_CART_STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear cart storage', err);
    }
  }, []);

  // Drawer modal controls
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  // Dynamic Financial Calculations (avoiding floating point precision bugs)
  const totalCartCount = cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);
  const uniqueItemCount = cartItems.length;

  const rawSubtotal = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );
  const subtotal = Number(rawSubtotal.toFixed(2));

  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD && subtotal > 0;
  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : DELIVERY_FEE;
  
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = subtotal === 0 ? 0 : Number((subtotal + deliveryFee).toFixed(2));

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
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalCartCount,
        uniqueItemCount,
        subtotal,
        deliveryFee,
        tax,
        total,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        isFreeDelivery,
        toastMessage,
        showToast,
        formatPrice,
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
