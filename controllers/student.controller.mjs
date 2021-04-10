import Student from "../models/Student.model.mjs"

export const getStudent = (req,res) => {
    Student
    .find()
    .select('name')
    .then(students => {
        console.log(students)
        return res.render('student/students',{
            route : 'students',
            students
        })
    })
    .catch(err => console.log(err))
}

export const getStudentByID = (req, res) => {
    const { id } = req.params
    return Student
    .findById(id)
    .then(user => {
        console.log(user)
        return res.render('dynamic/[student]',{
            route : 'student',
            user
        })
    })
    .catch(err => console.log(err));
}

export const postStudent = (req, res, next) => {
    let body = {...req.body}
    for(let i in body) {
        if(i !== 'name'){
            body = {
                ...body,
                [i] : +req.body[i]
            }
        }
    }
    const {  name,univRoll,...otherEntities  } = body
    Student.create({
        name,
        univRoll,
        year : {...otherEntities}
    })
    .then(stud => {
        console.log(stud);
        return res.redirect('/');
    })
    .catch(err => console.log(err));
}

export const addStudent = (req,res) => {
    res.render('student/add-student',{
        route : 'add-student'
    })
}
