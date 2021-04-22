const { postLogin, postSignUp, postLogout, postRefresh } = require('../controllers/auth.controllers');

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
.post(postLogout);


module.exports = router