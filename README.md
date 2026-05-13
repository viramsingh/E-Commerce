# MarketStack E-Commerce App

MarketStack is a responsive React e-commerce application built with Vite. It includes product CRUD, cart management, coupons, JWT-style local authentication, protected routes, checkout summary, Tailwind CSS styling, and toast notifications.

## Tech Stack

- React 19 with hooks
- Vite
- React Router
- Redux Toolkit and React Redux
- Axios
- React Hook Form
- Tailwind CSS
- React Toastify
- Lucide React icons

## Public Sample API

This project uses the free public DummyJSON API:

- Product listing: `https://dummyjson.com/products?limit=60`
- Product detail: `https://dummyjson.com/products/:id`
- Create product: `https://dummyjson.com/products/add`
- Update product: `https://dummyjson.com/products/:id`
- Delete product: `https://dummyjson.com/products/:id`

DummyJSON demo write endpoints return simulated results and do not permanently change the remote database.

## Features

- Product listing with search and category filtering
- Product detail page using dynamic route `/product/:id`
- Product management page with create, update, and delete flows
- Cart add, remove, increment, and decrement quantity logic
- Prevents invalid cart quantities
- Live subtotal, discount, GST/VAT, and final total calculation
- Coupon validation for format, expiry, minimum cart value, and eligible categories
- Login and signup forms with validation
- JWT-style token generation with expiry stored in `localStorage`
- Auto logout when the stored token expires
- Protected checkout and product management routes
- Checkout page with itemized summary and delivery form
- Responsive layout for mobile, tablet, and desktop
- Toast notifications for cart, coupon, auth, CRUD, and checkout actions

## Coupons

Available demo coupon codes:

| Code | Rule |
| --- | --- |
| `SAVE10` | 10% off orders above `$100` |
| `ELECTRO50` | `$50` off eligible electronics above `$400` |
| `BEAUTY15` | 15% off eligible beauty products above `$30` |

## Routes

| Route | Purpose | Protected |
| --- | --- | --- |
| `/` | Product listing | No |
| `/product/:id` | Product detail | No |
| `/cart` | Shopping cart | No |
| `/login` | Login | No |
| `/signup` | Signup | No |
| `/checkout` | Checkout summary and order form | Yes |
| `/admin/products` | Product CRUD management | Yes |

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```

## Available Scripts

```bash
npm run dev
```

Runs the Vite development server.

```bash
npm run build
```

Builds the app for production.

```bash
npm run lint
```

Runs ESLint checks.

```bash
npm run preview
```

Serves the production build locally.

## Project Structure

```text
src/
├── components/   # Reusable UI components
├── hooks/        # Custom hooks for auth and cart logic
├── pages/        # Route-level pages
├── redux/        # Redux Toolkit slices and store
├── routes/       # Router and protected route wrapper
├── services/     # Axios API client and product API functions
├── utils/        # Pricing, auth token, and localStorage helpers
├── App.jsx
├── main.jsx
└── index.css
```

## Authentication Notes

Authentication is implemented as a frontend demo flow. Signup stores users in `localStorage`, login validates against those local users, and a JWT-style token is generated with an expiry timestamp. The Axios interceptor attaches the token to API requests and clears expired tokens.

For production, replace this local auth layer with a secure backend authentication service.
