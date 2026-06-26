const mongoose = require('mongoose');
const bcrypt=require("bcrypt")
const signUpUserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    refreshToken:{
        type:String
    }

});

signUpUserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

signUpUserSchema.methods.comparePassword=function(password){
    return bcrypt.compare(password,this.password)
}

module.exports = mongoose.model('SignUpUser', signUpUserSchema);
