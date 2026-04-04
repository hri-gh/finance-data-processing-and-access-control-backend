import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils";

export const checkRole = (allowedRoles: ("ADMIN" | "ANALYST" | "VIEWER")[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            throw new ApiError(401, "Unauthorized");
        }

        if (!allowedRoles.includes(user.role)) {
            throw new ApiError(403, "Forbidden: Access denied");
        }

        next();
    };
};
