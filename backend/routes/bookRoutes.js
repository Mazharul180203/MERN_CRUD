import express from "express";
import {Book} from "../models/bookModel.js";

const router = express.Router();

//Route for Save a new Book
router.post('/',async (req, res)=>{
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
router.get('/',async (req, res)=>{
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
router.get('/:id',async (req, res)=>{
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

router.put('/:id',async (req, res)=>{
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

router.delete('/:id',async (req,res)=>{
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


export default router;
