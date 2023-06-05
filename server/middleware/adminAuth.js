const jwt=require('jsonwebtoken')
const Admin=require('../models/admin/AdminSchema')


const adminAuth=async(req,res,next)=>{
   const {authorization} =req.headers
   console.log('dgdfh' + authorization);
   if(!authorization){
       return res.status(401).json({error: "Authorization token required"})
   }
   
   const token = authorization 
   console.log(token)
   
   try {
       const {_id} = jwt.verify(token,"adminSecretkey")
       const admin=await Admin.find({_id})
       if(req.admin=admin){
           next()
       }else{
           res.status(201).json({message:true})
   
       }
       
   } catch (error) {
       console.log(error);
       res.status(401).json({error:"Request is not authorized"})
   
   }
   
   
   }
module.exports=adminAuth