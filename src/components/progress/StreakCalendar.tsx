import { Flame, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakCalendarProps {
  currentStreak: number;
  longestStreak: number;
  activityDates: string[]; // ISO date strings 'YYYY-MM-DD'
}

export function StreakCalendar({ currentStreak, longestStreak, activityDates }: StreakCalendarProps) {
  // Generate last 90 days grid
  const today = new Date();
  const days = Array.from({ length: 90 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (89 - i));
    return d.toISOString().split('T')[0];
  });

  const activitySet = new Set(activityDates);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-bold text-slate-200">Learning Consistency</h3>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20">
            <Flame className="h-4 w-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-400">{currentStreak} Day Streak</span>
          </div>
          <div className="flex items-center gap-2 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">
            <Trophy className="h-4 w-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-400">Best: {longestStreak}</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        {/* Simple grid representation (not a perfect calendar matrix, just a wrapping flex layout or grid) */}
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 w-max">
          {days.map((date, i) => {
            const hasActivity = activitySet.has(date);
            return (
              <div
                key={date}
                title={hasActivity ? `${date}: Activity recorded` : date}
                className={cn(
                  "w-3 h-3 rounded-sm transition-colors",
                  hasActivity ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]" : "bg-slate-800"
                )}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-end items-center gap-2 mt-4 text-xs text-slate-500">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-slate-800"></div>
        <div className="w-3 h-3 rounded-sm bg-indigo-500/50"></div>
        <div className="w-3 h-3 rounded-sm bg-indigo-500"></div>
        <span>More</span>
      </div>
    </div>
  );
}
