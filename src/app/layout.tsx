import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { DemoProvider } from '@/components/demo-provider';
import { DemoControls } from '@/components/demo-controls';
import Link from 'next/link';
export const metadata:Metadata={title:{default:'EduBonds - Study With Us',template:'%s | EduBonds'},description:'Discover, enroll and learn with EduBonds.'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><DemoProvider><div className="site-bg min-h-screen"><DemoControls/><SiteHeader/><main>{children}</main><footer className="mx-auto mt-20 max-w-7xl px-4 pb-5 sm:px-6"><div className="glass flex flex-col items-center justify-between gap-3 rounded-[24px] px-7 py-6 text-sm text-[#416782] sm:flex-row"><p className="font-bold">EduBonds · Learn together, grow further.</p><div className="flex gap-5"><Link href="/">Home</Link><Link href="/courses">Courses</Link><Link href="/tutors">Tutors</Link><Link href="/account">Account</Link><Link href="/community">Community</Link><Link href="/universities">Universities</Link></div></div></footer></div></DemoProvider></body></html>}
