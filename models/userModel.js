import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
});

export const User = mongoose.model("User", userSchema);