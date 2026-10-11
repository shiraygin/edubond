# EduBond 2.0 — Interactive Portfolio Demo

Modern glassmorphism rebuild of [EduBounds](https://github.com/shiraygin/EduBounds), the original PHP education marketplace.

## Demo features
- Choose between Student, Tutor, and Admin personas from the role selector
- Browse and search courses, open course details, discover tutors
- Student: simulate lesson purchases and leave ratings
- Tutor: add lessons, view pending approvals and simulated earnings
- Admin: add/delete courses and approve/unapprove lessons
- All changes are stored in the current browser using localStorage
- Reset Demo restores the original sample data

**This is not a live educational service.** No real authentication, money, customer data, file storage, or server database is involved. Accounts are illustrative personas, not secure user accounts.

## Run locally
Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

Open http://localhost:3000.

## Tech
Next.js 15 · React 19 · TypeScript · Tailwind CSS · Lucide · localStorage

## Original workflow mapping
The architecture follows the original PHP's student, tutor, admin, courses, lessons, purchases and ratings features. Some activities are intentionally simulated. Uploaded lesson files are not stored. Payment is a clearly labeled **demo purchase**.

To return to a production application later, replace `src/components/demo-provider.tsx` with authenticated backend/API calls.

## Deployment
Deploy on Vercel as a Next.js app with no environment variables. Each visitor gets isolated local demo data.
