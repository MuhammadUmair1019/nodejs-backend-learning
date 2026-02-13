import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

// Routes
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as categoryRoutes } from "./routes/categoryRoutes.js";
import { router as menuItemRoutes } from "./routes/menuItemRoutes.js";
import { router as cartRoutes } from "./routes/cartRoutes.js";
import { router as orderRoutes } from "./routes/orderRoutes.js";
import { router as inventoryRoutes } from "./routes/inventoryRoutes.js";
import { router as dashboardRoutes } from "./routes/dashboardRoutes.js";

// Middleware
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("OK");
});

// Mount routes
app.use("/api", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Error handler (must be last)
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
