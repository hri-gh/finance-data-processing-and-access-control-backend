import { Request, Response } from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"

export const testController = asyncHandler(async (req: Request, res: Response) => {
    res.status(201).json(
        new ApiResponse("Test api is running")
    )
})
