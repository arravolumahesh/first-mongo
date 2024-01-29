const express = require("express");
const { connectToDb, getDb } = require("./db");

const app = express();
app.use(express.json()); 

    
let db;

connectToDb((err) => {
    if (!err) {
        app.listen(4000, () => {
            console.log("Listening on port 4000");
        });
        db = getDb();
    }
});

app.use((req, res, next) => {
    if (db) {
        next();
    } else {
        res.status(500).json({ error: "Database connection not established" });
    }
});

app.get("/books",(req,res)=>{
    let books=[]
    db.collection("books")
    .find()
    .sort({author:1})
    .forEach(book=>books.push(book))
    .then(()=>{
        res.status(200).json(books)
    })
    .catch(()=>{
        res.status(500).json({error:"could not fetch document"})
    })
})

// app.get("/books",(req,res)=>{

//     //current page
//     const page=req.query.p || 0
//     const booksPerPage=3

//     let books=[]
//     db.collection("books")
//     .find()
//     .sort({author:1})
//     .skip(page*booksPerPage)
//     .limit(booksPerPage)
//     .forEach(book=>books.push(book))
//     .then(()=>{
//         res.status(200).json(books)
//     })
//     .catch(()=>{
//         res.status(500).json({error:"could not fetch document"})
//     })
// })

app.get("/books/:id",(req,res)=>{
    if (ObjectId.isValid(req.params.id)){
        db.collection("books")
        .findOne({ _id: ObjectId(req.params.id)})
        .then((doc)=>{
            res.status(200).json(doc)
        })
        .catch(()=>{
            res.status(500).json({error:"could not fetch document"})
        })
        }else{
            res.status(500).json({error:"not a valid document id"})
        }
    
    })

app.post("/books",(req,res)=>{
    let book=req.body
    db.collection("books")
    .insertOne(book)
    .then(result=>{
        res.status(201).json(result)
    })
    .catch(error=>{
        res.status(500).json({error:"could not fetch document"})
    })
})

app.delete("/books/:id",(req,res)=>{
    if (ObjectId.isValid(req.params.id)){
        db.collection("books")
        .deleteOne({ _id: ObjectId(req.params.id)})
        .then((doc)=>{
            res.status(200).json(doc)
        })
        .catch(()=>{
            res.status(500).json({error:"could not delete document"})
        })
        }else{
            res.status(500).json({error:"not a valid document id"})
        }
    
    })

    app.patch("/books/:id",(req,res)=>{
        const updates=req.body;
        if (ObjectId.isValid(req.params.id)){
            db.collection("books")
            .updateOne({ _id: ObjectId(req.params.id)},{$set:updates})
            .then((doc)=>{
                res.status(200).json(doc)
            })
            .catch(()=>{
                res.status(500).json({error:"could not update document"})
            })
            }else{
                res.status(500).json({error:"not a valid document id"})
            }
        
        })    

