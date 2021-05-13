const router = require('express').Router();

router
.route('/')
.get((req,res,next) => {
   return res.render('index')
})

module.exports = router