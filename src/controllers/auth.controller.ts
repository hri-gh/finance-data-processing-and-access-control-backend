import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import * as authService from "../services/auth.service";

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    res
        .cookie("accessToken", result.token, {
            httpOnly: true,
            secure: false,
        })
        .json(new ApiResponse(result, "Login successful"));
});
