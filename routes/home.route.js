const router = require('express').Router();

router.get('/',(req, res, next) => {
    return res.send({ message: 'Hello world!' })
})

module.exports = router