/**
 * FOODLY — Master Booking & Table Reservation Service
 * 
 * Provides validated form state helpers, opening hours time slots,
 * guest capacity ranges, and safe localStorage persistence (foodly-reservations).
 */

export const RESERVATIONS_STORAGE_KEY = 'foodly-reservations';

export const TIME_SLOTS = [
  { value: '11:00 AM', label: '11:00 AM (Early Lunch)' },
  { value: '11:30 AM', label: '11:30 AM (Lunch)' },
  { value: '12:00 PM', label: '12:00 PM (Lunch Rush)' },
  { value: '12:30 PM', label: '12:30 PM (Lunch)' },
  { value: '01:00 PM', label: '01:00 PM (Afternoon Lunch)' },
  { value: '01:30 PM', label: '01:30 PM (Late Lunch)' },
  { value: '02:00 PM', label: '02:00 PM (Late Lunch)' },
  { value: '05:00 PM', label: '05:00 PM (Early Dinner)' },
  { value: '05:30 PM', label: '05:30 PM (Dinner)' },
  { value: '06:00 PM', label: '06:00 PM (Dinner Peak)' },
  { value: '06:30 PM', label: '06:30 PM (Dinner Peak)' },
  { value: '07:00 PM', label: '07:00 PM (Prime Dinner)' },
  { value: '07:30 PM', label: '07:30 PM (Prime Dinner)' },
  { value: '08:00 PM', label: '08:00 PM (Evening Dinner)' },
  { value: '08:30 PM', label: '08:30 PM (Late Dinner)' },
  { value: '09:00 PM', label: '09:00 PM (Late Dinner)' },
  { value: '09:30 PM', label: '09:30 PM (Night Table)' },
  { value: '10:00 PM', label: '10:00 PM (Last Seating)' },
];

export const GUEST_OPTIONS = [
  { value: 1, label: '1 Guest (Solo Dining)' },
  { value: 2, label: '2 Guests (Couple Table)' },
  { value: 3, label: '3 Guests (Small Group)' },
  { value: 4, label: '4 Guests (Family Table)' },
  { value: 5, label: '5 Guests (Family Table)' },
  { value: 6, label: '6 Guests (Group Celebration)' },
  { value: 7, label: '7 Guests (Large Party)' },
  { value: 8, label: '8 Guests (VIP Dining)' },
  { value: 10, label: '10 Guests (Chef\'s Long Table)' },
  { value: 12, label: '12 Guests (Private Room Table)' },
  { value: 15, label: '15 Guests (Banquet Table)' },
  { value: 20, label: '20 Guests (Full Hall Booking)' },
];

export const SEATING_AREAS = [
  { id: 'Main Dining Hall', name: 'Main Dining Hall', desc: 'Sunlit, spacious & lively ambience' },
  { id: 'Garden Terrace', name: 'Garden Terrace', desc: 'Open-air al fresco & romantic scenery' },
  { id: 'Chef\'s Open Counter', name: 'Chef\'s Open Counter', desc: 'Live kitchen view & culinary interaction' },
  { id: 'Private VIP Room', name: 'Private VIP Room', desc: 'Quiet, intimate & luxury seating' },
];

/**
 * Returns dynamic today's date formatted as YYYY-MM-DD in local time
 */
export const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Returns dynamic max date (e.g. 90 days ahead)
 */
export const getMaxDateString = (daysAhead = 90) => {
  const target = new Date();
  target.setDate(target.getDate() + daysAhead);
  const year = target.getFullYear();
  const month = String(target.getMonth() + 1).padStart(2, '0');
  const day = String(target.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Validates reservation fields thoroughly.
 */
export const validateReservationForm = (formData) => {
  const errors = {};

  // Name validation
  if (!formData.name || !formData.name.trim()) {
    errors.name = 'Please enter your full name.';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address (e.g. name@domain.com).';
  }

  // Phone validation
  const cleanPhone = (formData.phone || '').replace(/[\s\-()+]/g, '');
  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = 'Please enter your phone number.';
  } else if (cleanPhone.length < 7 || cleanPhone.length > 16 || !/^\d+$/.test(cleanPhone)) {
    errors.phone = 'Please enter a valid phone number (7–15 digits).';
  }

  // Date validation
  const today = getTodayDateString();
  if (!formData.date) {
    errors.date = 'Please select a reservation date.';
  } else if (formData.date < today) {
    errors.date = 'Reservation date cannot be in the past.';
  }

  // Time validation
  if (!formData.time) {
    errors.time = 'Please select a preferred dining time.';
  }

  // Guests validation
  const guestsNum = parseInt(formData.guests, 10);
  if (isNaN(guestsNum) || guestsNum < 1) {
    errors.guests = 'Please specify at least 1 guest.';
  } else if (guestsNum > 20) {
    errors.guests = 'Maximum online booking capacity is 20 guests.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Retrieve saved reservations from localStorage safely.
 */
export const getSavedReservations = () => {
  try {
    const raw = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Failed to parse reservations from localStorage:', err);
    return [];
  }
};

/**
 * Save a single reservation to localStorage safely.
 */
export const saveReservation = (reservation) => {
  try {
    const existing = getSavedReservations();
    const updated = [reservation, ...existing];
    localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(updated));
    return reservation;
  } catch (err) {
    console.warn('Failed to save reservation to localStorage:', err);
    return reservation;
  }
};

/**
 * Submit table reservation with simulated latency and local persistence.
 */
export const submitReservation = async (formData) => {
  const { isValid, errors } = validateReservationForm(formData);
  if (!isValid) {
    const errorObj = new Error('Form validation failed');
    errorObj.validationErrors = errors;
    throw errorObj;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const reservation = {
        id: `FOODLY-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests, 10),
        seating: formData.seating || 'Main Dining Hall',
        specialRequest: (formData.specialRequest || formData.notes || '').trim(),
        createdAt: new Date().toISOString(),
      };

      saveReservation(reservation);

      resolve({
        success: true,
        reservation,
        message: 'Table reserved successfully! Confirmation sent to your email and SMS.',
      });
    }, 380);
  });
};
