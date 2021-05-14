const { registerValidator } = require('../helpers/validator');

const router = require('express').Router();

router
.route('/register')
.post(async(req,res,next) => {
    console.log(req.body)
    try{
        const { error, email } = await registerValidator.validateAsync(req.body);
        if(error)
            next(error);
        res.send({ message: email })
   }
   catch(err){

   }
})

router
.route('/login')
.post(async(req,res,next) => {
    res.send({ message: "Hello from login" })
})

router
.route('/logout')
.post(async(req,res,next) => {
    res.send({ message: "Hello from logout" })
})


module.exports = router