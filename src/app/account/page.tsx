import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getServerClient} from '@/lib/supabase/server';
import {SignOutButton} from '@/components/sign-out-button';
export default async function AccountPage(){
 const sb=await getServerClient();
 if(!sb)return <section className="mx-auto max-w-4xl px-5 py-20"><div className="glass rounded-3xl p-10"><h1 className="text-3xl font-bold">My account</h1><p className="mt-4">Connect Supabase to enable secure accounts and dashboards.</p><Link href="/auth" className="mt-5 inline-block text-[#007bff]">Authentication page</Link></div></section>;
 const {data:{user}}=await sb.auth.getUser();
 if(!user)redirect('/auth');
 const {data:profile}=await sb.from('profiles').select('full_name,role,phone,specialization').eq('id',user.id).maybeSingle();
 const role=profile?.role??'student';
 const [{data:myLessons},{data:purchases}]=await Promise.all([
  role==='tutor'?sb.from('lessons').select('id,title,price_sar,approval_status').eq('tutor_id',user.id):Promise.resolve({data:[]}),
  role==='student'?sb.from('purchases').select('id,lesson_id,amount_sar').eq('student_id',user.id):Promise.resolve({data:[]})
 ]);
 return <section className="mx-auto max-w-5xl px-5 py-16"><div className="glass rounded-[30px] p-7 sm:p-10"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-widest text-[#007bff]">{role} account</p><h1 className="mt-2 text-3xl font-bold text-[#123d60]">Welcome, {profile?.full_name??user.email}</h1><p className="mt-3 text-sm text-[#4a687c]">{user.email} {profile?.specialization?'· '+profile.specialization:''}</p></div><SignOutButton/></div><div className="mt-9 grid gap-5 sm:grid-cols-2"><div className="glass-strong rounded-2xl p-6"><h2 className="font-bold">{role==='tutor'?'My lessons':role==='student'?'My purchases':'Administration'}</h2><p className="mt-3 text-3xl font-bold text-[#007bff]">{role==='tutor'?(myLessons?.length??0):role==='student'?(purchases?.length??0):'—'}</p></div><div className="glass-strong rounded-2xl p-6"><h2 className="font-bold">Explore EduBonds</h2><Link className="mt-4 inline-block text-[#007bff]" href="/courses">Browse courses →</Link></div></div>{role==='tutor'&&<div className="mt-7"><h2 className="text-xl font-bold">Your uploaded lessons</h2>{(myLessons??[]).length?myLessons?.map(l=><p className="mt-3 rounded-xl bg-white/60 p-4" key={l.id}>{l.title} · {l.approval_status} · {l.price_sar} SAR</p>):<p className="mt-3 text-sm">No lessons uploaded yet.</p>}</div>}</div></section>;
}
