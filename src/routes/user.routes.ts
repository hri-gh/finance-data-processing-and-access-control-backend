import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { checkRole } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.middleware";

import {
    CreateUserSchema,
    UpdateUserSchema,
} from "../validators/user.validator";

const router = Router();

// Admin only
router.post(
    "/",
    authMiddleware,
    checkRole(["ADMIN"]),
    validate(CreateUserSchema),
    userController.createUser
);

router.get(
    "/",
    authMiddleware,
    checkRole(["ADMIN"]),
    userController.getUsers
);

router.patch(
    "/:id",
    authMiddleware,
    checkRole(["ADMIN"]),
    validate(UpdateUserSchema),
    userController.updateUserRole
);

export default router;
