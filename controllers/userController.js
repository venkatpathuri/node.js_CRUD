
const User = require('../models/User');
exports.createUser= async(req,res)=>{

try{
   
const user = new User(req.body);
const savedUser = await user.save();
res.json(savedUser);
  
}

catch(err){
    next(err)
}


}

exports.getUsers=async(req,res)=>{
    try{

        
        const {search,salary,page=1,limit=5,sort,...filters}=req.query

       

        const queryObject={}

        const sortOption=sort || '-createdAt'

       

        if(search){
        queryObject.name={$regex:search,$options:"i"}
        }

        

        const skip=(page-1)*limit


        const totalUsers=await User.countDocuments()
        const totalPages=Math.ceil(totalUsers/limit)
        const users=await User.find(queryObject).sort(sortOption).skip(skip).limit(Number(limit))
        res.json({
            success:true,
            totalCount:totalUsers,
            totalPages:totalPages,
            limit:limit,
            page:page,
            count:users?.length,
            data:users

        })
    }

    catch(err){
 next(err)
    }
}