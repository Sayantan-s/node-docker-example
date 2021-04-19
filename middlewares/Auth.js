exports.isAuth = (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
        const error = new Error("You are not logged in!");
        error.status = 401;
        return next(error);
    }
    next();
}