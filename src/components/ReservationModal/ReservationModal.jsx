import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Utensils, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import {
  TIME_SLOTS,
  GUEST_OPTIONS,
  SEATING_AREAS,
  getTodayDateString,
  getMaxDateString,
  validateReservationForm,
  submitReservation
} from '../../services/bookingService';
import './ReservationModal.css';

const ReservationModal = () => {
  const { isReservationOpen, closeReservation } = useTheme();
  const todayStr = getTodayDateString();
  const maxDateStr = getMaxDateString(90);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedData, setConfirmedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    date: todayStr,
    time: '07:00 PM',
    seating: 'Main Dining Hall',
    specialRequest: ''
  });

  if (!isReservationOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

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

    if (!isValid) return;

    setIsSubmitting(true);
    try {
      const res = await submitReservation(formData);
      setConfirmedData(res.reservation);
    } catch (err) {
      console.error('Reservation error:', err);
      if (err.validationErrors) {
        setErrors(err.validationErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    closeReservation();
    setTimeout(() => {
      setConfirmedData(null);
      setErrors({});
      setTouched({});
      setSubmitAttempted(false);
    }, 300);
  };

  return (
    <div className="res-modal-overlay" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="res-modal-title">
      <div className="res-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="res-modal-header">
          <div className="res-header-title-wrap">
            <Utensils size={20} className="res-icon-accent" />
            <h2 id="res-modal-title" className="res-header-title">Reserve a Table at FOODLY</h2>
          </div>
          <button type="button" className="res-close-btn" onClick={handleClose} aria-label="Close reservation modal">
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
              We look forward to hosting you, <strong>{confirmedData.name}</strong>. Your reservation details have been confirmed.
            </p>

            <div className="res-ticket">
              <div className="res-ticket-row">
                <span>Reservation Ref:</span>
                <strong>{confirmedData.id}</strong>
              </div>
              <div className="res-ticket-row">
                <span>Party Size:</span>
                <strong>{confirmedData.guests} Guest{confirmedData.guests > 1 ? 's' : ''}</strong>
              </div>
              <div className="res-ticket-row">
                <span>Date & Time:</span>
                <strong className="text-accent">{confirmedData.date} at {confirmedData.time}</strong>
              </div>
              <div className="res-ticket-row">
                <span>Seating Area:</span>
                <strong>{confirmedData.seating}</strong>
              </div>
              {confirmedData.specialRequest && (
                <div className="res-ticket-row">
                  <span>Special Request:</span>
                  <em>"{confirmedData.specialRequest}"</em>
                </div>
              )}
            </div>

            <div className="res-success-actions">
              <button type="button" className="btn-primary w-full" onClick={handleClose}>
                <span>Done</span>
              </button>
              <Link to="/booking" className="res-fullpage-link" onClick={handleClose}>
                <span>Open Dedicated Booking Page</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <form className="res-form-body" onSubmit={handleSubmit} noValidate>
            <div className="res-fields-grid">
              <div className={`res-form-group ${errors.name && (touched.name || submitAttempted) ? 'has-error' : ''}`}>
                <label htmlFor="modal-name">Your Name <span className="req-asterisk">*</span></label>
                <input
                  id="modal-name"
                  type="text"
                  name="name"
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                />
                {errors.name && (touched.name || submitAttempted) && (
                  <span className="modal-error-msg" role="alert"><AlertCircle size={12} /> {errors.name}</span>
                )}
              </div>

              <div className={`res-form-group ${errors.phone && (touched.phone || submitAttempted) ? 'has-error' : ''}`}>
                <label htmlFor="modal-phone">Phone Number <span className="req-asterisk">*</span></label>
                <input
                  id="modal-phone"
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                />
                {errors.phone && (touched.phone || submitAttempted) && (
                  <span className="modal-error-msg" role="alert"><AlertCircle size={12} /> {errors.phone}</span>
                )}
              </div>

              <div className={`res-form-group ${errors.email && (touched.email || submitAttempted) ? 'has-error' : ''}`}>
                <label htmlFor="modal-email">Email Address <span className="req-asterisk">*</span></label>
                <input
                  id="modal-email"
                  type="email"
                  name="email"
                  placeholder="eleanor@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                />
                {errors.email && (touched.email || submitAttempted) && (
                  <span className="modal-error-msg" role="alert"><AlertCircle size={12} /> {errors.email}</span>
                )}
              </div>

              <div className="res-form-group">
                <label htmlFor="modal-guests">Party Size <span className="req-asterisk">*</span></label>
                <select id="modal-guests" name="guests" value={formData.guests} onChange={handleChange}>
                  {GUEST_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className={`res-form-group ${errors.date && (touched.date || submitAttempted) ? 'has-error' : ''}`}>
                <label htmlFor="modal-date">Date <span className="req-asterisk">*</span></label>
                <input
                  id="modal-date"
                  type="date"
                  name="date"
                  min={todayStr}
                  max={maxDateStr}
                  value={formData.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                />
                {errors.date && (touched.date || submitAttempted) && (
                  <span className="modal-error-msg" role="alert"><AlertCircle size={12} /> {errors.date}</span>
                )}
              </div>

              <div className="res-form-group">
                <label htmlFor="modal-time">Time <span className="req-asterisk">*</span></label>
                <select id="modal-time" name="time" value={formData.time} onChange={handleChange}>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot.value} value={slot.value}>{slot.label}</option>
                  ))}
                </select>
              </div>

              <div className="res-form-group full-width">
                <label htmlFor="modal-seating">Seating Area Preference</label>
                <select id="modal-seating" name="seating" value={formData.seating} onChange={handleChange}>
                  {SEATING_AREAS.map((area) => (
                    <option key={area.id} value={area.name}>{area.name} — {area.desc}</option>
                  ))}
                </select>
              </div>

              <div className="res-form-group full-width">
                <label htmlFor="modal-special">Special Requests / Occasion (Optional)</label>
                <input
                  id="modal-special"
                  type="text"
                  name="specialRequest"
                  placeholder="e.g. Anniversary celebration, quiet corner booth, high chair"
                  value={formData.specialRequest}
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
