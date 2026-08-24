import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Calendar, 
  MessageSquare, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { submitContact } from '../services/api';
import { faqItems } from '../data/foodData';
import { useTheme } from '../context/ThemeContext';
import useScrollReveal from '../hooks/useScrollReveal';
import './Contact.css';

const Contact = () => {
  const { openReservation } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const contactRef = useScrollReveal();
  const faqRef = useScrollReveal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      await submitContact(formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="page-wrapper contact-page">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="contact-hero-section">
          <div className="container">
            <div className="contact-hero-content">
              <span className="section-badge">
                <Sparkles size={14} className="badge-sparkle" />
                GET IN TOUCH
              </span>
              <h1 className="contact-hero-title">
                We'd Love to <span className="serif-accent">Hear From You</span>
              </h1>
              <p className="contact-hero-subtitle">
                Have a question about our menu, catering for an event, or reserving a private dining room? Reach out to our friendly culinary team anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information & Form Grid */}
        <section className="contact-main-section reveal-on-scroll" ref={contactRef}>
          <div className="container contact-main-grid">
            {/* Left Column: Contact Cards */}
            <div className="contact-info-col">
              <h2 className="contact-col-heading">
                Visit or <span className="serif-accent">Contact Us</span>
              </h2>
              <p className="contact-col-sub">
                Drop by our vibrant restaurant in the heart of the culinary district or send us a quick note.
              </p>

              <div className="contact-cards-list">
                {/* Location */}
                <div className="contact-info-card">
                  <div className="contact-card-icon">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="card-info-title">Location</h3>
                    <p className="card-info-text">742 Evergreen Terrace, Foodie District, NY 10012</p>

                    <span className="card-info-sub">Valet parking & metro access available</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-info-card">
                  <div className="contact-card-icon">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 className="card-info-title">Phone & Delivery Hotline</h3>
                    <p className="card-info-text">+1 (800) 456-FOOD / (800) 456-3663</p>
                    <span className="card-info-sub">Toll-free customer care available daily</span>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-info-card">
                  <div className="contact-card-icon">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="card-info-title">Email Inquiries</h3>
                    <p className="card-info-text">hello@foodlyrestaurant.com</p>
                    <span className="card-info-sub">We usually reply within 2 business hours</span>
                  </div>
                </div>

                {/* Hours */}
                <div className="contact-info-card">
                  <div className="contact-card-icon">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 className="card-info-title">Opening Hours</h3>
                    <p className="card-info-text">Monday – Sunday: 10:00 AM – 11:00 PM</p>
                    <span className="card-info-sub">Kitchen closes 30 mins before closing</span>
                  </div>
                </div>
              </div>

              {/* Table Booking Callout */}
              <div className="contact-res-callout">
                <div className="res-callout-icon">
                  <Calendar size={22} />
                </div>
                <div className="res-callout-text">
                  <h4>Planning a special dinner?</h4>
                  <p>Book your favorite table or booth in under 60 seconds.</p>
                </div>
                <button type="button" className="btn-primary" onClick={openReservation}>
                  <span>Book Table</span>
                </button>
              </div>
            </div>

            {/* Right Column: Contact Form & Map Preview */}
            <div className="contact-form-col">
              <div className="contact-form-card">
                <div className="form-card-header">
                  <h3 className="form-card-title">Send Us a Message</h3>
                  <p className="form-card-desc">
                    Fill out the form below and our customer support team will get back to you promptly.
                  </p>
                </div>

                {submitSuccess ? (
                  <div className="contact-form-success">
                    <CheckCircle2 size={40} className="text-green" />
                    <h4>Message Received!</h4>
                    <p>Thank you for reaching out to FOODLY. We've received your note and will be in touch shortly.</p>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row-2">
                      <div className="contact-field">
                        <label htmlFor="cnt-name">Your Name</label>
                        <input
                          id="cnt-name"
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Taylor Swift"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="contact-field">
                        <label htmlFor="cnt-email">Email Address</label>
                        <input
                          id="cnt-email"
                          type="email"
                          name="email"
                          required
                          placeholder="e.g. taylor@example.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="contact-field">
                      <label htmlFor="cnt-subject">Subject</label>
                      <input
                        id="cnt-subject"
                        type="text"
                        name="subject"
                        placeholder="e.g. Catering Request / Food Question"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="contact-field">
                      <label htmlFor="cnt-message">Message</label>
                      <textarea
                        id="cnt-message"
                        name="message"
                        required
                        rows="4"
                        placeholder="How can our culinary team help you today?..."
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary form-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Styled Interactive Map Placeholder Card */}
              <div className="contact-map-card">
                <div className="map-inner-placeholder">
                  <div className="map-pin-pulse">
                    <MapPin size={26} className="map-pin-icon" />
                  </div>
                  <div className="map-location-tag">
                    <strong>FOODLY Gourmet Bistro</strong>
                    <span>742 Evergreen Terrace • Open Now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="contact-faq-section reveal-on-scroll" ref={faqRef}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge green">FREQUENTLY ASKED QUESTIONS</span>
              <h2 className="section-title">Got Questions? We Got Answers</h2>
              <p className="section-subtitle">
                Everything you need to know about our ordering process, dietary considerations, and reservations.
              </p>
            </div>

            <div className="faq-accordion-wrap">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question-text">{item.q}</span>
                      <span className="faq-toggle-icon">
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer-pane">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
