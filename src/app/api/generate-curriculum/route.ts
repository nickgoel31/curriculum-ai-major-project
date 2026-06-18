import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { generateCurriculum } from '@/lib/claude';
import { prisma } from '@/lib/prisma';
import { CurriculumStatus, ResourceType, TaskType } from '@/types/database.types';

const generateSchema = z.object({
  targetRole: z.string().min(2),
  experienceLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  currentSkills: z.array(z.string()),
  availableHoursPerWeek: z.number().min(2).max(40),
  targetTimeline: z.number().min(1).max(24).optional(),
  totalWeeks: z.number().min(1).max(24).optional(),
  preferredLanguage: z.enum(['ENGLISH', 'HINDI', 'HINGLISH']),
}).refine(data => data.targetTimeline !== undefined || data.totalWeeks !== undefined, {
  message: "Either targetTimeline or totalWeeks must be provided",
});

export async function POST(req: Request) {
  try {
    // 1. Authenticate user
    const supabase = await getSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure the User record exists in Prisma DB before checking rate limits/creating curriculum
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

    // Rate limiting: count curricula generated today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayCount = await prisma.curriculum.count({
      where: {
        userId: user.id,
        generatedAt: { gte: today, lt: tomorrow },
        isDeleted: false,
      },
    });

    if (todayCount >= 3) {
      return NextResponse.json(
        { message: "You've generated 3 curricula today. Come back tomorrow!" },
        { status: 429 }
      );
    }

    // 2. Validate request body
    const body = await req.json();
    const validation = generateSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid request data', details: validation.error }, { status: 400 });
    }

    const { targetRole, experienceLevel, currentSkills, availableHoursPerWeek, targetTimeline, totalWeeks, preferredLanguage } = validation.data;
    const resolvedTimeline = targetTimeline || totalWeeks || 8;

    // 3. Call Claude API
    const generatedData = await generateCurriculum({
      targetRole,
      experienceLevel,
      currentSkills,
      availableHoursPerWeek,
      totalWeeks: resolvedTimeline,
      preferredLanguage,
    });

    // 4. Save to DB using Prisma transaction
    const savedCurriculum = await prisma.$transaction(async (tx) => {
      // Create Curriculum
      const curriculum = await tx.curriculum.create({
        data: {
          userId: user.id,
          title: generatedData.title,
          targetRole: generatedData.targetRole,
          totalWeeks: generatedData.totalWeeks,
          status: 'ACTIVE' as CurriculumStatus,
        },
      });

      // Map out all weeks, resources, and tasks
      for (const week of generatedData.weeks) {
        const createdWeek = await tx.week.create({
          data: {
            curriculumId: curriculum.id,
            weekNumber: week.weekNumber,
            theme: week.theme,
            objectives: week.objectives,
          },
        });

        // Add resources
        if (week.resources && week.resources.length > 0) {
          await tx.resource.createMany({
            data: week.resources.map(r => ({
              weekId: createdWeek.id,
              title: r.title,
              type: r.type as ResourceType,
              url: r.url,
              platform: r.platform,
              durationMinutes: r.durationMinutes || null,
              isFree: r.isFree,
              description: r.description,
            })),
          });
        }

        // Add tasks
        if (week.tasks && week.tasks.length > 0) {
          await tx.task.createMany({
            data: week.tasks.map(t => ({
              weekId: createdWeek.id,
              title: t.title,
              description: t.description,
              taskType: t.taskType as TaskType,
            })),
          });
        }
      }

      return curriculum;
    });

    // 5. Return success
    return NextResponse.json({ success: true, curriculumId: savedCurriculum.id }, { status: 200 });

  } catch (error: any) {
    console.error('Error in /api/generate-curriculum:', error);
    
    // Determine status code based on error
    let statusCode = 500;
    if (error instanceof SyntaxError) {
      statusCode = 422; // Unprocessable Entity (JSON parse failed)
    }
    
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' }, 
      { status: statusCode }
    );
  }
}
