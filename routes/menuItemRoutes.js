import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorizeMiddleware.js";
import {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuItemControllers.js";

export const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Read — any logged-in user
router.get("/", getAllMenuItems);
router.get("/:id", getMenuItemById);

// Write — admin/manager only
router.post("/", authorize("admin", "manager"), createMenuItem);
router.put("/:id", authorize("admin", "manager"), updateMenuItem);
router.delete("/:id", authorize("admin", "manager"), deleteMenuItem);
