import { prisma } from '../prisma';
import { StudentProfile, Prisma } from '@prisma/client';

export async function getProfile(userId: string): Promise<StudentProfile | null> {
  try {
    return await prisma.studentProfile.findUnique({
      where: { userId },
    });
  } catch (error) {
    console.error(`Error getting profile for user ${userId}:`, error);
    return null;
  }
}

export async function createProfile(data: Prisma.StudentProfileCreateInput): Promise<StudentProfile | null> {
  try {
    return await prisma.studentProfile.create({
      data,
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    return null;
  }
}

export async function updateProfile(userId: string, data: Prisma.StudentProfileUpdateInput): Promise<StudentProfile | null> {
  try {
    return await prisma.studentProfile.update({
      where: { userId },
      data,
    });
  } catch (error) {
    console.error(`Error updating profile for user ${userId}:`, error);
    return null;
  }
}

export async function hasCompletedOnboarding(userId: string): Promise<boolean> {
  try {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId },
      select: { onboardingCompleted: true },
    });
    return profile?.onboardingCompleted ?? false;
  } catch (error) {
    console.error(`Error checking onboarding status for user ${userId}:`, error);
    return false;
  }
}
