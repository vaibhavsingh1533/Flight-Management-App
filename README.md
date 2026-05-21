# Flight Management App

A full-stack airline booking platform built with Next.js 14, Supabase, Zustand, and Tailwind CSS.

## Features

### Authentication
- User signup/login with Supabase Auth
- Secure protected routes
- Logout with session cleanup

### Flight Booking
- Search flights by origin, destination, date, and passenger count
- View flight details
- Flight duration display
- Economy / Business / First class options
- Passenger details form
- Booking confirmation with generated PNR

### Interactive Seat Selection
- Live aircraft seat map
- Available / occupied / selected seat states
- Economy / Business / First cabin separation
- Realtime seat updates using Supabase Realtime
- Mobile touch-friendly scrolling
- Occupied seat tooltips with extra fee info

### Booking Management
- My Bookings dashboard
- Status badges (confirmed / rescheduled / cancelled)
- Cancel booking with confirmation dialog
- Same-route flight rescheduling
- Automatic fee handling for higher-priced flights

### State Management
Implemented using Zustand:
- Search query persistence
- In-progress booking persistence
- Optimistic seat selection
- User session token persistence
- Cached bookings
- Secure partial persistence (passport numbers excluded)

### Security
- Supabase Row Level Security
- Seat reservation RPC to prevent race conditions
- Atomic cancellation RPC
- DB trigger preventing cancellation within 2 hours

---

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase
- PostgreSQL
- Supabase Realtime
- Zustand

---

## Database Schema

Tables:
- flights
- seats
- bookings
- passengers
- reschedules

Migrations located in:

```bash
/supabase/migrations

## Local Setup

Clone the repository:

```bash
git clone <your-repo-url>
cd Flight-Management-app
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file manually using `.env.example`.

Add your Supabase environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Open Docker Desktop and ensure it is running.

Start Supabase:

```bash
supabase start
```

Apply migrations and seed data:

```bash
supabase db reset
```

Start development server:

```bash
npm run dev
```