import Link from 'next/link';
import { ArrowRight, Calendar, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface ActiveCurriculumCardProps {
  curriculum: any; // We'll pass the fetched curriculum
}

export function ActiveCurriculumCard({ curriculum }: ActiveCurriculumCardProps) {
  const currentWeekNum = curriculum.currentWeek;
  const currentWeekData = curriculum.weeks.find((w: any) => w.weekNumber === currentWeekNum);
  const nextWeeks = curriculum.weeks.filter((w: any) => w.weekNumber > currentWeekNum && w.weekNumber <= currentWeekNum + 2);

  if (!currentWeekData) return null;

  const totalTasks = currentWeekData.tasks.length;
  const completedTasks = currentWeekData.tasks.filter((t: any) => t.isCompleted).length;
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="bg-gradient-to-br from-indigo-900/40 via-slate-900/80 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 md:p-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
                Week {currentWeekNum}
              </span>
              <span className="text-slate-400 text-sm font-medium">{curriculum.title}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{currentWeekData.theme}</h2>
            
            <div className="space-y-2">
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider flex items-center gap-2">
                <Target className="h-4 w-4 text-indigo-400" /> This Week's Objectives
              </p>
              <ul className="space-y-1.5 ml-6 list-disc text-slate-300 marker:text-indigo-500">
                {currentWeekData.objectives.slice(0, 3).map((obj: string, i: number) => (
                  <li key={i} className="text-sm">{obj}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-slate-950/50 backdrop-blur-md border border-slate-800 rounded-2xl p-5 min-w-[240px]">
            <p className="text-sm text-slate-400 font-medium mb-2">Week {currentWeekNum} Progress</p>
            <div className="flex items-end justify-between mb-2">
              <span className="text-3xl font-bold text-white">{progressPercent}%</span>
              <span className="text-sm text-slate-500 mb-1">{completedTasks} of {totalTasks} tasks</span>
            </div>
            <Progress value={progressPercent} className="h-2.5 bg-slate-800 [&>div]:bg-indigo-500" />
            
            <Button asChild className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
              <Link href={`/curriculum/${curriculum.id}`}>
                Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {nextWeeks.length > 0 && (
          <div className="pt-6 border-t border-slate-800/60">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Coming Up Next
            </p>
            <div className="flex flex-wrap gap-3">
              {nextWeeks.map((w: any) => (
                <div key={w.id} className="bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-lg text-sm text-slate-300">
                  <span className="text-slate-500 mr-2">W{w.weekNumber}</span> {w.theme}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
