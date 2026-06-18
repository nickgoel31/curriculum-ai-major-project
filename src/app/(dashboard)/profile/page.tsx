import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { ProfileClient } from '@/components/profile/ProfileClient';

export const metadata = {
  title: 'Profile & Settings | CurriculumAI',
  description: 'Manage your personal profile, learning targets, notification configurations, and account.',
};

export default async function ProfilePage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) {
    redirect('/login');
  }

  // Fetch complete user details including profile and curricula
  const dbUser = await prisma.user.findUnique({
    where: { id: authUser.id },
    include: {
      studentProfile: true,
      curricula: {
        where: { isDeleted: false },
        include: {
          weeks: true,
        },
        orderBy: { generatedAt: 'desc' },
      },
    },
  });

  if (!dbUser) {
    // If auth user exists but not in DB, sync them or redirect
    redirect('/login');
  }

  // Transform dbUser to plain serializable object for Client Component
  const initialData = {
    id: dbUser.id,
    email: dbUser.email,
    name: dbUser.name,
    avatar_url: dbUser.avatar_url,
    created_at: dbUser.created_at.toISOString(),
    studentProfile: dbUser.studentProfile
      ? {
          targetRole: dbUser.studentProfile.targetRole,
          experienceLevel: dbUser.studentProfile.experienceLevel,
          availableHoursPerWeek: dbUser.studentProfile.availableHoursPerWeek,
          preferredLanguage: dbUser.studentProfile.preferredLanguage,
          weeklyProgressEmails: dbUser.studentProfile.weeklyProgressEmails,
          dailyStudyReminders: dbUser.studentProfile.dailyStudyReminders,
        }
      : null,
    curricula: dbUser.curricula.map((c) => ({
      id: c.id,
      title: c.title,
      targetRole: c.targetRole,
      totalWeeks: c.totalWeeks,
      currentWeek: c.currentWeek,
      status: c.status,
      generatedAt: c.generatedAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
      weeks: c.weeks.map((w) => ({
        isCompleted: w.isCompleted,
      })),
    })),
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <ProfileClient initialData={initialData} />
    </div>
  );
}

