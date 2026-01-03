# E‑Commerce Web Application

An e‑commerce web app built with Next.js App Router, Redux Toolkit, and Tailwind CSS. It integrates with a remote backend for authentication, products, and cart operations.

## Highlights (What’s new)

- Auth endpoints proxied via Next.js API routes
  - POST `/api/auth/refresh` → backend `https://e-commarce-website-eight.vercel.app/api/v1/auth/refresh`
  - PUT `/api/auth/update-profile/[id]` → backend `.../auth/update-profile/:id`
  - POST `/api/auth/logout` → backend `.../auth/logout`
- 10‑minute token timeout with auto‑logout
  - `expiresAt` stored in Redux and `localStorage`. Auto logout fires when time is up.
- Cart resiliency and normalization
  - Uses `Authorization: Bearer <token>` and `cache: "no-store"`.
  - Automatically attempts a one‑time token refresh on `401` then retries.
  - Normalizes cart item shape so items render consistently.
- Guest cart with seamless sync on login
- Shop page product card layout improved (better name/price/image visibility)
- Navbar cleanup with Login/Sign Up when logged out and Logout when authenticated

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Redux Toolkit
- Tailwind CSS
- Radix UI

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Run the dev server
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000

No additional env is required for the listed features; the app proxies to the provided backend domain.

## Project Structure

```
.
├── app/                      # App Router entry points and API routes (proxies)
│   ├── api/
│   │   ├── auth/
│   │   │   ├── refresh/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── update-profile/[id]/route.ts
│   │   └── cart/
│   │       ├── get-cart/route.ts
│   │       └── add-cart/route.ts
│   ├── contact/
│   ├── shop/
│   └── page.tsx
├── components/               # UI and feature components
│   ├── HomePage/
│   ├── Cart/
│   ├── providers/
│   └── ui/
├── features/                 # Redux Toolkit slices
│   ├── auth/
│   └── cart/
├── lib/
│   └── store.ts              # Redux store
├── public/                   # Static assets
└── ...
```

## Auth Flow

- On successful login (`/api/login`), we keep `AccessToken`, `userId`, and set `expiresAt = now + 10 minutes`.
- On app load, `ReduxInitializer` restores auth state. If expired, it logs out immediately. If not, it schedules auto‑logout.
- On any `401` from cart endpoints, the client calls `/api/auth/refresh` once, stores the new token and a renewed 10‑minute `expiresAt`, and retries the original request.
- The Navbar shows Login/Sign Up when logged out and a Logout button when authenticated. Logout clears Redux/localStorage and calls `/api/auth/logout` (best effort).

## API Usage Examples

Refresh token:
```ts
await fetch('/api/auth/refresh', { method: 'POST', headers: { Authorization: `Bearer ${AccessToken}` } })
```

Update profile:
```ts
await fetch(`/api/auth/update-profile/${userId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${AccessToken}` },
  body: JSON.stringify({ Name: 'Ali', Phone: '01023079853', Email: 'omarelhelalit3@gmail.com' })
})
```

Logout:
```ts
await fetch('/api/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${AccessToken}` } })
```

## Cart Behavior

- Logged‑out users: items are stored in `localStorage` and the cart badge updates accordingly.
- On login: local (guest) items are synced to the server cart.
- Logged‑in users: all cart operations go through `/api/cart/*` with bearer token; a single refresh attempt occurs on `401`.

## Scripts

- `npm run dev` – start development server
- `npm run build` – production build
- `npm run start` – start production server
- `npm run lint` – run ESLint

## Notes

- The backend base URL is currently `https://e-commarce-website-eight.vercel.app`. If you need to point to a different backend, you can adjust the `BASE_URL` constants in the proxy API route files under `app/api/*`.