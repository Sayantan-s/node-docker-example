const { CustomError } = require('../helpers/errorHandler');
const isAuthenticated = require('../middlewares/isAuth');
const User = require('../models/User.model');

const router = require('express').Router();

router.get('/',isAuthenticated, async(req, res, next) => {
    
    const { id } = req.user;

    try {

        const user = await User.findOne({ _id : id }).select('name -_id').lean();

        if(!user){
            const error = CustomError.notFound(`Sorry, user does'nt exists!`);
            return next(error);
        }

        return res.send({ user })
        
    } catch (error) {
        next(error);
    }
})

module.exports = router