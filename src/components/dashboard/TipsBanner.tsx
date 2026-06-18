'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function TipsBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const tips = [
    {
      title: "Consistency > Intensity",
      desc: "Studying 1 hour every day is much more effective than cramming 7 hours on Sunday. Build a habit.",
    },
    {
      title: "Build Projects, Not Just Tutorials",
      desc: "Tutorial hell is real. Apply what you learn by building small, unguided projects using the concepts.",
    },
    {
      title: "Learn in Public",
      desc: "Share your progress on LinkedIn or X (Twitter). It keeps you accountable and builds your network early.",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [tips.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % tips.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + tips.length) % tips.length);

  return (
    <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full"></div>
      
      <div className="flex items-start gap-4 relative z-10">
        <div className="bg-indigo-500/20 p-3 rounded-xl shrink-0">
          <Lightbulb className="h-6 w-6 text-indigo-400" />
        </div>
        
        <div className="flex-1 min-h-[80px]">
          <h4 className="text-lg font-bold text-indigo-100 mb-1">{tips[currentIndex].title}</h4>
          <p className="text-sm text-indigo-200/80 leading-relaxed">{tips[currentIndex].desc}</p>
        </div>

        <div className="flex flex-col gap-2 shrink-0 ml-4">
          <Button variant="ghost" size="icon" onClick={prev} className="h-8 w-8 text-indigo-300 hover:text-white hover:bg-indigo-500/20">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={next} className="h-8 w-8 text-indigo-300 hover:text-white hover:bg-indigo-500/20">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex justify-center gap-1.5 mt-4">
        {tips.map((_, idx) => (
          <div 
            key={idx} 
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              idx === currentIndex ? "w-4 bg-indigo-400" : "w-1.5 bg-indigo-900/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
