import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await getSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

    if (!curriculum) {
      return NextResponse.json({ error: 'Curriculum not found' }, { status: 404 });
    }

    // Ensure user owns this curriculum
    if (curriculum.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ curriculum });
  } catch (error: any) {
    console.error('Error fetching curriculum:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await getSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const curriculum = await prisma.curriculum.findUnique({
      where: { id },
    });

    if (!curriculum) {
      return NextResponse.json({ error: 'Curriculum not found' }, { status: 404 });
    }

    if (curriculum.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updated = await prisma.curriculum.update({
      where: { id },
      data: { isDeleted: true },
    });

    return NextResponse.json({ success: true, curriculum: updated });
  } catch (error: any) {
    console.error('Error soft-deleting curriculum:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

