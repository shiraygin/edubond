'use client';
import {useMemo,useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {Search} from 'lucide-react';
import {categories,courses} from '@/lib/catalog';
import {CourseCard} from '@/components/course-card';
export function CourseBrowser(){
const sp=useSearchParams(),[query,setQuery]=useState(sp.get('q')??''),[category,setCategory]=useState<string>('All');
const matches=useMemo(()=>courses.filter(c=>{let t=query.trim().toLowerCase();return (category==='All'||c.category===category)&&(!t||`${c.title} ${c.description} ${c.category}`.toLowerCase().includes(t))}),[category,query]);
return <><div className="glass mx-auto mt-9 max-w-4xl rounded-[28px] p-5 sm:p-7"><label className="relative block"><span className="sr-only">Search courses</span><Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#638aa0]"/><input value={query} type="search" onChange={e=>setQuery(e.target.value)} placeholder="Search for courses..." className="w-full rounded-2xl border border-white/80 bg-white/75 py-4 pl-12 pr-5 text-[#173650] outline-none placeholder:text-[#7997a8] focus:bg-white"/></label><div role="group" aria-label="Filter by category" className="mt-5 flex flex-wrap justify-center gap-2">{categories.map(c=><button type="button" aria-pressed={category===c} onClick={()=>setCategory(c)} key={c} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${c===category?'blue-btn text-white':'border border-white/75 bg-white/55 text-[#356981] hover:bg-white/90'}`}>{c}</button>)}</div></div>
<p aria-live="polite" className="mt-8 text-sm text-[#356981]">{matches.length} sample {matches.length===1?'course':'courses'} found</p>{matches.length?<div className="mt-5 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">{matches.map(c=><CourseCard key={c.id} course={c}/>)}</div>:<div className="glass mx-auto mt-6 max-w-lg rounded-3xl p-10"><p>No matching courses</p><button type="button" onClick={()=>{setQuery('');setCategory('All')}} className="blue-btn mt-4 rounded-full px-5 py-3 text-white">Clear filters</button></div>}</>;
}
