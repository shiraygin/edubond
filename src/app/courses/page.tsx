import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CourseBrowser } from '@/components/course-browser';
export const metadata:Metadata={title:'Our Courses',description:'Browse courses at EduBonds.'};
export default function CoursesPage(){return <section className="mx-auto max-w-6xl px-5 py-14 text-center"><h1 className="text-3xl font-bold text-black sm:text-4xl">Our Courses</h1><p className="mt-3 text-sm text-slate-700">Sample catalog for the EduBonds frontend preview.</p><Suspense fallback={<p className="mt-8">Loading courses...</p>}><CourseBrowser/></Suspense></section>}
