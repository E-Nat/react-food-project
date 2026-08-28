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
  User,
  Tag,
  Truck,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/api';
import './CartDrawer.css';

const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
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
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    instructions: '',
    paymentMethod: 'card'
  });

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'FOODLY20' || code === 'TASTY20') {
      setDiscountPercent(20);
      setCouponSuccess('20% Discount applied successfully!');
      setCouponError('');
    } else if (code === 'WELCOME10') {
      setDiscountPercent(10);
      setCouponSuccess('10% Welcome discount applied!');
      setCouponError('');
    } else {
      setCouponError('Invalid promo code. Try "FOODLY20"');
      setCouponSuccess('');
    }
  };

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

  const discountAmount = (subtotal * (discountPercent / 100));
  const finalTotal = Math.max(0, total - discountAmount);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return;

    setIsSubmitting(true);
    try {
      const orderPayload = {
        customer: formData,
        items: cartItems,
        subtotal,
        discount: discountAmount,
        deliveryFee: isFreeDelivery ? 0 : deliveryFee,
        tax,
        total: finalTotal,
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

  const deliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="cart-overlay" onClick={handleClose}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title-wrap">
            {checkoutStep === 'checkout' && (
              <button 
                type="button" 
                className="cart-back-btn" 
                onClick={handleBackToCart}
                aria-label="Back to cart"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <ShoppingBag size={20} className="cart-header-icon" />
            <h2 className="cart-header-title">
              {checkoutStep === 'cart' && `Your Bag (${totalCartCount})`}
              {checkoutStep === 'checkout' && 'Delivery Checkout'}
              {checkoutStep === 'success' && 'Order Confirmed!'}
            </h2>
          </div>

          <button
            type="button"
            className="cart-close-btn"
            onClick={handleClose}
            aria-label="Close bag"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Delivery Bar */}
        {checkoutStep !== 'success' && (
          <div className="free-delivery-banner">
            <div className="free-delivery-info">
              {isFreeDelivery ? (
                <span className="free-delivery-success">
                  <CheckCircle2 size={14} />
                  <strong>You unlocked FREE express delivery!</strong>
                </span>
              ) : (
                <span>
                  Add <strong>${(freeDeliveryThreshold - subtotal).toFixed(2)}</strong> more for <strong>FREE Delivery</strong>
                </span>
              )}
            </div>
            <div className="delivery-progress-track">
              <div
                className="delivery-progress-fill"
                style={{ width: `${deliveryProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* CART STEP */}
        {checkoutStep === 'cart' && (
          <>
            {cartItems.length === 0 ? (
              <div className="cart-empty-state">
                <div className="empty-cart-icon-circle">
                  <ShoppingBag size={42} />
                </div>
                <h3>Your bag is empty</h3>
                <p>Add some delicious dishes from our menu to begin your feast.</p>
                <Link to="/menu" className="btn-primary" onClick={handleClose}>
                  <span>Explore Menu</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item-row">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-img"
                      />
                      <div className="cart-item-info">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <span className="cart-item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <div className="cart-item-qty-row">
                          <div className="cart-mini-qty-picker">
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              disabled={item.quantity <= 1}
                              aria-label={`Decrease quantity of ${item.name}`}
                              title={item.quantity <= 1 ? 'Minimum quantity is 1' : 'Decrease quantity'}
                            >
                              <Minus size={13} />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              aria-label={`Increase quantity of ${item.name}`}
                              title="Increase quantity"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          <button
                            type="button"
                            className="cart-item-remove-btn"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Box */}
                <div className="cart-coupon-box">
                  <form onSubmit={handleApplyCoupon} className="coupon-form">
                    <div className="coupon-input-wrap">
                      <Tag size={15} className="coupon-icon" />
                      <input
                        type="text"
                        placeholder="Promo code (try FOODLY20)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="coupon-input"
                      />
                    </div>
                    <button type="submit" className="coupon-apply-btn">
                      Apply
                    </button>
                  </form>
                  {couponSuccess && <span className="coupon-msg success">{couponSuccess}</span>}
                  {couponError && <span className="coupon-msg error">{couponError}</span>}
                </div>

                {/* Footer Totals & Checkout CTA */}
                <div className="cart-drawer-footer">
                  <div className="cart-summary-breakdown">
                    <div className="summary-line">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="summary-line discount-line">
                        <span>Promo Discount ({discountPercent}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="summary-line">
                      <span>Estimated Delivery</span>
                      <span>{isFreeDelivery ? <strong className="text-green">FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
                    </div>
                    <div className="summary-line">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="summary-line total-line">
                      <span>Total Amount</span>
                      <span className="final-total-num">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-primary btn-checkout"
                    onClick={handleStartCheckout}
                  >
                    <span>Proceed to Checkout • ${finalTotal.toFixed(2)}</span>
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* CHECKOUT STEP */}
        {checkoutStep === 'checkout' && (
          <form className="checkout-form-pane" onSubmit={handlePlaceOrder}>
            <div className="checkout-fields-body">
              <div className="checkout-section-heading">
                <MapPin size={16} />
                <span>Delivery Address & Contact</span>
              </div>

              <div className="checkout-input-group">
                <label>Full Name *</label>
                <div className="checkout-input-wrap">
                  <User size={16} />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="checkout-input-group">
                <label>Phone Number *</label>
                <div className="checkout-input-wrap">
                  <Phone size={16} />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="checkout-input-group">
                <label>Street Address & Apt *</label>
                <div className="checkout-input-wrap">
                  <MapPin size={16} />
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="742 Evergreen Terrace, Apt 4B"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="checkout-input-group">
                <label>Drop-off Instructions (Optional)</label>
                <textarea
                  name="instructions"
                  rows={2}
                  placeholder="e.g., Ring doorbell #4, leave by door."
                  value={formData.instructions}
                  onChange={handleInputChange}
                />
              </div>

              <div className="checkout-section-heading mt-3">
                <CreditCard size={16} />
                <span>Payment Method</span>
              </div>

              <div className="payment-method-selector">
                <label className={`payment-pill-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                  />
                  <span>💳 Card (Visa/Master)</span>
                </label>

                <label className={`payment-pill-option ${formData.paymentMethod === 'apple' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="apple"
                    checked={formData.paymentMethod === 'apple'}
                    onChange={handleInputChange}
                  />
                  <span>🍏 Apple / Google Pay</span>
                </label>

                <label className={`payment-pill-option ${formData.paymentMethod === 'cash' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                  />
                  <span>💵 Cash on Delivery</span>
                </label>
              </div>
            </div>

            <div className="cart-drawer-footer">
              <button
                type="submit"
                className="btn-primary btn-checkout"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Placing Order...</span>
                ) : (
                  <>
                    <span>Place Order • ${finalTotal.toFixed(2)}</span>
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* SUCCESS STEP */}
        {checkoutStep === 'success' && (
          <div className="order-success-pane">
            <div className="order-success-icon-wrap">
              <CheckCircle2 size={56} className="text-green" />
            </div>
            <h3>Order Received!</h3>
            <p className="order-success-desc">
              Thank you! Our kitchen has received your order and our chefs have started preparing it fresh.
            </p>

            <div className="order-tracking-card">
              <div className="order-track-header">
                <span>Order Reference:</span>
                <strong>{orderResult?.orderId || '#FD-8942'}</strong>
              </div>
              <div className="order-track-eta">
                <Truck size={18} color="var(--green)" />
                <span>Estimated Delivery: <strong>25–35 mins</strong></span>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary w-full"
              onClick={handleClose}
            >
              <span>Done & Continue Browsing</span>
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;

