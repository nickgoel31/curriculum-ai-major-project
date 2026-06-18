import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await getSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { weekId } = body;

    const curriculum = await prisma.curriculum.findUnique({
      where: { id },
      select: { userId: true, currentWeek: true, totalWeeks: true },
    });

    if (!curriculum || curriculum.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Update week
    const updatedWeek = await prisma.week.update({
      where: { id: weekId },
      data: {
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    // Automatically advance curriculum's currentWeek if we completed the current one
    let newCurrentWeek = curriculum.currentWeek;
    if (updatedWeek.weekNumber === curriculum.currentWeek && curriculum.currentWeek < curriculum.totalWeeks) {
      newCurrentWeek = curriculum.currentWeek + 1;
      
      await prisma.curriculum.update({
        where: { id },
        data: { currentWeek: newCurrentWeek },
      });
    } else if (updatedWeek.weekNumber === curriculum.totalWeeks) {
      // If it's the last week, maybe mark curriculum as completed
      await prisma.curriculum.update({
        where: { id },
        data: { status: 'COMPLETED' },
      });
    }

    return NextResponse.json({ success: true, week: updatedWeek, newCurrentWeek });
  } catch (error: any) {
    console.error('Error completing week:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
