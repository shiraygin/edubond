'use client';
import {useState} from 'react';
import {getBrowserClient} from '@/lib/supabase/browser';
export default function UpdatePassword(){const [password,setPassword]=useState(''),[status,setStatus]=useState('');
async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const sb=getBrowserClient();if(!sb){setStatus('Authentication is not configured.');return}const {error}=await sb.auth.updateUser({password});setStatus(error?error.message:'Password updated. You can return to your account.')}
return <section className="mx-auto max-w-lg px-5 py-24"><form onSubmit={submit} className="glass rounded-3xl p-8"><h1 className="text-2xl font-bold">Choose a new password</h1><label className="mt-5 block">New password<input type="password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl bg-white/80 p-3"/></label><button className="blue-btn mt-5 rounded-xl px-6 py-3 text-white">Update password</button><p role="status" className="mt-4 text-sm">{status}</p></form></section>}
