const Course = require("../models/Course");

exports.createCourse=async(req,res,next)=>{
    try{
        const course=new Course(req.body);
        const courseList=course.save();
        res.status(201).json(courseList)
    }
    catch(err){
        next(err)
    }
}

exports.courseList=async(req,res,next)=>{
    try{
        const course=await Course.find();
        res.status(200).json({data:course})
    }
    catch(err){
        next(err)
    }
}