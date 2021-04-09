import express from 'express'
import { getHome } from '../controllers/home.controller.mjs';
import isAuth from '../middlewares/isAuth.mjs';

const home = express.Router();

home.get('/',isAuth ,getHome)

export default home