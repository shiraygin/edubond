'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
export function SiteHeader(){
 const [open,setOpen]=useState(false),[query,setQuery]=useState('');
 const router=useRouter();
 function search(e:React.FormEvent<HTMLFormElement>){e.preventDefault();router.push('/courses?q='+encodeURIComponent(query.trim()));setOpen(false)}
 return <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
  <div className="glass-strong mx-auto flex max-w-7xl items-center justify-between gap-5 rounded-[24px] px-5 py-2.5 lg:px-7">
   <Link href="/" aria-label="EduBonds home" className="shrink-0"><Image src="/edubonds-logo.png" alt="EduBonds" width={106} height={54} className="h-12 w-auto object-contain"/></Link>
   <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex"><Link href="/" className="font-semibold text-[#173650] hover:text-[#007bff]">Home</Link><Link href="/courses" className="font-semibold text-[#173650] hover:text-[#007bff]">Courses</Link><Link href="/tutors" className="font-semibold text-[#173650] hover:text-[#007bff]">Tutors</Link><Link href="/community" className="hidden font-semibold text-[#173650] hover:text-[#007bff] lg:inline">Community</Link></nav>
   <div className="hidden items-center gap-3 md:flex"><form onSubmit={search} className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#50738b]"/><input aria-label="Search courses" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search courses..." className="w-44 rounded-full border border-white/80 bg-white/55 py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-[#688398] focus:bg-white lg:w-56"/></form><Link href="/account" className="blue-btn rounded-full px-5 py-2.5 text-sm font-bold text-white">Dashboard</Link></div>
   <button type="button" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={()=>setOpen(!open)} className="rounded-xl border border-white/75 bg-white/45 p-2 md:hidden">{open?<X size={22}/>:<Menu size={22}/>}</button>
  </div>
  {open&&<nav aria-label="Mobile navigation" className="glass-strong mx-auto mt-2 flex max-w-7xl flex-col gap-4 rounded-2xl p-5 md:hidden"><Link href="/" onClick={()=>setOpen(false)}>Home</Link><Link href="/courses" onClick={()=>setOpen(false)}>Courses</Link><Link href="/tutors" onClick={()=>setOpen(false)}>Tutors</Link><Link href="/community" onClick={()=>setOpen(false)}>Community</Link><Link href="/universities" onClick={()=>setOpen(false)}>Universities</Link><Link href="/account" onClick={()=>setOpen(false)}>Dashboard</Link><form onSubmit={search} className="flex gap-2"><input aria-label="Search courses" className="min-w-0 flex-1 rounded-xl border border-white bg-white/70 p-3" placeholder="Search courses" value={query} onChange={e=>setQuery(e.target.value)}/><button aria-label="Submit search" className="blue-btn rounded-xl px-4 text-white"><Search size={18}/></button></form></nav>}
 </header>;
}
