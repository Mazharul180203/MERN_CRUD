import {userModel} from "../models/userModel.js";
import bcrypt from 'bcrypt';

export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // Check if the username already exists
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ error: "Please use a unique username." });
    }

    // Check if the email already exists
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ error: "Please use a unique email." });
    }

    // Hash the password and save the user
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new userModel({
        username,
        password: hashedPassword,
        profile: profile || '',
        email
      });

      const result = await user.save();
      return res.status(201).send({ msg: "User Registered Successfully" });
    } else {
      return res.status(400).send({ error: "Password is required" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message || "Internal Server Error");
  }
}

export async function login(req, res) {
  res.json("dfdfd");
}
export async function getUser(req, res) {
  res.json("dfdfd");
}
export async function updateUser(req, res) {
  res.json("dfdfd");
}
export async function generateOTP(req, res) {
  res.json("dfdfd");
}
export async function verifyOTP(req, res) {
  res.json("dfdfd");
}

export async function createResetSession(req, res) {
  res.json("dfdfd");
}

export async function resetPassword(req, res) {
    res.json("dfdfd");
}
