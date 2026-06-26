const jwt=require('jsonwebtoken');

exports.createAccessToken=(user)=>{

    return jwt.sign(

        {_id:user._id},
        process.env.accessToken,
        {expiresIn:"40m"}

    )

}

exports.createRefreshToken=(user)=>{

    return jwt.sign(

        {_id:user._id},
        process.env.refreshToken,
        {expiresIn:"60m"}

    )

}