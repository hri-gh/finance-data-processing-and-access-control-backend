import { Router } from "express";
import * as recordController from "../controllers/record.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { checkRole } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.middleware";
import {
    CreateRecordSchema,
    UpdateRecordSchema,
} from "../validators/record.validator";

const router = Router();

// Create (Admin only)
router.post(
    "/",
    authMiddleware,
    checkRole(["ADMIN"]),
    validate(CreateRecordSchema),
    recordController.createRecord
);

// Read (All roles)
router.get("/", authMiddleware, recordController.getRecords);


// Update/Delete (Admin only)
router.patch(
    "/:id",
    authMiddleware,
    checkRole(["ADMIN"]),
    validate(UpdateRecordSchema),
    recordController.updateRecord
);

router.delete(
    "/:id",
    authMiddleware,
    checkRole(["ADMIN"]),
    recordController.deleteRecord
);

// Summary
router.get(
    "/summary",
    authMiddleware,
    recordController.getSummary
);
router.get(
    "/summary/category",
    authMiddleware,
    recordController.getCategorySummary
);

router.get("/recent", authMiddleware, recordController.getRecentRecords);

router.get("/filter", authMiddleware, recordController.getFilteredRecords);

router.get("/:id", authMiddleware, recordController.getRecord);


export default router;
