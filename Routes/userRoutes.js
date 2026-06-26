const express=require('express');
const router=express.Router()
const { createUser ,getUsers} = require('../controllers/userController');
const { userValidation } = require('../middlewares/userValidation');
const { getPosts, createPosts } = require('../controllers/postController');
const { getCourses, createCourse, courseList } = require('../controllers/courseController');
const { addStudent, studentList, student, deleteStudent, createStudentWithDept } = require('../controllers/studentController');
const { createDepartment, deptList } = require('../controllers/departmentController');
const department = require('../models/department');
const { enrollStudents, getEnrollment } = require('../controllers/enrollmentController');
const { signUp } = require('../controllers/signUpController');
const { signIn } = require('../controllers/signInController');
const { authValidation } = require('../middlewares/authMiddleWare');

router.get('/users',authValidation,  getUsers)
router.post('/createUser',userValidation, createUser)

router.get('/posts',getPosts)
router.post('/createPost',createPosts)

router.post('/createCourse',createCourse)
router.get('/getCourses',courseList)

router.post('/addStudent',student)
router.get('/students',studentList)

router.post('/addDepartment',createDepartment)
router.get('/departments',deptList)

router.post('/studentDept',createStudentWithDept)

router.post('/enroll',enrollStudents)
router.get('/studentCourses',getEnrollment)

router.delete('/deleteStudent/:id',deleteStudent)

router.post('/signUp',signUp)
router.post('/signIn',signIn)

module.exports=router
