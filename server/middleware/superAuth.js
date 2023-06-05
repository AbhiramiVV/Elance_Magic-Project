const jwt=require('jsonwebtoken')
const Superadmin=require('../models/admin/superadmin')


const superAuth=async(req,res,next)=>{


   const {authorization} =req.headers
console.log('dgdfh' + authorization);
if(!authorization){
    return res.status(401).json({error: "Authorization token required"})
}

const token = authorization 
console.log(token)

try {
    const {_id} = jwt.verify(token,"superadminSecretkey")
    const superadmin=await Superadmin.find({_id})
    if(req.superadmin=superadmin){
        next()
    }else{
        res.status(201).json({message:true})

    }
    
} catch (error) {
    console.log(error);
    res.status(401).json({error:"Request is not authorized"})

}


}
module.exports=superAuth