import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Utensils, CheckCircle2, Sparkles } from 'lucide-react';
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
    seating: 'Main Dining Room',
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
            <X size={20} />
          </button>
        </div>

        {confirmedData ? (
          <div className="res-success-body">
            <div className="res-success-icon">
              <CheckCircle2 size={46} strokeWidth={2.2} />
            </div>
            <h3 className="res-success-title">Table Reserved Successfully!</h3>
            <p className="res-success-text">
              We look forward to welcoming you. A confirmation notice has been dispatched.
            </p>

            <div className="res-ticket">
              <div className="res-ticket-row">
                <span>Reservation Ref:</span>
                <strong>{confirmedData.reservationId}</strong>
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
                <span>Seating Area:</span>
                <strong>{formData.seating}</strong>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%' }} onClick={handleClose}>
              <span>Done</span>
            </button>
          </div>
        ) : (
          <form className="res-form-body" onSubmit={handleSubmit}>
            <div className="res-fields-grid">
              <div className="res-form-group">
                <label htmlFor="res-name">Your Full Name</label>
                <input
                  id="res-name"
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Jordan Lee"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="res-form-group">
                <label htmlFor="res-phone">Phone Number</label>
                <input
                  id="res-phone"
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. +1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="res-form-group">
                <label htmlFor="res-email">Email Address</label>
                <input
                  id="res-email"
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. jordan@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="res-form-group">
                <label htmlFor="res-guests">
                  <Users size={14} /> Guests
                </label>
                <select
                  id="res-guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                >
                  <option value="1">1 Person (Solo Dining)</option>
                  <option value="2">2 People (Romantic / Pair)</option>
                  <option value="4">4 People (Standard Table)</option>
                  <option value="6">6 People (Family Table)</option>
                  <option value="8">8 People (Party Table)</option>
                  <option value="12">12+ People (Large Event)</option>
                </select>
              </div>

              <div className="res-form-group">
                <label htmlFor="res-date">
                  <Calendar size={14} /> Date
                </label>
                <input
                  id="res-date"
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="res-form-group">
                <label htmlFor="res-time">
                  <Clock size={14} /> Time
                </label>
                <select
                  id="res-time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                >
                  <option value="11:30">11:30 AM (Lunch)</option>
                  <option value="12:30">12:30 PM (Lunch)</option>
                  <option value="13:30">01:30 PM (Lunch)</option>
                  <option value="17:30">05:30 PM (Early Dinner)</option>
                  <option value="18:30">06:30 PM (Dinner)</option>
                  <option value="19:30">07:30 PM (Prime Dinner)</option>
                  <option value="20:30">08:30 PM (Late Dinner)</option>
                  <option value="21:30">09:30 PM (Night Dining)</option>
                </select>
              </div>

              <div className="res-form-group full-width">
                <label htmlFor="res-seating">Seating Preference</label>
                <select
                  id="res-seating"
                  name="seating"
                  value={formData.seating}
                  onChange={handleChange}
                >
                  <option value="Main Dining Room">Main Dining Room (Warm & Vibrant)</option>
                  <option value="Garden Terrace">Garden Terrace (Fresh Air & Botanical)</option>
                  <option value="Chef Counter">Chef's Open Kitchen Counter</option>
                  <option value="Private Booth">Quiet Private Booth</option>
                </select>
              </div>

              <div className="res-form-group full-width">
                <label htmlFor="res-notes">Special Requests / Allergies</label>
                <textarea
                  id="res-notes"
                  name="notes"
                  rows="2"
                  placeholder="Anniversary, birthday, high chair needed, dietary allergies..."
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="res-modal-footer">
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%' }}
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Securing Table...' : 'Confirm Table Booking'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;
