import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorizeMiddleware.js";
import {
  setStock,
  getAllStock,
  getStock,
  getLowStock,
} from "../controllers/inventoryControllers.js";

export const router = express.Router();

// All inventory routes require authentication + admin/manager
router.use(authMiddleware);
router.use(authorize("admin", "manager"));

router.get("/", getAllStock);
router.get("/low-stock", getLowStock);
router.get("/:menuItemId", getStock);
router.put("/", setStock);
