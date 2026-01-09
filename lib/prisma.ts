import { PrismaClient } from "@prisma/client";

// Supabase connection configuration
// DATABASE_URL: Pooled connection via PgBouncer (port 6543) for app queries
// DIRECT_URL: Direct connection (port 5432) for migrations (in schema.prisma)

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
