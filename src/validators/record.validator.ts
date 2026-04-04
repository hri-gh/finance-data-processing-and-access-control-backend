import { z } from "zod";

export const CreateRecordSchema = z.object({
    amount: z.number().positive("Amount must be positive"),
    type: z.enum(["INCOME", "EXPENSE"]),
    category: z.string().min(1, "Category is required"),
    note: z.string().optional(),
    date: z.iso.date()


});

export const UpdateRecordSchema = CreateRecordSchema.partial();


