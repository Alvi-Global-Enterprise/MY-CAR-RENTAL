# MY CAR RENTAL

Car rental website (Cap-Haitian, Haiti) — React + Vite + Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run preview` — preview the build

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/fleet` | Fleet + filters |
| `/services` | Services |
| `/about` | About |
| `/contact` | Contact |
| `/vehicle/:id` | Vehicle detail |

## Editable data

- `src/data/business.js` — business info, WhatsApp, locations
- `src/data/vehicles.js` — vehicles and **rates**
- `src/data/faq.js` — FAQ
- `src/data/testimonials.js` — reviews (samples)
- `src/components/Logo.jsx` — logo

Bookings go through WhatsApp (`wa.me/17863900362`) until a backend is integrated.
