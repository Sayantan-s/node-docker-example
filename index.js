import express from 'express';
import dbConnectMjs from './utils/db.connect.mjs';
import dotEnv from 'dotenv'
import path from 'path'
import sessionsMjs from './utils/sessions.mjs';

const app = express();

dotEnv.config();

const PORT =  process.env.NODE_PORT || 3000

const middlewares = [
    express.urlencoded({ extended : true }),
    express.json(),
    express.static('frontend'),
    sessionsMjs()
]

app.use(middlewares);

app.set('views', path.join(path.resolve(path.dirname('')),'views'))
app.set('view engine','ejs')

app.get('/',(req,res) => {
    return res
    .status(200)
    .render('index')
})

app.post('/',(req,res) => {
    console.log(req.body)
    res.redirect('/');
})


dbConnectMjs(_ => app.listen(PORT,_ => console.log(`open localhost:${PORT}`)))

