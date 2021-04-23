const AuthHelper = require("../helpers/auth_helper");

exports.isAuth = async(req,res,next) => {
    const authHeader = req.headers.authorization;
        if(!authHeader){
        const error = new Error("You are not logged in!");
        error.status = 401;
        return next(error);
    }
    const token = authHeader.split(' ')[1];
    console.log(req.body);

    try{
        const { id } = await AuthHelper.verify_JWT(token);

        req.userId = id;
    
        next();
    }
    catch(err){
        next(err);
    }
}