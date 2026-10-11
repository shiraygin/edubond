import type { Course } from '@/lib/catalog';
import { BookOpen, ArrowUpRight } from 'lucide-react';
const colors:Record<string,string>={Programming:'from-[#9cc8fb]/80 to-[#d0e8ff]/60',Mathematics:'from-[#b1e5cb]/80 to-[#e4f9ed]/70',Languages:'from-[#c5e0ff]/80 to-[#e4f1ff]/70',Science:'from-[#90dcbf]/80 to-[#d4f3e6]/70'};
export function CourseCard({course}:{course:Course}){
 return <article className="glass glass-hover flex h-full flex-col overflow-hidden rounded-[26px] p-3.5">
  <div className={`relative flex h-44 items-center justify-center rounded-[19px] bg-gradient-to-br ${colors[course.category]??colors.Programming}`}><span aria-hidden="true" className="text-6xl font-bold text-[#1763a7] drop-shadow-sm">{course.symbol}</span><span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/65 px-3 py-1 text-xs font-semibold text-[#27637d] backdrop-blur-md">{course.category}</span></div>
  <div className="flex flex-1 flex-col px-2 pb-2 pt-5"><div className="mb-2 text-left text-[11px] font-bold uppercase tracking-wider text-[#477a91]">{course.level}</div><h3 className="text-left text-xl font-bold text-[#16466c]">{course.title}</h3><p className="mt-2 flex-1 text-left text-sm leading-7 text-[#4a687c]">{course.description}</p><div className="mt-5 flex items-center justify-between border-t border-white/60 pt-4 text-sm font-semibold text-[#37647d]"><span className="inline-flex items-center gap-2"><BookOpen size={16}/>{course.lessons} lessons</span><span className="flex items-center gap-1 text-[#007bff]">Preview <ArrowUpRight size={17}/></span></div></div>
 </article>
}
