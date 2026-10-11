'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SiteHeader() {
  const [open,setOpen]=useState(false);
  const [query,setQuery]=useState('');
  const router=useRouter();
  const nav=[{href:'/',label:'Home'},{href:'/courses',label:'Courses'}];
  function search(event:React.FormEvent<HTMLFormElement>){event.preventDefault();router.push('/courses?q='+encodeURIComponent(query.trim()));setOpen(false)}
  return <header className="sticky top-0 z-50 bg-white/85 shadow-[0_4px_10px_rgba(0,0,0,.10)] backdrop-blur-md">
    <div className="mx-auto flex min-h-[80px] max-w-7xl items-center justify-between gap-5 px-5 py-3 md:px-8">
      <Link href="/" className="logo-bounce inline-flex shrink-0 items-center gap-2" aria-label="EduBonds home">
        <Image src="/edubonds-logo.png" alt="EduBonds logo" width={120} height={60} className="h-[55px] w-auto object-contain" priority/>
      </Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">{nav.map(n=><Link key={n.href} href={n.href} className="text-base font-bold text-black transition hover:text-[#007bff]">{n.label}</Link>)}</nav>
      <div className="hidden items-center gap-3 md:flex">
        <form onSubmit={search} className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/><input aria-label="Search courses" value={query} onChange={e=>setQuery(e.target.value)} className="w-48 rounded-full border border-slate-300 bg-white px-4 py-2 pl-9 text-sm outline-none focus:border-[#007bff] lg:w-60" placeholder="Search for courses..." /></form>
        <Link href="/courses" className="rounded-md bg-[#007bff] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0056b3]">Get Started</Link>
      </div>
      <button className="rounded-lg border border-slate-200 bg-white p-2 md:hidden" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={open?'Close menu':'Open menu'}>{open?<X/>:<Menu/>}</button>
    </div>
    {open&&<div className="space-y-3 border-t border-slate-200 bg-white/95 px-5 py-5 md:hidden">
      {nav.map(n=><Link key={n.href} href={n.href} onClick={()=>setOpen(false)} className="block font-bold text-black">{n.label}</Link>)}
      <form onSubmit={search} className="flex gap-2"><input aria-label="Search courses" placeholder="Search courses..." value={query} onChange={e=>setQuery(e.target.value)} className="min-w-0 flex-1 rounded-lg border border-slate-300 p-2"/><button aria-label="Submit search" className="rounded-lg bg-[#007bff] px-4 text-white"><Search size={18}/></button></form>
    </div>}
  </header>;
}
