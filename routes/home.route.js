const { isAuth } = require('../middlewares/Auth');
const User = require('../model/User.model');

const router = require('express').Router();

router
.route('/')
.get(isAuth, async(req,res,next) => {
    const { userId } = req;
    if(!userId){
        const error = new Error('Wrong credentials, Please try again!');
        error.status = 401;
        return next(error)
    }
    try{
        const user = await User
        .findOne({ _id : userId })
        .lean()
        .select('-__v -password -createdAt');

        return res.json({ ...user })
    }
    catch(err){ next(err) }
})

module.exports = router