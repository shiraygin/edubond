'use client';
import {useState,useRef,useEffect} from 'react';
import Link from 'next/link';
import {GraduationCap,Star,X,ArrowUpRight,BookOpen} from 'lucide-react';
import {useDemo} from '@/components/demo-provider';

export default function Tutors(){
 const {db}=useDemo();
 const [selected,setSelected]=useState<string|null>(null);
 const profileRef=useRef<HTMLElement|null>(null);
 const tutors=db.users.filter(u=>u.role==='tutor');
 const tutor=tutors.find(t=>t.id===selected);
 const lessons=tutor?db.lessons.filter(l=>l.tutorId===tutor.id&&l.approved):[];
 const reviews=tutor?db.reviews.filter(r=>lessons.some(l=>l.id===r.lessonId)):[];
 useEffect(()=>{
  if(!selected||!profileRef.current||typeof window==='undefined')return;
  if(window.matchMedia('(max-width: 1023px)').matches){
   const timer=window.setTimeout(()=>profileRef.current?.scrollIntoView({behavior:'smooth',block:'nearest'}),120);
   return ()=>window.clearTimeout(timer);
  }
 },[selected]);
 return <section className="mx-auto max-w-7xl px-5 py-16">
  <div className="text-center"><p className="font-semibold text-[#007bff]">Meet your educators</p><h1 className="mt-3 text-4xl font-bold text-[#123d60]">Our Tutors</h1><p className="mt-3 text-[#4a687c]">Explore tutor profiles and their lessons.</p></div>
  <div className={`mt-12 grid items-start gap-7 transition-[grid-template-columns] duration-500 ease-out ${tutor?'lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]':'lg:grid-cols-1'}`}>
   <div className={`grid gap-6 sm:grid-cols-2 ${tutor?'lg:grid-cols-1 xl:grid-cols-2':'lg:grid-cols-3'}`}>
    {tutors.map(t=>{
     const ls=db.lessons.filter(l=>l.tutorId===t.id&&l.approved);
     const ratings=db.reviews.filter(r=>ls.some(l=>l.id===r.lessonId));
     const avg=ratings.length?(ratings.reduce((sum,r)=>sum+r.rating,0)/ratings.length).toFixed(1):'No ratings';
     const active=selected===t.id;
     return <article key={t.id} className={`glass glass-hover rounded-[28px] border p-7 text-center transition-all duration-300 ${active?'border-[#4b93e2] shadow-[0_18px_45px_rgba(23,103,167,.2)]':'border-white/70'}`}>
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/60 text-[#007bff]"><GraduationCap size={38}/></div>
      <h2 className="mt-5 text-xl font-bold">{t.name}</h2><p className="mt-2 text-sm">{t.specialization}</p>
      <p className="mt-3 flex items-center justify-center gap-1 text-sm"><Star size={15}/>{avg} · {ls.length} lessons</p>
      <button type="button" aria-expanded={active} aria-controls="tutor-profile-panel" onClick={()=>setSelected(active?null:t.id)} className={`mt-5 rounded-full border border-white/80 px-5 py-2 font-semibold transition-colors ${active?'bg-[#007bff] text-white':'bg-white/70 text-[#007bff] hover:bg-white'}`}>{active?'Close profile':'View profile →'}</button>
     </article>
    })}
   </div>
   {tutor&&<aside ref={profileRef} id="tutor-profile-panel" aria-label={`${tutor.name} profile`} className="tutor-panel-enter glass-strong min-w-0 rounded-[30px] p-6 sm:p-8 lg:sticky lg:top-32">
    <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#007bff]">Tutor profile</p><h2 className="mt-3 text-2xl font-bold text-[#123d60]">{tutor.name}</h2><p className="mt-2 text-sm text-[#58798b]">{tutor.specialization}</p></div><button type="button" aria-label="Close tutor profile" onClick={()=>setSelected(null)} className="rounded-full border border-white/80 bg-white/75 p-2.5 text-[#315d7a] hover:bg-white"><X size={19}/></button></div>
    <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/70 bg-white/45 p-4"><BookOpen size={19} className="text-[#007bff]"/><strong className="mt-2 block text-xl">{lessons.length}</strong><p className="text-xs text-[#56798e]">Available lessons</p></div><div className="rounded-2xl border border-white/70 bg-white/45 p-4"><Star size={19} className="text-[#007bff]"/><strong className="mt-2 block text-xl">{reviews.length? (reviews.reduce((sum,r)=>sum+r.rating,0)/reviews.length).toFixed(1):'—'}</strong><p className="text-xs text-[#56798e]">Average rating</p></div></div>
    <h3 className="mt-8 text-lg font-bold text-[#123d60]">Available lessons</h3>
    <div className="mt-3 space-y-3">{lessons.length?lessons.map(l=><Link key={l.id} href={`/courses/${l.courseId}`} className="flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/55 p-4 text-sm font-semibold text-[#1763a7] transition hover:bg-white/85"><span>{l.title}</span><ArrowUpRight size={18} className="shrink-0"/></Link>):<p className="rounded-xl bg-white/40 p-4 text-sm text-[#56798e]">No published lessons yet.</p>}</div>
    <h3 className="mt-8 text-lg font-bold text-[#123d60]">Student feedback</h3><div className="mt-3 space-y-3">{reviews.length?reviews.map(r=><div key={r.id} className="rounded-2xl border border-white/70 bg-white/55 p-4 text-sm"><p className="font-bold text-[#1763a7]">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</p><p className="mt-2 leading-6 text-[#416782]">{r.comment}</p></div>):<p className="rounded-xl bg-white/40 p-4 text-sm text-[#56798e]">No reviews yet.</p>}</div>
   </aside>}
  </div>
 </section>;
}
