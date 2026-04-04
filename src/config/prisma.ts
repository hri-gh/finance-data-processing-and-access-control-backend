import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import conf from ".";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

const adapter = new PrismaNeon({
    connectionString: conf.DATABASE_URL!,
})

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter,
    })

if (conf.ENV !== "production") globalForPrisma.prisma = prisma
