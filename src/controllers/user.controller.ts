import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import { asyncHandler } from "../utils";
import { ApiResponse } from "../utils";

export const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUser(req.body);

    res.status(201).json(new ApiResponse(user, "User created successfully"));
});

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await userService.getUsers();

        res.json({
            success: true,
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

export const updateUserRole = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { role } = req.body;
        const { id } = req.params as { id: string };

        const updatedUser = await userService.updateUserRole(id, role);

        res.json({
            success: true,
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};
