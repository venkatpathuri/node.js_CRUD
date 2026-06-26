 exports.userValidation=(req,res,next)=>{

if(!req.body.name || !req.body.email){

    const error=new Error('Name and Email fields are mandatory')

    next(error)

}

next()
}