'use client';
import {useRouter} from 'next/navigation';
import {getBrowserClient} from '@/lib/supabase/browser';
export function SignOutButton(){const router=useRouter();async function signOut(){const sb=getBrowserClient();if(!sb)return;await sb.auth.signOut();router.push('/');router.refresh()}return <button type="button" onClick={signOut} className="rounded-full border border-white/80 bg-white/65 px-5 py-3 text-sm font-bold text-[#1763a7]">Sign out</button>}
