import User from "../models/User.model.mjs";
import errorHandlerMjs from "../utils/error.handler.mjs";

export const getLogin = (req,res) => {
    res.render('auth/login',{
        route : 'Login'
    })
}

export const postLogin = async (req,res) => {
    const { email, pass } = req.body;
}

export const getSignUp = (req,res) => {
    res.render('auth/signup',{
        route : 'Signup'
    })
}

export const postSignUp = async (req,res) => {
    const { name, email, pass } = req.body;
    try{
            await User.create({
                name,
                email,
                password : pass
            })
            return res
            .status(201)
            .json({
                status : 201,
                message : `${name},your account has been created!`
            })
    }

    catch(err){
        const error = errorHandlerMjs(err)
        return res
            .status(400)
            .json({
                status : 400,
                error
            })
    }
    
}

export const logOut = (req,res) => {
    return req.session.destroy(_ => {
        res.redirect('/signup')
    })
}