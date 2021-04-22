const AuthHelper = require('../helpers/auth_helper');
const User = require('../model/User.model');
const RefreshToken = require('../model/RefreshToken.model')
const { SignUp_Schema,Login_Schema, RefreshToken_Schema } = require('../validators/auth.validators')

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

        const access_token =  AuthHelper.sign_JWT({ id : newUser._id });

        const refresh_token =  AuthHelper.sign_JWT(
            { id : newUser._id },
            '1y',
            process.env.JWT_REFRESH_SECRET
            );
        
        await RefreshToken.create({ refresh_token });

        return res
        .status(201)
        .send({ ...newUser._doc, access_token, refresh_token });

   } catch (error) {
       next(error)
   }
}

exports.postLogin = async(req,res,next) => {
    try {

        const sanitized_data = await Login_Schema.validateAsync(req.body);

        const { email, password } = sanitized_data;

        const user = await User.findOne({ email }).lean();

        if(!user){
            const error = new Error('You are not registered, please Signup!');
            error.status = 401;
            return next(error)
        }
        
        const isValid = await AuthHelper.validatePassword(user.password, password);

        console.log(isValid)

        if(!isValid){
            const error = new Error('Wrong credentials, Please try again!');
            error.status = 401;
            return next(error)
        }

        const access_token = await AuthHelper.sign_JWT({  id : user._id })

        const refresh_token =  AuthHelper.sign_JWT(
            { id : user._id },
            '1y',
            process.env.JWT_REFRESH_SECRET
            );
        
        await RefreshToken.create({ refresh_token });

        res.send({ access_token, refresh_token });

    } catch (error) {
        next(error)
    }
}

exports.postRefresh = async(req,res,next) => {
    try {
        const { error, refresh_token } = await RefreshToken_Schema.validateAsync(req.body);
        try{
            const token = await RefreshToken.findOne({ refresh_token }).lean();
    
            if(!token){
                const error = new Error('Invalid refresh Token!');
                error.status = 422;
                return next(error)
            }
    
            const { id } = await AuthHelper.verify_JWT(token.refresh_token, process.env.JWT_REFRESH_SECRET);
            
            try {
                const user = await User.findOne({ _id : id }).lean();
                if(!user){
                    const error = new Error('User not found!');
                    error.status = 404;
                    return next(error) 
                }
                const new_access_token = await AuthHelper.sign_JWT({  id : user._id })

                const new_refresh_token =  AuthHelper.sign_JWT(
                    { id : user._id },
                    '1y',
                    process.env.JWT_REFRESH_SECRET
                    );
                
                await RefreshToken.create({ refresh_token : new_refresh_token });

                return res.send({ new_refresh_token, new_access_token })

            } catch (error) {
                next(error); 
            }
        }
        catch(err){
            return next(err)
        }
    
    } catch (error) {
        next(error)
    }
}

exports.postLogout = (req,res,next) => {
    res.send({ message : "Hello LogOut" })
}