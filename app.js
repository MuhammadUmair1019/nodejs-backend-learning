import express from "express";
import mongoose from "mongoose";

// Routes
import { router } from "./routes/userRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const port = 3000;
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/resturant")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("OK");
});

// user routes
app.use("/api", router);

// middleware
app.use(authMiddleware);

app.get("/api/products", async (req, res) => {
  res.send("Products");
});

app.listen(port, () => {
  console.log(`Server listing on port ${port}`);
});
