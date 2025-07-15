const express=require('express');
const http=require('http');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(express.json());
app.use(cors());
dotenv.config();
const server=http.createServer(app);

const url=process.env.DATABASE_URL;

mongoose.connect(url).then(()=>{
    console.log("Connected to database");
}).catch((error)=>{
    console.log(error);
})

module.exports={app,server};

