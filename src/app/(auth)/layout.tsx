import { ReactNode } from 'react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      {/* Left Panel: Desktop only */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/30 border-r border-slate-800">
        <div>
          <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400">
            CurriculumAI
          </Link>
          <p className="mt-4 text-xl font-medium text-slate-300">
            Your personalized path to your dream job
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-indigo-400 font-bold text-3xl">2,400+</h3>
            <p className="text-slate-400 mt-2">learning paths generated</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-violet-400 font-bold text-3xl">87%</h3>
            <p className="text-slate-400 mt-2">job placement improvement</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-emerald-400 font-bold text-3xl">50+</h3>
            <p className="text-slate-400 mt-2">target roles covered</p>
          </div>
        </div>

        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} CurriculumAI. Created for Tier 2/3 College Students in India.
        </p>
      </div>

      {/* Right Panel: Auth Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400">
              CurriculumAI
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
