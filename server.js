import express from 'express'
import morgan from 'morgan';
import { PORT } from './config'
import path from 'path'
import compression from 'compression'

const middlewares = [
    morgan('dev'),
    express.static('frontend'),
]
const port  = PORT || 5000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(middlewares);

app.use(compression({
    level : 9
}))

app.get('/',(req,res,next) => {
    return res.render('index');
})

app.listen(port,_=> {
    console.log(`Server is live on localhost:${port}...`);
}) 