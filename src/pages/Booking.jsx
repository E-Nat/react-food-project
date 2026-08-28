import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  Utensils,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  User,
  MessageSquare,
  AlertCircle,
  RotateCcw,
  Star,
  Check
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import {
  TIME_SLOTS,
  GUEST_OPTIONS,
  SEATING_AREAS,
  getTodayDateString,
  getMaxDateString,
  validateReservationForm,
  submitReservation
} from '../services/bookingService';
import './Booking.css';

const Booking = () => {
  const todayStr = getTodayDateString();
  const maxDateStr = getMaxDateString(90);

  const initialForm = {
    name: '',
    email: '',
    phone: '',
    date: todayStr,
    time: '07:00 PM',
    guests: '2',
    seating: 'Main Dining Hall',
    specialRequest: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    // Live validation if field was touched or submit was attempted
    if (touched[name] || submitAttempted) {
      const { errors: currentErrors } = validateReservationForm(updated);
      setErrors(currentErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const { errors: currentErrors } = validateReservationForm(formData);
    setErrors(currentErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    // Mark all required fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      date: true,
      time: true,
      guests: true
    });

    const { isValid, errors: validationErrors } = validateReservationForm(formData);
    setErrors(validationErrors);

    if (!isValid) {
      // Focus first error field for accessibility
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.getElementById(`booking-${firstErrorKey}`);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitReservation(formData);
      setConfirmedReservation(result.reservation);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } catch (err) {
      console.error('Reservation submission error:', err);
      if (err.validationErrors) {
        setErrors(err.validationErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData(initialForm);
    setTouched({});
    setErrors({});
    setSubmitAttempted(false);
    setConfirmedReservation(null);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  return (
    <div className="page-wrapper booking-page-wrapper">
      <Navbar />

      <main className="booking-main-content">
        {/* Breadcrumb Navigation */}
        <div className="booking-breadcrumb-bar">
          <div className="container">
            <nav className="breadcrumb-nav" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <Link to="/menu">Menu</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="breadcrumb-current">Book a Table</span>
            </nav>
          </div>
        </div>

        {/* Hero Header */}
        <section className="booking-hero-section">
          <div className="container">
            <div className="booking-hero-inner">
              <div className="booking-hero-badge">
                <Sparkles size={14} />
                <span>ONLINE RESERVATIONS</span>
              </div>
              <h1 className="booking-hero-title">
                Reserve Your <span className="serif-accent">Culinary Table</span>
              </h1>
              <p className="booking-hero-subtitle">
                Join us for an exquisite dining experience. Handcrafted farm-to-table dishes, curated wine pairings, and unforgettable hospitality.
              </p>
            </div>
          </div>
        </section>

        {/* Main Booking Content Grid */}
        <section className="booking-content-section">
          <div className="container">
            <AnimatePresence mode="wait">
              {confirmedReservation ? (
                /* SUCCESS CONFIRMATION STATE */
                <motion.div
                  key="confirmation-state"
                  className="booking-success-container glass-card"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="success-badge-icon">
                    <CheckCircle2 size={56} className="text-green" strokeWidth={2.2} />
                  </div>

                  <span className="success-pill-tag">
                    <Sparkles size={13} />
                    <span>TABLE RESERVED & SECURED</span>
                  </span>

                  <h2 className="success-heading">
                    Reservation Confirmed 🎉
                  </h2>
                  <p className="success-lead-text">
                    Thank you, <strong>{confirmedReservation.name}</strong>! We have reserved your table. A confirmation notice has been saved and prepared for your arrival.
                  </p>

                  {/* Reservation Ticket Details */}
                  <div className="booking-ticket-card glass-panel">
                    <div className="ticket-header-row">
                      <div className="ticket-ref-group">
                        <span className="ticket-label">Reservation Reference</span>
                        <strong className="ticket-ref-id">{confirmedReservation.id}</strong>
                      </div>
                      <div className="ticket-status-pill">
                        <Check size={14} />
                        <span>Confirmed</span>
                      </div>
                    </div>

                    <div className="ticket-grid">
                      <div className="ticket-grid-item">
                        <Calendar size={18} className="ticket-icon" />
                        <div>
                          <span className="ticket-item-lbl">Date</span>
                          <strong className="ticket-item-val">{confirmedReservation.date}</strong>
                        </div>
                      </div>

                      <div className="ticket-grid-item">
                        <Clock size={18} className="ticket-icon" />
                        <div>
                          <span className="ticket-item-lbl">Time</span>
                          <strong className="ticket-item-val">{confirmedReservation.time}</strong>
                        </div>
                      </div>

                      <div className="ticket-grid-item">
                        <Users size={18} className="ticket-icon" />
                        <div>
                          <span className="ticket-item-lbl">Party Size</span>
                          <strong className="ticket-item-val">{confirmedReservation.guests} Guest{confirmedReservation.guests > 1 ? 's' : ''}</strong>
                        </div>
                      </div>

                      <div className="ticket-grid-item">
                        <Utensils size={18} className="ticket-icon" />
                        <div>
                          <span className="ticket-item-lbl">Seating Area</span>
                          <strong className="ticket-item-val">{confirmedReservation.seating}</strong>
                        </div>
                      </div>

                      <div className="ticket-grid-item">
                        <User size={18} className="ticket-icon" />
                        <div>
                          <span className="ticket-item-lbl">Reserved For</span>
                          <strong className="ticket-item-val">{confirmedReservation.name}</strong>
                        </div>
                      </div>

                      <div className="ticket-grid-item">
                        <Phone size={18} className="ticket-icon" />
                        <div>
                          <span className="ticket-item-lbl">Contact Phone</span>
                          <strong className="ticket-item-val">{confirmedReservation.phone}</strong>
                        </div>
                      </div>
                    </div>

                    {confirmedReservation.specialRequest && (
                      <div className="ticket-special-note">
                        <span className="note-title">Special Request:</span>
                        <p className="note-body">"{confirmedReservation.specialRequest}"</p>
                      </div>
                    )}

                    <div className="ticket-footer-note">
                      <ShieldCheck size={16} className="text-green" />
                      <span>Complimentary cancellation or modifications available up to 2 hours before arrival.</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="success-action-buttons">
                    <Link to="/menu" className="btn-primary success-btn">
                      <span>Explore Menu</span>
                      <ArrowRight size={17} />
                    </Link>

                    <Link to="/" className="btn-secondary success-btn">
                      <ArrowLeft size={17} />
                      <span>Back to Home</span>
                    </Link>

                    <button
                      type="button"
                      className="btn-another-booking"
                      onClick={handleResetForm}
                    >
                      <RotateCcw size={15} />
                      <span>Make Another Reservation</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* RESERVATION FORM GRID */
                <div key="booking-form-grid" className="booking-layout-grid">
                  {/* LEFT COLUMN: Restaurant Experience & Highlights */}
                  <aside className="booking-visual-column">
                    <div className="booking-showcase-card glass-panel">
                      <div className="showcase-header">
                        <span className="showcase-mini-badge">CHEF-CRAFTED HOSPITALITY</span>
                        <h2 className="showcase-title">An Unforgettable Culinary Gathering</h2>
                        <p className="showcase-desc">
                          Whether it's an intimate date, family reunion, or celebration banquet, we curate every detail with seasonal organic ingredients and world-class craft.
                        </p>
                      </div>

                      <div className="showcase-features-list">
                        <div className="feature-row-item">
                          <div className="feature-icon-badge coral">
                            <Utensils size={18} />
                          </div>
                          <div>
                            <strong className="feature-row-title">Fresh Daily Kitchen</strong>
                            <p className="feature-row-desc">Handmade artisanal pastas, woodfired pizzas, and farm-to-table specialties.</p>
                          </div>
                        </div>

                        <div className="feature-row-item">
                          <div className="feature-icon-badge green">
                            <Clock size={18} />
                          </div>
                          <div>
                            <strong className="feature-row-title">Guaranteed Table Hold</strong>
                            <p className="feature-row-desc">Your reserved table is held for 20 minutes past your scheduled booking time.</p>
                          </div>
                        </div>

                        <div className="feature-row-item">
                          <div className="feature-icon-badge yellow">
                            <ShieldCheck size={18} />
                          </div>
                          <div>
                            <strong className="feature-row-title">Instant Confirmation</strong>
                            <p className="feature-row-desc">Real-time confirmation details saved directly for your convenience.</p>
                          </div>
                        </div>
                      </div>

                      {/* Location & Hours Card */}
                      <div className="dining-hours-box">
                        <div className="hours-header">
                          <MapPin size={16} color="var(--primary)" />
                          <strong>FOODLY Flagship Bistro</strong>
                        </div>
                        <p className="hours-address">128 Gourmet Boulevard, Culinary District</p>
                        <div className="hours-schedule">
                          <div className="schedule-line">
                            <span>Mon – Fri:</span>
                            <strong>11:00 AM – 10:00 PM</strong>
                          </div>
                          <div className="schedule-line">
                            <span>Sat – Sun:</span>
                            <strong>10:30 AM – 11:00 PM</strong>
                          </div>
                        </div>
                      </div>

                      {/* Foodie Testimonial Snippet */}
                      <div className="booking-mini-review glass-card">
                        <div className="review-stars">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill="#F5C84B" color="#F5C84B" />
                          ))}
                        </div>
                        <p className="review-quote">
                          "The terrace dining at sunset was breathtaking, and the handmade tagliatelle with truffle was phenomenal!"
                        </p>
                        <span className="review-author">— Sophie & Julian Vance (Verified Foodies)</span>
                      </div>
                    </div>
                  </aside>

                  {/* RIGHT COLUMN: Reservation Form */}
                  <div className="booking-form-column">
                    <form className="booking-form-card glass-panel" onSubmit={handleSubmit} noValidate>
                      <div className="form-card-head">
                        <h2 className="form-title">Reserve a Table</h2>
                        <p className="form-subtitle">Fill in your reservation details below. Instant confirmation.</p>
                      </div>

                      <div className="form-inputs-grid">
                        {/* 1. Full Name */}
                        <div className={`form-field-group ${errors.name && (touched.name || submitAttempted) ? 'has-error' : ''}`}>
                          <label htmlFor="booking-name" className="field-label">
                            Full Name <span className="req-asterisk">*</span>
                          </label>
                          <div className="input-with-icon">
                            <User size={18} className="field-icon" />
                            <input
                              type="text"
                              id="booking-name"
                              name="name"
                              placeholder="e.g. Eleanor Vance"
                              value={formData.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              aria-required="true"
                              aria-invalid={!!(errors.name && (touched.name || submitAttempted))}
                              aria-describedby={errors.name && (touched.name || submitAttempted) ? 'booking-name-error' : undefined}
                              className="form-control-input"
                            />
                          </div>
                          {errors.name && (touched.name || submitAttempted) && (
                            <span id="booking-name-error" className="field-error-msg" role="alert">
                              <AlertCircle size={13} />
                              <span>{errors.name}</span>
                            </span>
                          )}
                        </div>

                        {/* 2. Email Address */}
                        <div className={`form-field-group ${errors.email && (touched.email || submitAttempted) ? 'has-error' : ''}`}>
                          <label htmlFor="booking-email" className="field-label">
                            Email Address <span className="req-asterisk">*</span>
                          </label>
                          <div className="input-with-icon">
                            <Mail size={18} className="field-icon" />
                            <input
                              type="email"
                              id="booking-email"
                              name="email"
                              placeholder="eleanor@example.com"
                              value={formData.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              aria-required="true"
                              aria-invalid={!!(errors.email && (touched.email || submitAttempted))}
                              aria-describedby={errors.email && (touched.email || submitAttempted) ? 'booking-email-error' : undefined}
                              className="form-control-input"
                            />
                          </div>
                          {errors.email && (touched.email || submitAttempted) && (
                            <span id="booking-email-error" className="field-error-msg" role="alert">
                              <AlertCircle size={13} />
                              <span>{errors.email}</span>
                            </span>
                          )}
                        </div>

                        {/* 3. Phone Number */}
                        <div className={`form-field-group ${errors.phone && (touched.phone || submitAttempted) ? 'has-error' : ''}`}>
                          <label htmlFor="booking-phone" className="field-label">
                            Phone Number <span className="req-asterisk">*</span>
                          </label>
                          <div className="input-with-icon">
                            <Phone size={18} className="field-icon" />
                            <input
                              type="tel"
                              id="booking-phone"
                              name="phone"
                              placeholder="+1 (555) 000-0000"
                              value={formData.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              aria-required="true"
                              aria-invalid={!!(errors.phone && (touched.phone || submitAttempted))}
                              aria-describedby={errors.phone && (touched.phone || submitAttempted) ? 'booking-phone-error' : undefined}
                              className="form-control-input"
                            />
                          </div>
                          {errors.phone && (touched.phone || submitAttempted) && (
                            <span id="booking-phone-error" className="field-error-msg" role="alert">
                              <AlertCircle size={13} />
                              <span>{errors.phone}</span>
                            </span>
                          )}
                        </div>

                        {/* 4. Number of Guests */}
                        <div className={`form-field-group ${errors.guests && (touched.guests || submitAttempted) ? 'has-error' : ''}`}>
                          <label htmlFor="booking-guests" className="field-label">
                            Number of Guests <span className="req-asterisk">*</span>
                          </label>
                          <div className="input-with-icon">
                            <Users size={18} className="field-icon" />
                            <select
                              id="booking-guests"
                              name="guests"
                              value={formData.guests}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              aria-required="true"
                              aria-invalid={!!(errors.guests && (touched.guests || submitAttempted))}
                              aria-describedby={errors.guests && (touched.guests || submitAttempted) ? 'booking-guests-error' : undefined}
                              className="form-control-select"
                            >
                              {GUEST_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          {errors.guests && (touched.guests || submitAttempted) && (
                            <span id="booking-guests-error" className="field-error-msg" role="alert">
                              <AlertCircle size={13} />
                              <span>{errors.guests}</span>
                            </span>
                          )}
                        </div>

                        {/* 5. Date Picker */}
                        <div className={`form-field-group ${errors.date && (touched.date || submitAttempted) ? 'has-error' : ''}`}>
                          <label htmlFor="booking-date" className="field-label">
                            Reservation Date <span className="req-asterisk">*</span>
                          </label>
                          <div className="input-with-icon">
                            <Calendar size={18} className="field-icon" />
                            <input
                              type="date"
                              id="booking-date"
                              name="date"
                              min={todayStr}
                              max={maxDateStr}
                              value={formData.date}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              aria-required="true"
                              aria-invalid={!!(errors.date && (touched.date || submitAttempted))}
                              aria-describedby={errors.date && (touched.date || submitAttempted) ? 'booking-date-error' : undefined}
                              className="form-control-input"
                            />
                          </div>
                          {errors.date && (touched.date || submitAttempted) && (
                            <span id="booking-date-error" className="field-error-msg" role="alert">
                              <AlertCircle size={13} />
                              <span>{errors.date}</span>
                            </span>
                          )}
                        </div>

                        {/* 6. Dining Time */}
                        <div className={`form-field-group ${errors.time && (touched.time || submitAttempted) ? 'has-error' : ''}`}>
                          <label htmlFor="booking-time" className="field-label">
                            Dining Time <span className="req-asterisk">*</span>
                          </label>
                          <div className="input-with-icon">
                            <Clock size={18} className="field-icon" />
                            <select
                              id="booking-time"
                              name="time"
                              value={formData.time}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              aria-required="true"
                              aria-invalid={!!(errors.time && (touched.time || submitAttempted))}
                              aria-describedby={errors.time && (touched.time || submitAttempted) ? 'booking-time-error' : undefined}
                              className="form-control-select"
                            >
                              {TIME_SLOTS.map((slot) => (
                                <option key={slot.value} value={slot.value}>
                                  {slot.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          {errors.time && (touched.time || submitAttempted) && (
                            <span id="booking-time-error" className="field-error-msg" role="alert">
                              <AlertCircle size={13} />
                              <span>{errors.time}</span>
                            </span>
                          )}
                        </div>

                        {/* 7. Seating Area Preference */}
                        <div className="form-field-group full-span">
                          <label htmlFor="booking-seating" className="field-label">
                            Seating Area Preference
                          </label>
                          <div className="input-with-icon">
                            <Utensils size={18} className="field-icon" />
                            <select
                              id="booking-seating"
                              name="seating"
                              value={formData.seating}
                              onChange={handleChange}
                              className="form-control-select"
                            >
                              {SEATING_AREAS.map((area) => (
                                <option key={area.id} value={area.name}>
                                  {area.name} — {area.desc}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* 8. Special Requests (Optional) */}
                        <div className="form-field-group full-span">
                          <label htmlFor="booking-special" className="field-label">
                            Special Requests / Occasion <span className="optional-tag">(Optional)</span>
                          </label>
                          <div className="textarea-with-icon">
                            <MessageSquare size={18} className="field-icon textarea-icon" />
                            <textarea
                              id="booking-special"
                              name="specialRequest"
                              rows={3}
                              placeholder="e.g. Window booth, anniversary celebration, birthday dessert sparkler, high chair needed"
                              value={formData.specialRequest}
                              onChange={handleChange}
                              className="form-control-textarea"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Submit CTA */}
                      <div className="form-submit-row">
                        <button
                          type="submit"
                          className="btn-primary w-full booking-submit-cta"
                          disabled={isSubmitting}
                          aria-label="Confirm table reservation"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="btn-spinner" aria-hidden="true" />
                              <span>Securing Your Table...</span>
                            </>
                          ) : (
                            <>
                              <span>Reserve Table</span>
                              <ArrowRight size={18} strokeWidth={2.5} />
                            </>
                          )}
                        </button>
                      </div>

                      <div className="form-footer-guarantee">
                        <ShieldCheck size={15} className="text-green" />
                        <span>Instant online confirmation • No booking fee • Free cancellation</span>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
