import express from 'express'
import morgan from 'morgan';
import { PORT } from './config'
import path from 'path'
import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination : (req, file, cb) => cb(null,'images'),
    filename : (req, file, cb) => {
       return cb(null,Date.now() + '-' + file.originalname);
    }
})
const fileFilter = (req,file,cb) => {
    if(file.mimetype === "image/png"
     || file.mimetype === "image/jpeg"
     || file.mimetype === "image/jpg") return cb(null,true)
    return cb(null,false)
}

const middlewares = [
    morgan('dev'),
    express.static('frontend'),
    express.urlencoded({ extended : false }),
    multer({ storage, fileFilter }).single('image')
]
const port  = PORT || 5000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(middlewares);
app.get('/',(req,res,next) => {
    return res.render('index');
})

app.post('/form',(req,res,next)=>{
    const { file } = req;
    console.log(file);
    if(!file){
        const error = new Error('Attached file is not an image')
        error.status = 422
        return next(error);
    }
    return res.redirect('/');
})

app.use((req,res,next) => {
    const error = new Error('Page not Found!')
    error.status = 404;
    return next(error);
})

app.use((err,req,res,next) => {
    const status = err.status || 500;
    return res.render('error',{
        status : status,
        message : err.message
    })
})



app.listen(port,_=> {
    console.log(`Server is live on localhost:${port}...`);
}) 