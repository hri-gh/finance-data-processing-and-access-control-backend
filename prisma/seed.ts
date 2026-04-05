import "dotenv/config"
import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma"


async function main() {
    console.log("🌱 Seeding database...");

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // 👤 Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            name: "Admin User",
            email: "admin@example.com",
            password: hashedPassword,
            role: "ADMIN",
            status: "ACTIVE",
        },
    });

    console.log("✅ Admin created:", admin.email);
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
