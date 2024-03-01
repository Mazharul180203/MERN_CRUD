import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

//Middleware can handle CORS policy
//Option 1: Allow all the origins with default of cors(*)

app.use(cors());
//Option 2: Allow custom origins with default of cors(*)
// app.use(
//   cors({
//       origin: "",
//       methods: ["GET", "POST", "PUT", "DELETE"],
//       allowedHeaders:['Content-Type'],
//   }),
// );

app.get("/", (req, res) => {
  return res.send("welcome saurav");
});

app.use("/books", booksRoute);

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
