import express from "express";

import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/userControllers.js";

export const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);

userRoutes.get("/:id", getUserById);

userRoutes.post("/", createUser);

userRoutes.put("/:id", updateUserById);

userRoutes.delete("/:id", deleteUserById);
