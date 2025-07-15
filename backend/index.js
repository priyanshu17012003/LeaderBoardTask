const dotenv=require('dotenv');
const cors=require('cors');
dotenv.config();

const http=require('http');
const mongoose=require('mongoose');
const express=require('express');
const app=express();
app.use(express.json());
app.use(cors());
const server=http.createServer(app);

// const url=process.env.DATABASE_URL||"mongodb+srv://priyanshusanki123:8HNdiqcgsfkyD9RO@cluster0.xwsnn8e.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";
const url=process.env.DATABASE_URL;
console.log(url);

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

