// const {MongoClient}=require('mongodb');

// let dbConnection

// module.exports = {
//     connectToDb: (cb) => {
//         MongoClient.connect('mongodb://localhost:27017/bookstore')
//             .then((client) => {
//                 dbConnection = client.db()
//                 return cb(); 
//             })
//             .catch(err => {
//                 console.log(err);
//                 return cb(err);
//             });
//     },
//     getDb: () => dbConnection
// };
// db.js

const mongoose = require("mongoose");

let db;

function connectToDb(callback) {
    mongoose.connect("mongodb://127.0.0.1:27017/bookstore", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to MongoDB");
        db = mongoose.connection;
        callback(null);
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        callback(err);
    });
}

function getDb() {
    return db;
}

module.exports = { connectToDb, getDb };
