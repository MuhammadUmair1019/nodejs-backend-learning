import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorizeMiddleware.js";
import {
  placeOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderControllers.js";

export const router = express.Router();

// All order routes require authentication
router.use(authMiddleware);

// Any authenticated user
router.post("/", placeOrder);
router.get("/", getUserOrders);

// Admin/manager — view all orders (must be before /:id)
router.get("/all", authorize("admin", "manager"), getAllOrders);

// Any authenticated user (controller checks ownership)
router.get("/:id", getOrderById);

// Admin/manager — update order status
router.put("/:id/status", authorize("admin", "manager"), updateOrderStatus);
