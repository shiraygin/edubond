'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useDemo} from '@/components/demo-provider';
import {GraduationCap,BookOpen,ArrowRight,UserPlus,ShieldCheck,Sparkles} from 'lucide-react';
import {uid} from '@/lib/demo';

export default function Auth(){
 const {db,switchUser,update}=useDemo();
 const router=useRouter();
 const [mode,setMode]=useState<'login'|'signup'>('login');
 const [role,setRole]=useState<'student'|'tutor'>('student');
 const [name,setName]=useState(''),[email,setEmail]=useState(''),[specialization,setSpecialization]=useState(''),[error,setError]=useState('');
 const profiles=db.users.filter((u,i,a)=>a.findIndex(x=>x.role===u.role)===i);
 function changeMode(next:'login'|'signup'){setMode(next);setError('')}
 function signup(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  if(!name.trim()||!email.includes('@')){setError('Enter your name and a valid email.');return}
  if(db.users.some(u=>u.email.toLowerCase()===email.trim().toLowerCase())){setError('This email is already in use.');return}
  if(role==='tutor'&&!specialization.trim()){setError('Enter your specialization.');return}
  const id=uid();
  update(s=>({...s,users:[...s.users,{id,name:name.trim(),email:email.trim(),role,specialization:role==='tutor'?specialization.trim():undefined}],wallets:{...s.wallets,[id]:0},currentUser:id}));
  router.push('/account');
 }
 return <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
  <div className="glass overflow-hidden rounded-[32px] border border-white/80 shadow-[0_25px_80px_rgba(22,80,115,.14)]">
   <div className="relative min-h-[620px] overflow-hidden md:min-h-[650px]">
    {/* Two permanently mounted form halves preserve form values during the animated transition. */}
    <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
     <div className={`flex min-h-0 flex-col justify-center overflow-y-auto p-7 transition-all duration-500 ease-in-out sm:p-10 lg:p-14 ${mode==='login'?'auth-form-visible':'auth-form-hidden-left'}`}>
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#007bff]"><Sparkles size={16}/> Welcome back</p>
      <h1 className="mt-4 text-3xl font-extrabold text-[#123d60] sm:text-4xl">Log in</h1>
      <p className="mt-3 text-sm leading-7 text-[#4a687c]">Choose an account to continue your learning journey.</p>
      <div className="mt-7 space-y-3">{profiles.map(u=><button key={u.id} type="button" onClick={()=>{switchUser(u.id);router.push('/account')}} className="glass-hover flex w-full items-center gap-3 rounded-2xl border border-white/80 bg-white/55 px-4 py-3 text-left"><div className="rounded-xl bg-white/80 p-2.5 text-[#007bff]">{u.role==='student'?<GraduationCap size={21}/>:u.role==='tutor'?<BookOpen size={21}/>:<ShieldCheck size={21}/>}</div><div className="min-w-0 flex-1"><strong className="block truncate text-sm text-[#123d60]">{u.name}</strong><span className="text-xs capitalize text-[#56798b]">{u.role}</span></div><ArrowRight size={18} className="text-[#007bff]"/></button>)}</div>
      <button type="button" onClick={()=>changeMode('signup')} className="mt-7 text-sm font-bold text-[#007bff] md:hidden">New here? Sign up →</button>
     </div>
     <div className={`flex min-h-0 flex-col justify-center overflow-y-auto p-7 transition-all duration-500 ease-in-out sm:p-10 lg:p-14 ${mode==='signup'?'auth-form-visible':'auth-form-hidden-right'}`}>
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#007bff]"><UserPlus size={16}/> Your next chapter</p>
      <h2 className="mt-4 text-3xl font-extrabold text-[#123d60] sm:text-4xl">Create account</h2>
      <p className="mt-3 text-sm text-[#4a687c]">Join EduBonds as a student or tutor.</p>
      <form onSubmit={signup} className="mt-6 space-y-3">
       <label className="block text-sm font-semibold">Account type<select value={role} onChange={e=>setRole(e.target.value as 'student'|'tutor')} className="mt-1.5 w-full rounded-xl border border-white/80 bg-white/75 p-3"><option value="student">Student</option><option value="tutor">Tutor</option></select></label>
       <label className="block text-sm font-semibold">Full name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="mt-1.5 w-full rounded-xl border border-white/80 bg-white/75 p-3"/></label>
       <label className="block text-sm font-semibold">Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="mt-1.5 w-full rounded-xl border border-white/80 bg-white/75 p-3"/></label>
       {role==='tutor'&&<label className="block text-sm font-semibold">Specialization<input required value={specialization} onChange={e=>setSpecialization(e.target.value)} className="mt-1.5 w-full rounded-xl border border-white/80 bg-white/75 p-3" placeholder="Your subject"/></label>}
       {error&&<p role="alert" className="text-sm text-red-700">{error}</p>}
       <button type="submit" className="blue-btn mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white"><UserPlus size={17}/> Sign up</button>
      </form>
      <button type="button" onClick={()=>changeMode('login')} className="mt-5 text-sm font-bold text-[#007bff] md:hidden">Already a member? Log in →</button>
     </div>
    </div>
    {/* This illustrated half slides horizontally and reveals the opposite form. */}
    <div className={`auth-slide-panel absolute inset-y-0 z-10 hidden w-1/2 overflow-hidden border-white/80 bg-gradient-to-br from-[#b3dafe]/90 via-[#a9e3ea]/90 to-[#83d8c0]/90 shadow-[0_0_65px_rgba(26,95,131,.18)] backdrop-blur-xl md:flex ${mode==='login'?'auth-slide-right':'auth-slide-left'}`}>
     <div className="pointer-events-none absolute -left-12 top-12 h-48 w-48 rounded-full bg-white/55 blur-3xl"/><div className="pointer-events-none absolute -right-14 bottom-10 h-56 w-56 rounded-full bg-[#71b9ec]/45 blur-3xl"/>
     <div className="relative flex w-full flex-col items-center justify-center px-10 py-12 text-center">
      <div className="auth-float flex h-28 w-28 items-center justify-center rounded-[30px] border border-white/80 bg-white/55 text-[#007bff] shadow-xl"><GraduationCap size={56} strokeWidth={1.4}/></div>
      <h2 className="mt-8 text-3xl font-extrabold text-[#123d60]">{mode==='login'?'Hello, Friend!':'Welcome back!'}</h2>
      <p className="mt-4 max-w-xs text-sm leading-7 text-[#426b81]">{mode==='login'?'New to EduBonds? Join our learning community and start your journey.':'Already have an account? Return to your courses and keep learning.'}</p>
      <button type="button" onClick={()=>changeMode(mode==='login'?'signup':'login')} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/70 px-8 py-3 font-bold text-[#007bff] shadow-sm transition hover:scale-105 hover:bg-white">{mode==='login'?'Sign up':'Log in'} <ArrowRight size={18}/></button>
      <div className="mt-9 flex items-center gap-4 opacity-70"><BookOpen size={24} className="text-[#158f82]"/><span className="text-xs font-semibold tracking-widest text-[#416982]">DISCOVER · LEARN · GROW</span></div>
     </div>
    </div>
   </div>
  </div>
 </section>;
}
