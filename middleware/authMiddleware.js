import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

import { SECRET_KEY } from "../controllers/userControllers.js";

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers || {};

  if (!authorization) {
    res.status(402).send("Unauhtorize access");
  }

  const token = authorization.split(" ")[1];

  const jwtData = jwt.verify(token, SECRET_KEY);
  req.userId = jwtData.userId;

  const user = await userModel.findById(jwtData?.userId);

  if (!user) {
    res.status(402).send("Unauthorize user!");
  }

  next();
};
