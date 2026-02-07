import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

export const SECRET_KEY = "psYxwsDx6XvFe6BxBMJEphEUG8ucMc30dggtAHiB1bf";

export const register = async (req, res) => {
  const { name, email, password } = req.body || {};

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      userId: user._id,
    },
    SECRET_KEY,
    {
      expiresIn: "24hr",
    },
  );

  res.json({ token });
};

export const login = async (req, res) => {
  const { email, password } = req.body || {};

  const [user] = await User.find({ email });

  if (!user) {
    return res.status(400).send("User not found!");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      SECRET_KEY,
      {
        expiresIn: "24hr",
      },
    );

    res.json({ token });
  } else {
    res.status(400).json({ message: "Password not match!" });
  }
};
