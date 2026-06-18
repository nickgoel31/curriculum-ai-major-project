import { getSupabaseServerClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BookOpen, CheckCircle2, Flame, Target, Plus } from 'lucide-react';
import { ActiveCurriculumCard } from '@/components/dashboard/ActiveCurriculumCard';
import { TodaysTasks } from '@/components/dashboard/TodaysTasks';
import { ExploreRoles } from '@/components/dashboard/ExploreRoles';
import { TipsBanner } from '@/components/dashboard/TipsBanner';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Dashboard | CurriculumAI',
  description: 'Your personalized learning dashboard',
};

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch profile and active curriculum
  const profile = await prisma.studentProfile.findUnique({
    where: { userId: user.id },
  });

  const activeCurriculum = await prisma.curriculum.findFirst({
    where: { 
      userId: user.id,
      status: 'ACTIVE'
    },
    orderBy: { updatedAt: 'desc' },
    include: {
      weeks: {
        include: { tasks: true },
        orderBy: { weekNumber: 'asc' }
      }
    }
  });

  // Derived stats
  const currentWeekNum = activeCurriculum?.currentWeek || 0;
  const currentWeekData = activeCurriculum?.weeks.find(w => w.weekNumber === currentWeekNum);
  const tasksThisWeek = currentWeekData?.tasks || [];
  
  const totalCompletedWeeks = activeCurriculum ? activeCurriculum.weeks.filter(w => w.isCompleted).length : 0;
  const progressPercent = activeCurriculum && activeCurriculum.totalWeeks > 0 
    ? Math.round((totalCompletedWeeks / activeCurriculum.totalWeeks) * 100) 
    : 0;

  // Time-based greeting
  const hour = new Date().getHours();
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';

  const name = user.user_metadata?.full_name?.split(' ')[0] || 'there';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* SECTION 1: Greeting Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
          {greeting}, {name}! 👋
        </h1>
        {activeCurriculum ? (
          <p className="text-slate-400 text-lg">
            You're on <span className="text-indigo-400 font-medium">Week {currentWeekNum}</span> of your {activeCurriculum.targetRole} path. Keep it up!
          </p>
        ) : (
          <p className="text-slate-400 text-lg">Ready to start your learning journey?</p>
        )}
      </div>

      {!activeCurriculum && (
        <div className="bg-gradient-to-r from-indigo-900/40 to-violet-900/40 border border-indigo-500/20 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-10 w-48 h-48 bg-indigo-500/20 blur-3xl rounded-full"></div>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">No Active Learning Path</h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-8">
              Generate a personalized, highly curated curriculum tailored to your specific goals and skill level in less than 30 seconds.
            </p>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-500 text-white h-14 px-8 text-lg rounded-xl shadow-lg shadow-indigo-500/25">
              <Link href="/onboarding">
                <Plus className="mr-2 h-5 w-5" /> Create Your Learning Path
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* SECTION 2: Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Curriculum', value: activeCurriculum ? activeCurriculum.title : 'None', icon: BookOpen, color: 'text-blue-400' },
          { label: 'Current Week', value: activeCurriculum ? `${currentWeekNum} of ${activeCurriculum.totalWeeks}` : '-', icon: Target, color: 'text-emerald-400' },
          { label: 'Overall Progress', value: activeCurriculum ? `${progressPercent}%` : '-', icon: CheckCircle2, color: 'text-violet-400' },
          { label: 'Weekly Streak', value: '3 Days', icon: Flame, color: 'text-orange-400' }, // Hardcoded for now
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-colors rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            </div>
            <p className="text-xl font-bold text-white truncate" title={stat.value}>{stat.value}</p>
          </div>
        ))}
      </div>

      {activeCurriculum && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            {/* SECTION 3: Active Curriculum Card */}
            <ActiveCurriculumCard curriculum={activeCurriculum} />
            
            {/* SECTION 6: Tips Banner (moved up on larger screens if active curriculum) */}
            <div className="hidden xl:block">
              <TipsBanner />
            </div>
          </div>
          
          <div className="space-y-8">
            {/* SECTION 4: Today's Tasks */}
            <TodaysTasks curriculumId={activeCurriculum.id} tasks={tasksThisWeek} />
            
            {/* SECTION 6: Tips Banner (mobile/tablet order) */}
            <div className="xl:hidden">
              <TipsBanner />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: Explore Roles */}
      {(!activeCurriculum || true) && ( // Always show explore roles at the bottom
        <div className="pt-8 border-t border-slate-800/60 mt-12">
          <ExploreRoles />
        </div>
      )}

    </div>
  );
}
