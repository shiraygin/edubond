# EduBounds PHP → EduBond 2.0 mapping
The PHP repository is the functional source of truth.

| PHP source | React route/module | State |
| --- | --- | --- |
| HOMEPAGE.php | / | Glass UI; sample courses |
| header.php | Shared navigation | Updated UI |
| signin.php, signup.php, forgot_password.php | /auth, /auth/reset | Supabase Auth integration (requires configuration) |
| account.php | /account | Role-aware read dashboard (requires configuration) |
| rate.php, get_tutor_info.php | /tutors | Tutor directory (requires database data) |
| coursesp.php | /courses | Filterable demo catalog |
| gallary.php | /courses/[id] | Approved lessons read view (requires database data) |
| results.php | /courses search | Demo course search only |
| data1.php / CRUD handlers | planned /admin | Not yet implemented |
| payment.php, payment_processor.php | planned checkout | Not yet implemented; legacy checkout simulates successful payments |
| map.php, faq.php, contact.php | planned pages | Not yet implemented |

## Database
Migration file `supabase/migrations/0001_edubond_core.sql` defines secured replacement entities. Do not run a real-money checkout until server-verified gateway events and transaction/idempotency handling are implemented.

## Set up
1. Create a new Supabase project and run the migration in its SQL editor.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the local environment and deployment settings.
3. Configure Auth email and redirect URLs.
4. Run `npm install`, `npm run typecheck`, `npm run build`.
5. Create student/tutor accounts and verify role-based RLS behavior.

## Limitations
No legacy user passwords or payment data are imported. The original MySQL records require a separate validated migration. Legacy files must be reviewed before any transfer. Payment, admin moderation, editing, upload security and complete student/tutor workflows remain future work.
