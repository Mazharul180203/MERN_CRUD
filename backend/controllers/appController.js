import {user} from "../models/userModel.js";


export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;
    // Check if the username already exists
    const existingUser = await user.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ error: "Please use a unique username." });
    }
    res.status(200).send("User registered successfully");

    // Check if the email already exists
    const existingEmail = await user.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ error: "Please use a unique email." });
    }
    res.status(200).send("Email registered successfully");
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
