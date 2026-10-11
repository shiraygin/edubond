'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getBrowserClient } from '@/lib/supabase/browser';
type Role='student'|'tutor';
export default function AuthPage(){
 const [mode,setMode]=useState<'signin'|'signup'>('signin');
 const [role,setRole]=useState<Role>('student');
 const [name,setName]=useState(''),[email,setEmail]=useState(''),[phone,setPhone]=useState(''),[specialization,setSpecialization]=useState(''),[password,setPassword]=useState('');
 const [busy,setBusy]=useState(false),[message,setMessage]=useState(''),[error,setError]=useState('');
 const router=useRouter();
 async function submit(e:React.FormEvent<HTMLFormElement>){
 e.preventDefault();setBusy(true);setError('');setMessage('');
 const client=getBrowserClient();if(!client){setError('Authentication is not configured yet. Add Supabase environment variables.');setBusy(false);return}
 try{
 if(mode==='signup'){
  if(name.trim().length<2){setError('Please enter your full name.');return}
  if(!/^\d{10,11}$/.test(phone)){setError('Enter a valid 10-11 digit phone number.');return}
  if(role==='tutor'&&!specialization.trim()){setError('Please enter your specialization.');return}
  const {data,error:err}=await client.auth.signUp({email,password,options:{data:{full_name:name.trim(),role,phone,specialization:role==='tutor'?specialization.trim():null}}});
  if(err)throw err;
  if(data.session){router.push('/account');router.refresh()}else{setMessage('Check your email to confirm your registration, then sign in.')}
 }else{
  const {error:err}=await client.auth.signInWithPassword({email,password});if(err)throw err;
  router.push('/account');router.refresh();
 }
 }catch(err){setError(err instanceof Error?err.message:'Something went wrong.')}finally{setBusy(false)}
 }
 return <section className="mx-auto max-w-5xl px-5 py-20"><div className="glass mx-auto grid max-w-4xl overflow-hidden rounded-[30px] md:grid-cols-2"><div className="bg-white/55 px-7 py-12 sm:px-10">
 <h1 className="text-3xl font-bold text-[#123d60]">{mode==='signin'?'Sign in':'Create an account'}</h1><p className="mt-2 text-sm text-[#4a687c]">{mode==='signin'?'Welcome back to EduBonds.':'Start your learning journey with us.'}</p>
 <form onSubmit={submit} className="mt-7 space-y-4">
 {mode==='signup'&&<><label className="block text-sm font-semibold">Account type<select value={role} onChange={e=>setRole(e.target.value as Role)} className="mt-1 w-full rounded-xl border border-white/80 bg-white/80 p-3"><option value="student">Student</option><option value="tutor">Tutor</option></select></label>
 <label className="block text-sm font-semibold">Full name<input required value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full rounded-xl border border-white/80 bg-white/80 p-3"/></label>
 <label className="block text-sm font-semibold">Phone<input required type="tel" value={phone} onChange={e=>setPhone(e.target.value)} className="mt-1 w-full rounded-xl border border-white/80 bg-white/80 p-3"/></label>
 {role==='tutor'&&<label className="block text-sm font-semibold">Specialization<input required value={specialization} onChange={e=>setSpecialization(e.target.value)} className="mt-1 w-full rounded-xl border border-white/80 bg-white/80 p-3"/></label>}</>}
 <label className="block text-sm font-semibold">Email<input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-white/80 bg-white/80 p-3"/></label>
 <label className="block text-sm font-semibold">Password<input type="password" minLength={8} autoComplete={mode==='signup'?'new-password':'current-password'} required value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-white/80 bg-white/80 p-3"/></label>
 {error&&<p role="alert" className="text-sm text-red-700">{error}</p>}{message&&<p role="status" className="text-sm text-emerald-800">{message}</p>}
 <button disabled={busy} type="submit" className="blue-btn w-full rounded-xl py-3 font-bold text-white disabled:opacity-60">{busy?'Working...':mode==='signin'?'Sign In':'Sign Up'}</button>
 {mode==='signin'&&<Link href="/auth/reset" className="block text-center text-sm font-medium text-[#007bff]">Forgot password?</Link>}
 </form></div><aside className="flex flex-col items-center justify-center p-10 text-center"><h2 className="text-3xl font-bold text-[#123d60]">{mode==='signin'?'Hello, Friend!':'Welcome back!'}</h2><p className="mt-4 max-w-xs leading-7 text-[#4a687c]">{mode==='signin'?'Enter your personal details and start your journey with us.':'Already part of EduBonds? Sign in to continue learning.'}</p><button type="button" onClick={()=>{setMode(mode==='signin'?'signup':'signin');setError('');setMessage('')}} className="glass-strong mt-6 rounded-full px-8 py-3 font-bold text-[#007bff]">{mode==='signin'?'Sign Up':'Sign In'}</button></aside></div></section>
}
