const { postLogin, postSignUp, postLogout, postRefresh } = require('../controllers/auth.controllers');
const { isAuth } = require('../middlewares/Auth');

const router = require('express').Router();

router
.route('/signup')
.post(postSignUp);

router
.route('/login')
.post(postLogin);


router
.route('/refresh')
.post(postRefresh);

router
.route('/logout')
.post(isAuth, postLogout);


module.exports = router