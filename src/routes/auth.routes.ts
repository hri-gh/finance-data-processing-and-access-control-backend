import { Router } from "express";
import { loginUser } from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { LoginSchema } from "../validators/auth.validator";

const router = Router();

router.post("/login", validate(LoginSchema), loginUser);

export default router;
