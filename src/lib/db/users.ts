import { prisma } from '../prisma';
import { User, Prisma } from '@prisma/client';

export async function getUserById(id: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Error getting user by ID ${id}:`, error);
    return null;
  }
}

export async function createUser(data: Prisma.UserCreateInput): Promise<User | null> {
  try {
    return await prisma.user.create({
      data,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
  try {
    return await prisma.user.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    return null;
  }
}
