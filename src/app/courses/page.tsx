import type {Metadata} from 'next';
import {Suspense} from 'react';
import {CourseBrowser} from '@/components/course-browser';
export const metadata:Metadata={title:'Our Courses',description:'Browse courses at EduBonds.'};
export default function CoursesPage(){return <section className="mx-auto max-w-7xl px-5 pb-20 pt-16 text-center sm:px-6"><span className="glass rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#267a9a]">Discover more</span><h1 className="mt-7 text-4xl font-extrabold text-[#123d60] sm:text-5xl">Our Courses</h1><p className="mt-4 text-[#4a687c]">Find something new to learn. Explore our modernized course catalog.</p><p className="mt-2 text-xs text-[#4a687c]">Frontend preview · illustrative course data</p><Suspense fallback={<p className="mt-8">Loading courses...</p>}><CourseBrowser/></Suspense></section>}
