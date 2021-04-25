import express from 'express'
import use_multer from '../helpers/use_multer'

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
.post(use_multer('images').single('file'),async(req,res,next) => {
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