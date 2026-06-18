import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { WeekTimeline } from '@/components/curriculum/WeekTimeline';
import { WeekDetail } from '@/components/curriculum/WeekDetail';
import { ProgressStats } from '@/components/curriculum/ProgressStats';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PlayCircle, PauseCircle, PlusCircle } from 'lucide-react';
import CurriculumInitializer from './CurriculumInitializer';

export default async function CurriculumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null; // Handled by middleware
  }

  // Fetch full curriculum
  const curriculum = await prisma.curriculum.findUnique({
    where: { id },
    include: {
      weeks: {
        include: {
          resources: true,
          tasks: true,
        },
        orderBy: {
          weekNumber: 'asc',
        },
      },
    },
  });

  if (!curriculum || curriculum.userId !== user.id) {
    notFound();
  }

  // Calculate top level stats
  const completedWeeksCount = curriculum.weeks.filter(w => w.isCompleted).length;
  const progressPercentage = Math.round((completedWeeksCount / curriculum.totalWeeks) * 100);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      {/* Client component to initialize Zustand store with server data */}
      <CurriculumInitializer curriculum={curriculum as any} />

      {/* TOP SECTION: Header */}
      <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-3 py-1 text-sm uppercase tracking-wider">
                {curriculum.targetRole}
              </Badge>
              <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700 px-3 py-1 text-sm">
                {curriculum.status}
              </Badge>
            </div>
            
            <h1 className="text-4xl font-bold text-white tracking-tight">{curriculum.title}</h1>
            
            <div className="flex items-center gap-6 text-slate-400 font-medium">
              <span>{curriculum.totalWeeks} Weeks Total</span>
              <span>•</span>
              <span>Estimated ~{curriculum.totalWeeks * 10} Hours</span>
            </div>
          </div>

          <div className="flex gap-3">
            {curriculum.status === 'ACTIVE' ? (
              <Button variant="outline" className="bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800">
                <PauseCircle className="mr-2 h-4 w-4" /> Pause
              </Button>
            ) : (
              <Button variant="outline" className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20">
                <PlayCircle className="mr-2 h-4 w-4" /> Resume
              </Button>
            )}
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> New Path
            </Button>
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-slate-400">Overall Progress</span>
            <span className="text-indigo-400">{completedWeeksCount} of {curriculum.totalWeeks} weeks completed</span>
          </div>
          <Progress value={progressPercentage} className="h-3 bg-slate-800 [&>div]:bg-gradient-to-r [&>div]:from-indigo-600 [&>div]:to-violet-500" />
        </div>
      </div>

      {/* MIDDLE SECTION: Timeline & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 h-[calc(100vh-240px)] sticky top-6">
          <WeekTimeline />
        </div>
        <div className="lg:col-span-8">
          <WeekDetail />
        </div>
      </div>

      {/* BOTTOM SECTION: Progress Stats */}
      <div className="pt-8 border-t border-slate-800">
        <ProgressStats />
      </div>
    </div>
  );
}
