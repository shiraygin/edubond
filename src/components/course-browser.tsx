'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { categories, courses } from '@/lib/catalog';
import { CourseCard } from '@/components/course-card';

export function CourseBrowser() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const matches = useMemo(() => courses.filter(course => {
    const matchesCategory = category === 'All' || course.category === category;
    const term = query.trim().toLowerCase();
    return matchesCategory && (!term || `${course.title} ${course.description} ${course.category}`.toLowerCase().includes(term));
  }), [query, category]);

  return <>
    <div className="mt-10 flex flex-col gap-5">
      <label className="relative block max-w-xl">
        <span className="sr-only">Search sample courses</span>
        <Search aria-hidden="true" size={19} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"/>
        <input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search courses or topics..." className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-5 text-sm shadow-sm placeholder:text-slate-400 focus:border-blue focus:outline-none"/>
      </label>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">{categories.map(item=><button key={item} type="button" onClick={()=>setCategory(item)} aria-pressed={category===item} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${category===item?'bg-navy text-white':'border border-slate-200 bg-white text-slate-600 hover:border-blue hover:text-blue'}`}>{item}</button>)}</div>
    </div>
    <p aria-live="polite" className="mt-9 text-sm font-semibold text-slate-600">{matches.length} sample {matches.length===1?'course':'courses'} found</p>
    {matches.length?<div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{matches.map(course=><CourseCard key={course.id} course={course}/>)}</div>:<div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center"><h2 className="text-xl font-bold text-navy">No matching courses</h2><p className="mt-2 text-slate-600">Try another subject or clear your search.</p><button type="button" onClick={()=>{setQuery('');setCategory('All')}} className="mt-5 rounded-full bg-blue px-5 py-3 text-sm font-semibold text-white">Clear filters</button></div>}
  </>;
}
