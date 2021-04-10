import express from 'express';
import { logOut } from '../controllers/auth.controller.mjs';
import { postSignUp } from '../controllers/auth.controller.mjs';
import { postLogin } from '../controllers/auth.controller.mjs';

import { getLogin, getSignUp } from '../controllers/auth.controller.mjs';

const auth = express.Router();


auth.get('/login',getLogin)

auth.post('/login',postLogin)

auth.get('/signup',getSignUp)

auth.post('/signup',postSignUp);

auth.post('/logout',logOut)

export default auth