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

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB successfully");
})
.catch((error) => {
    console.error("MongoDB connection failed:", error.message);
});


module.exports={app,server};

