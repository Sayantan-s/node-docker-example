const router = require('express').Router();

router
.route('/')
.get(async(req,res,next) => {
    console.log("hello")
    res.send({ message: "Hello from home" })
})

module.exports = router