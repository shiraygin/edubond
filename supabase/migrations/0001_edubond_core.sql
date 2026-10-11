-- EduBonds 2.0: normalized replacement for legacy student/tutor/admin, courses, lessons, purchases, session.
-- Apply to a NEW Supabase project. Do not import live personal data without consent and a migration plan.
create extension if not exists pgcrypto;
create type public.user_role as enum ('student','tutor','admin');
create type public.lesson_status as enum ('pending','approved','rejected');
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text not null default '',
 role public.user_role not null default 'student',
 phone text,
 specialization text,
 created_at timestamptz not null default now()
);
create table public.courses (
 id uuid primary key default gen_random_uuid(),
 title text not null,
 description text not null default '',
 image_path text,
 created_by uuid references public.profiles(id) on delete set null,
 created_at timestamptz not null default now()
);
create table public.lessons (
 id uuid primary key default gen_random_uuid(),
 course_id uuid not null references public.courses(id) on delete cascade,
 tutor_id uuid not null references public.profiles(id) on delete cascade,
 title text not null,
 description text not null default '',
 file_path text,
 price_sar numeric(10,2) not null default 0 check(price_sar>=0),
 approval_status public.lesson_status not null default 'pending',
 created_at timestamptz not null default now()
);
create table public.purchases (
 id uuid primary key default gen_random_uuid(),
 student_id uuid not null references public.profiles(id) on delete cascade,
 lesson_id uuid not null references public.lessons(id) on delete restrict,
 amount_sar numeric(10,2) not null check(amount_sar>=0),
 payment_reference text not null unique,
 created_at timestamptz not null default now(),
 unique(student_id,lesson_id)
);
create table public.reviews (
 id uuid primary key default gen_random_uuid(),
 student_id uuid not null references public.profiles(id) on delete cascade,
 lesson_id uuid not null references public.lessons(id) on delete cascade,
 rating integer not null check(rating between 1 and 5),
 comment text not null default '',
 created_at timestamptz not null default now(),
 unique(student_id,lesson_id)
);
create index lessons_course_idx on public.lessons(course_id,approval_status);
create index lessons_tutor_idx on public.lessons(tutor_id);
create index purchases_student_idx on public.purchases(student_id);
create index reviews_lesson_idx on public.reviews(lesson_id);
create function public.my_role() returns public.user_role language sql stable security definer set search_path='' as $$
 select role from public.profiles where id=(select auth.uid())
$$;
revoke all on function public.my_role() from public;
grant execute on function public.my_role() to authenticated;
create function public.handle_new_user() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(id,full_name,role,phone,specialization)
 values(new.id,coalesce(new.raw_user_meta_data->>'full_name',''),
 case when new.raw_user_meta_data->>'role'='tutor' then 'tutor'::public.user_role else 'student'::public.user_role end,
 new.raw_user_meta_data->>'phone',
 case when new.raw_user_meta_data->>'role'='tutor' then new.raw_user_meta_data->>'specialization' else null end);
 return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.purchases enable row level security;
alter table public.reviews enable row level security;
create policy "Browse tutors" on public.profiles for select to anon,authenticated using(role='tutor');
create policy "Read own profile" on public.profiles for select to authenticated using(id=(select auth.uid()));
create policy "Update own non-role fields" on public.profiles for update to authenticated using(id=(select auth.uid())) with check(id=(select auth.uid()));
-- Protect role escalation separately: do not grant clients update access to role.
revoke update on public.profiles from anon,authenticated;
grant update(full_name,phone,specialization) on public.profiles to authenticated;
create policy "Read courses" on public.courses for select to anon,authenticated using(true);
create policy "Create courses" on public.courses for insert to authenticated with check(created_by=(select auth.uid()) and public.my_role() in ('tutor','admin'));
create policy "Manage own courses" on public.courses for update to authenticated using(created_by=(select auth.uid()) or public.my_role()='admin') with check(created_by=(select auth.uid()) or public.my_role()='admin');
create policy "Read approved lessons" on public.lessons for select to anon,authenticated using(approval_status='approved' or tutor_id=(select auth.uid()) or public.my_role()='admin');
create policy "Create tutor lessons" on public.lessons for insert to authenticated with check(tutor_id=(select auth.uid()) and public.my_role()='tutor' and approval_status='pending');
create policy "Update own pending lessons" on public.lessons for update to authenticated using(tutor_id=(select auth.uid()) and approval_status='pending') with check(tutor_id=(select auth.uid()) and approval_status='pending');
-- Approval must only happen via trusted backend/admin function; no direct client approval.
create policy "Admin sees purchases" on public.purchases for select to authenticated using(student_id=(select auth.uid()) or public.my_role()='admin');
create policy "Student reads own reviews" on public.reviews for select to authenticated using(student_id=(select auth.uid()) or public.my_role()='admin');
create policy "Public reads reviews" on public.reviews for select to anon,authenticated using(true);
create policy "Verified buyers leave reviews" on public.reviews for insert to authenticated with check(student_id=(select auth.uid()) and exists(select 1 from public.purchases p where p.lesson_id=reviews.lesson_id and p.student_id=(select auth.uid())));
-- Purchases intentionally have no direct client insert/update permissions.
-- Payment provider verified webhook with idempotent, transactional backend processing is required.
