const mongoose=require('mongoose');

const dbConnect=async()=>{
try{
    await mongoose.connect(process.env.MONGO_URL)
}
catch(err){
    console.log('Error in conneting with db')
    process.exit(1)
}
}

module.exports=dbConnect;