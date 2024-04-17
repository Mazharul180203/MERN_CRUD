import {userModel} from "../models/userModel.js";
import bcrypt from 'bcrypt';
import {EncodeToken} from "../utility/tokenUtility.js";
import otpGenerator from "otp-generator";


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
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "Username not found" });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(400).send({ error: "Incorrect password" });
    }
    const token = EncodeToken(user._id, user.username);

    // Send the response
    return res.status(200).send({
      msg: "Login successful...",
      username: user.username,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "An error occurred during the login process" });
  }
}

export async function getUser(req, res) {
  const { username } = req.params;
  if (!username) {
    return res.status(400).send({ error: "Invalid Username" });
  }
  try {
    const user = await userModel.findOne({ username }).exec(); // Use .exec() for proper promise handling

    if (!user) {
      // User not found
      return res.status(404).send({ error: "Couldn't find the user" });
    }
     const {password , ...rest} = user.toJSON();//which value is not pass to the api
    return res.status(200).send(rest);
  } catch (e) {
    // Log the error or handle it as per your logging strategy
    console.error("Error fetching user data:", e);
    return res.status(500).send({ error: "Cannot find user data due to an internal error" });
  }
}

export async function updateUser(req, res) {
  try {

    const userID = req.headers.userID;
    const body = req.body;
    if (!userID || Object.keys(body).length === 0) {
      return res.status(400).send({ error: "Invalid request" });
    }
    if(body.password){
      body.password = await bcrypt.hash(body.password, 10);
    }
    const updateResult = await userModel.updateOne({ _id: userID }, body);

    if (updateResult.matchedCount === 0) {
      return res.status(404).send({ error: "User not found" });
    }

    if (updateResult.modifiedCount > 0) {
      return res.status(200).send({ msg: "Record Updated...!" });
    } else {
      return res.status(200).send({ msg: "No changes made to the record." });
    }
  } catch (e) {
    return res.status(500).send({error: e.message });
  }
}

export async function generateOTP(req, res) {
   req.app.locals.OTP = await otpGenerator.generate(6,{lowerCaseAlphabets:false, upperCaseAlphabets:false,specialChars:false});
   res.status(201).send({ code: req.app.locals.OTP })
}
export async function verifyOTP(req, res) {
   const { code } = req.query;
   if(parseInt( req.app.locals.OTP ) === parseInt(code)){
     req.app.locals.OTP = null;
     req.app.locals.resetSession = true; // start session for reset password
     return res.status(201).send({ msg: "Verify OTP" })
   }
  return res.status(400).send({ msg: "Invalid OTP" })
}

export async function createResetSession(req, res) {
  if(req.app.locals.resetSession){
    req.app.locals.resetSession = false; // allow to access this route only once
    return res.status(201).send({ msg: "Access Granted" })
  }
  return res.status(201).send({ msg: "Session expired" })
}

export async function resetPassword(req, res) {
  if(!req.app.locals.resetSession) return res.status(404).send({ error: "Session Expired!" })
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await userModel.updateOne({ username: user.username }, { password: hashPassword });
    res.status(201).send({ msg: "Record Updated ..." });
    req.app.locals.resetSession = false;
  } catch (e) {
    console.error(e); // It's good practice to log the error
    res.status(500).send({ error: e.message || "An error occurred during the password reset process." });
  }
}
