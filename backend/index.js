import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/connectionDB.js';
dotenv.config();

const app =express();

//middleware
app.use(express.json());
app.use(cors());

app.get('/',(req,res) => {
    res.send('hello world!')
});

const PORT=4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})