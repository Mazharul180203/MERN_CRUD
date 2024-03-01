import express from "express"
import {PORT,MONGO_URL} from "./config.js"
import mongoose from "mongoose";
import booksRoute from './routes/bookRoutes.js'

const app = express();


// Middleware for parsing request body
app.use(express.json());
app.get('/',(req, res)=>{

    return res.send('welcome saurav');
})

app.use('/books',booksRoute);



mongoose
    .connect(MONGO_URL)
    .then(()=>{
        console.log('App run successfully');
        app.listen(PORT,()=>{
            console.log(`app port : ${PORT}`);
        })
    }).catch((e)=>{
        console.log("App destroyed",e);
    });

