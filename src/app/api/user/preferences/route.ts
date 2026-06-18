import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { ExperienceLevel, PreferredLanguage } from '@prisma/client';

export async function PATCH(req: Request) {
  try {
    const supabase = await getSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      targetRole,
      experienceLevel,
      availableHoursPerWeek,
      preferredLanguage,
      weeklyProgressEmails,
      dailyStudyReminders,
    } = body;

    const updateData: any = {};
    if (typeof targetRole === 'string') updateData.targetRole = targetRole;
    if (experienceLevel && Object.values(ExperienceLevel).includes(experienceLevel)) {
      updateData.experienceLevel = experienceLevel as ExperienceLevel;
    }
    if (typeof availableHoursPerWeek === 'number') {
      updateData.availableHoursPerWeek = availableHoursPerWeek;
    }
    if (preferredLanguage && Object.values(PreferredLanguage).includes(preferredLanguage)) {
      updateData.preferredLanguage = preferredLanguage as PreferredLanguage;
    }
    if (typeof weeklyProgressEmails === 'boolean') {
      updateData.weeklyProgressEmails = weeklyProgressEmails;
    }
    if (typeof dailyStudyReminders === 'boolean') {
      updateData.dailyStudyReminders = dailyStudyReminders;
    }

    const updatedProfile = await prisma.studentProfile.upsert({
      where: { userId: user.id },
      update: updateData,
      create: {
        userId: user.id,
        targetRole: targetRole || 'Full Stack Developer',
        experienceLevel: (experienceLevel as ExperienceLevel) || ExperienceLevel.BEGINNER,
        availableHoursPerWeek: availableHoursPerWeek || 10,
        preferredLanguage: (preferredLanguage as PreferredLanguage) || PreferredLanguage.ENGLISH,
        onboardingCompleted: true,
        weeklyProgressEmails: typeof weeklyProgressEmails === 'boolean' ? weeklyProgressEmails : true,
        dailyStudyReminders: typeof dailyStudyReminders === 'boolean' ? dailyStudyReminders : false,
      },
    });

    return NextResponse.json({ profile: updatedProfile });
  } catch (error: any) {
    console.error('Error updating user preferences:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
