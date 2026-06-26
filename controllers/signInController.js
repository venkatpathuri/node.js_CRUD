const signUpUser = require("../models/signUpUser")
const { createAccessToken, createRefreshToken } = require("../utils/token")

exports.signIn=async(req,res,next)=>{

try{
    const user=await signUpUser.findOne({email:req.body.email})

    if(!user){
        return next(new Error('No user found'))
    }

    const isValid=await user.comparePassword(req.body.password)
   if(!isValid){
        return next(new Error('Incorrect Password'))
    }

    const accessToken=createAccessToken(user)
    const refreshToken=createRefreshToken(user)

    user.refreshToken=refreshToken

    res.status(200).json({accessToken})

}
catch(err){
    next(err)
}


}