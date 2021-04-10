import express from 'express'
import { getStudentByID } from '../controllers/student.controller.mjs';
import { addStudent } from '../controllers/student.controller.mjs';
import { postStudent } from '../controllers/student.controller.mjs';
import { getStudent } from '../controllers/student.controller.mjs';
import isAuth from '../middlewares/isAuth.mjs';

const student = express.Router();

student.get('/student' ,isAuth,getStudent)

student.get('/student/:id',isAuth,getStudentByID)

student.post('/student' ,postStudent)

student.get('/add-student' ,isAuth,addStudent)


export default student 