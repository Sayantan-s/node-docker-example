import User from "../models/User.model.mjs";
import bcrypt from 'bcryptjs'

export const getLogin = (req,res) => {
    res.render('auth/login',{
        route : 'Login'
    })
}

export const postLogin = (req,res) => {
    const { email, pass } = req.body;
    return User
    .findOne({ email })
    .then(user => {
        if(!user) return res.redirect('/signup');
        console.log(user)
        bcrypt
        .compare(pass, user.password, (err,isMatched)=>{
            if(err) return res.redirect('/signup')
            else if(isMatched){
                req.session.isLoggedIn = true;
                req.session.user = user
                return req.session.save(_ =>  res.redirect('/'));
            }
        })
    })
    .catch(err => res.redirect('/login'));
}

export const getSignUp = (req,res) => {
    res.render('auth/signup',{
        route : 'Signup'
    })
}

export const postSignUp = (req,res) => {
    const { name, email, pass } = req.body;
    return User
    .findOne({ email })
    .then(user => {
        if(user) return res.redirect('/login')
        bcrypt
        .hash(pass,12)
        .then(hashedPassword => {
            const newUser = new User({ 
                name,
                email,
                password : hashedPassword
            })
            return newUser.save();
        })
        .then(user => {
            req.session.user = user;
            req.session.isLoggedIn = true
            req.session.save(_ => res.redirect('/'))
        })
        .catch(err => {
            console.log(err)
            return res.redirect('/signup')
        })
    })
    .catch(_ => res.redirect('/signup'))
}

export const logOut = (req,res) => {
    return req.session.destroy(_ => {
        res.redirect('/signup')
    })
}