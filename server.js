import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/school")
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
});

const User = mongoose.model("User", UserSchema);

app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/create", async (req, res) => {
  const user = await User.create({
    name: "Ali",
    age: 20,
    gender: "Male",
  });

  res.send(user);
});

app.get("/read", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.get("/update", async (req, res) => {
  const updatedData = await User.findOneAndUpdate(
    { name: "Ahmed" },
    { name: "Zubair" },
    { new: true },
  );

  res.send(updatedData);
});

app.get("/delete", async (req, res) => {
  await User.findOneAndDelete({ name: "Zubair" });

  res.send("Deleted!");
});

app.get("/products", (req, res) => {
  res.send("All Products");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
