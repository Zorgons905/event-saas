import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { requiredEnv } from "../config";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: requiredEnv("DATABASE_URL"),
});

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
