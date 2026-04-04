import { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/ApiError.js"
import { logger } from "../utils/logger.js"

export const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Handle Invalid JSON
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON format",
        })
    }

    // Known Errors
    if (err instanceof ApiError) {
        // Log error on server
        logger.error(err.message, err.errors)

        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors || []
        })
    }

    // Log Unknown error on server
    logger.error("UNEXPECTED ERROR", err)

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    })
}
