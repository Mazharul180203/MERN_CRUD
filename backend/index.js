import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoutes.js";
import auth from "./routes/authRoutes.js"
import cors from "cors";
import morgan from 'morgan'

const app = express();

// Middleware for parsing request body
app.use(express.json());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about out stack

app.use(cors());
app.get("/", (req, res) => {
  return res.send("welcome saurav");
});

app.use("/books", booksRoute);
app.use("/api",auth);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("App run successfully");
    app.listen(PORT, () => {
      console.log(`app port : ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("App destroyed", e);
  });
