import express from "express"
import {PORT,MONGO_URL} from "./config.js"
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";

const app = express();

app.get('/',(req, res)=>{

    return res.send('welcome saurav');
})


// Middleware for parsing request body
app.use(express.json());



//Route for Save a new Book
app.post('/books',async (req, res)=>{
    try{
        // validation
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: 'Send All required fields'
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    }catch (e) {
        console.log(e.message);
        res.status(500).send({message:e.message})
    }
})


// Route for Get All the Books from database
app.get('/books',async (req, res)=>{
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data:books
        });
    }catch (e) {
        console.log(e.message);
        res.status(500).send({message:e.message});
    }
})

// Route for Get All the Books from database by id
app.get('/books/:id',async (req, res)=>{
    try {

        const {id} = req.params;

        const book = await Book.findById(id);
        return res.status(200).json(book);
    }catch (e) {
        console.log(e.message);
        res.status(500).send({message:e.message});
    }
})


//Route for Update a Book

app.put('/books/:id',async (req, res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: 'Send All required fields'
            })
        }

        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id,req.body);
        if(!result){
            return res.status(404).json({message:"Book is not Found"});
        }else{
            return res.status(200).json({message:"Book updated successfully"});
        }

    }catch (e) {
        console.log(e.message);
        res.status(500).send({message:e.message});
    }
})


//Route for Deleting a Book

app.delete('/books/:id',async (req,res)=>{
    try{

        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message:"Book is not Found"});
        }else{
            return res.status(200).json({message:"Book delete successfully"});
        }
    }catch (e) {
        console.log(e.message);
        res.status(500).send({message:e.message});
    }
})


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

