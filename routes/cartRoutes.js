import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cartControllers.js";

export const router = express.Router();

// All cart routes require authentication
router.use(authMiddleware);

router.get("/", getCart);
router.post("/", addToCart);
router.put("/:menuItemId", updateCartItem);
router.delete("/:menuItemId", removeFromCart);
router.delete("/", clearCart);
