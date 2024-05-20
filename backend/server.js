const express = require("express");

const mongoose = require("mongoose");

const validator = require("validator");

const app = express()
app.use(express.json())

const port = 5000;

mongoose.connect("mongodb+srv://Puneet:silvercoin@cluster0.6qkktle.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Database is connected");
    })
    .catch((error) => {
        console.log("Database is not connected", error);
    });

const booksSchema = new mongoose.Schema({
    userName: String,
    email: String,
    title: String,
    author: String
})

const Book = mongoose.model("Book", booksSchema)

//POST API using Database
app.post("/books", async (req, res) => {
    const book = new Book({
        email: req.body.email,
        title: req.body.title,
        userName : req.body.userName,
        author: req.body.author
    })
    try {
        const newBook = await book.save()
        res.status(201).json(newBook)
    }
    catch (error) {
        console.log(error, '123456')
        res.status(400).json({ message: error.message });
    }
});

//GET API using Database
app.get("/books",async(req,res)=>{
    try{
        const book=await Book.find()
        res.json(book);
    }
    catch(err){
        console.log(err);
    }
});

//GET API By Id using Database
app.get("/books/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const book=await Book.findById(id)
        res.json(book);
    }
    catch(err){
        console.log(err);
    }
})

//UPDATE (PUT) API using Database
app.put("/books/:id",async(req,res)=>{
    const id=req.params.id;
    const {title,author,userName,email}=req.body;
    if(!userName || !title|| !author ||!email){
        res.status(400).json({message:"All fields are required"});
    }else if(!validator.isEmail(email)){
        res.status(400).json({message:"Please enter the valid email"});
    }else{
        try{
            const updatedBook=await Book.findByIdAndUpdate(id,{title,author,userName,email},{new:true});
            res.json(updatedBook);
        }
        catch(error){
            console.log(error,'abcd');
        }
    }
})

//UPDATE (PATCH) API using Database
app.patch("/books/:id",async(req,res)=>{
        try{
            const id=req.params.id;
            const updates=req.body;
            const updatedBook=await Book.findByIdAndUpdate(id,updates,{new:true});
            res.json(updatedBook);
        }
        catch(error){
            console.log(error,'abcd');
        }
})

//DELETE API using Database
app.delete("/books/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const deleteBook=await Book.findByIdAndDelete(id);
        if(!deleteBook){
            return res.status(404).json({message:"Book doesn't exist"});
        }
    }
    catch(error){
        console.log(error,'abcd');
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})