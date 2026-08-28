import { foods, foodCategories, featuredChefSpecial } from '../data/foodData';
import { submitReservation } from './bookingService';

/**
 * FOODLY API Service Layer
 * 
 * Designed to connect to an Express REST backend in the future:
 * - GET    /api/foods
 * - GET    /api/foods/:id
 * - GET    /api/categories
 * - POST   /api/orders
 * - POST   /api/contact
 * - POST   /api/reservations
 * 
 * Currently powered by local mock data with asynchronous Promise contracts.
 */

const USE_REAL_BACKEND = false;
const API_BASE_URL = '/api';

/**
 * Fetch all food items with optional filtering
 */
export const getFoods = async (params = {}) => {
  if (USE_REAL_BACKEND) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/foods?${query}`);
    if (!response.ok) throw new Error('Failed to fetch foods');
    return await response.json();
  }

  // Local Mock Simulation with simulated slight latency for realism
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = [...foods];

      if (params.category && params.category !== 'All') {
        result = result.filter(
          (f) =>
            f.category.toLowerCase() === params.category.toLowerCase() ||
            f.filterCategory?.toLowerCase() === params.category.toLowerCase()
        );
      }

      if (params.search) {
        const query = params.search.toLowerCase().trim();
        result = result.filter(
          (f) =>
            f.name.toLowerCase().includes(query) ||
            f.description.toLowerCase().includes(query) ||
            f.category.toLowerCase().includes(query) ||
            f.ingredients?.some((ing) => ing.toLowerCase().includes(query))
        );
      }

      if (params.sort) {
        if (params.sort === 'price-low') {
          result.sort((a, b) => a.price - b.price);
        } else if (params.sort === 'price-high') {
          result.sort((a, b) => b.price - a.price);
        } else if (params.sort === 'rating') {
          result.sort((a, b) => b.rating - a.rating);
        }
      }

      resolve(result);
    }, 60);
  });
};

/**
 * Fetch single food by ID
 */
export const getFoodById = async (id) => {
  if (USE_REAL_BACKEND) {
    const response = await fetch(`${API_BASE_URL}/foods/${id}`);
    if (!response.ok) throw new Error(`Food item ${id} not found`);
    return await response.json();
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const numId = Number(id);
      if (numId === 101) {
        resolve(featuredChefSpecial);
        return;
      }
      const item = foods.find((f) => f.id === numId);
      if (item) {
        resolve(item);
      } else {
        reject(new Error(`Food with id ${id} not found`));
      }
    }, 50);
  });
};

/**
 * Fetch categories
 */
export const getCategories = async () => {
  if (USE_REAL_BACKEND) {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  }

  return Promise.resolve(foodCategories);
};

/**
 * Submit Order
 */
export const createOrder = async (orderData) => {
  if (USE_REAL_BACKEND) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (!response.ok) throw new Error('Failed to submit order');
    return await response.json();
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        orderId: `FDLY-${Math.floor(100000 + Math.random() * 900000)}`,
        estimatedTime: '25-30 mins',
        status: 'Confirmed',
        data: orderData
      });
    }, 400);
  });
};

/**
 * Submit Contact Message
 */
export const submitContact = async (contactData) => {
  if (USE_REAL_BACKEND) {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    if (!response.ok) throw new Error('Failed to submit contact form');
    return await response.json();
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Your message has been sent successfully. Our team will contact you shortly!'
      });
    }, 350);
  });
};

/**
 * Submit Table Reservation
 */
export const createReservation = async (reservationData) => {
  if (USE_REAL_BACKEND) {
    const response = await fetch(`${API_BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservationData)
    });
    if (!response.ok) throw new Error('Failed to book reservation');
    return await response.json();
  }

  return submitReservation(reservationData);
};
