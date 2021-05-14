const router = require('express').Router();

router
.route('/')
.get((req,res,next) => {
   return res.send({ message : "Hello world!" })
})

module.exports = router