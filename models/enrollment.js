const mongoose=require('mongoose')

const enrollmentSchema=mongoose.Schema({

    studentId:{type:mongoose.Schema.Types.ObjectId,ref:'Student'},
    courseId:{type:mongoose.Schema.Types.ObjectId,ref:'Course'}

})

module.exports=mongoose.model('enrollment',enrollmentSchema,'enrollment')