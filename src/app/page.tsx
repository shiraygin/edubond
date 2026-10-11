import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, GraduationCap, Sparkles, Users } from 'lucide-react';
import { CourseCard } from '@/components/course-card';
import { courses } from '@/lib/catalog';

const steps = [
  { number: '01', title: 'Discover', body: 'Explore a growing range of subjects and find what interests you.', icon: BookOpen },
  { number: '02', title: 'Connect', body: 'Find the right resources and a learning path for your goals.', icon: Users },
  { number: '03', title: 'Grow', body: 'Build skills, stay curious, and take the next step with confidence.', icon: GraduationCap }
];

export default function Home() {
  return <>
    <section className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-sky blur-3xl" aria-hidden="true"/>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-sky px-4 py-2 text-xs font-bold tracking-wide text-blue"><Sparkles size={15}/> REIMAGINING EDUCATION</p>
          <h1 className="max-w-xl text-5xl font-black leading-[1.08] tracking-tight text-navy sm:text-6xl lg:text-7xl">Learning is better <span className="text-blue">together.</span></h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">A welcoming space for curious minds. Explore subjects, discover lessons, and build your next big skill.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/courses" className="inline-flex items-center gap-2 rounded-full bg-blue px-7 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-navy">Explore courses <ArrowRight size={18}/></Link>
            <Link href="#how-it-works" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-navy transition hover:border-blue">How it works <ArrowUpRight size={17}/></Link>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-lg" aria-label="Decorative learning illustration">
          <div className="rounded-[2.5rem] border border-blue-100 bg-sky p-8 shadow-soft sm:p-12">
            <div className="rounded-[2rem] bg-white p-7 shadow-soft">
              <div className="mb-6 flex items-center justify-between"><span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-bold text-blue">Your learning space</span><Sparkles className="text-amber-500"/></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex aspect-square items-center justify-center rounded-[1.5rem] bg-amber-100 text-6xl font-black text-amber-700">∑</div>
                <div className="flex aspect-square items-center justify-center rounded-[1.5rem] bg-blue-100 text-5xl font-black text-blue">Aa</div>
                <div className="col-span-2 flex items-center gap-4 rounded-2xl bg-navy p-5 text-white"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15"><BookOpen size={26}/></span><div><p className="font-extrabold">Explore something new</p><p className="text-xs text-slate-300">One lesson at a time</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <p className="text-sm font-extrabold uppercase tracking-[.18em] text-blue">The journey</p>
      <h2 className="mt-3 text-4xl font-black tracking-tight text-navy">A simple path to progress.</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">{steps.map(({number,title,body,icon:Icon})=><div key={number} className="rounded-3xl border border-slate-200 bg-white p-8"><div className="flex items-center justify-between"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky text-blue"><Icon size={25}/></span><span className="text-3xl font-black text-slate-200">{number}</span></div><h3 className="mt-6 text-xl font-extrabold text-navy">{title}</h3><p className="mt-2 leading-7 text-slate-600">{body}</p></div>)}</div>
    </section>
    <section className="bg-mist py-20"><div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-sm font-extrabold uppercase tracking-[.18em] text-blue">Explore what inspires you</p><h2 className="mt-3 text-4xl font-black tracking-tight text-navy">Featured courses</h2><p className="mt-3 text-sm text-slate-600">Sample courses illustrating the new EduBond experience.</p></div><Link href="/courses" className="inline-flex items-center gap-2 text-sm font-extrabold text-blue">All courses <ArrowUpRight size={18}/></Link></div>
      <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{courses.slice(0,3).map(course=><CourseCard key={course.id} course={course}/>)}</div>
    </div></section>
  </>;
}
