const jwt = require("jsonwebtoken");

exports.authValidation=async(req,res,next)=>{

        const header=req.headers.authorization

        const token=header.split(" ")[1];

        const decoded=jwt.verify(token,process.env.accessToken)

        req.user=decoded;

        next()

}