# EduBond 2.0

A modern, full-stack rebuild of the original **EduBounds** PHP education platform.

**Status:** Phase 1 — frontend foundation. This repository currently contains a responsive Next.js landing page and an interactive **sample-data** course browser. Authentication, database persistence, enrollments, tutoring workflows, and payments are **not implemented yet**.

## Tech stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS 3
- Lucide icons

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

## Planned modules (not yet implemented)

1. Student/tutor/admin authentication and protected role-based pages
2. Database schema and data-access layer
3. Course and lesson creation, editing, and browsing
4. Tutor profiles, reviews, and discovery
5. Student enrollments and access control
6. Payment gateway verification and transaction-safe financial records
7. Admin management and auditing

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
