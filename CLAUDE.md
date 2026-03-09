# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Auctanium is an online auction and bidding platform built with Next.js 16, React 19, and TypeScript. It uses Clerk for authentication, Supabase for database/storage, and Resend for email.

## Commands

```bash
npm run dev      # Start dev server on port 4000 (Turbopack enabled)
npm run build    # Production build
npm start        # Start production server
```

No test or lint commands are configured. TypeScript checking happens during build.

## Architecture

### Tech Stack
- **Framework**: Next.js 16.1 with App Router and Turbopack
- **UI**: Tailwind CSS v4, React Aria (accessibility), Untitled UI components
- **Auth**: Clerk (middleware in `src/proxy.ts`)
- **Database**: Supabase
- **Animations**: Motion library

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard (analytics, users, listings, etc.)
│   ├── api/               # API routes (contact form)
│   ├── auctions/          # Auction pages
│   ├── dashboard/         # User dashboard
│   ├── marketplace/       # Marketplace pages
│   └── ...                # 40+ page routes
├── components/
│   ├── base/              # Primitives (buttons, badges, inputs, etc.)
│   ├── application/       # Complex components (navigation, tables, modals)
│   ├── sections/          # Page sections (hero, features, etc.)
│   └── ...
├── hooks/                 # Custom hooks (use-breakpoint, use-clipboard, etc.)
├── lib/supabase/          # Supabase client configuration
├── providers/             # React context providers (theme, router, clarity)
├── styles/                # Global CSS (globals.css, theme.css, typography.css)
└── utils/                 # Utilities (cx for classnames, etc.)
```

### Authentication Routes
- **Public**: `/`, `/login`, `/signup`, `/blog`, `/about`, `/contact`, `/listing/*`
- **Protected**: `/dashboard`, `/profile`, `/settings`, `/auctions/create`, `/bids`

Route protection is handled by Clerk middleware in `src/proxy.ts`.

### Import Alias
Use `@/` for imports from `src/`:
```typescript
import { Button } from '@/components/base/buttons/button';
```

## Code Style

- **Prettier**: 160 char width, 4 space tabs
- **Import sorting**: React first, then third-party, then `@/` aliases, then relative
- **Tailwind**: Classes sorted automatically; use `cx()` utility for conditional classes

## Key Patterns

### Lazy Loading
Home page sections are lazy-loaded with Suspense boundaries. See `src/app/home-screen.tsx` and `src/components/sections/lazy-sections-client.tsx`.

### Performance Optimizations
- AVIF/WebP image formats with aggressive caching
- Code splitting by route and vendor chunks
- Tree-shaking for @untitledui/icons, @clerk/nextjs, motion
- See `PERFORMANCE_OPTIMIZATION.md` for details

### Environment Variables Required
- `NEXT_PUBLIC_CLERK_*` / `CLERK_SECRET_KEY` - Authentication
- `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_*` - Database
- `RESEND_API_KEY` - Email
