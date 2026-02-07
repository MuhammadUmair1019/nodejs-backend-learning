import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "./models/userModel.js";

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
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body || {};

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  res.json(user);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  const [user] = await User.find({ email });

  if (!user) {
    return res.status(400).send("User not found!");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    res.json(user);
  } else {
    res.status(400).json({ message: "Password not match!" });
  }
});

// app.get("/products")

app.listen(port, () => {
  console.log(`Server listing on port ${port}`);
});
