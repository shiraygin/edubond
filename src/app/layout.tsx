import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import Link from 'next/link';
export const metadata:Metadata={title:{default:'EduBonds - Study With Us',template:'%s | EduBonds'},description:'Discover, enroll and learn with EduBonds.'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  return <html lang="en"><body className="min-h-screen antialiased"><SiteHeader/><main>{children}</main><footer className="mt-16 border-t border-white/30 bg-white/35 px-5 py-7 text-center text-sm text-slate-700 backdrop-blur-sm"><p className="font-bold">EduBonds</p><div className="mt-2 flex justify-center gap-6"><Link href="/">Home</Link><Link href="/courses">Courses</Link></div></footer></body></html>;
}
