import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { createProfile, getProfile, updateProfile } from '@/lib/db/profiles';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const supabase = await getSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure the User record exists in Prisma DB before linking profile
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email!,
        name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        avatar_url: user.user_metadata?.avatar_url || null,
      },
      create: {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        avatar_url: user.user_metadata?.avatar_url || null,
      },
    });

    const body = await req.json();
    const {
      targetRole,
      experienceLevel,
      currentSkills,
      availableHoursPerWeek,
      preferredLanguage,
    } = body;

    const existingProfile = await getProfile(user.id);

    const profileData = {
      targetRole,
      experienceLevel,
      currentSkills,
      availableHoursPerWeek,
      preferredLanguage,
      onboardingCompleted: true,
    };

    if (existingProfile) {
      await updateProfile(user.id, profileData);
    } else {
      await createProfile({
        user: { connect: { id: user.id } },
        ...profileData,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving profile:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
