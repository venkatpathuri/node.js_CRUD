const mongoose=require('mongoose');

const userSchema=mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },


})
userSchema.index({name:1})
userSchema.index({age:1})

module.exports=mongoose.model('User',userSchema,'users_list')