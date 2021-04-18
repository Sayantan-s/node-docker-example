const AuthHelper = require('../helpers/auth_helper');
const User = require('../model/User.model');
const { Login_Schema } = require('../validators/auth.validators')

exports.postSignUp = async (req,res,next) => {
   try {
        const sanitized_data = await Login_Schema.validateAsync(req.body);

        const { email, username } = sanitized_data; 

        const userAlreadyRegistered = await User.exists({ email });

        if(userAlreadyRegistered){
            const error = new Error(`${username}, you are already registered, Please Login!`);
            error.status = 409;
            return next(error);
        }

        const newUser = await User.create(sanitized_data);

        const token = AuthHelper.create_JWT(newUser._id);

        res
        .status(201)
        .send({ ...newUser._doc,accessToken : token });

   } catch (error) {
       next(error)
   }
}

exports.postLogin = (req,res,next) => {
    res.send({ message : "Hello Login" })

}

exports.postLogout = (req,res,next) => {
    res.send({ message : "Hello LogOut" })
}