import express from 'express'
import multer from 'multer';

const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        return callback(null, 'images')
    },
    filename : (req,file,callback) => {
        const name = file.originalname.split('.');
        const saveAs = name[0] + '-' + Date.now() + '.' + name[1];
        return callback(null,saveAs)
    }   
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg') return(true, false)
    return (null, false)
}

const upload = multer({
    storage,
    fileFilter
})

const router = express.Router()

router
.route('/')
.get((req,res,next)=>{
    return res 
    .status(200)
    .render('home/index')
})

router
.route('/form')
.get((req,res,next)=>{
    const { type } = req.query;
    if(!type) return res.redirect('/')
    return res 
    .status(200)
    .render('home/form',{ type })
})
.post(upload.single('file'),async(req,res,next) => {
    const { 
        body,
        file,
        query:{ type }
    } = req
    if(type === 'info'){
        console.log(body)
    }
    else if(type === 'resume'){
        console.log(body)
    }
    res.redirect(req.originalUrl)
})



export default router