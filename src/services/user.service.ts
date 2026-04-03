import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import { ApiError } from "../utils";

export const createUser = async (data: {
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "ANALYST" | "VIEWER";
}) => {
    const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role,
        },
    });

    return user;
};

export const getUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
        },
    });
};

export const updateUserRole = async (id: string, role: string) => {
    return prisma.user.update({
        where: { id },
        data: { role: role as any },
    });
};
