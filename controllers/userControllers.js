import { User } from "../models/userModel.js";

const getAllUsers = async (req, res) => {
  const users = await User.find();

  res.send(users);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.send(user);
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);

  res.send(user);
};

const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const data = req.body;

  const user = await User.findByIdAndUpdate(userId, data, { new: true });

  res.send(user);
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  await User.findByIdAndDelete(userId);

  res.send("User Deleted!");
};

export { getAllUsers, getUserById, createUser, updateUserById, deleteUserById };
