import express from "express";
import mongoose from "mongoose";

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

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/users", async (req, res) => {
  const users = await User.find();

  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  res.send(user);
});

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);

  res.send(user);
});

app.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const data = req.body;

  const user = await User.findByIdAndUpdate(userId, data, { new: true });

  res.send(user);
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  await User.findByIdAndDelete(userId);

  res.send("User Deleted!");
});

app.get("/products", (req, res) => {
  res.send("All Products");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
