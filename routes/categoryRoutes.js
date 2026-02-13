import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorizeMiddleware.js";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryControllers.js";

export const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Read — any logged-in user
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Write — admin/manager only
router.post("/", authorize("admin", "manager"), createCategory);
router.put("/:id", authorize("admin", "manager"), updateCategory);
router.delete("/:id", authorize("admin", "manager"), deleteCategory);
