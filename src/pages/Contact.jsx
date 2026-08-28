import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Calendar, 
  Sparkles,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  RotateCcw,
  Linkedin,
  Github
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { submitContact } from '../services/api';
import { faqItems } from '../data/foodData';
import useScrollReveal from '../hooks/useScrollReveal';
import './Contact.css';

// Email validation helper
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
};

// Form validation function
const validateContactForm = (data) => {
  const errors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'Please enter your name.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!data.email || !data.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address (e.g. name@example.com).';
  }

  if (!data.subject || !data.subject.trim()) {
    errors.subject = 'Please enter or select a subject.';
  }

  if (!data.message || !data.message.trim()) {
    errors.message = 'Please enter your message.';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const SUBJECT_SUGGESTIONS = [
  'General Inquiry',
  'Table Reservation',
  'Private Event & Catering',
  'Dietary & Menu Question',
  'Customer Feedback'
];

const Contact = () => {
  const initialForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const contactRef = useScrollReveal();
  const faqRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    // Live validation if field was touched or submit was attempted
    if (touched[name] || submitAttempted) {
      const { errors: currentErrors } = validateContactForm(updated);
      setErrors(currentErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const { errors: currentErrors } = validateContactForm(formData);
    setErrors(currentErrors);
  };

  const handleSelectSubject = (subj) => {
    const updated = { ...formData, subject: subj };
    setFormData(updated);
    setTouched((prev) => ({ ...prev, subject: true }));
    if (touched.subject || submitAttempted) {
      const { errors: currentErrors } = validateContactForm(updated);
      setErrors(currentErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });

    const { isValid, errors: validationErrors } = validateContactForm(formData);
    setErrors(validationErrors);

    if (!isValid) {
      // Focus first error field for accessibility
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.getElementById(`cnt-${firstErrorKey}`);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContact(formData);
      setSubmittedData({ ...formData });
      setSubmitSuccess(true);
      setFormData(initialForm);
      setTouched({});
      setErrors({});
      setSubmitAttempted(false);
      
      // Smooth scroll to confirmation message
      const formCard = document.getElementById('contact-form-container');
      if (formCard) {
        formCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } catch (err) {
      console.error('Contact submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData(initialForm);
    setTouched({});
    setErrors({});
    setSubmitAttempted(false);
    setSubmitSuccess(false);
    setSubmittedData(null);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="page-wrapper contact-page">
      <Navbar />

      <main className="contact-main-content">
        {/* Breadcrumb Bar */}
        <div className="contact-breadcrumb-bar">
          <div className="container">
            <nav className="breadcrumb-nav" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="breadcrumb-current">Contact Us</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="contact-hero-section" id="contact-hero" aria-labelledby="contact-hero-heading">
          <div className="container">
            <div className="contact-hero-content">
              <span className="contact-badge-pill">
                <Sparkles size={14} className="badge-sparkle" aria-hidden="true" />
                <span>GET IN TOUCH</span>
              </span>
              <h1 id="contact-hero-heading" className="contact-hero-title">
                We'd Love to <span className="serif-accent">Hear From You</span>
              </h1>
              <p className="contact-hero-subtitle">
                Have a question about our artisan menu, catering for a private event, or reserving a chef's table? Reach out to our hospitality team anytime.
              </p>

              {/* Quick Perks Strip */}
              <div className="contact-hero-perks" aria-label="Support highlights">
                <div className="contact-perk-item">
                  <Clock size={15} aria-hidden="true" />
                  <span>Avg Response: <strong>&lt; 2 Hours</strong></span>
                </div>
                <div className="contact-perk-item">
                  <CheckCircle2 size={15} aria-hidden="true" />
                  <span>7 Days A Week Support</span>
                </div>
                <div className="contact-perk-item">
                  <MessageSquare size={15} aria-hidden="true" />
                  <span>Direct Hospitality Desk</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main 2-Column Section */}
        <section className="contact-main-section reveal-on-scroll" ref={contactRef} aria-labelledby="contact-info-heading">
          <div className="container contact-main-grid">
            {/* Left Column: Contact Information & Location */}
            <div className="contact-info-col">
              <h2 id="contact-info-heading" className="contact-col-heading">
                Visit or <span className="serif-accent">Contact Us</span>
              </h2>
              <p className="contact-col-sub">
                Drop by our vibrant bistro in the culinary district, give us a call, or connect with our team directly.
              </p>

              <div className="contact-cards-list">
                {/* Location Card */}
                <div className="contact-info-card glass-panel">
                  <div className="contact-card-icon green" aria-hidden="true">
                    <MapPin size={22} />
                  </div>
                  <div className="contact-card-details">
                    <h3 className="card-info-title">Location & Bistro</h3>
                    <p className="card-info-text">#128 Preah Norodom Blvd, Phnom Penh, Cambodia</p>
                    <span className="card-info-sub">Valet parking & easy metro access available</span>
                  </div>
                </div>

                {/* Phone & Hotline Card */}
                <div className="contact-info-card glass-panel">
                  <div className="contact-card-icon coral" aria-hidden="true">
                    <Phone size={22} />
                  </div>
                  <div className="contact-card-details">
                    <h3 className="card-info-title">Phone & Delivery Hotline</h3>
                    <p className="card-info-text">
                      <a href="tel:+18004563663" className="contact-link-phone">+1 (800) 456-FOOD</a>
                      <span className="contact-phone-sep">•</span>
                      <a href="tel:+85523999888" className="contact-link-phone">+855 23 999 888</a>
                    </p>
                    <span className="card-info-sub">Toll-free customer care available daily</span>
                  </div>
                </div>

                {/* Email Inquiries Card */}
                <div className="contact-info-card glass-panel">
                  <div className="contact-card-icon yellow" aria-hidden="true">
                    <Mail size={22} />
                  </div>
                  <div className="contact-card-details">
                    <h3 className="card-info-title">Email Inquiries</h3>
                    <p className="card-info-text">
                      <a href="mailto:hello@foodly-restaurant.com" className="contact-link-email">
                        hello@foodly-restaurant.com
                      </a>
                    </p>
                    <span className="card-info-sub">We reply promptly within 2 business hours</span>
                  </div>
                </div>

                {/* Opening Hours Card */}
                <div className="contact-info-card glass-panel">
                  <div className="contact-card-icon pink" aria-hidden="true">
                    <Clock size={22} />
                  </div>
                  <div className="contact-card-details">
                    <h3 className="card-info-title">Opening Hours</h3>
                    <p className="card-info-text">Monday – Sunday: 09:00 AM – 10:30 PM</p>
                    <span className="card-info-sub">Kitchen closes 30 minutes before closing</span>
                  </div>
                </div>
              </div>

              {/* Direct Social / Creator Connect */}
              <div className="contact-social-box glass-panel">
                <span className="social-box-title">Direct Messaging & Connect:</span>
                <div className="contact-social-row">
                  <a
                    href="https://t.me/e_nat13"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-pill telegram"
                    aria-label="Direct Telegram message to @e_nat13"
                  >
                    <Send size={15} />
                    <span>Telegram (@e_nat13)</span>
                    <ExternalLink size={12} className="ext-icon" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/sokny-enat-293307377/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-pill linkedin"
                    aria-label="LinkedIn profile of E-Nat"
                  >
                    <Linkedin size={15} />
                    <span>LinkedIn</span>
                    <ExternalLink size={12} className="ext-icon" />
                  </a>

                  <a
                    href="https://github.com/E-Nat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-pill github"
                    aria-label="GitHub profile of E-Nat"
                  >
                    <Github size={15} />
                    <span>GitHub</span>
                    <ExternalLink size={12} className="ext-icon" />
                  </a>
                </div>
              </div>

              {/* Table Booking Callout Card */}
              <div className="contact-res-callout glass-panel">
                <div className="res-callout-icon" aria-hidden="true">
                  <Calendar size={24} />
                </div>
                <div className="res-callout-text">
                  <h4>Planning a special evening?</h4>
                  <p>Book your preferred dining table or booth in under 60 seconds.</p>
                </div>
                <Link to="/booking" className="btn-primary contact-book-btn" aria-label="Book a Table at FOODLY">
                  <span>Book Table</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Contact Form & Location Map Preview */}
            <div className="contact-form-col">
              <div 
                className="contact-form-card glass-panel" 
                id="contact-form-container"
                aria-live="polite"
              >
                <div className="form-card-header">
                  <span className="form-badge">ONLINE INQUIRY</span>
                  <h3 className="form-card-title">Send Us a Message</h3>
                  <p className="form-card-desc">
                    Fill out the form below and our hospitality team will get back to you promptly.
                  </p>
                </div>

                {submitSuccess ? (
                  <div className="contact-form-success" role="status">
                    <div className="success-icon-wrap" aria-hidden="true">
                      <CheckCircle2 size={46} className="success-check-icon" />
                    </div>
                    <h4 className="success-title">Message Received!</h4>
                    <p className="success-desc">
                      Thank you, <strong>{submittedData?.name || 'Guest'}</strong>! We have received your message regarding <em>&ldquo;{submittedData?.subject}&rdquo;</em> and our culinary team will respond to <strong>{submittedData?.email}</strong> shortly.
                    </p>
                    <div className="success-action-row">
                      <button
                        type="button"
                        className="btn-secondary success-reset-btn"
                        onClick={handleResetForm}
                      >
                        <RotateCcw size={16} />
                        <span>Send Another Message</span>
                      </button>
                      <Link to="/menu" className="btn-primary">
                        <span>Explore Menu</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit} noValidate>
                    {/* Name & Email Row */}
                    <div className="form-row-2">
                      <div className={`contact-field ${(touched.name || submitAttempted) && errors.name ? 'has-error' : ''}`}>
                        <label htmlFor="cnt-name">
                          Your Name <span className="req-star" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="cnt-name"
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Alex Morgan"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={Boolean((touched.name || submitAttempted) && errors.name)}
                          aria-describedby={errors.name ? 'cnt-name-error' : undefined}
                        />
                        {(touched.name || submitAttempted) && errors.name && (
                          <div id="cnt-name-error" className="field-error-msg" role="alert">
                            <AlertCircle size={13} aria-hidden="true" />
                            <span>{errors.name}</span>
                          </div>
                        )}
                      </div>

                      <div className={`contact-field ${(touched.email || submitAttempted) && errors.email ? 'has-error' : ''}`}>
                        <label htmlFor="cnt-email">
                          Email Address <span className="req-star" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="cnt-email"
                          type="email"
                          name="email"
                          required
                          placeholder="e.g. alex@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={Boolean((touched.email || submitAttempted) && errors.email)}
                          aria-describedby={errors.email ? 'cnt-email-error' : undefined}
                        />
                        {(touched.email || submitAttempted) && errors.email && (
                          <div id="cnt-email-error" className="field-error-msg" role="alert">
                            <AlertCircle size={13} aria-hidden="true" />
                            <span>{errors.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Subject Field & Suggestion Pills */}
                    <div className={`contact-field ${(touched.subject || submitAttempted) && errors.subject ? 'has-error' : ''}`}>
                      <label htmlFor="cnt-subject">
                        Subject <span className="req-star" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="cnt-subject"
                        type="text"
                        name="subject"
                        required
                        placeholder="e.g. Catering inquiry / Private dining"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean((touched.subject || submitAttempted) && errors.subject)}
                        aria-describedby={errors.subject ? 'cnt-subject-error' : undefined}
                      />
                      
                      {/* Subject Quick Suggestion Pills */}
                      <div className="subject-suggestions-row" aria-label="Suggested subjects">
                        <span className="suggestion-label">Quick topics:</span>
                        {SUBJECT_SUGGESTIONS.map((subj) => (
                          <button
                            key={subj}
                            type="button"
                            className={`subject-pill ${formData.subject === subj ? 'active' : ''}`}
                            onClick={() => handleSelectSubject(subj)}
                          >
                            {subj}
                          </button>
                        ))}
                      </div>

                      {(touched.subject || submitAttempted) && errors.subject && (
                        <div id="cnt-subject-error" className="field-error-msg" role="alert">
                          <AlertCircle size={13} aria-hidden="true" />
                          <span>{errors.subject}</span>
                        </div>
                      )}
                    </div>

                    {/* Message Textarea */}
                    <div className={`contact-field ${(touched.message || submitAttempted) && errors.message ? 'has-error' : ''}`}>
                      <div className="label-with-meta">
                        <label htmlFor="cnt-message">
                          Your Message <span className="req-star" aria-hidden="true">*</span>
                        </label>
                        <span className="char-count-hint">
                          {formData.message.length} characters (min 10)
                        </span>
                      </div>
                      <textarea
                        id="cnt-message"
                        name="message"
                        required
                        rows={5}
                        placeholder="How can our culinary team assist you today? Tell us about your request..."
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean((touched.message || submitAttempted) && errors.message)}
                        aria-describedby={errors.message ? 'cnt-message-error' : undefined}
                      />
                      {(touched.message || submitAttempted) && errors.message && (
                        <div id="cnt-message-error" className="field-error-msg" role="alert">
                          <AlertCircle size={13} aria-hidden="true" />
                          <span>{errors.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn-primary form-submit-btn"
                      disabled={isSubmitting}
                      aria-label={isSubmitting ? 'Sending your message...' : 'Send your message to FOODLY'}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="btn-spinner" aria-hidden="true" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={16} aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Styled Interactive Location & Map Card */}
              <div className="contact-map-card glass-panel">
                <div className="map-inner-placeholder">
                  <div className="map-pin-pulse" aria-hidden="true">
                    <MapPin size={26} className="map-pin-icon" />
                  </div>
                  <div className="map-location-tag">
                    <strong>FOODLY Gourmet Bistro</strong>
                    <span>#128 Preah Norodom Blvd • Open Daily</span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=128+Preah+Norodom+Blvd+Phnom+Penh+Cambodia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-directions-btn"
                    aria-label="Open location directions in Google Maps"
                  >
                    <span>Get Directions</span>
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="contact-faq-section reveal-on-scroll" id="faq" ref={faqRef} aria-labelledby="faq-heading">
          <div className="container">
            <div className="section-header-center">
              <span className="section-badge green">FREQUENTLY ASKED QUESTIONS</span>
              <h2 id="faq-heading" className="section-title">
                Got Questions? <span className="serif-accent">We Got Answers</span>
              </h2>
              <p className="section-subtitle">
                Everything you need to know about our ordering process, dietary considerations, and reservations.
              </p>
            </div>

            <div className="faq-accordion-wrap">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                const questionId = `faq-q-${idx}`;
                const panelId = `faq-panel-${idx}`;

                return (
                  <div key={idx} className={`faq-accordion-item glass-panel ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      id={questionId}
                      className="faq-question-btn"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <span className="faq-question-text">{item.q}</span>
                      <span className="faq-toggle-icon" aria-hidden="true">
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </span>
                    </button>
                    {isOpen && (
                      <div 
                        id={panelId} 
                        className="faq-answer-pane" 
                        role="region" 
                        aria-labelledby={questionId}
                      >
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="contact-bottom-cta reveal-on-scroll" ref={ctaRef} aria-labelledby="contact-cta-heading">
          <div className="container">
            <div className="contact-bottom-cta-box glass-panel">
              <span className="contact-badge-pill">
                <Sparkles size={14} aria-hidden="true" />
                <span>EXPERIENCE FOODLY</span>
              </span>
              <h2 id="contact-cta-heading">Ready to Taste the Difference?</h2>
              <p>Explore our handcrafted menu delivered fresh or reserve a table for an unforgettable dining experience.</p>
              <div className="contact-bottom-cta-buttons">
                <Link to="/menu" className="btn-primary" aria-label="Explore FOODLY Menu">
                  <span>Explore Menu</span>
                </Link>
                <Link to="/booking" className="btn-secondary" aria-label="Book a Table at FOODLY">
                  <span>Book a Table</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
