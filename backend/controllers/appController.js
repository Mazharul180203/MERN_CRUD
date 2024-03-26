import {userModel} from "../models/userModel.js";
import bcrypt from 'bcrypt';
import {EncodeToken} from "../utility/tokenUtility.js";




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

                const token = EncodeToken(user._id,user.username);

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
  const { username } = req.params;
  // Ensure username is provided
  if (!username) {
    return res.status(400).send({ error: "Invalid Username" });
  }
  try {
    const user = await userModel.findOne({ username }).exec(); // Use .exec() for proper promise handling

    if (!user) {
      // User not found
      return res.status(404).send({ error: "Couldn't find the user" });
    }
     const {password , ...rest} = user.toJSON();//which valu is not pass to the api
    // User found, return it
    return res.status(200).send(rest);
  } catch (e) {
    // Log the error or handle it as per your logging strategy
    console.error("Error fetching user data:", e);
    return res.status(500).send({ error: "Cannot find user data due to an internal error" });
  }
}

export async function updateUser(req, res) {
  try {
    const id = req.query.id;
    const body = req.body;

    // Check if the ID and update body are provided
    if (!id || Object.keys(body).length === 0) {
      return res.status(400).send({ error: "Invalid request" });
    }

    // Attempt to update the user
    const updateResult = await userModel.updateOne({ _id: id }, body);

    // Check if the update operation modified any document
    if (updateResult.matchedCount === 0) {
      return res.status(404).send({ error: "User not found" });
    }

    // If document is found and update is applied
    if (updateResult.modifiedCount > 0) {
      return res.status(200).send({ msg: "Record Updated...!" });
    } else {
      // Document found but no update made (data might be the same)
      return res.status(200).send({ msg: "No changes made to the record." });
    }
  } catch (e) {
    // Catch and return any errors during the process
    return res.status(500).send({ error: e.message });
  }
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
