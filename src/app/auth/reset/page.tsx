'use client';
import {useState} from 'react';
import {getBrowserClient} from '@/lib/supabase/browser';
export default function ResetPage(){
 const [email,setEmail]=useState(''),[status,setStatus]=useState(''),[busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const sb=getBrowserClient();if(!sb){setStatus('Authentication is not configured yet.');return}setBusy(true);const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:window.location.origin+'/auth/update-password'});setStatus(error?error.message:'If the address is registered, you will receive a reset email.');setBusy(false)}
 return <section className="mx-auto max-w-lg px-5 py-24"><form onSubmit={submit} className="glass rounded-3xl p-8"><h1 className="text-2xl font-bold">Reset password</h1><p className="mt-3 text-sm">Enter your email address to request a reset link.</p><label className="mt-5 block text-sm font-semibold">Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl bg-white/80 p-3"/></label><button disabled={busy} className="blue-btn mt-5 rounded-xl px-6 py-3 text-white">Send reset link</button><p role="status" className="mt-4 text-sm">{status}</p></form></section>
}
