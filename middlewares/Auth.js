

exports.isAuth = (req,res,next) => {
    const token = req.header('Authorization');

    next();
}