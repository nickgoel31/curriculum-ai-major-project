import { prisma } from '../prisma';
import { Week } from '@prisma/client';

export async function getWeeksByCurriculumId(curriculumId: string): Promise<Week[]> {
  try {
    return await prisma.week.findMany({
      where: { curriculumId },
      include: {
        resources: true,
        tasks: true,
      },
      orderBy: { weekNumber: 'asc' },
    });
  } catch (error) {
    console.error(`Error getting weeks for curriculum ${curriculumId}:`, error);
    return [];
  }
}

export async function markWeekComplete(id: string, isCompleted: boolean = true): Promise<Week | null> {
  try {
    return await prisma.week.update({
      where: { id },
      data: {
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
      },
    });
  } catch (error) {
    console.error(`Error marking week ${id} complete:`, error);
    return null;
  }
}
