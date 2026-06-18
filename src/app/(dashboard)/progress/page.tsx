import { getSupabaseServerClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { calculateStreak, calculateBadges, getSkillsProgress, FullCurriculum } from '@/lib/progress-helpers';
import { ActivityChart } from '@/components/progress/ActivityChart';
import { WeekBreakdown } from '@/components/progress/WeekBreakdown';
import { SkillsProgress } from '@/components/progress/SkillsProgress';
import { StreakCalendar } from '@/components/progress/StreakCalendar';
import { Badges } from '@/components/progress/Badges';
import { format, addWeeks } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Target, Calendar as CalendarIcon, CheckCircle2, Clock } from 'lucide-react';

export const metadata = {
  title: 'Progress | CurriculumAI',
  description: 'Track your learning journey',
};

export default async function ProgressPage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const curricula = await prisma.curriculum.findMany({
    where: { userId: user.id },
    include: {
      weeks: {
        include: {
          tasks: true,
          resources: true,
        },
        orderBy: { weekNumber: 'asc' }
      }
    },
    orderBy: { updatedAt: 'desc' }
  });

  const activeCurriculum = curricula.find(c => c.status === 'ACTIVE') || curricula[0];
  const { currentStreak, longestStreak, activityDates } = calculateStreak(curricula as FullCurriculum[]);
  const badges = calculateBadges(curricula as FullCurriculum[], currentStreak);
  let skillsProgress: any[] = [];
  
  let overallPercent = 0;
  let completedWeeks = 0;
  let totalWeeks = 0;
  let tasksDone = 0;
  let totalTasks = 0;
  let startDate = new Date();
  let estimatedEndDate = new Date();
  let scheduleStatus = 'On Track';

  if (activeCurriculum) {
    skillsProgress = getSkillsProgress(activeCurriculum as FullCurriculum);
    
    totalWeeks = activeCurriculum.totalWeeks;
    completedWeeks = activeCurriculum.weeks.filter(w => w.isCompleted).length;
    overallPercent = totalWeeks > 0 ? Math.round((completedWeeks / totalWeeks) * 100) : 0;
    
    tasksDone = activeCurriculum.weeks.reduce((acc, w) => acc + w.tasks.filter(t => t.isCompleted).length, 0);
    totalTasks = activeCurriculum.weeks.reduce((acc, w) => acc + w.tasks.length, 0);

    startDate = new Date(activeCurriculum.generatedAt);
    estimatedEndDate = addWeeks(startDate, totalWeeks);

    // Naive schedule calculation
    const weeksSinceStart = Math.max(0, Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)));
    if (completedWeeks > weeksSinceStart) scheduleStatus = 'Ahead of Schedule';
    else if (completedWeeks < weeksSinceStart - 1) scheduleStatus = 'Behind Schedule';
  }

  // Chart data calculation
  const today = new Date();
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });
  const allCompletedTasks = curricula.flatMap(c => c.weeks.flatMap(w => w.tasks.filter(t => t.isCompleted && t.completedAt)));
  const activityChartData = last30Days.map(date => {
    const count = allCompletedTasks.filter(t => new Date(t.completedAt as Date).toISOString().split('T')[0] === date).length;
    return {
      date,
      displayDate: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      tasks: count
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* SECTION 1: Overall Progress Summary */}
      <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 md:gap-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>
        
        {/* Circular Progress Ring */}
        <div className="relative shrink-0">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
            <circle 
              cx="96" cy="96" r="88" 
              stroke="currentColor" 
              strokeWidth="12" 
              fill="transparent" 
              strokeDasharray={88 * 2 * Math.PI} 
              strokeDashoffset={88 * 2 * Math.PI - ((overallPercent / 100) * 88 * 2 * Math.PI)}
              className="text-indigo-500 transition-all duration-1000 ease-out" 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold text-white">{overallPercent}%</span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Complete</span>
          </div>
        </div>

        <div className="flex-1 space-y-6 text-center md:text-left z-10">
          <div>
            <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">Your Learning Journey</h1>
              {activeCurriculum && (
                <Badge variant="outline" className={
                  scheduleStatus === 'Ahead of Schedule' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  scheduleStatus === 'Behind Schedule' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                  'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }>
                  {scheduleStatus === 'Ahead of Schedule' ? '🚀' : scheduleStatus === 'Behind Schedule' ? '⚠️' : '🎯'} {scheduleStatus}
                </Badge>
              )}
            </div>
            <p className="text-slate-400">Track your milestones and build your technical skills.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg shrink-0">
                <Target className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white leading-tight">{completedWeeks} <span className="text-sm font-medium text-slate-500">/ {totalWeeks}</span></p>
                <p className="text-xs text-slate-400 font-medium">Weeks Finished</p>
              </div>
            </div>
            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg shrink-0">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white leading-tight">{tasksDone} <span className="text-sm font-medium text-slate-500">/ {totalTasks}</span></p>
                <p className="text-xs text-slate-400 font-medium">Tasks Completed</p>
              </div>
            </div>
          </div>

          {activeCurriculum && (
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <CalendarIcon className="h-4 w-4" />
                <span>Started: <strong className="text-slate-300">{format(startDate, 'MMM d, yyyy')}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="h-4 w-4" />
                <span>Target: <strong className="text-slate-300">{format(estimatedEndDate, 'MMM d, yyyy')}</strong></span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid Layout for remaining components */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-8">
          <ActivityChart data={activityChartData} />
          <WeekBreakdown curriculum={activeCurriculum as FullCurriculum} />
        </div>

        {/* Side Column */}
        <div className="lg:col-span-4 space-y-8">
          <StreakCalendar currentStreak={currentStreak} longestStreak={longestStreak} activityDates={activityDates || []} />
          <SkillsProgress skills={skillsProgress} />
        </div>

      </div>

      {/* SECTION 6: Badges */}
      <Badges badges={badges} />

    </div>
  );
}
