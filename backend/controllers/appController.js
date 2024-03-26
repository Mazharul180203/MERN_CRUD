import {userModel} from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config.js"



//middleware for verify user

export async function verifyUser(req, res, next) {
  try {
    const username = req.method === "GET" ? req.query.username : req.body.username;

    if (!username) {
      return res.status(400).send({ error: "Username is required" });
    }

    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // User exists, continue with the next middleware
    next();
  } catch (e) {
    console.error("Error in verifyUser:", e);
    return res.status(500).send({ error: "Internal server error" });
  }
}



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
  const { username, password } = req.body;

  try {
    userModel.findOne({ username })
        .then(user=>{
          bcrypt.compare(password, user.password)
              .then(passwordCheck =>{
                if(!passwordCheck) return res.status({ error: "Don't have password"})

                // create jwt token

                const token = jwt.sign({
                  usrId : user._id,
                  username: user.username
                },'JWT_SECRET',{expiresIn: "24h"});

                return res.status(200).send({
                  msg: "Login successful...",
                  username:user.username,
                  token
                })

              })
              .catch(error =>{
                return res.status(400).send({ error : "Password does not match"})
              })
        })


  }catch (error) {
    return res.status(404).send({error: "UserName not Found"});
  }
}
export async function getUser(req, res) {

  
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
