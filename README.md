# FOODLY — Artisan Food Ordering & Table Reservation Platform

A modern, responsive, and animated artisan restaurant and food ordering web application built with **React**, **Vite**, and **Framer Motion**.

---

## 🌟 Key Features

- **Responsive Design**: Fluid layout tested across mobile (320px–430px), tablet (768px–1024px), and desktop (1280px–1920px).
- **Light / Dark Mode**: Zero-flash theme initialization, system color-scheme sync, and smooth theme transitions.
- **Interactive WebGL Background**: Shader canvas (`Velaris`) with ambient organic lighting adapted to theme colors.
- **Curated Food Menu**: Real-time live search, category pills, dietary tags (*Vegan*, *Gluten-Free*, *Chef Special*), and price/rating sorting.
- **Detailed Dish Showcase**: High-res food visual stage, nutrition facts, key ingredients, interactive quantity counter, and related recommendations.
- **Cart & Threshold Delivery Meter**: Real-time subtotal/tax computation, free express delivery tier ($40 threshold), and animated item removal.
- **Online Table Reservation**: Step-by-step booking wizard with seating area selection, date/time pickers, party size controls, validation, and confirmation pass.
- **About & Heritage**: Kitchen philosophy, core values, master chefs brigade, and animated stats counters.
- **Contact & Interactive FAQ**: Validated contact form, quick topic pills, styled location map with Google Maps directions, and accessible FAQ accordion.
- **Full Animation & Micro-Interactions**: Unified Framer Motion page transitions, card hover lifts, button presses, and `@media (prefers-reduced-motion: reduce)` support.
- **Graceful Error Handling**: ErrorBoundary runtime crash protection and styled 404 page.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Bundler & Dev Server**: Vite 4
- **Routing**: React Router DOM 7
- **Animations**: Framer Motion 13 + GPU CSS Keyframes
- **Icons**: Lucide React
- **Styling**: CSS Custom Properties (Design Tokens) + PostCSS / Tailwind CSS
- **Code Quality**: ESLint

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `yarn`

### Installation
```bash
npm install
```

### Development
Start the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Production Build
Compile and bundle optimized static assets:
```bash
npm run build
```

### Production Preview
Locally preview the production build before deployment:
```bash
npm run preview
```

### Code Linting
Run ESLint across the codebase:
```bash
npm run lint
```

---

## 📁 Project Structure

```
react-food-project/
├── public/
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── components/
│   │   ├── AboutSection/
│   │   ├── animation/
│   │   ├── AppPromo/
│   │   ├── Cart/
│   │   ├── Categories/
│   │   ├── ErrorBoundary/
│   │   ├── FeaturedDish/
│   │   ├── FoodCard/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── IntroAnimation/
│   │   ├── Navbar/
│   │   ├── Newsletter/
│   │   ├── PopularDishes/
│   │   ├── ReservationModal/
│   │   ├── SearchModal/
│   │   ├── Services/
│   │   ├── SpecialOffers/
│   │   ├── Testimonials/
│   │   ├── Velaris/
│   │   └── WhyChooseUs/
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   └── foodData.js
│   ├── hooks/
│   │   ├── useCountUp.js
│   │   └── useScrollReveal.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Booking.jsx
│   │   ├── Cart.jsx
│   │   ├── Contact.jsx
│   │   ├── FoodDetail.jsx
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   └── NotFound.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── bookingService.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 📄 License
This project is private and created for FOODLY artisan dining.
