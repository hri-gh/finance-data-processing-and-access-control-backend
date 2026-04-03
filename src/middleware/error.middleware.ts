import { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/ApiError.js"
import { logger } from "../utils/logger.js"

export const errorMiddleware = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ApiError) {
        // Log error on server
        logger.error(err.message, err.errors)

        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors || []
        })
    }

    // Log full error ONLY on server
    logger.error("UNEXPECTED ERROR", err)

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    })
}
