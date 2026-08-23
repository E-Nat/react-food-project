import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  CreditCard, 
  MapPin, 
  Phone, 
  User 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/api';
import './CartDrawer.css';

const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    tax,
    total,
    freeDeliveryThreshold,
    isFreeDelivery,
    totalCartCount
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    instructions: '',
    paymentMethod: 'card'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartCheckout = () => {
    setCheckoutStep('checkout');
  };

  const handleBackToCart = () => {
    setCheckoutStep('cart');
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return;

    setIsSubmitting(true);
    try {
      const orderPayload = {
        customer: formData,
        items: cartItems,
        subtotal,
        deliveryFee,
        tax,
        total,
        createdAt: new Date().toISOString()
      };

      const result = await createOrder(orderPayload);
      setOrderResult(result);
      setCheckoutStep('success');
      clearCart();
    } catch (err) {
      console.error('Order submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    closeCart();
    // Reset to cart view after closing animation
    setTimeout(() => {
      setCheckoutStep('cart');
      setOrderResult(null);
    }, 300);
  };

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const amountNeeded = (freeDeliveryThreshold - subtotal).toFixed(2);

  return (
    <div className="cart-overlay" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-header">
          <div className="cart-header-title-wrap">
            <ShoppingBag size={20} className="cart-header-icon" />
            <h2 className="cart-header-title">
              {checkoutStep === 'cart' && `Your Cart (${totalCartCount})`}
              {checkoutStep === 'checkout' && 'Fast Checkout'}
              {checkoutStep === 'success' && 'Order Confirmed!'}
            </h2>
          </div>
          <button 
            className="cart-close-btn" 
            onClick={handleClose} 
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= STEP 1: CART ITEMS ================= */}
        {checkoutStep === 'cart' && (
          <>
            {cartItems.length === 0 ? (
              <div className="cart-empty-state">
                <div className="empty-cart-icon-circle">
                  <ShoppingBag size={38} />
                </div>
                <h3 className="empty-cart-title">Your cart is hungry!</h3>
                <p className="empty-cart-desc">
                  Discover delicious chef-crafted meals and add your favorites to get started.
                </p>
                <button
                  className="btn-primary"
                  onClick={handleClose}
                >
                  <Link to="/menu" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>Browse Full Menu</span>
                    <ArrowRight size={16} />
                  </Link>
                </button>
              </div>
            ) : (
              <>
                {/* Free Delivery Bar */}
                <div className="free-delivery-banner">
                  <div className="free-delivery-info">
                    {isFreeDelivery ? (
                      <span className="free-delivery-success">
                        <Sparkles size={15} /> 🎉 You unlocked <strong>FREE Delivery!</strong>
                      </span>
                    ) : (
                      <span>
                        Add <strong>${amountNeeded}</strong> more for <strong>FREE Delivery</strong>
                      </span>
                    )}
                  </div>
                  <div className="delivery-progress-track">
                    <div
                      className="delivery-progress-fill"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item-card">
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      
                      <div className="cart-item-details">
                        <div className="cart-item-header">
                          <h4 className="cart-item-name">{item.name}</h4>
                          <button
                            className="cart-item-remove-btn"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                            title="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="cart-item-unit-price">
                          ${item.price.toFixed(2)} each
                        </div>

                        <div className="cart-item-footer">
                          {/* Quantity Controls */}
                          <div className="cart-qty-control">
                            <button
                              className="qty-btn"
                              onClick={() => updateQuantity(item.id, -1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="qty-value">{item.quantity}</span>
                            <button
                              className="qty-btn"
                              onClick={() => updateQuantity(item.id, 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          <div className="cart-item-total-price">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Summary & CTA */}
                <div className="cart-footer">
                  <div className="cart-summary-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Estimated Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Delivery</span>
                    <span className={isFreeDelivery ? 'delivery-free-tag' : ''}>
                      {isFreeDelivery ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="cart-summary-total">
                    <span>Estimated Total</span>
                    <span className="total-accent">${total.toFixed(2)}</span>
                  </div>

                  <button className="btn-primary cart-checkout-btn" onClick={handleStartCheckout}>
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* ================= STEP 2: CHECKOUT FORM ================= */}
        {checkoutStep === 'checkout' && (
          <form className="cart-checkout-form" onSubmit={handlePlaceOrder}>
            <div className="checkout-fields-container">
              <h3 className="checkout-section-title">Delivery Details</h3>

              <div className="form-group">
                <label htmlFor="chk-name">
                  <User size={15} />
                  <span>Full Name</span>
                </label>
                <input
                  id="chk-name"
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="chk-phone">
                  <Phone size={15} />
                  <span>Phone Number</span>
                </label>
                <input
                  id="chk-phone"
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. +1 (555) 234-5678"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="chk-address">
                  <MapPin size={15} />
                  <span>Delivery Address</span>
                </label>
                <textarea
                  id="chk-address"
                  name="address"
                  required
                  rows="2"
                  placeholder="Street address, apartment, suite, gate code..."
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="chk-inst">
                  <span>Special Kitchen / Delivery Notes (Optional)</span>
                </label>
                <input
                  id="chk-inst"
                  type="text"
                  name="instructions"
                  placeholder="e.g. Extra napkins, ring doorbell"
                  value={formData.instructions}
                  onChange={handleInputChange}
                />
              </div>

              <h3 className="checkout-section-title" style={{ marginTop: '1.25rem' }}>Payment Option</h3>
              <div className="payment-options-grid">
                <label className={`payment-pill ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                  />
                  <CreditCard size={16} />
                  <span>Credit Card</span>
                </label>
                <label className={`payment-pill ${formData.paymentMethod === 'cash' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                  />
                  <ShoppingBag size={16} />
                  <span>Cash On Delivery</span>
                </label>
              </div>
            </div>

            <div className="cart-footer">
              <div className="cart-summary-total" style={{ marginBottom: '0.85rem' }}>
                <span>Total to Pay:</span>
                <span className="total-accent">${total.toFixed(2)}</span>
              </div>

              <div className="checkout-actions-row">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleBackToCart}
                  disabled={isSubmitting}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Placing Order...' : 'Confirm & Place Order'}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ================= STEP 3: SUCCESS CELEBRATION ================= */}
        {checkoutStep === 'success' && orderResult && (
          <div className="cart-success-view">
            <div className="success-badge-circle">
              <CheckCircle2 size={44} strokeWidth={2.2} />
            </div>

            <h3 className="success-order-title">Thank You For Your Order!</h3>
            <p className="success-order-subtitle">
              Our kitchen has received your ticket and is preparing your meal with fresh organic ingredients.
            </p>

            <div className="order-ticket-card">
              <div className="ticket-row">
                <span className="ticket-label">Order ID:</span>
                <strong className="ticket-val">{orderResult.orderId}</strong>
              </div>
              <div className="ticket-row">
                <span className="ticket-label">Estimated Delivery:</span>
                <strong className="ticket-val text-accent">{orderResult.estimatedTime}</strong>
              </div>
              <div className="ticket-row">
                <span className="ticket-label">Status:</span>
                <span className="ticket-status-pill">Live in Kitchen</span>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%' }} onClick={handleClose}>
              <span>Continue Exploring Foodly</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
