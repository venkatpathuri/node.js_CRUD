const department = require("../models/department")
const enrollment = require("../models/enrollment")

exports.enrollStudents=async(req,res,next)=>{

    try{

        const data=req.body.courseIds.map((course)=>({
            studentId:req.body.studentId,
            courseId:course
        }))

         const students=await enrollment.insertMany(data)
         res.status(201).json({students})

    }
    catch(err){
        next(err)
    }
}

exports.getEnrollment=async(req,res,next)=>{

    try{

        const {search}=req.query
        const pipeline=[]

        pipeline.push(
        {
            $lookup:{
                from:'students',
                localField:'studentId',
                foreignField:'_id',
                as : 'student'
            }
        },
        {
            $unwind:"$student"
        },
        {
            $lookup:{
                from:'courses',
                localField:'courseId',
                foreignField:'_id',
                as :'course'
            }

        },
        {
            $unwind:"$course"
        },
        {
            $project:{
                "course.__v":0,
                "_id":0
            }
        },
        {
            $lookup:{
                from:'department',
                localField:'student.department',
                foreignField:'_id',
                as :'department'

            }
             

        },
        {
            $unwind:"$department"
        },
      
        {
            $group:{
                _id:"$studentId",
                name:{$first:"$student.name"},
                department:{$first:"$department.name"},
                course:{ 
                    $push:"$course"
                }
               
                
            }
        }
    
    )
        if(search){
       pipeline.push( {
           $match:{
            
             $or:[
                {name:{$regex:search,$options:'i'}},
                {'course.category':{$regex:search,$options:'i'}}
             ]

           }
        }

    )}

        const data=await enrollment.aggregate(pipeline)
        res.status(200).json({data})

       
    }
    catch(err){
        next(err)
    }
}