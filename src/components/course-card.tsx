import { BookOpen, Clock3, ArrowUpRight } from 'lucide-react';
import type { Course } from '@/lib/catalog';

const tones: Record<string,string> = {
  Programming: 'bg-blue-100 text-blue-700',
  Mathematics: 'bg-amber-100 text-amber-800',
  Languages: 'bg-rose-100 text-rose-700',
  Science: 'bg-emerald-100 text-emerald-700'
};

export function CourseCard({ course }: { course: Course }) {
  return <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition-transform hover:-translate-y-1">
    <div className="flex h-44 items-center justify-center bg-mist">
      <span aria-hidden="true" className={`flex h-24 w-24 items-center justify-center rounded-[2rem] text-4xl font-bold ${tones[course.category] ?? 'bg-slate-100 text-slate-700'}`}>{course.symbol}</span>
    </div>
    <div className="flex flex-1 flex-col p-6">
      <div className="mb-3 flex items-center justify-between gap-3 text-xs font-bold"><span className="uppercase tracking-wider text-blue">{course.category}</span><span className="text-slate-500">{course.level}</span></div>
      <h3 className="text-xl font-extrabold tracking-tight text-navy">{course.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{course.description}</p>
      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-600">
        <span className="inline-flex items-center gap-1.5"><BookOpen size={15}/>{course.lessons} lessons</span>
        <span className="inline-flex items-center gap-1.5"><Clock3 size={15}/>{course.duration}</span>
        <span className="ml-auto inline-flex items-center gap-1 text-blue" aria-label="Course preview unavailable">Preview <ArrowUpRight size={15}/></span>
      </div>
    </div>
  </article>;
}
