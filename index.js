import express from 'express';
import dbConnectMjs from './utils/db.connect.mjs';
import dotEnv from 'dotenv'
import bodyParser from 'body-parser';

const app = express();

dotEnv.config();

const PORT =  process.env.NODE_PORT || 3000

app.use(bodyParser.urlencoded({ extended : true }))
app.use(express.json());
app.use(express.static('frontend'));

app.get('/',(req,res) => {
    return res
    .status(200)
    .send('Hello!!!!!');
})


dbConnectMjs(_ => app.listen(PORT,_ => console.log(`open localhost:${PORT}`)))

