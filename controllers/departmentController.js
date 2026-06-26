const department = require("../models/department")

exports.createDepartment=async(req,res,next)=>{
    try{
        const dept=new department(req.body);
        const deptList=dept.save();
        res.status(201).json(deptList)
    }
    catch(err){
        next(err)
    }
}

exports.deptList=async(req,res,next)=>{
    try{
        const dept=await department.find();
        res.status(200).json({data:dept})

    }
    catch(err){
        next(err)
    }
}