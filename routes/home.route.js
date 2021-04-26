import express from 'express'
import use_multer from '../helpers/use_multer'
import fs from 'fs'
import path from 'path'

const router = express.Router()

const multer = use_multer('images');

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
        if(body && file){ 
            const data = { ...body, file : file.filename }
            if(!fs.existsSync('db')) fs.mkdirSync('db')            
            const saveToDbPath = path.join('db','db.json');
            fs.writeFile(saveToDbPath, JSON.stringify(data), (err,data) => {
                if(err) return console.log(err)
                return console.log(`You're file has been written!`);
            }) 
        }
        return res.redirect(req.originalUrl)
    }
    else if(type === 'resume'){
        console.log(body)
        console.log(file)
    }
    return res.redirect(req.originalUrl)
})



export default router