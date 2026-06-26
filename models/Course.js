const mongoose=require('mongoose');

const courseSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('Course',courseSchema,'courses')