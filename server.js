import express from 'express'
import morgan from 'morgan';
import { PORT } from './config'
import fs from 'fs';
import home from './routes/home.route';

const app = express();

const middlewares = [
    morgan('dev'),
    express.static('frontend'),
    express.urlencoded({ extended : true }),
    express.json(),
]

app.set('views')
app.set('view engine','ejs')
 
app.use(middlewares)

app.use(home)
app.use('/api',()=>{})

app.listen((PORT || 5000), _ => console.log(`We are live on ${PORT}`));