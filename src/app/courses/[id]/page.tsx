import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getServerClient} from '@/lib/supabase/server';
type Props={params:Promise<{id:string}>};
export default async function CourseDetail({params}:Props){
 const {id}=await params;
 const sb=await getServerClient();
 if(!sb)return <section className="mx-auto max-w-3xl px-5 py-24"><div className="glass rounded-3xl p-9"><h1 className="text-3xl font-bold">Course details</h1><p className="mt-4">Real course information will appear after configuring the database.</p><Link href="/courses" className="mt-5 inline-block text-[#007bff]">← All courses</Link></div></section>;
 const {data:course}=await sb.from('courses').select('id,title,description').eq('id',id).maybeSingle();
 if(!course)notFound();
 const {data:lessons}=await sb.from('lessons').select('id,title,description,price_sar').eq('course_id',id).eq('approval_status','approved').order('created_at');
 return <section className="mx-auto max-w-5xl px-5 py-16"><Link href="/courses" className="text-sm font-bold text-[#007bff]">← All courses</Link><div className="glass mt-6 rounded-[30px] p-8 sm:p-12"><h1 className="text-4xl font-bold text-[#123d60]">{course.title}</h1><p className="mt-4 leading-8 text-[#4a687c]">{course.description}</p></div><h2 className="mt-12 text-2xl font-bold text-[#123d60]">Lessons</h2><div className="mt-5 space-y-4">{lessons?.map(l=><div className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6" key={l.id}><div><h3 className="font-bold">{l.title}</h3><p className="mt-2 text-sm text-[#4a687c]">{l.description}</p></div><span className="font-bold text-[#007bff]">{l.price_sar} SAR</span></div>)}{!lessons?.length?<p className="text-sm">No approved lessons available yet.</p>:null}</div></section>;
}
