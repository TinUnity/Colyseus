"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongodb_1 = require("mongodb");
const uri = "mongodb://localhost:27017";
const mongodb = new mongodb_1.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connectDb = mongodb.connect((err, db) => {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    }
    else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', uri);
        // do some work here with the database.
        //Close connection
        db.close();
    }
});
exports.connectDb = connectDb;
