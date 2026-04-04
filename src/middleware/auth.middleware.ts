import { prisma } from "../config/prisma";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import conf from "../config";

interface JwtPayload {
    userId: string;
    role: "ADMIN" | "ANALYST" | "VIEWER";
}

export const authMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized: No token");
    }

    const decoded = jwt.verify(token, conf.JWT_SECRET) as JwtPayload;

    // DB verification (FUTURE ACTION: Can be improved by adding Cache storage and TTL)
    const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, role: true },
    });

    if (!user) {
        throw new ApiError(401, "Invalid token user");
    }

    req.user = {
        userId: user.id,
        role: user.role
    };

    next();
});
