import multer from 'multer'
import fs from 'fs'

export default (dirname) => {
    if(!fs.existsSync(dirname)){
        fs.mkdir(dirname,(err,data) =>{
            if(err) console.log(err)
            return console.log('Done!')
        })
    }

    const storage = multer.diskStorage({
        destination : (req,file,callback) => {
            return callback(null, dirname)
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
        file.mimetype === 'image/jpeg') return(null, true)
        return (null, false)
    }
    
    return multer({ storage, fileFilter })
}