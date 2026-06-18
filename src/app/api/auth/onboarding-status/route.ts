import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { hasCompletedOnboarding } from '@/lib/db/profiles';

export async function GET() {
  try {
    const supabase = await getSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ completed: false }, { status: 401 });
    }

    const completed = await hasCompletedOnboarding(user.id);

    return NextResponse.json({ completed });
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return NextResponse.json({ completed: false, error: 'Internal server error' }, { status: 500 });
  }
}
