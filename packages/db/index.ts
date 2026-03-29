import { config as loadEnv } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const currentDir = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV !== "production") {
  loadEnv({ path: resolve(currentDir, ".env") });
}

let prismaClient: PrismaClient;

export function getPrismaClient() {
  if (!prismaClient) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      console.warn("DATABASE_URL not available during build");
      return null as any;
    }

    const adapter = new PrismaPg({ connectionString });
    prismaClient = new PrismaClient({ adapter });
  }

  return prismaClient;
}

export { prismaClient };