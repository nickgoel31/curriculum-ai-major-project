import { BadgeStatus } from '@/lib/progress-helpers';
import { Lock, Medal } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

interface BadgesProps {
  badges: BadgeStatus[];
}

export function Badges({ badges }: BadgesProps) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
        <Medal className="h-5 w-5 text-yellow-500" /> Achievements
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <TooltipProvider>
          {badges.map((badge) => (
            <Tooltip key={badge.id}>
              <TooltipTrigger asChild>
                <div className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all cursor-help text-center",
                  badge.earned 
                    ? "bg-slate-800/50 border-indigo-500/30 hover:border-indigo-500/60 hover:bg-slate-800" 
                    : "bg-slate-900/30 border-slate-800 opacity-50 grayscale hover:opacity-75"
                )}>
                  <div className="text-4xl mb-3 relative">
                    {badge.icon}
                    {!badge.earned && (
                      <div className="absolute -bottom-2 -right-2 bg-slate-800 rounded-full p-1 border border-slate-700">
                        <Lock className="h-3 w-3 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-200 leading-tight mb-1">{badge.name}</h4>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-800 border-slate-700 text-slate-200">
                <p className="font-semibold">{badge.name}</p>
                <p className="text-xs text-slate-400 mt-1">{badge.description}</p>
                {badge.earned && badge.earnedAt && (
                  <p className="text-[10px] text-indigo-400 mt-2">Earned {new Date(badge.earnedAt).toLocaleDateString()}</p>
                )}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
}
