import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Info,
  RotateCcw
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useCart, FREE_DELIVERY_THRESHOLD, formatPrice } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const {
    cartItems,
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
    isFreeDelivery,
  } = useCart();

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState(false);

  const deliveryProgress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const handleConfirmClear = () => {
    clearCart();
    setIsClearModalOpen(false);
  };

  const handleProceedToCheckout = () => {
    setCheckoutNotice(true);
    setTimeout(() => {
      setCheckoutNotice(false);
    }, 4000);
  };

  return (
    <div className="page-wrapper cart-page-wrapper">
      <Navbar />

      <main className="cart-main-content">
        {/* Breadcrumb Header */}
        <div className="cart-breadcrumb-bar">
          <div className="container">
            <nav className="breadcrumb-nav" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <Link to="/menu">Menu</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="breadcrumb-current">Shopping Cart</span>
            </nav>
          </div>
        </div>

        {/* Page Hero Header */}
        <section className="cart-hero-section">
          <div className="container">
            <div className="cart-hero-inner">
              <div className="cart-hero-left">
                <span className="cart-badge-pill">
                  <Sparkles size={13} />
                  <span>YOUR ORDER</span>
                </span>
                <h1 className="cart-page-title">
                  Shopping <span className="serif-accent">Cart</span>
                </h1>
                <p className="cart-page-subtitle">
                  {cartItems.length > 0
                    ? `You have ${totalCartCount} item${totalCartCount === 1 ? '' : 's'} (${uniqueItemCount} unique ${uniqueItemCount === 1 ? 'dish' : 'dishes'}) in your culinary bag.`
                    : 'Review your selected items and finalize your order.'}
                </p>
              </div>

              {cartItems.length > 0 && (
                <div className="cart-hero-actions">
                  <button
                    type="button"
                    className="cart-clear-all-btn"
                    onClick={() => setIsClearModalOpen(true)}
                    aria-label="Clear all items from cart"
                  >
                    <Trash2 size={16} />
                    <span>Clear Cart</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="cart-content-section">
          <div className="container">
            {cartItems.length === 0 ? (
              /* EMPTY CART STATE */
              <motion.div
                className="cart-empty-container glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="empty-cart-visual">
                  <div className="empty-cart-glow" aria-hidden="true" />
                  <div className="empty-cart-icon-wrap">
                    <ShoppingBag size={52} strokeWidth={1.8} />
                  </div>
                </div>

                <h2 className="empty-cart-title">Your cart is empty</h2>
                <p className="empty-cart-desc">
                  Discover something delicious from our handcrafted chef's menu and start your feast today.
                </p>

                <div className="empty-cart-actions">
                  <Link to="/menu" className="btn-primary empty-explore-btn">
                    <span>Explore Menu</span>
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/" className="empty-home-link">
                    <ArrowLeft size={16} />
                    <span>Back to Home</span>
                  </Link>
                </div>

                <div className="empty-features-grid">
                  <div className="empty-feature-item">
                    <div className="feature-dot green" />
                    <span>Farm-to-table organic ingredients</span>
                  </div>
                  <div className="empty-feature-item">
                    <div className="feature-dot yellow" />
                    <span>Free express delivery over $40</span>
                  </div>
                  <div className="empty-feature-item">
                    <div className="feature-dot coral" />
                    <span>Chef-crafted fresh to order</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* TWO-COLUMN CART GRID */
              <div className="cart-layout-grid">
                {/* LEFT COLUMN: Cart Items */}
                <div className="cart-items-column">
                  {/* Free Delivery Bar */}
                  <div className="cart-delivery-tier-card glass-panel">
                    <div className="tier-header-row">
                      <div className="tier-title-wrap">
                        <Truck size={18} className="tier-truck-icon" />
                        {isFreeDelivery ? (
                          <span className="tier-status success">
                            <CheckCircle2 size={16} />
                            <strong>You've unlocked FREE Express Delivery!</strong>
                          </span>
                        ) : (
                          <span className="tier-status">
                            Add <strong>{formatPrice(remainingForFreeDelivery)}</strong> more to get <strong>FREE Delivery</strong>
                          </span>
                        )}
                      </div>
                      <span className="tier-percent">{Math.round(deliveryProgress)}%</span>
                    </div>

                    <div className="tier-progress-track" role="progressbar" aria-valuenow={Math.round(deliveryProgress)} aria-valuemin={0} aria-valuemax={100}>
                      <div
                        className="tier-progress-fill"
                        style={{ width: `${deliveryProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Cart Items List */}
                  <div className="cart-items-list-wrapper">
                    <div className="cart-table-header desktop-only">
                      <span className="col-product">Dish Details</span>
                      <span className="col-price">Unit Price</span>
                      <span className="col-qty">Quantity</span>
                      <span className="col-subtotal">Subtotal</span>
                      <span className="col-action">Remove</span>
                    </div>

                    <div className="cart-items-group" role="list" aria-label="Cart Items">
                      <AnimatePresence initial={false}>
                        {cartItems.map((item) => {
                          const itemSubtotal = Number((item.price * item.quantity).toFixed(2));

                          return (
                            <motion.article
                              key={item.id}
                              role="listitem"
                              className="cart-item-card glass-panel"
                              layout
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } }}
                              transition={{ duration: 0.25 }}
                            >
                              {/* Product Image & Info */}
                              <div className="cart-item-main">
                                <Link
                                  to={`/menu/${item.id}`}
                                  className="cart-item-image-link"
                                  aria-label={`View details for ${item.name}`}
                                >
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="cart-item-thumbnail"
                                    loading="lazy"
                                  />
                                </Link>

                                <div className="cart-item-details">
                                  <span className="cart-item-category">{item.category || 'Specialty'}</span>
                                  <Link to={`/menu/${item.id}`} className="cart-item-title-link">
                                    <h2 className="cart-item-title">{item.name}</h2>
                                  </Link>
                                  <div className="cart-item-unit-price">
                                    <span className="price-lbl">Unit price:</span>
                                    <strong className="price-val">{formatPrice(item.price)}</strong>
                                  </div>
                                </div>
                              </div>

                              {/* Unit Price (Desktop Column) */}
                              <div className="cart-item-col-price desktop-only">
                                <span>{formatPrice(item.price)}</span>
                              </div>

                              {/* Quantity Controls */}
                              <div className="cart-item-qty-cell">
                                <div className="cart-qty-stepper" role="group" aria-label={`Quantity for ${item.name}`}>
                                  <button
                                    type="button"
                                    className="qty-btn qty-btn-minus"
                                    onClick={() => decreaseQuantity(item.id)}
                                    disabled={item.quantity <= 1}
                                    aria-label={`Decrease quantity of ${item.name}`}
                                    title={item.quantity <= 1 ? 'Minimum quantity is 1' : 'Decrease quantity'}
                                  >
                                    <Minus size={15} />
                                  </button>

                                  <span className="qty-value-display" aria-live="polite">
                                    {item.quantity}
                                  </span>

                                  <button
                                    type="button"
                                    className="qty-btn qty-btn-plus"
                                    onClick={() => increaseQuantity(item.id)}
                                    aria-label={`Increase quantity of ${item.name}`}
                                    title="Increase quantity"
                                  >
                                    <Plus size={15} />
                                  </button>
                                </div>
                              </div>

                              {/* Subtotal */}
                              <div className="cart-item-subtotal-cell">
                                <span className="mobile-subtotal-lbl">Subtotal:</span>
                                <span className="cart-item-total-amount">
                                  {formatPrice(itemSubtotal)}
                                </span>
                              </div>

                              {/* Remove Button */}
                              <div className="cart-item-remove-cell">
                                <button
                                  type="button"
                                  className="cart-remove-item-btn"
                                  onClick={() => removeFromCart(item.id)}
                                  aria-label={`Remove ${item.name} from cart`}
                                  title={`Remove ${item.name}`}
                                >
                                  <Trash2 size={16} />
                                  <span className="remove-text-lbl">Remove</span>
                                </button>
                              </div>
                            </motion.article>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Cart Footer Actions */}
                  <div className="cart-bottom-actions">
                    <Link to="/menu" className="cart-continue-shopping-btn">
                      <ArrowLeft size={16} />
                      <span>Continue Shopping</span>
                    </Link>

                    <button
                      type="button"
                      className="cart-clear-secondary-btn"
                      onClick={() => setIsClearModalOpen(true)}
                      aria-label="Clear all items from cart"
                    >
                      <RotateCcw size={15} />
                      <span>Clear All Items</span>
                    </button>
                  </div>
                </div>

                {/* RIGHT COLUMN: Order Summary Card */}
                <aside className="cart-summary-column" aria-label="Order Summary">
                  <div className="cart-summary-card glass-panel sticky-summary">
                    <h2 className="summary-card-title">Order Summary</h2>

                    <div className="summary-rows-group">
                      <div className="summary-data-row">
                        <span className="row-label">
                          Subtotal ({totalCartCount} item{totalCartCount === 1 ? '' : 's'})
                        </span>
                        <span className="row-value">{formatPrice(subtotal)}</span>
                      </div>

                      <div className="summary-data-row">
                        <span className="row-label">
                          Estimated Delivery
                          {isFreeDelivery && <span className="free-tag">FREE</span>}
                        </span>
                        <span className={`row-value ${isFreeDelivery ? 'text-green font-bold' : ''}`}>
                          {isFreeDelivery ? 'FREE' : formatPrice(deliveryFee)}
                        </span>
                      </div>

                      <div className="summary-data-row">
                        <span className="row-label">Estimated Tax (8%)</span>
                        <span className="row-value">{formatPrice(tax)}</span>
                      </div>

                      <div className="summary-divider" />

                      <div className="summary-data-row total-row">
                        <div>
                          <span className="total-label">Total Amount</span>
                          <span className="total-subtext">Tax & delivery included</span>
                        </div>
                        <span className="total-amount-display">{formatPrice(total)}</span>
                      </div>
                    </div>

                    {/* Checkout Notice if triggered */}
                    {checkoutNotice && (
                      <motion.div
                        className="checkout-notice-alert"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Info size={16} />
                        <span>Order processed! Your culinary items are confirmed and saved. Thank you for choosing FOODLY!</span>
                      </motion.div>
                    )}

                    {/* Proceed to Checkout CTA */}
                    <button
                      type="button"
                      className="btn-primary w-full cart-checkout-cta"
                      onClick={handleProceedToCheckout}
                      aria-label={`Proceed to Checkout with total ${formatPrice(total)}`}
                    >
                      <span>Proceed to Checkout</span>
                      <span className="cta-price-pill">{formatPrice(total)}</span>
                      <ArrowRight size={18} strokeWidth={2.5} />
                    </button>

                    {/* Trust Guarantees */}
                    <div className="summary-trust-badges">
                      <div className="trust-item">
                        <Truck size={15} className="trust-icon" />
                        <span>Express kitchen delivery in 25–35 mins</span>
                      </div>
                      <div className="trust-item">
                        <ShieldCheck size={15} className="trust-icon" />
                        <span>100% Freshness & Satisfaction Guarantee</span>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Confirmation Modal for Clear Cart */}
      {isClearModalOpen && (
        <div
          className="cart-modal-overlay"
          onClick={() => setIsClearModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-modal-title"
        >
          <motion.div
            className="cart-confirm-modal glass-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2 }}
          >
            <div className="modal-icon-wrap warning">
              <AlertCircle size={28} />
            </div>

            <h3 id="clear-modal-title" className="modal-title">
              Clear all items from your cart?
            </h3>
            <p className="modal-description">
              Are you sure you want to remove all {totalCartCount} item{totalCartCount === 1 ? '' : 's'} from your basket? This action cannot be undone.
            </p>

            <div className="modal-actions-row">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setIsClearModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-modal-confirm-delete"
                onClick={handleConfirmClear}
                aria-label="Confirm clear cart"
              >
                <Trash2 size={15} />
                <span>Yes, Clear Cart</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;
