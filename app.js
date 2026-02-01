import express from "express";
import mongoose from "mongoose";

import { userRoutes } from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/school")
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hi");
});


// user routes 
app.use("/users", userRoutes);

// courses routes


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
