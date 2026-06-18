import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center space-y-6 max-w-md mx-auto">
      <div className="relative">
        <div className="h-24 w-24 rounded-3xl bg-indigo-650 bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 animate-spin-slow">
          <Compass className="h-12 w-12" />
        </div>
        <span className="absolute -bottom-2 -right-2 bg-slate-900 border border-slate-800 text-white font-extrabold text-xs px-2.5 py-1 rounded-full">
          404
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Path Lost</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          The learning path or page you are looking for doesn't exist or has been moved.
        </p>
      </div>

      <Button asChild className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold h-12 px-6 rounded-xl transition-all">
        <Link href="/dashboard">
          Go to Dashboard
        </Link>
      </Button>
    </div>
  );
}
