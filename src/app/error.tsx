'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Next.js global application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center space-y-6 max-w-lg mx-auto">
      <div className="h-16 w-16 rounded-full bg-red-650 bg-red-600/10 flex items-center justify-center text-red-500 border border-red-500/20">
        <AlertCircle className="h-8 w-8" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Something went wrong!</h1>
        <p className="text-slate-400 text-sm max-w-md leading-relaxed">
          Our application encountered a critical runtime error. We've logged the issue and are looking into it.
        </p>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-all"
        >
          Try Again
        </Button>
        <Button
          onClick={() => (window.location.href = '/dashboard')}
          variant="outline"
          className="border-slate-800 hover:bg-slate-800 bg-transparent text-slate-350 hover:text-white"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
