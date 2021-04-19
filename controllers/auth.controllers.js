const AuthHelper = require('../helpers/auth_helper');
const User = require('../model/User.model');
const { SignUp_Schema,Login_Schema } = require('../validators/auth.validators')

exports.postSignUp = async (req,res,next) => {
   try {
        const sanitized_data = await SignUp_Schema.validateAsync(req.body);

        const { email, username } = sanitized_data; 

        const userAlreadyRegistered = await User.exists({ email });

        if(userAlreadyRegistered){
            const error = new Error(`${username}, you are already registered, Please Login!`);
            error.status = 409;
            return next(error);
        }

        const newUser = await User.create(sanitized_data);

        const token =  new AuthHelper().create_access_JWT(newUser._id);

        res
        .status(201)
        .send({ ...newUser._doc,accessToken : token });

   } catch (error) {
       next(error)
   }
}

exports.postLogin = async(req,res,next) => {
    try {

        const sanitized_data = await Login_Schema.validateAsync(req.body);

        const { email } = sanitized_data;

        const user = await User.findOne({ email }).lean();

        console.log(user);

        if(!user){
            const error = new Error('You are not registered, please Signup!');
            error.status = 401;
            next(error)
        }

        const AuthUtils = new AuthHelper();

        const token = AuthUtils.create_access_JWT(user._id);

        const VerifyJWT = AuthUtils.verify_access_JWT(token);

        res.send({ ...user,accessToken :token, VerifyJWT });

    } catch (error) {
        next(error)
    }

}

exports.postLogout = (req,res,next) => {
    res.send({ message : "Hello LogOut" })
}