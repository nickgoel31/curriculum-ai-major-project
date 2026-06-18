import { prisma } from '../prisma';

export async function getProgressByUserId(userId: string) {
  try {
    return await prisma.curriculum.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        status: true,
        totalWeeks: true,
        currentWeek: true,
        weeks: {
          select: {
            id: true,
            isCompleted: true,
            tasks: {
              select: {
                id: true,
                isCompleted: true,
              }
            }
          }
        }
      }
    });
  } catch (error) {
    console.error(`Error getting progress for user ${userId}:`, error);
    return [];
  }
}

export async function recordProgress(taskId: string, isCompleted: boolean) {
  try {
    return await prisma.task.update({
      where: { id: taskId },
      data: { 
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
      },
    });
  } catch (error) {
    console.error(`Error recording progress for task ${taskId}:`, error);
    return null;
  }
}

export async function getCompletionStats(curriculumId: string) {
  try {
    const curriculum = await prisma.curriculum.findUnique({
      where: { id: curriculumId },
      include: {
        weeks: {
          include: {
            tasks: true,
          }
        }
      }
    });

    if (!curriculum) return null;

    let totalTasks = 0;
    let completedTasks = 0;

    curriculum.weeks.forEach(week => {
      totalTasks += week.tasks.length;
      completedTasks += week.tasks.filter(t => t.isCompleted).length;
    });

    return {
      totalTasks,
      completedTasks,
      percentage: totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100),
    };
  } catch (error) {
    console.error(`Error getting completion stats for curriculum ${curriculumId}:`, error);
    return null;
  }
}
