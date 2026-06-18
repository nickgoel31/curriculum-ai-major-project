import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase/server';

export async function DELETE(req: Request) {
  try {
    const supabase = await getSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Delete user from Database (cascading deletes student profile, curricula, etc.)
    await prisma.user.delete({
      where: { id: user.id },
    });

    // 2. Delete user from Supabase Auth using the admin client
    const adminClient = getSupabaseAdminClient();
    const { error: authError } = await adminClient.auth.admin.deleteUser(user.id);

    if (authError) {
      console.error('Error deleting user from Supabase auth:', authError);
      // Even if auth delete fails, we cleared DB, but we should inform of full state
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting user account:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Support a POST /api/user/reset to reset all progress as requested in Danger Zone
export async function POST(req: Request) {
  try {
    const supabase = await getSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Reset progress by deleting all curricula
    await prisma.curriculum.deleteMany({
      where: { userId: user.id },
    });

    // Also delete any skill assessments
    await prisma.skillAssessment.deleteMany({
      where: { userId: user.id },
    });

    // Reset onboarding completed status in StudentProfile so they can start fresh
    await prisma.studentProfile.updateMany({
      where: { userId: user.id },
      data: {
        onboardingCompleted: false,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error resetting user progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
