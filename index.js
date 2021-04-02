import express from 'express';
import mongoose from "mongoose"
import dbConnectMjs from './utils/db.connect.mjs';

const app = express();

const PORT = 3000

app.use(express.json());
app.use(express.static('frontend'));

app.get('/',(req,res) => {
    return res
    .status(200)
    .send('Hello!!!!!');
})


dbConnectMjs(_ => app.listen(PORT,_ => console.log(`open localhost:${PORT}`)))

