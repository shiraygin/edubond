import type { Metadata } from 'next';
import { CourseBrowser } from '@/components/course-browser';

export const metadata: Metadata = { title: 'Explore Courses', description: 'Browse the EduBond course experience.' };

export default function CoursesPage() {
  return <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
    <span className="rounded-full bg-sky px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue">Explore learning</span>
    <h1 className="mt-6 text-5xl font-black tracking-tight text-navy">Find something worth learning.</h1>
    <p className="mt-4 max-w-2xl leading-8 text-slate-600">Browse the EduBond interface preview. Course data shown here is illustrative; real catalog and enrollment features will be connected in a later phase.</p>
    <CourseBrowser/>
  </section>;
}
