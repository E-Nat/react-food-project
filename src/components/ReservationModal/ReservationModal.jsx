import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Utensils, CheckCircle2, Sparkles, MapPin, Sparkle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { createReservation } from '../../services/api';
import './ReservationModal.css';

const ReservationModal = () => {
  const { isReservationOpen, closeReservation } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedData, setConfirmedData] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    seating: 'Main Dining Hall',
    notes: ''
  });

  if (!isReservationOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await createReservation(formData);
      setConfirmedData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    closeReservation();
    setTimeout(() => {
      setConfirmedData(null);
    }, 300);
  };

  return (
    <div className="res-modal-overlay" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="res-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="res-modal-header">
          <div className="res-header-title-wrap">
            <Utensils size={20} className="res-icon-accent" />
            <h2 className="res-header-title">Reserve a Table at FOODLY</h2>
          </div>
          <button className="res-close-btn" onClick={handleClose} aria-label="Close reservation modal">
            <X size={18} />
          </button>
        </div>

        {confirmedData ? (
          <div className="res-success-body">
            <div className="res-success-icon">
              <CheckCircle2 size={52} className="text-green" strokeWidth={2.2} />
            </div>
            <h3 className="res-success-title">Table Reserved Successfully!</h3>
            <p className="res-success-text">
              We look forward to hosting you for an unforgettable dining experience. A confirmation SMS and email have been sent.
            </p>

            <div className="res-ticket">
              <div className="res-ticket-row">
                <span>Reservation Ref:</span>
                <strong>{confirmedData.reservationId || '#RES-4820'}</strong>
              </div>
              <div className="res-ticket-row">
                <span>Party Size:</span>
                <strong>{formData.guests} Guests</strong>
              </div>
              <div className="res-ticket-row">
                <span>Date & Time:</span>
                <strong className="text-accent">{formData.date} at {formData.time}</strong>
              </div>
              <div className="res-ticket-row">
                <span>Seating Preference:</span>
                <strong>{formData.seating}</strong>
              </div>
            </div>

            <button className="btn-primary w-full" onClick={handleClose}>
              <span>Done</span>
            </button>
          </div>
        ) : (
          <form className="res-form-body" onSubmit={handleSubmit}>
            <div className="res-fields-grid">
              <div className="res-form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="res-form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="res-form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="eleanor@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="res-form-group">
                <label>Party Size</label>
                <select name="guests" value={formData.guests} onChange={handleChange}>
                  <option value="1">1 Guest (Solo Dining)</option>
                  <option value="2">2 Guests (Couple Table)</option>
                  <option value="4">4 Guests (Family Table)</option>
                  <option value="6">6 Guests (Group Table)</option>
                  <option value="8+">8+ Guests (VIP Room)</option>
                </select>
              </div>

              <div className="res-form-group">
                <label>Date *</label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="res-form-group">
                <label>Time *</label>
                <select name="time" value={formData.time} onChange={handleChange}>
                  <option value="12:00">12:00 PM (Lunch)</option>
                  <option value="13:00">1:00 PM (Lunch)</option>
                  <option value="18:00">6:00 PM (Dinner)</option>
                  <option value="19:00">7:00 PM (Dinner)</option>
                  <option value="20:00">8:00 PM (Dinner)</option>
                  <option value="21:00">9:00 PM (Dinner)</option>
                </select>
              </div>

              <div className="res-form-group full-width">
                <label>Seating Area Preference</label>
                <select name="seating" value={formData.seating} onChange={handleChange}>
                  <option value="Main Dining Hall">Main Dining Hall (Sunlit & Lively)</option>
                  <option value="Garden Terrace">Garden Terrace (Open Air & Romantic)</option>
                  <option value="Chef's Open Counter">Chef's Open Counter (Interactive)</option>
                  <option value="Private VIP Room">Private VIP Room (Quiet & Intimate)</option>
                </select>
              </div>

              <div className="res-form-group full-width">
                <label>Special Requests / Occasion</label>
                <input
                  type="text"
                  name="notes"
                  placeholder="e.g. Anniversary celebration, birthday, quiet booth"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Securing Your Table...' : 'Confirm Table Reservation'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;
