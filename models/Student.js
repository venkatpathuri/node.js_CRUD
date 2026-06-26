const mongoose=require('mongoose');
const department = require('./department');

const studentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,ref:"Department"
    }
})

studentSchema.index({name:1,department:1},{unique:true})

module.exports=mongoose.model('Student',studentSchema,'students')