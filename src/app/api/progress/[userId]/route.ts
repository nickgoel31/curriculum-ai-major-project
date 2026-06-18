import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { calculateStreak, calculateBadges, getSkillsProgress, FullCurriculum } from '@/lib/progress-helpers';

export async function GET(req: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params;
    const supabase = await getSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const curricula = await prisma.curriculum.findMany({
      where: { userId },
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
    if (activeCurriculum) {
      skillsProgress = getSkillsProgress(activeCurriculum as FullCurriculum);
    }

    // Last 30 days of activity for the chart
    const today = new Date();
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (29 - i));
      return d.toISOString().split('T')[0];
    });

    // Mock count tasks per day (in reality, requires task completions to have exact dates tracking per task, but we only store `completedAt` on Task, which is fine since we update it)
    const allCompletedTasks = curricula.flatMap(c => 
      c.weeks.flatMap(w => 
        w.tasks.filter(t => t.isCompleted && t.completedAt)
      )
    );

    const activityChartData = last30Days.map(date => {
      const count = allCompletedTasks.filter(t => new Date(t.completedAt as Date).toISOString().split('T')[0] === date).length;
      return {
        date,
        // formatted date for display (e.g. "Jun 16")
        displayDate: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        tasks: count
      };
    });

    return NextResponse.json({
      activeCurriculum,
      currentStreak,
      longestStreak,
      activityDates,
      badges,
      skillsProgress,
      activityChartData
    });

  } catch (error: any) {
    console.error('Error fetching progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
