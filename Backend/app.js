
const dotenv = require("dotenv")
dotenv.config();
const express = require("express")


const cors = require('cors')

const app = express();

const connectToDb = require("./DB/db")

app.use(cors());

connectToDb();

app.get("/",(req,res)=>{
    res.send("Hello world")


})


module.exports = app;

