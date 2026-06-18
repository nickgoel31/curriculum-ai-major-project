'use client';

import { useEffect, useRef } from 'react';
import { useCurriculumStore } from '@/store/curriculumStore';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, Lock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function WeekTimeline() {
  const { curriculumData, selectedWeekId, setSelectedWeekId, completedWeekIds } = useCurriculumStore();
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedWeekId]);

  if (!curriculumData) return null;

  const currentWeekNum = curriculumData.currentWeek;

  return (
    <div className="bg-slate-900/30 border border-slate-800 rounded-2xl h-full flex flex-col">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 rounded-t-2xl sticky top-0 z-10 backdrop-blur-md">
        <h3 className="font-semibold text-slate-200">Curriculum Timeline</h3>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="relative pl-3 space-y-4">
          <div className="absolute left-[19px] top-4 bottom-4 w-px bg-slate-800"></div>
          
          {curriculumData.weeks.map((week) => {
            const isCompleted = completedWeekIds.has(week.id);
            const isCurrent = week.weekNumber === currentWeekNum;
            const isLocked = week.weekNumber > currentWeekNum && !isCompleted;
            const isSelected = selectedWeekId === week.id;
            
            return (
              <button
                key={week.id}
                ref={isSelected ? selectedRef : null}
                onClick={() => setSelectedWeekId(week.id)}
                className={cn(
                  "relative flex items-start gap-4 p-3 rounded-xl w-full text-left transition-all",
                  isSelected ? "bg-indigo-600/10" : "hover:bg-slate-800/50",
                  isLocked ? "opacity-60" : "opacity-100"
                )}
              >
                <div className="relative z-10 bg-slate-950 rounded-full mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-500/20" />
                  ) : isCurrent ? (
                    <div className="h-5 w-5 rounded-full border-2 border-indigo-500 bg-indigo-500/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></div>
                    </div>
                  ) : isLocked ? (
                    <Lock className="h-5 w-5 text-slate-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-slate-600" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-xs font-semibold uppercase tracking-wider mb-0.5",
                    isSelected ? "text-indigo-400" : isCompleted ? "text-emerald-500" : "text-slate-500"
                  )}>
                    Week {week.weekNumber}
                  </p>
                  <p className={cn(
                    "text-sm font-medium truncate",
                    isSelected ? "text-slate-200" : "text-slate-400"
                  )}>
                    {week.theme}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
