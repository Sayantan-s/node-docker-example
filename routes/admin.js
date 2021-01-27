const express = require('express');

const router = express.Router();

let i = 1;

router.use((req,res,next) => {
    console.log(`Hello middleware-${i}`);
    i++;
    next();
})


router.use('/add-item',(req,res) => {
    res.send(`<form action="/admin/item" method="POST">
         <input type="text" name="item">
         <button>send product</button>
    </form>`)
 })
 
 router.post('/item',(req,res) => {
     console.log(req.body);
     res.redirect('/');
 })

 
 module.exports = router;