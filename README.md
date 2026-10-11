# EduBond 2.0

A modern, full-stack rebuild of the original **EduBounds** PHP education platform.

**Status:** Phase 2 — frontend + initial auth/database integration. This repository currently contains a responsive Next.js landing page and an interactive **sample-data** course browser. Authentication, tutor discovery and dashboard readers are implemented but **require Supabase configuration and the SQL migration**. Enrollments, uploads, approvals, checkout and financial processing are **not yet implemented**.

## Tech stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS 3
- Lucide icons
- Supabase SSR/Auth + PostgreSQL (requires project configuration)

## Run locally

Prerequisites: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run typecheck
npm run build
```

## Current routes

- `/`: landing page and featured sample courses
- `/courses`: responsive searchable/filterable sample catalog
- `/courses/[id]`: database-backed course details and approved lesson listings
- `/auth`, `/auth/reset`, `/auth/update-password`: Supabase sign-in, student/tutor registration and password recovery
- `/account`: role-aware secured account overview
- `/tutors`: database-backed tutor directory

## Planned modules (not yet implemented)

1. Finish privileged admin dashboard and permissions
2. Populate/migrate vetted legacy database content
3. Course and lesson editing/upload workflows
4. Tutor profiles, reviews, and discovery
5. Student enrollments and access control
6. Payment gateway verification and transaction-safe financial records
7. Admin management and auditing

## Supabase setup

1. Create a new Supabase project.
2. Apply `supabase/migrations/0001_edubond_core.sql` in its SQL editor.
3. Copy `.env.example` to `.env.local` and fill the Supabase URL and publishable/anon key.
4. Configure email confirmations and redirect URLs in Supabase Auth.
5. Run `npm install`, `npm run typecheck`, and `npm run build`.

More details in `docs/LEGACY-MIGRATION.md`.

## Migration notes

Original PHP source: [EduBounds](https://github.com/shiraygin/EduBounds).

The legacy code is a reference for **requirements and workflows**, not a source to copy directly. Security-sensitive legacy patterns (including session handling and simulated payment confirmation) must be replaced rather than ported.

**Security:** Do not publish real credentials, personal user records, or payment information. Never treat browser-provided payment results as proof of payment. Use server-verified webhooks and idempotent processing when payment integration is built.

## Repository layout

```
src/
  app/
    layout.tsx
    page.tsx
    courses/page.tsx
    globals.css
  components/
    site-header.tsx
    course-browser.tsx
    course-card.tsx
  lib/
    catalog.ts
```
