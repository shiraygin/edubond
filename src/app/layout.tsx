import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { default: 'EduBond | Learn together, grow further', template: '%s | EduBond' },
  description: 'Explore a new learning experience connecting students, courses and tutors.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="min-h-screen antialiased">
    <SiteHeader/>
    <main>{children}</main>
    <footer className="mt-20 bg-navy text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
        <div><p className="text-lg font-black">edubond<span className="text-sky-300">.</span></p><p className="mt-1 text-sm text-slate-300">A better way to grow together.</p></div>
        <div className="flex gap-6 text-sm text-slate-300"><Link href="/">Home</Link><Link href="/courses">Courses</Link></div>
      </div>
    </footer>
  </body></html>;
}
