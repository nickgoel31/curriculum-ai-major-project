import { prisma } from '../prisma';
import { Curriculum, CurriculumStatus, Prisma } from '@prisma/client';

export async function getCurriculaByUserId(userId: string): Promise<Curriculum[]> {
  try {
    return await prisma.curriculum.findMany({
      where: { userId, isDeleted: false },
      orderBy: { updatedAt: 'desc' },
    });
  } catch (error) {
    console.error(`Error getting curricula for user ${userId}:`, error);
    return [];
  }
}

export async function getCurriculumById(id: string): Promise<Curriculum | null> {
  try {
    return await prisma.curriculum.findUnique({
      where: { id },
      include: {
        weeks: {
          include: {
            resources: true,
            tasks: true,
          },
          orderBy: { weekNumber: 'asc' },
        },
      },
    });
  } catch (error) {
    console.error(`Error getting curriculum ${id}:`, error);
    return null;
  }
}

export async function createCurriculum(data: Prisma.CurriculumCreateInput): Promise<Curriculum | null> {
  try {
    return await prisma.curriculum.create({
      data,
    });
  } catch (error) {
    console.error('Error creating curriculum:', error);
    return null;
  }
}

export async function updateCurriculumStatus(id: string, status: CurriculumStatus): Promise<Curriculum | null> {
  try {
    return await prisma.curriculum.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    console.error(`Error updating curriculum status for ${id}:`, error);
    return null;
  }
}
