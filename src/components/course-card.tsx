import type { Course } from '@/lib/catalog';

const tones: Record<string,string>={Programming:'bg-[#b8d6f5] text-[#0056b3]',Mathematics:'bg-[#d0f2e3] text-[#16795e]',Languages:'bg-[#dceafa] text-[#1565c0]',Science:'bg-[#c7e9da] text-[#14654f]'};
export function CourseCard({course}:{course:Course}){
  return <article className="flex h-full w-full max-w-[285px] flex-col items-center rounded-xl bg-white p-5 text-center shadow-[0_4px_12px_rgba(0,0,0,.12)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_8px_18px_rgba(0,0,0,.17)]">
    <div className={`flex h-[150px] w-full items-center justify-center rounded-lg ${tones[course.category]??'bg-[#b8d6f5] text-[#1565c0]'}`}><span aria-hidden="true" className="text-5xl font-bold">{course.symbol}</span></div>
    <h3 className="mt-4 text-lg font-bold text-[#1565c0]">{course.title}</h3>
    <p className="mt-2 flex-1 text-sm leading-6 text-[#333]">{course.description}</p>
    <span className="mt-3 text-xs text-slate-500">{course.lessons} lessons · {course.level}</span>
  </article>;
}
