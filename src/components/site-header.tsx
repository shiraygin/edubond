import Link from 'next/link';
import { ArrowUpRight, BookOpen } from 'lucide-react';

export function SiteHeader() {
  return <header className="border-b border-slate-200/80 bg-cream/95">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
      <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-navy" aria-label="EduBond home">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue text-white"><BookOpen size={20}/></span>
        edu<span className="text-blue">bond</span>
      </Link>
      <nav aria-label="Main navigation" className="flex items-center gap-5 text-sm font-semibold sm:gap-8">
        <Link href="/courses" className="text-slate-700 transition hover:text-blue">Explore courses</Link>
        <Link href="/#how-it-works" className="hidden text-slate-700 transition hover:text-blue sm:inline">How it works</Link>
        <Link href="/courses" className="inline-flex items-center gap-1 rounded-full bg-navy px-4 py-2.5 text-white transition hover:bg-blue">Get started <ArrowUpRight size={15}/></Link>
      </nav>
    </div>
  </header>;
}
