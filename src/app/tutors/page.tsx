import Link from 'next/link';
import {getServerClient} from '@/lib/supabase/server';
import {GraduationCap,Star} from 'lucide-react';
export default async function TutorsPage(){
 const sb=await getServerClient();
 const {data:tutors,error}=sb?await sb.from('profiles').select('id,full_name,specialization').eq('role','tutor').order('full_name').limit(60):{data:[],error:null};
 return <section className="mx-auto max-w-7xl px-5 py-16"><div className="text-center"><p className="font-bold tracking-wide text-[#007bff]">Meet your educators</p><h1 className="mt-3 text-4xl font-bold text-[#123d60]">Our Tutors</h1><p className="mt-3 text-[#4a687c]">Browse tutors and find the right fit for your learning journey.</p></div>
 {error?<p role="alert" className="mt-10 text-center">Unable to load tutors right now.</p>:null}
 <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{tutors?.map(t=><article key={t.id} className="glass glass-hover rounded-[25px] p-7 text-center"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/65 text-[#007bff]"><GraduationCap size={35}/></div><h2 className="mt-5 text-xl font-bold text-[#123d60]">{t.full_name}</h2><p className="mt-2 text-sm text-[#4a687c]">{t.specialization||'Tutor'}</p><p className="mt-4 flex justify-center gap-1 text-sm text-[#527a8b]"><Star size={16}/> Ratings available when reviews are connected</p></article>)}</div>
 {!tutors?.length&&!error?<div className="glass mx-auto mt-12 max-w-lg rounded-3xl p-10 text-center"><p>{sb?'No tutors listed yet.':'Connect the database to display registered tutors.'}</p><Link href="/auth" className="mt-5 inline-block font-bold text-[#007bff]">Join EduBonds →</Link></div>:null}</section>;
}
