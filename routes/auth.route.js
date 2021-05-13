const router = require('express').Router();

router
.route('/register')
.post(async(req,res,next) => {
    res.send({ message: "Hello from register" })
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