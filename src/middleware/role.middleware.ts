import { Request, Response, NextFunction } from "express";

export const checkRole = (allowedRoles: ("ADMIN" | "ANALYST" | "VIEWER")[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            return next({
                status: 401,
                message: "Unauthorized",
            });
        }

        if (!allowedRoles.includes(user.role)) {
            return next({
                status: 403,
                message: "Forbidden: Access denied",
            });
        }

        next();
    };
};
