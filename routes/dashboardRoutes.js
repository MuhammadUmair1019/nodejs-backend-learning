import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorizeMiddleware.js";
import { getDashboardStats } from "../controllers/dashboardControllers.js";

export const router = express.Router();

router.use(authMiddleware);
router.use(authorize("admin", "manager"));

router.get("/stats", getDashboardStats);
