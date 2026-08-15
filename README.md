# Rustic Charm - Frontend Web Application 🍷🍽️

This directory contains the complete isolated frontend client application for **Rustic Charm**, built with React 19, Vite, Tailwind CSS, Lucide Icons, Framer Motion, and Firebase Web Client SDK.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4 + Autoprefixer
- **UI Components**: Lucide React Icons + Motion (Framer)
- **Routing**: React Router v7
- **Database / Real-time**: Firebase Firestore Web Client SDK

---

## 📁 Directory Structure

```
frontend/
├── public/                 # Static public assets
├── src/
│   ├── admin/              # Admin Dashboard pages, components & services
│   ├── assets/             # Images and design assets
│   ├── components/         # Reusable UI components (FoodCard, CartDrawer, etc.)
│   ├── context/            # Global context providers (LanguageContext)
│   ├── data/               # Static menu & multi-language translation data
│   ├── hooks/              # Custom React hooks (useTranslation)
│   ├── pages/              # Primary pages (CustomerApp, KitchenDashboard)
│   ├── services/           # Frontend Firestore services
│   ├── waiter/             # Waiter POS application pages & components
│   ├── App.tsx             # Root App Component & Route Definitions
│   ├── firebase.ts         # Firebase Web Client configuration & Firestore listeners
│   ├── index.css           # Global Tailwind CSS entry
│   ├── main.tsx            # Application entrypoint
│   └── types.ts            # TypeScript interfaces & domain types
├── index.html              # HTML Document template
├── package.json            # Frontend NPM dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
└── .env                    # Environment variables (VITE_GEMINI_API_KEY, VITE_BACKEND_URL)
```

---

## 🚀 Quick Start Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📱 Routes & Views

- `/` -> Customer Digital Menu & Table Ordering System
- `/kitchen` -> Kitchen Display System (KDS) Live Order Queue
- `/admin/*` -> Management Dashboard (Menu, Tables, Orders, Analytics, AI Translation)
- `/waiter/*` -> Waiter Staff Portal & Table Order Assistance
