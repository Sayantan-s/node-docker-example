const { postLogin, postSignUp, postLogout } = require('../controllers/auth.controllers');
const { isAuth } = require('../middlewares/Auth');

const router = require('express').Router();

router
.route('/signup')
.post(postSignUp);

router
.route('/login')
.post(postLogin);

router
.route('/logout')
.post(postLogout);


module.exports = router