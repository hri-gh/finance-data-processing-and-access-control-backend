import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["ADMIN", "ANALYST", "VIEWER"]),
});

export const UpdateUserSchema = z.object({
    role: z.enum(["ADMIN", "ANALYST", "VIEWER"]).optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});
