'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface GeneratingLoaderProps {
  targetRole: string;
}

export function GeneratingLoader({ targetRole }: GeneratingLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Analyzing your skill level...",
    "Mapping the best learning path...",
    `Curating top resources for ${targetRole}...`,
    "Building your week-by-week plan...",
    "Almost done! Finalizing your curriculum..."
  ];

  useEffect(() => {
    // Fill progress bar over roughly 20 seconds (20000ms)
    // 20000 / 100 = 200ms per 1%
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return prev; // Stop at 98% until actually done
        return prev + 1;
      });
    }, 200);

    // Rotate messages every 4 seconds (20s total / 5 messages = 4s each)
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, messages.length - 1));
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm">
      <div className="w-full max-w-md p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-indigo-500 blur-[40px] opacity-20 rounded-full animate-pulse"></div>
          <Loader2 className="h-16 w-16 text-indigo-500 animate-spin relative z-10" />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">Crafting your path</h3>
        
        <div className="h-6 mb-6">
          <p className="text-indigo-300 font-medium animate-pulse transition-all duration-300">
            {messages[messageIndex]}
          </p>
        </div>

        <div className="w-full space-y-2">
          <Progress value={progress} className="h-2 bg-slate-800 [&>div]:bg-indigo-500" />
          <p className="text-xs text-slate-500 text-right">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
}
