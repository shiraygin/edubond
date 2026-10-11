'use client';
import {useState} from 'react';
import {MapPin,Search,ExternalLink} from 'lucide-react';
const universities=[
 {name:'Imam Abdulrahman Bin Faisal University',city:'Dammam'},
 {name:'King Saud University',city:'Riyadh'},
 {name:'King Abdulaziz University',city:'Jeddah'},
 {name:'King Fahd University of Petroleum & Minerals',city:'Dhahran'},
 {name:'Princess Nourah Bint Abdulrahman University',city:'Riyadh'},
 {name:'Umm Al-Qura University',city:'Makkah'},
 {name:'Taibah University',city:'Madinah'},
 {name:'Qassim University',city:'Buraydah'}
];
export default function Universities(){const [q,setQ]=useState('');const found=universities.filter(u=>(u.name+' '+u.city).toLowerCase().includes(q.toLowerCase()));return <section className="mx-auto max-w-6xl px-5 py-16"><div className="text-center"><p className="font-semibold text-[#007bff]">Explore Saudi Arabia</p><h1 className="mt-3 text-4xl font-extrabold text-[#123d60]">Universities Explorer</h1><p className="mt-3 text-[#4a687c]">Find Saudi universities and explore their locations.</p></div><div className="glass mx-auto mt-9 max-w-xl rounded-2xl p-4"><label className="flex items-center gap-3 rounded-xl bg-white/75 px-4"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} className="w-full bg-transparent py-4 outline-none" placeholder="Search universities or cities" aria-label="Search universities"/></label></div><div className="mt-8 grid gap-4 md:grid-cols-2">{found.map(u=><article key={u.name} className="glass glass-hover flex items-center justify-between gap-4 rounded-2xl p-6"><div className="flex gap-3"><MapPin className="shrink-0 text-[#007bff]"/><div><h2 className="font-bold">{u.name}</h2><p className="mt-1 text-sm text-[#587b8d]">{u.city}</p></div></div><a href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(u.name+', '+u.city+', Saudi Arabia')} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/70 p-3 text-[#007bff]" aria-label={'View '+u.name+' on map'}><ExternalLink size={18}/></a></article>)}</div>{!found.length&&<p className="mt-8 text-center">No universities found.</p>}<p className="mt-7 text-center text-xs text-[#56788a]">Curated explorer of selected universities. Open a location in Google Maps for map details.</p></section>}
