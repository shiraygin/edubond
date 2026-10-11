'use client';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { categories, courses } from '@/lib/catalog';
import { CourseCard } from '@/components/course-card';
export function CourseBrowser(){
 const searchParams=useSearchParams();
 const [query,setQuery]=useState(searchParams.get('q')??'');
 const [category,setCategory]=useState<string>('All');
 const matches=useMemo(()=>courses.filter(course=>{const term=query.trim().toLowerCase();return (category==='All'||course.category===category)&&(!term||`${course.title} ${course.description} ${course.category}`.toLowerCase().includes(term))}),[category,query]);
 return <><div className="mx-auto mt-8 max-w-2xl space-y-5"><label className="block"><span className="sr-only">Search courses</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search for courses..." className="w-full rounded-[20px] border border-slate-300 bg-white px-5 py-3 text-center outline-none focus:border-[#007bff]"/></label>
 <div role="group" aria-label="Course categories" className="flex flex-wrap justify-center gap-3">{categories.map(item=><button key={item} aria-pressed={category===item} onClick={()=>setCategory(item)} className={`rounded-[20px] px-5 py-2.5 text-sm font-semibold transition ${category===item?'bg-[#007bff] text-white':'bg-white text-black hover:bg-[#007bff] hover:text-white'}`}>{item}</button>)}</div></div>
 <p aria-live="polite" className="mt-8 text-sm text-slate-700">{matches.length} sample courses</p>
 {matches.length?<div className="mt-5 flex flex-wrap justify-center gap-6">{matches.map(course=><CourseCard key={course.id} course={course}/>)}</div>:<div className="mx-auto mt-6 max-w-lg rounded-xl bg-white p-10"><p>No matching courses.</p><button onClick={()=>{setQuery('');setCategory('All')}} className="mt-4 rounded-lg bg-[#007bff] px-5 py-2 text-white">Clear filters</button></div>}</>;
}
