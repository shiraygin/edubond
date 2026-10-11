import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, GraduationCap, Search } from 'lucide-react';
import { CourseCard } from '@/components/course-card';
import { courses } from '@/lib/catalog';
const steps=[{title:'Discover',description:'Explore a wide variety of engaging subjects and interactive lessons.',icon:Search},{title:'Enroll',description:'Join a class that excites you and learn alongside curious classmates.',icon:BookOpen},{title:'Learn',description:'Gain knowledge from expert teachers and develop essential skills.',icon:GraduationCap}];
export default function Home(){
  return <div className="text-center">
    <section className="hero-enter mx-auto flex max-w-5xl flex-col items-center px-5 pb-14 pt-16 sm:pt-20">
      <h1 className="text-[clamp(2.2rem,5vw,3.15rem)] font-bold leading-tight text-black">STUDY WITH US<br/><strong>EDUBONDS</strong></h1>
      <Image src="/edubonds-logo.png" alt="Original EduBonds logo" width={300} height={300} className="logo-bounce my-5 h-auto w-[210px] object-contain sm:w-[300px]" priority/>
      <Link href="/courses" className="rounded-[20px] bg-[#007bff] px-8 py-3 text-lg font-medium text-white transition hover:scale-105 hover:bg-[#0056b3]">Get Started</Link>
    </section>
    <section id="how-it-works" className="mx-auto max-w-[1200px] rounded-[20px] bg-white px-5 py-10 sm:px-10">
      <div className="grid justify-items-center gap-7 md:grid-cols-3">{steps.map(({title,description,icon:Icon})=><article key={title} className="flex w-full max-w-[290px] flex-col items-center rounded-[15px] bg-[#f9f9f9] px-5 py-8 shadow-[0_4px_10px_rgba(0,0,0,.1)] transition-transform hover:-translate-y-1">
        <div className="flex h-[145px] w-[185px] items-center justify-center rounded-xl bg-gradient-to-b from-[#b8d6f5] to-[#c4ebdf] text-[#007bff]"><Icon size={70} strokeWidth={1.5}/></div>
        <h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-7">{description}</p>
      </article>)}</div>
    </section>
    <section className="mx-auto max-w-6xl px-5 py-16">
      <h2 className="text-3xl font-bold text-black">Featured Courses</h2><p className="mt-3 text-base">Explore these handpicked courses and start learning today!</p>
      <p className="mt-1 text-xs text-slate-600">Sample courses for the frontend preview</p>
      <div className="mt-9 flex flex-wrap justify-center gap-6">{courses.slice(0,2).map(course=><CourseCard key={course.id} course={course}/>)}</div>
      <Link href="/courses" className="mt-9 inline-block rounded-[20px] bg-[#007bff] px-7 py-3 font-semibold text-white hover:bg-[#0056b3]">Browse All Courses</Link>
    </section>
    <section className="mx-auto max-w-[1200px] rounded-[20px] bg-white/90 px-8 py-12 text-center shadow-sm">
      <h2 className="text-2xl font-bold">About EduBonds</h2><p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-700">A space where students can discover courses, connect with tutors, and grow through learning.</p>
    </section>
  </div>;
}
