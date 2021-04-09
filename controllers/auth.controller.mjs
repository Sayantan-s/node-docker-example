import User from "../models/User.model.mjs";
import bcrypt from 'bcryptjs'

export const getLogin = (req,res) => {
    res.render('auth/login',{
        route : 'Login'
    })
}

export const postLogin = (req,res,next) => {
    const { email, pass } = req.body;
    return User
    .findOne({ email })
    .then(user => {
        console.log(user)
        if(!user) return res.redirect('/signup');
        req.session.isLoggedIn = true;
        req.session.user = user
        return res.redirect('/');
    })
    .catch(err => res.redirect('/login'));
}

export const getSignUp = (req,res) => {
    res.render('auth/signup',{
        route : 'Signup'
    })
}

export const postSignUp = (req,res,next) => {
    const { name, email, pass } = req.body;
    return User
    .findOne({ email })
    .then(user => {
        if(user) return res.redirect('/login')
        bcrypt
        .hash(pass,12)
        .then(hashedPassword => {
            console.log(hashedPassword)
            const newUser = new User({ 
                name,
                email,
                password : hashedPassword
            })
            return newUser.save();
        })
        .then(user => {
            console.log(user)
            req.session.user = user;
            req.session.isAuthenticated = true
            req.session.save(_ => res.redirect('/'))
        })
        .catch(err => {
            console.log(err)
            return res.redirect('/signup')
        })
    })
    .catch(_ => res.redirect('/signup'))
}