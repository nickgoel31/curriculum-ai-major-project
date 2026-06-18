import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const dbUrl = process.env.DATABASE_URL;
  const logOptions: ('query' | 'error' | 'warn')[] = process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'];

  if (!dbUrl) {
    return new PrismaClient({
      log: logOptions,
      accelerateUrl: 'prisma://localhost:51213/?api_key=dummy',
    });
  }

  if (dbUrl.startsWith('prisma+postgres://') || dbUrl.startsWith('prisma://')) {
    return new PrismaClient({
      log: logOptions,
      accelerateUrl: dbUrl,
    });
  }

  const pool = new pg.Pool({ connectionString: dbUrl });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    log: logOptions,
    adapter,
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
