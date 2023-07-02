
const jwt=require('jsonwebtoken')
const User=require('../models/userModels/userDetails')


const userAuth=async(req,res,next)=>{


    //verify authentication
   const{authorization} =req.headers
   
   if(!authorization){
    return res.status(401).json({error:"Authorization token required"})
   }
const token=authorization
try {
   const {_id} =jwt.verify(token,'usersecretkey')
   req.user = await User.findOne({_id}).select('_id')

   next()
} catch (error) {
    console.log(error)
    res.status(401).json({error:'Request is not authorized'})
}



}
module.exports=userAuth