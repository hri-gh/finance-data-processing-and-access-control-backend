import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import conf from "../config";

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            role: user.role,
        },
        conf.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
    };
};
