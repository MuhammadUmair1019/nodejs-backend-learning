import express from "express";

import { login, register } from "../controllers/userControllers.js";

export const router = express.Router();

router.post("/register", register);
router.post("/login", login);
