import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { ApiError } from "../utils";

export const validate = (schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = await schema.parseAsync(req.body);
        req.body = parsed;
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            // Get only first error message
            // const message = error.issues[0].message;

            const message = error.issues.map((err) => err.message);

            return next(
                new ApiError(400, "Validation failed", message)
            );
        }
        next(error);
    }
};
