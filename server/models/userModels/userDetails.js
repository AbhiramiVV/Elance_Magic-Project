
 

const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true,
                unique:true
            },
            mobile:{
                type:String,
                required:true
            },
            password:{
                type:String,
                required:true
            },
            verified: 
            { type: Boolean },
          
            isBlocked:{
                type:Boolean,
                default:false
            }
        
})

const userModels=mongoose.model('userDetails',userSchema);
module.exports=userModels;