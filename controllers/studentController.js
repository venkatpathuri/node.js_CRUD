const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const Student = require("../models/Student");
const enrollment = require("../models/enrollment");
const department = require("../models/department");

exports.student=async(req,res,next)=>{
    try{
        const student=new Student(req.body);
        const studentList=student.save();
        res.status(201).json(studentList)
    }
    catch(err){
        next(err)
    }
}

exports.createStudentWithDept = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // 1. Create Department
    const dept = await department.create(
      [{ name: req.body.department }],
      { session }
    );

    // 2. Create Student with departmentId
    const student = await Student.create(
      [{
        name: req.body.name,
        departmentId: dept[0]._id
      }],
      { session }
    );

    // 3. Commit
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Student & Department created",
      student: student[0],
      department: dept[0]
    });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

exports.studentList=async(req,res,next)=>{
    try{
        const student=await Student.find();
        res.status(200).json({data:student})
    }
    catch(err){
        next(err)
    }
}

exports.deleteStudent = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const student = await  Student.findByIdAndDelete(req.params.id, { session });

    if (!student) {
      throw new Error("Student not found");
    }

    await enrollment.deleteMany(
      { studentId: req.params.id },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Student and related enrollments deleted"
    });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};